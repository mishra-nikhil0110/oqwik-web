// components/sections/Hero.tsx - the benefit headline, two CTAs and the product visual.

import { Check } from "lucide-react";
import { hero } from "@/lib/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductVisual } from "./ProductVisual";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-14 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="flex animate-rise flex-col items-start gap-6">
          <h1 id="hero-title" className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-marigold-soft px-3.5 py-1.5 text-[14px] leading-snug font-semibold tracking-normal text-marigold-ink ring-1 ring-marigold/50">
              <span className="size-2 shrink-0 rounded-full bg-marigold" aria-hidden="true" />
              {hero.eyebrow}
            </span>
            <span className="text-display block max-w-[15ch]">
              {hero.headline.before} <span className="highlight-marigold">{hero.headline.highlight}</span>
              {hero.headline.after}
            </span>
          </h1>
          <p className="text-lead max-w-[46ch] text-ink-2">{hero.subhead}</p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-ink-2">
            {hero.reassurance.map((r) => (
              <li key={r} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-success" aria-hidden="true" strokeWidth={2.5} />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <ProductVisual />
      </div>
    </section>
  );
}
