"use client";

// components/sections/FaqList.tsx - the FAQ answers in a fixed-height panel on
// desktop, so the section stays level with the heading column. The panel
// scrolls smoothly, shows a Marigold progress bar and edge fades, and keeps an
// opened answer fully in view. On phones the list is not height-limited: a
// scroll box inside a scrolling page is awkward on touch.
//
// One answer opens at a time (<details name>), which keeps the list short.
// All questions and answers are in the HTML, so search engines read every one.

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { ChevronDown, Plus } from "lucide-react";

type Item = { q: string; a: string };

const smooth = (): ScrollBehavior =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export function FaqList({ items, label, moreLabel }: { items: Item[]; label: string; moreLabel: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scrollable: false, atTop: true, atBottom: false, progress: 0 });

  const measure = useCallback(() => {
    const el = panel.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setView({
      scrollable: max > 4,
      atTop: el.scrollTop <= 4,
      atBottom: el.scrollTop >= max - 4,
      progress: max > 4 ? Math.min(1, el.scrollTop / max) : 1,
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (panel.current) ro.observe(panel.current);
    if (list.current) ro.observe(list.current);
    return () => ro.disconnect();
  }, [measure]);

  // When an answer opens near the panel's edge, glide it fully into view.
  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    const item = e.currentTarget;
    const el = panel.current;
    if (!item.open || !el || el.scrollHeight <= el.clientHeight + 4) return;
    requestAnimationFrame(() => {
      const top = item.offsetTop;
      const bottom = top + item.offsetHeight;
      const pad = 12;
      let target: number | null = null;
      if (top < el.scrollTop + pad || item.offsetHeight > el.clientHeight - pad * 2) target = top - pad;
      else if (bottom > el.scrollTop + el.clientHeight - pad) target = bottom - el.clientHeight + pad;
      if (target !== null) el.scrollTo({ top: Math.max(0, target), behavior: smooth() });
    });
  };

  const scrollMore = () => {
    const el = panel.current;
    el?.scrollBy({ top: el.clientHeight * 0.6, behavior: smooth() });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-line">
      {/* progress along the top edge */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-20 h-1 bg-marigold-soft transition-opacity duration-300 ${view.scrollable ? "opacity-100" : "opacity-0"}`}
      >
        <div className="h-full origin-left rounded-r-full bg-marigold transition-transform duration-150 ease-out" style={{ transform: `scaleX(${view.progress})` }} />
      </div>

      {/* edge fades: tell the eye there is more above / below */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-1 z-10 h-10 bg-gradient-to-b from-white to-transparent transition-opacity duration-300 ${
          view.scrollable && !view.atTop ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-300 ${
          view.scrollable && !view.atBottom ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panel}
        onScroll={measure}
        role="region"
        aria-label={label}
        tabIndex={view.scrollable ? 0 : -1}
        className="scrollbar-marigold relative px-5 focus-visible:outline-offset-[-3px] sm:px-8 lg:max-h-[33rem] lg:overflow-y-auto lg:overscroll-y-contain lg:pr-6"
      >
        <div ref={list} className="divide-y divide-line pb-2 lg:pb-14">
          {items.map((item) => (
            <details key={item.q} name="faq" onToggle={onToggle} className="group py-1 open:[&_summary]:text-brand">
              <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-[17px] font-semibold">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-marigold-ink transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[62ch] animate-rise pb-5 text-[16px] leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* "More questions" nudge, hidden once the end is reached */}
      <button
        type="button"
        onClick={scrollMore}
        tabIndex={-1}
        aria-hidden="true"
        className={`absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[14px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(20,20,43,0.6)] transition-[opacity,transform] duration-300 hover:bg-brand lg:inline-flex ${
          view.scrollable && !view.atBottom ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {moreLabel}
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </button>
    </div>
  );
}
