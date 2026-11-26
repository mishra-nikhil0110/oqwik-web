// components/sections/Pricing.tsx - pricing teaser: what's included and the free
// start; the price itself is quoted per outlet on the call. On desktop the plan
// card sits on the left and the heading on the right; phones read heading first.

import { ArrowRight, Check, QrCode } from "lucide-react";
import { pricing } from "@/lib/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8 lg:order-2">
          <SectionHeading id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} intro={pricing.body} />
          <a
            href={pricing.freeTool.link.href}
            className="group flex max-w-xl items-start gap-4 rounded-3xl bg-mist p-5 ring-1 ring-line transition-colors hover:bg-marigold-soft hover:ring-marigold"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-marigold-ink ring-1 ring-line">
              <QrCode className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[17px] font-semibold text-ink">{pricing.freeTool.title}</span>
              <span className="mt-1 block text-[15px] leading-relaxed text-ink-2">{pricing.freeTool.body}</span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand">
                {pricing.freeTool.link.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>

        <div className="rounded-3xl lg:order-1 border-t-4 border-marigold bg-white p-6 shadow-[0_30px_60px_-36px_rgba(20,20,43,0.35)] ring-1 ring-line sm:p-9">
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
