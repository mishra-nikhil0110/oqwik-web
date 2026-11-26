"use client";

// components/qr-menu/MenuGenerator.tsx - the free QR code menu generator.
// Two ways in: type (or paste) the menu, which opens on oqwik.in/m, or paste a
// link to a menu that already exists (a PDF on Google Drive, a website).
// Out: a live phone preview, the QR as a PNG, and A4 sheets of table cards.
//
// Everything happens in the browser. The draft is kept in this browser's
// storage so an owner can come back to it; it is never sent to us.

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import {
  ArrowRight,
  Check,
  ClipboardPaste,
  Copy,
  Download,
  ExternalLink,
  Link2,
  Plus,
  Printer,
  QrCode,
  RotateCcw,
  Smartphone,
  Trash2,
  X,
} from "lucide-react";
import { encodeMenu, limits, parseMenuText, tidy, type Diet, type Menu, type MenuSection } from "@/lib/qr-menu/codec";
import { absoluteUrl } from "@/lib/seo/config";
import { PhoneFrame } from "@/components/ui/Mock";
import { MenuView } from "./MenuView";

type EditItem = { id: number; name: string; price: string; diet: Diet; desc: string };
type EditSection = { id: number; name: string; items: EditItem[] };
type Mode = "build" | "link";

const STORAGE_KEY = "oqwik.qr-menu.v1";
// Ids are only for React keys and focus. The first render uses fixed ids so the
// server and browser HTML match; ids made later start high to never collide.
let nextId = 10_000;
const blankStart = (): EditSection[] => [{ id: 1, name: "", items: [{ id: 2, name: "", price: "", diet: "", desc: "" }] }];
const newItem = (p: Partial<EditItem> = {}): EditItem => ({ id: nextId++, name: "", price: "", diet: "", desc: "", ...p });
const toEdit = (sections: MenuSection[]): EditSection[] =>
  sections.map((s) => ({ id: nextId++, name: s.name, items: s.items.map((i) => newItem(i)) }));

const field =
  "h-11 min-w-0 rounded-xl bg-white px-3 text-[16px] text-ink ring-1 ring-line ring-inset outline-none transition-shadow placeholder:text-ink-3 focus:ring-2 focus:ring-brand";
const smallBtn =
  "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40";

