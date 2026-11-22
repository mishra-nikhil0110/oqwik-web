// components/sections/ValueProps.tsx - three outcomes, not features.

import { valueProps } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValueProps() {
  return (
    <section aria-labelledby="outcomes-title" className="py-20 sm:py-24">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading id="outcomes-title" eyebrow={valueProps.eyebrow} title={valueProps.title} />
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {valueProps.items.map((v) => (
            <li key={v.title} className="flex flex-col gap-4 border-t-2 border-marigold pt-6">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-marigold-soft text-marigold-ink ring-1 ring-marigold/50">
                <Icon name={v.icon} className="size-6" />
              </span>
              <h3 className="text-h3">{v.title}</h3>
              <p className="text-[17px] leading-relaxed text-ink-2">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
