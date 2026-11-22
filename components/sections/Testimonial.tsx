// components/sections/Testimonial.tsx - the launch partner's owner, with real
// photos from Maholi Rasoi & Cafe: the marigold-garlanded counter (it matches
// the brand Marigold) and a warm bamboo lamp as a detail shot.

import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonial, trust } from "@/lib/content";
import { PartnerBadge } from "./TrustStrip";

export function Testimonial() {
  return (
    <section aria-label={`What ${testimonial.name} says about OQwik`} className="bg-marigold-soft py-20 sm:py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* photo collage */}
        <div className="relative mx-auto w-full max-w-[34rem] pb-10 lg:pb-14">
          <div className="overflow-hidden rounded-[1.75rem] shadow-[0_40px_70px_-40px_rgba(20,20,43,0.55)] ring-1 ring-marigold/40">
            <Image
              src="/images/maholi/counter.webp"
              alt={testimonial.photoAlt}
              width={1200}
              height={900}
              unoptimized
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
          <div className="absolute right-[-0.5rem] bottom-0 w-[38%] max-w-[12rem] overflow-hidden rounded-2xl ring-[6px] ring-marigold-soft sm:right-[-1.5rem]">
            <Image
              src="/images/maholi/bamboo-lamp.webp"
              alt={testimonial.detailAlt}
              width={560}
              height={560}
              unoptimized
              className="aspect-square h-auto w-full animate-float object-cover"
            />
          </div>
          <div className="absolute -top-5 -left-3 rounded-full bg-white p-1 shadow-[0_16px_30px_-14px_rgba(20,20,43,0.45)] sm:-left-6">
            <PartnerBadge size={64} />
          </div>
        </div>

        {/* quote */}
        <figure className="flex flex-col gap-7">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[14px] font-semibold text-marigold-ink ring-1 ring-marigold/60">
            <span className="size-2 rounded-full bg-marigold" aria-hidden="true" />
            {trust.partnerLabel} · {trust.partnerName}
          </p>
          <Quote className="size-10 fill-marigold text-marigold" aria-hidden="true" />
          <blockquote className="text-[clamp(1.375rem,1.05rem+1.3vw,2rem)] leading-[1.35] font-medium tracking-[-0.015em] text-balance text-ink">
            {testimonial.quote}
          </blockquote>
          <figcaption className="flex items-center gap-4 border-t border-marigold/40 pt-6">
            <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-[13px] bg-ink text-[17px] font-bold text-marigold">
              AP
            </span>
            <span className="flex flex-col">
              <span className="text-[17px] font-semibold">{testimonial.name}</span>
              <span className="text-[15px] text-ink-2">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
