"use client";

// components/qr-menu/MenuView.tsx - the menu a guest sees after scanning a free
// QR menu. The generator shows it inside a phone preview and /m shows it full
// screen, so it is styled for a phone only (no breakpoints: inside the preview a
// desktop breakpoint would fire). Text is rendered as text, never as HTML.

import { useMemo, useRef, useState, type RefObject } from "react";
import { Search, X } from "lucide-react";
import { formatPrice, type Diet, type Menu } from "@/lib/qr-menu/codec";

function DietMark({ diet }: { diet: Diet }) {
  if (!diet) return <span className="size-3.5 shrink-0" aria-hidden="true" />;
  const veg = diet === "veg";
  return (
    <span
      className={`mt-[3px] inline-flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] bg-white ${veg ? "border-veg" : "border-nonveg"}`}
      role="img"
      aria-label={veg ? "Veg" : "Non-veg"}
    >
      <span className={`size-1.5 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

export function MenuView({
  menu,
  scrollRoot,
  footer,
  className = "",
}: {
  menu: Menu;
  className?: string;
  /** The element that scrolls (the phone preview); the window when omitted. */
  scrollRoot?: RefObject<HTMLElement | null>;
  footer?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const bar = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const q = query.trim().toLowerCase();
  const sections = useMemo(
    () =>
      menu.sections
        .map((s, index) => ({ ...s, index, items: q ? s.items.filter((i) => `${i.name} ${i.desc}`.toLowerCase().includes(q)) : s.items }))
        .filter((s) => s.items.length),
    [menu, q],
  );
  const total = menu.sections.reduce((n, s) => n + s.items.length, 0);

  const jump = (index: number) => {
    const el = sectionRefs.current[index];
    if (!el) return;
    const offset = (bar.current?.offsetHeight ?? 0) + 8;
    const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const root = scrollRoot?.current;
    if (root) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - offset;
      root.scrollTo({ top, behavior: smooth });
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: smooth });
    }
  };

  return (
    <div className={`flex flex-col bg-white text-ink ${className}`}>
      <header className="bg-ink px-5 pt-7 pb-6 text-white">
        <p className="text-[13px] font-semibold tracking-wide text-marigold uppercase">Menu</p>
        <h1 className="mt-1 text-[26px] leading-tight font-bold tracking-[-0.02em] break-words">{menu.name || "Your restaurant"}</h1>
        {menu.note ? <p className="mt-2 text-[14px] leading-snug text-white/75">{menu.note}</p> : null}
      </header>

      <div ref={bar} className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
        <label className="mx-4 mt-3 flex h-11 items-center gap-2 rounded-full bg-mist px-4 text-ink-2 focus-within:ring-2 focus-within:ring-brand">
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">Search the menu</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${total} dishes`}
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-3"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="-mr-2 inline-flex size-9 items-center justify-center" aria-label="Clear search">
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>
        {!q && menu.sections.length > 1 ? (
          <nav aria-label="Menu sections" className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
            {menu.sections.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => jump(i)}
                className="shrink-0 rounded-full border border-marigold bg-marigold-soft px-3.5 py-1.5 text-[14px] font-semibold whitespace-nowrap text-marigold-ink transition-colors hover:bg-marigold hover:text-ink"
              >
                {s.name || "Menu"}
              </button>
            ))}
          </nav>
        ) : (
          <div className="h-3" />
        )}
      </div>

      <div className="flex-1 px-5 pb-6">
        {sections.length === 0 ? (
          <p className="py-10 text-center text-[15px] text-ink-2">No dish matches “{query}”.</p>
        ) : (
          sections.map((s) => (
            <section
              key={s.index}
              ref={(el) => {
                sectionRefs.current[s.index] = el;
              }}
              aria-label={s.name || "Menu"}
              className="pt-6"
            >
              <h2 className="flex items-center gap-2 text-[18px] font-bold">
                <span className="h-4 w-1 rounded-full bg-marigold" aria-hidden="true" />
                {s.name || "Menu"}
              </h2>
              <ul className="mt-2 divide-y divide-line">
                {s.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-3.5">
                    <DietMark diet={item.diet} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] leading-snug font-semibold break-words">{item.name}</p>
                      {item.desc ? <p className="mt-0.5 text-[14px] leading-snug break-words text-ink-2">{item.desc}</p> : null}
                    </div>
                    {item.price ? <p className="shrink-0 text-right text-[16px] font-semibold tabular-nums">{formatPrice(item.price)}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      {footer}
    </div>
  );
}
