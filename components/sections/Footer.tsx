// components/sections/Footer.tsx

import { footer, nav } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t-4 border-marigold bg-ink py-12 text-white">
      <div className="container-page flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <a href="/#top" className="self-start rounded-md" aria-label="OQwik home">
              <Logo tone="white" width={128} withTagline />
            </a>
            <p className="text-[15px] text-white/70">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center text-[15px] text-white/80 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-white/70">© {new Date().getFullYear()} OQwik</p>
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
