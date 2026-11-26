// components/sections/PageHero.tsx - the header of an inner page: breadcrumb,
// eyebrow, h1 and lead on the Mist ground, same shapes as the legal pages.

import type { ReactNode } from "react";

export function PageHero({
  id,
  crumb,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  crumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-mist">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -top-24 -right-24 size-[22rem] rounded-full border-[30px] border-brand-soft sm:-right-10" />
        <span className="absolute top-10 right-[14%] size-12 rounded-full bg-marigold sm:size-16" />
      </div>
      <div className="container-page relative pt-10 pb-12 sm:pt-14 sm:pb-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[14px] text-ink-2">
            <li>
              <a href="/" className="hover:text-brand">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">
              {crumb}
            </li>
          </ol>
        </nav>
        <p className="mt-8 inline-flex items-center gap-2 text-eyebrow text-brand">
          <span className="h-0.5 w-6 rounded-full bg-marigold" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 id={id} className="text-display mt-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-lead mt-5 max-w-[62ch] text-ink-2">{lead}</p>
        {children}
      </div>
    </section>
  );
}