// How dense the code gets. Version = modules per side ((v * 4) + 17).
function density(version: number) {
  if (version <= 10) return { label: "Easy to scan", note: "Prints well at 4 cm or larger.", level: 1, tone: "bg-success" };
  if (version <= 20) return { label: "Good", note: "Print it at least 5 cm wide.", level: 2, tone: "bg-success" };
  if (version <= 27) return { label: "Dense", note: "Print it at least 7 cm wide, or shorten descriptions.", level: 3, tone: "bg-marigold" };
  return { label: "Too much for one code", note: "Shorten or remove descriptions, or move some dishes out.", level: 4, tone: "bg-danger" };
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "menu";

function safeLink(raw: string) {
  const v = raw.trim();
  if (!v) return null;
  try {
    const u = new URL(/^[a-z]+:\/\//i.test(v) ? v : `https://${v}`);
    return (u.protocol === "https:" || u.protocol === "http:") && u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

export function MenuGenerator() {
  const [mode, setMode] = useState<Mode>("build");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [sections, setSections] = useState<EditSection[]>(blankStart);
  const [link, setLink] = useState("");
  const [tab, setTab] = useState<"phone" | "qr">("phone");
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState("");
  const [copied, setCopied] = useState(false);
  const [svg, setSvg] = useState("");
  const [mounted, setMounted] = useState(false);
  const loaded = useRef(false);
  const previewScroll = useRef<HTMLDivElement>(null);
  const output = useRef<HTMLDivElement>(null);

  // Restore the draft after hydration (storage may be blocked: then just start fresh).
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw) as { mode?: Mode; link?: string; menu?: Menu };
        if (d.mode === "build" || d.mode === "link") setMode(d.mode);
        if (typeof d.link === "string") setLink(d.link);
        if (d.menu && Array.isArray(d.menu.sections)) {
          setName(d.menu.name ?? "");
          setNote(d.menu.note ?? "");
          setSections(toEdit(d.menu.sections));
        }
      }
    } catch {}
    loaded.current = true;
  }, []);

  const menu: Menu = useMemo(() => ({ name, note, sections }), [name, note, sections]);
  const clean = useMemo(() => tidy(menu), [menu]);
  const dishCount = clean.sections.reduce((n, s) => n + s.items.length, 0);

  useEffect(() => {
    if (!loaded.current) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, link, menu }));
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [mode, link, menu]);

  const encoded = useMemo(() => (dishCount ? encodeMenu(menu) : ""), [menu, dishCount]);
  const linkUrl = safeLink(link);
  const target = mode === "build" ? (encoded ? `${absoluteUrl("/m")}#${encoded}` : null) : linkUrl;
  const openHref = mode === "build" ? (encoded ? `/m#${encoded}` : null) : linkUrl;

  const version = useMemo(() => {
    if (!target) return 0;
    try {
      return QRCode.create(target, { errorCorrectionLevel: "M" }).version;
    } catch {
      return 41; // longer than any QR code can hold
    }
  }, [target]);
  const d = density(version);
  const ready = Boolean(target) && d.level < 4;

  useEffect(() => {
    if (!target || !ready) return setSvg("");
    let live = true;
    const t = setTimeout(() => {
      QRCode.toString(target, { type: "svg", errorCorrectionLevel: "M", margin: 1, color: { dark: "#14142bff", light: "#ffffffff" } })
        .then((s) => live && setSvg(s))
        .catch(() => live && setSvg(""));
    }, 120);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [target, ready]);

  // ----- editing -----
  const updateSection = (id: number, patch: Partial<EditSection>) =>
    setSections((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const updateItem = (sid: number, iid: number, patch: Partial<EditItem>) =>
    setSections((ss) => ss.map((s) => (s.id === sid ? { ...s, items: s.items.map((i) => (i.id === iid ? { ...i, ...patch } : i)) } : s)));
  const removeItem = (sid: number, iid: number) =>
    setSections((ss) => ss.map((s) => (s.id === sid ? { ...s, items: s.items.filter((i) => i.id !== iid) } : s)));
  const addItem = (sid: number) => {
    const item = newItem();
    setSections((ss) => ss.map((s) => (s.id === sid ? { ...s, items: [...s.items, item] } : s)));
    requestAnimationFrame(() => document.getElementById(`dish-${item.id}`)?.focus());
  };
  const addSection = () => {
    const s: EditSection = { id: nextId++, name: "", items: [newItem()] };
    setSections((ss) => [...ss, s]);
    requestAnimationFrame(() => document.getElementById(`section-${s.id}`)?.focus());
  };

  const clearMenu = () => {
    if (!window.confirm("Clear this menu and start again?")) return;
    setName("");
    setNote("");
    setSections([{ id: nextId++, name: "", items: [newItem()] }]);
  };

  const importPaste = () => {
    const parsed = parseMenuText(pasteText);
    if (!parsed.length) {
      setPasteError("No dishes found. Put each dish on its own line with the price at the end, like: Paneer Tikka 280");
      return;
    }
    // Replace the blank starting rows if the owner has not typed any dish yet.
    const untouched = sections.every((s) => s.items.every((i) => !i.name.trim()));
    setSections((ss) => [...(untouched ? [] : ss), ...toEdit(parsed)]);
    setPasteText("");
    setPasteError("");
    setPasteOpen(false);
  };

  // ----- output -----
  const showQr = () => {
    setTab("qr");
    requestAnimationFrame(() => output.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const downloadPng = async () => {
    if (!target) return;
    const url = await QRCode.toDataURL(target, {
      errorCorrectionLevel: "M",
      width: 1200,
      margin: 2,
      color: { dark: "#14142bff", light: "#ffffffff" },
    });
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(name)}-menu-qr-code.png`;
    a.click();
  };

  const copyLink = async () => {
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target);
    } catch {
      window.prompt("Copy this menu link:", target);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const qrTabActive = mode === "link" || tab === "qr";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-12">
      {/* ===== Editor ===== */}
      <div className="min-w-0">
        <div role="tablist" aria-label="How do you want to make the menu?" className="grid grid-cols-2 gap-1 rounded-full bg-mist p-1 ring-1 ring-line">
          {(
            [
              ["build", "Type my menu", ClipboardPaste],
              ["link", "PDF or menu link", Link2],
            ] as const
          ).map(([m, label, Icon]) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-[15px] font-semibold transition-colors ${
                mode === m ? "bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,43,0.35)]" : "text-ink-2 hover:text-ink"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {mode === "link" ? (
          <div className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-line sm:p-7">
            <label htmlFor="menu-link" className="text-[16px] font-semibold">
              Link to your PDF or menu page
            </label>
            <p className="mt-1 text-[15px] text-ink-2">A PDF menu on Google Drive or Dropbox, a page on your website, or any public link.</p>
            <input
              id="menu-link"
              type="url"
              inputMode="url"
              value={link}
              onChange={(e) => setLink(e.target.value.slice(0, 500))}
              placeholder="https://drive.google.com/…"
              className={`${field} mt-4 w-full`}
              aria-invalid={link.trim() !== "" && !linkUrl}
            />
            {link.trim() && !linkUrl ? (
              <p className="mt-2 text-[14px] text-danger">That doesn’t look like a web link. It should start with https://</p>
            ) : (
              <p className="mt-2 text-[14px] text-ink-2"></p>
            )}
            <label htmlFor="link-name" className="mt-6 block text-[16px] font-semibold">
              Restaurant name <span className="font-normal text-ink-2">(printed on the table card)</span>
            </label>
            <input id="link-name" value={name} maxLength={limits.name} onChange={(e) => setName(e.target.value)} placeholder="Your restaurant’s name" className={`${field} mt-2 w-full`} />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            <div className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="r-name" className="text-[15px] font-semibold">
                    Restaurant name
                  </label>
                  <input id="r-name" value={name} maxLength={limits.name} onChange={(e) => setName(e.target.value)} placeholder="Your restaurant’s name" className={`${field} mt-2 w-full`} />
                </div>
                <div>
                  <label htmlFor="r-note" className="text-[15px] font-semibold">
                    Note under the name <span className="font-normal text-ink-2">(optional)</span>
                  </label>
                  <input id="r-note" value={note} maxLength={limits.note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Prices include GST" className={`${field} mt-2 w-full`} />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                <button type="button" onClick={() => setPasteOpen((o) => !o)} aria-expanded={pasteOpen} className={`${smallBtn} bg-marigold text-ink hover:bg-marigold/85`}>
                  <ClipboardPaste className="size-4" aria-hidden="true" />
                  Paste a menu
                </button>
                {dishCount || name || note ? (
                  <button type="button" onClick={clearMenu} className={`${smallBtn} text-ink-2 ring-1 ring-line ring-inset hover:bg-mist hover:text-ink`}>
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Clear menu
                  </button>
                ) : null}
              </div>

              {pasteOpen ? (
                <div className="mt-5 animate-rise rounded-2xl bg-marigold-soft p-4 ring-1 ring-marigold/50 sm:p-5">
                  <label htmlFor="paste" className="text-[15px] font-semibold text-ink">
                    Paste your menu as text
                  </label>
                  <p className="mt-1 text-[14px] text-marigold-ink">
                    One dish per line with the price at the end. A line without a price starts a new section.
                  </p>
                  <textarea
                    id="paste"
                    rows={7}
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value.slice(0, 8000))}
                    className="mt-3 w-full rounded-xl bg-white p-3 text-[16px] leading-relaxed ring-1 ring-line ring-inset outline-none placeholder:text-ink-3 focus:ring-2 focus:ring-brand"
                  />
                  {pasteError ? <p className="mt-2 text-[14px] text-danger">{pasteError}</p> : null}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={importPaste} className={`${smallBtn} bg-ink text-white hover:bg-brand`}>
                      Add to menu
                    </button>
                    <p className="text-[14px] text-marigold-ink">Then mark each dish veg or non-veg.</p>
                  </div>
                </div>
              ) : null}
            </div>

            {sections.map((s, si) => (
              <fieldset key={s.id} className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-7">
                <legend className="sr-only">Section {si + 1}</legend>
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-marigold text-[14px] font-bold text-ink tabular-nums">
                    {si + 1}
                  </span>
                  <input
                    id={`section-${s.id}`}
                    aria-label={`Section ${si + 1} name`}
                    value={s.name}
                    maxLength={limits.section}
                    onChange={(e) => updateSection(s.id, { name: e.target.value })}
                    placeholder="Section, e.g. Starters"
                    className={`${field} flex-1 font-semibold`}
                  />
                  <button
                    type="button"
                    onClick={() => setSections((ss) => ss.filter((x) => x.id !== s.id))}
                    disabled={sections.length === 1}
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink-2 hover:bg-mist hover:text-danger disabled:opacity-30"
                    aria-label={`Delete section ${s.name || si + 1}`}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <ul className="mt-4 flex flex-col gap-3">
                  {s.items.map((item) => (
                    <li key={item.id} className="rounded-2xl bg-mist p-3 ring-1 ring-line">
                      <div className="flex gap-2">
                        <input
                          id={`dish-${item.id}`}
                          aria-label="Dish name"
                          value={item.name}
                          maxLength={limits.item}
                          onChange={(e) => updateItem(s.id, item.id, { name: e.target.value })}
                          placeholder="Dish name"
                          className={`${field} flex-1`}
                        />
                        <input
                          aria-label={`Price of ${item.name || "dish"}`}
                          value={item.price}
                          maxLength={limits.price}
                          inputMode="decimal"
                          onChange={(e) => updateItem(s.id, item.id, { price: e.target.value })}
                          placeholder="₹ Price"
                          className={`${field} w-28 shrink-0 tabular-nums`}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(s.id, item.id)}
                          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink-2 hover:bg-white hover:text-danger"
                          aria-label={`Remove ${item.name || "dish"}`}
                        >
                          <X className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="flex shrink-0 gap-1.5" role="group" aria-label={`Veg or non-veg: ${item.name || "dish"}`}>
                          {(
                            [
                              ["veg", "Veg", "border-veg", "bg-veg"],
                              ["nonveg", "Non-veg", "border-nonveg", "bg-nonveg"],
                            ] as const
                          ).map(([diet, label, border, dot]) => (
                            <button
                              key={diet}
                              type="button"
                              aria-pressed={item.diet === diet}
                              onClick={() => updateItem(s.id, item.id, { diet: item.diet === diet ? "" : diet })}
                              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[14px] font-semibold ring-1 ring-inset transition-colors ${
                                item.diet === diet ? "bg-white text-ink ring-ink" : "text-ink-2 ring-line hover:bg-white"
                              }`}
                            >
                              <span className={`inline-flex size-3.5 items-center justify-center rounded-[3px] border-[1.5px] bg-white ${border}`} aria-hidden="true">
                                <span className={`size-1.5 rounded-full ${dot}`} />
                              </span>
                              {label}
                            </button>
                          ))}
                        </div>
                        <input
                          aria-label={`Description of ${item.name || "dish"} (optional)`}
                          value={item.desc}
                          maxLength={limits.desc}
                          onChange={(e) => updateItem(s.id, item.id, { desc: e.target.value })}
                          placeholder="Short description (optional)"
                          className={`${field} w-full text-[15px] sm:flex-1`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => addItem(s.id)}
                  disabled={s.items.length >= limits.items}
                  className={`${smallBtn} mt-3 text-brand hover:bg-brand-soft`}
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Add dish
                </button>
              </fieldset>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={addSection}
                disabled={sections.length >= limits.sections}
                className={`${smallBtn} bg-white text-ink ring-1 ring-line ring-inset hover:bg-mist`}
              >
                <Plus className="size-4" aria-hidden="true" />
                Add section
              </button>
              <button type="button" onClick={showQr} disabled={!dishCount} className={`${smallBtn} min-h-12 bg-brand px-6 text-white hover:bg-brand-deep`}>
                Get my QR code
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== Preview and output ===== */}
      <div ref={output} className="scroll-mt-28 lg:sticky lg:top-28">
        {mode === "build" ? (
          <div role="tablist" aria-label="Preview" className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-mist p-1 ring-1 ring-line">
            {(
              [
                ["phone", "Guest view", Smartphone],
                ["qr", "QR code", QrCode],
              ] as const
            ).map(([t, label, Icon]) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-colors ${
                  tab === t ? "bg-ink text-white" : "text-ink-2 hover:text-ink"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        ) : null}

        {!qrTabActive ? (
          <PhoneFrame className="mx-auto w-full max-w-[22rem]">
            <div ref={previewScroll} className="scrollbar-marigold h-[34rem] overflow-y-auto overscroll-contain">
              {dishCount ? (
                <MenuView menu={clean} scrollRoot={previewScroll} />
              ) : (
                <p className="flex h-full items-center justify-center px-8 text-center text-[15px] text-ink-2">Add a dish with a name to see the menu here.</p>
              )}
            </div>
          </PhoneFrame>
        ) : (
          <div className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
            {/* table card preview */}
            <div className="mx-auto max-w-[17rem] overflow-hidden rounded-2xl bg-white text-center ring-1 ring-line shadow-[0_24px_48px_-28px_rgba(20,20,43,0.45)]">
              <div className="h-2 bg-marigold" />
              <div className="px-5 pt-4 pb-5">
                <p className="text-[18px] leading-tight font-bold break-words">{name || "Your restaurant"}</p>
                <p className="mt-1 text-[13px] font-semibold tracking-wide text-brand uppercase">Scan to see our menu</p>
                <div className="mx-auto mt-3 aspect-square w-full max-w-[12rem]">
                  {svg ? (
                    <div className="size-full [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: svg }} />
                  ) : (
                    <div className="flex size-full items-center justify-center rounded-xl bg-mist px-4 text-[14px] text-ink-2">
                      {mode === "link" ? "Paste your menu link to make the code" : d.level === 4 ? "Too many dishes for one code" : "Add a dish to make the code"}
                    </div>
                  )}
                </div>
                <p className="mt-3 text-[12px] text-ink-2">Point your phone camera here. No app needed.</p>
              </div>
            </div>

            {target ? (
              <div className="mt-5" aria-live="polite">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="font-semibold">QR density: {d.label}</span>
                  {mode === "build" ? <span className="text-ink-2 tabular-nums">{dishCount} dishes</span> : null}
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden="true">
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className={`h-1.5 rounded-full ${n <= d.level ? d.tone : "bg-line"}`} />
                  ))}
                </div>
                <p className="mt-2 text-[14px] text-ink-2">{d.note}</p>
              </div>
            ) : null}

            <div className="mt-5 grid gap-2">
              <button type="button" onClick={downloadPng} disabled={!ready} className={`${smallBtn} min-h-12 justify-center bg-brand text-white hover:bg-brand-deep`}>
                <Download className="size-4" aria-hidden="true" />
                Download QR code (PNG)
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                disabled={!ready || !svg}
                className={`${smallBtn} justify-center bg-ink text-white hover:bg-brand`}
              >
                <Printer className="size-4" aria-hidden="true" />
                Print QR table cards (4 on A4)
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={copyLink} disabled={!ready} className={`${smallBtn} justify-center ring-1 ring-line ring-inset hover:bg-mist`}>
                  {copied ? <Check className="size-4 text-success" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy link"}
                </button>
                {openHref && ready ? (
                  <a href={openHref} target="_blank" rel="noopener noreferrer" className={`${smallBtn} justify-center ring-1 ring-line ring-inset hover:bg-mist`}>
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Open menu
                  </a>
                ) : (
                  <span className={`${smallBtn} justify-center opacity-40 ring-1 ring-line ring-inset`} aria-disabled="true">
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Open menu
                  </span>
                )}
              </div>
            </div>

          </div>
        )}

        <div className="mt-4 rounded-3xl bg-ink p-5 text-white sm:p-6">
          <p className="text-[17px] leading-snug font-semibold">Want guests to order from this QR, not just read it?</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">
            With OQwik the order reaches your kitchen as a KOT with the table number, guests pay by UPI, and the GST bill is ready. Prices
            change without reprinting.
          </p>
          <a href="/#start-trial" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-marigold px-5 text-[15px] font-semibold text-ink hover:bg-white">
            Try OQwik free for 15 days
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {mounted && ready && svg ? createPortal(<PrintSheet name={name} svg={svg} />, document.body) : null}
    </div>
  );
}

/** Four A6 table cards on one A4 sheet. Only visible when printing. */
function PrintSheet({ name, svg }: { name: string; svg: string }) {
  return (
    <div id="qr-print" className="hidden">
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body > *:not(#qr-print) { display: none !important; }
          #qr-print { display: grid !important; grid-template-columns: 1fr 1fr; gap: 6mm; }
          #qr-print .card { break-inside: avoid; height: 131mm; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="card flex flex-col items-center overflow-hidden rounded-[4mm] border border-dashed border-ink-3 text-center text-ink">
          <div className="h-[5mm] w-full bg-marigold" />
          <p className="mt-[7mm] px-[6mm] text-[20pt] leading-tight font-bold break-words">{name || "Our menu"}</p>
          <p className="mt-[2mm] text-[11pt] font-semibold tracking-wide text-brand uppercase">Scan to see our menu</p>
          <div className="mt-[5mm] size-[62mm] [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: svg }} />
          <p className="mt-[4mm] px-[8mm] text-[10pt] text-ink-2">Point your phone camera at the code. No app needed.</p>
          <p className="mt-auto mb-[5mm] text-[8pt] text-ink-3">Free QR menu by OQwik · oqwik.in</p>
        </div>
      ))}
    </div>
  );
}
