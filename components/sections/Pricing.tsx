// components/sections/Pricing.tsx - pricing teaser: what's included and the free
// start; the price itself is quoted per outlet on the call.

import { Check } from "lucide-react";
import { pricing } from "@/lib/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} intro={pricing.body} />

        <div className="rounded-3xl border-t-4 border-marigold bg-white p-6 shadow-[0_30px_60px_-36px_rgba(20,20,43,0.35)] ring-1 ring-line sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[16px] font-semibold text-ink-2">{pricing.planName}</p>
            <span className="rounded-full bg-marigold px-3 py-1 text-[13px] font-bold text-ink">{pricing.badge}</span>
          </div>
          <p className="mt-2 text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-none font-bold tracking-[-0.03em]">
            {pricing.priceLabel}
          </p>
          <p className="mt-2 text-[16px] text-ink-2">{pricing.priceNote}</p>

          <ul className="mt-7 grid gap-3 border-t border-line pt-7 sm:grid-cols-2">
            {pricing.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[16px] leading-snug">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-marigold" aria-hidden="true">
                  <Check className="size-3.5 text-ink" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <ButtonLink href={pricing.cta.href} className="mt-8 w-full">
            {pricing.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
