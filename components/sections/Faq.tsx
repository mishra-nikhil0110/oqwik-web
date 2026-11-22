// components/sections/Faq.tsx - native <details> accordions: keyboard and
// screen-reader friendly, and they work without JavaScript.

import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-20 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <div className="divide-y divide-line rounded-3xl bg-white px-5 ring-1 ring-line sm:px-8">
          {faq.items.map((item) => (
            <details key={item.q} className="group py-1 open:[&_summary]:text-brand">
              <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-[17px] font-semibold">
                {item.q}
                <Plus className="size-5 shrink-0 text-marigold-ink transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-[62ch] pb-5 text-[16px] leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
