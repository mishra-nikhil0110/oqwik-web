// lib/qr-menu/codec.ts - the free QR menu stores the whole menu inside the QR
// link itself (after the #), compressed. Nothing is saved on a server, and the
// part after # is never sent to one, so we never see a restaurant's menu.
//
//   https://www.oqwik.in/m#<base64url(deflate(json))>
//
// Printed QR codes stay on tables for years. Never change how version 1 is
// decoded; add a version 2 next to it instead. The /m page must stay online.

import { deflateSync, inflateSync, strFromU8, strToU8 } from "fflate";

export type Diet = "veg" | "nonveg" | "";
export type MenuItem = { name: string; price: string; diet: Diet; desc: string };
export type MenuSection = { name: string; items: MenuItem[] };
export type Menu = { name: string; note: string; sections: MenuSection[] };

export const limits = {
  name: 40,
  note: 90,
  section: 32,
  item: 48,
  price: 18,
  desc: 80,
  sections: 20,
  items: 60,
};

// Compact wire format: [1, name, note, [[section, [[item, price, diet, desc], ...]], ...]]
// Trailing empty fields are dropped to keep the QR small.
type WireItem = [string, string?, (0 | 1 | 2)?, string?];
type Wire = [1, string, string, [string, WireItem[]][]];

const dietCode = { "": 0, veg: 1, nonveg: 2 } as const;
const dietFromCode: Diet[] = ["", "veg", "nonveg"];

const clean = (s: unknown, max: number) =>
  typeof s === "string" ? s.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

function trimTail<T extends unknown[]>(arr: T): T {
  let end = arr.length;
  while (end > 1 && (arr[end - 1] === "" || arr[end - 1] === 0 || arr[end - 1] === undefined)) end--;
  return arr.slice(0, end) as T;
}

/** Drops empty dishes and sections and applies the length limits. */
export function tidy(menu: Menu): Menu {
  return {
    name: clean(menu.name, limits.name),
    note: clean(menu.note, limits.note),
    sections: menu.sections
      .map((s) => ({
        name: clean(s.name, limits.section),
        items: s.items
          .map((i) => ({
            name: clean(i.name, limits.item),
            price: clean(i.price, limits.price),
            diet: i.diet,
            desc: clean(i.desc, limits.desc),
          }))
          .filter((i) => i.name)
          .slice(0, limits.items),
      }))
      .filter((s) => s.items.length)
      .slice(0, limits.sections),
  };
}

const toBase64Url = (bytes: Uint8Array) => {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url = (s: string) => {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

export function encodeMenu(menu: Menu): string {
  const m = tidy(menu);
  const wire: Wire = [
    1,
    m.name,
    m.note,
    m.sections.map((s) => [s.name, s.items.map((i) => trimTail<WireItem>([i.name, i.price, dietCode[i.diet], i.desc]))]),
  ];
  return toBase64Url(deflateSync(strToU8(JSON.stringify(wire)), { level: 9 }));
}

/** Returns null for anything that is not a valid menu link (typos, cut-off links, other data). */
export function decodeMenu(data: string): Menu | null {
  try {
    if (!/^[A-Za-z0-9_-]{4,4000}$/.test(data)) return null;
    const wire = JSON.parse(strFromU8(inflateSync(fromBase64Url(data))));
    if (!Array.isArray(wire) || wire[0] !== 1 || !Array.isArray(wire[3])) return null;
    const menu: Menu = {
      name: clean(wire[1], limits.name),
      note: clean(wire[2], limits.note),
      sections: (wire[3] as unknown[]).slice(0, limits.sections).flatMap((s) => {
        if (!Array.isArray(s) || !Array.isArray(s[1])) return [];
        const items = (s[1] as unknown[]).slice(0, limits.items).flatMap((i) => {
          if (!Array.isArray(i)) return [];
          const name = clean(i[0], limits.item);
          if (!name) return [];
          return [{ name, price: clean(i[1], limits.price), diet: dietFromCode[Number(i[2]) || 0] ?? "", desc: clean(i[3], limits.desc) }];
        });
        return items.length ? [{ name: clean(s[0], limits.section), items }] : [];
      }),
    };
    return menu.sections.length ? menu : null;
  } catch {
    return null;
  }
}

/**
 * Shows a price the way Indian menus print it: "240" -> "₹240",
 * "180 / 320" (half / full) -> "₹180 / ₹320". Words ("Seasonal") stay as typed.
 */
export function formatPrice(price: string) {
  const p = price.replace(/^(₹|rs\.?|inr)\s*/i, "").replace(/\/-$/, "").trim();
  if (!p) return "";
  if (/^\d[\d,]*(\.\d+)?(\s*\/\s*\d[\d,]*(\.\d+)?)*$/.test(p)) return p.replace(/\d[\d,]*(\.\d+)?/g, (n) => `₹${n}`).replace(/\s*\/\s*/g, " / ");
  return price.trim();
}

/**
 * Turns a menu pasted as text (from WhatsApp, a document or a photo's OCR) into
 * sections and dishes. A line ending in a price is a dish; any other line starts
 * a new section. Veg / non-veg is never guessed: the owner marks it.
 */
export function parseMenuText(text: string): MenuSection[] {
  const sections: MenuSection[] = [];
  let current: MenuSection | null = null;
  const priceAtEnd =
    /^(.*?)[\s.\-–—:|]*(?:₹|rs\.?|inr)?\s*(\d[\d,]*(?:\.\d+)?(?:\s*\/\s*(?:₹|rs\.?)?\s*\d[\d,]*(?:\.\d+)?)*)\s*(?:\/-)?$/i;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/^\s*(?:[•*·\-–—]+|\d{1,3}[.)])\s*/, "").trim(); // bullets, "1." or "1)"
    if (!line) continue;
    const m = line.match(priceAtEnd);
    if (m && m[1].trim()) {
      if (!current) sections.push((current = { name: "Menu", items: [] }));
      current.items.push({ name: m[1].trim().slice(0, limits.item), price: m[2].replace(/(₹|rs\.?)\s*/gi, "").trim(), diet: "", desc: "" });
    } else {
      sections.push((current = { name: line.replace(/[:\-–—]+$/, "").trim().slice(0, limits.section), items: [] }));
    }
  }
  return sections.filter((s) => s.items.length);
}
