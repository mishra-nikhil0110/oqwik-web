// components/sections/Features.tsx - eight capabilities, 1 / 2 / 4 columns.

import { features } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-24">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading id="features-title" eyebrow={features.eyebrow} title={features.title} />
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((f, i) => (
            <li key={f.title} className="group flex flex-col gap-3 bg-white p-6 transition-colors hover:bg-marigold-soft/60 sm:p-7">
              <span
                className={`inline-flex size-11 items-center justify-center rounded-xl transition-transform group-hover:-translate-y-0.5 ${
                  i % 2 === 0 ? "bg-marigold-soft text-marigold-ink" : "bg-brand-soft text-brand"
                }`}
              >
                <Icon name={f.icon} className="size-5" />
              </span>
              <h3 className="text-[18px] leading-snug font-semibold">{f.title}</h3>
              <p className="text-[16px] leading-relaxed text-ink-2">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
