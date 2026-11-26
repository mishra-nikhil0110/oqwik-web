// components/sections/Footer.tsx - brand and link columns on Ink, then a bottom
// row with the copyright, the maker credit and the legal links.

import { footer } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t-4 border-marigold bg-ink py-12 text-white">
      <div className="container-page flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <a href="/#top" className="self-start rounded-md" aria-label="OQwik home">
              <Logo tone="white" width={128} withTagline />
            </a>
            <p className="max-w-xs text-[15px] text-white/70">{footer.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[13px] font-semibold tracking-wide text-marigold uppercase">{col.title}</p>
              <ul className="mt-2 flex flex-col">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-flex min-h-11 items-center text-[15px] text-white/80 hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-white/70">
            © {new Date().getFullYear()} OQwik · {footer.maker.prefix}{" "}
            <a href={footer.maker.href} target="_blank" rel="noopener" className="font-semibold text-white underline-offset-2 hover:text-marigold hover:underline">
              {footer.maker.name}
            </a>
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {footer.legal.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center text-[14px] text-white/70 hover:text-marigold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
