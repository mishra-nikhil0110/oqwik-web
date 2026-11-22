// components/sections/Nav.tsx - sticky header: a Marigold announcement ticker
// on top, then logo + links + trial CTA. The CTA stays visible at every width;
// on phones the section links fold into a <details> menu (works without JS).

import { Menu, X } from "lucide-react";
import { announcement, nav } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";

function Ticker() {
  // Two identical runs side by side; the track slides by exactly one run (-50%).
  const run = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {announcement.items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 whitespace-nowrap">
          <span>{item}</span>
          <span className="size-1.5 rounded-full bg-ink/70" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group overflow-hidden bg-marigold text-ink" role="region" aria-label={announcement.label}>
      <div className="flex h-9 w-max animate-marquee items-center text-[14px] font-semibold group-hover:[animation-play-state:paused]">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

export function Nav() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40">
      <Ticker />
      <div className="border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
          <a href="#top" className="shrink-0 rounded-md" aria-label="OQwik home">
            <Logo width={112} priority withTagline />
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-medium text-ink-2 transition-colors hover:bg-marigold-soft hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={nav.cta.href} className="min-h-11 px-5 text-[15px]">
              <span className="sm:hidden">{nav.cta.short}</span>
              <span className="hidden sm:inline">{nav.cta.label}</span>
            </ButtonLink>

            <details className="group relative md:hidden">
              <summary
                className="inline-flex size-11 items-center justify-center rounded-full text-ink ring-1 ring-line ring-inset hover:bg-mist"
                aria-label="Open menu"
              >
                <Menu className="size-5 group-open:hidden" aria-hidden="true" />
                <X className="hidden size-5 group-open:block" aria-hidden="true" />
              </summary>
              <nav
                aria-label="Mobile"
                className="absolute right-0 top-[calc(100%+0.5rem)] w-60 rounded-2xl border border-line bg-white p-2 shadow-[0_24px_48px_-20px_rgba(20,20,43,0.35)]"
              >
                <ul className="flex flex-col">
                  {nav.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="flex min-h-12 items-center rounded-xl px-4 text-[16px] font-medium text-ink hover:bg-marigold-soft"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
