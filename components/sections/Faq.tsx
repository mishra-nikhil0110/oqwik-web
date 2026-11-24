// components/sections/Faq.tsx - heading and a WhatsApp help card on the left,
// the scrollable answer panel (FaqList) on the right. On desktop both columns
// share one height, so neither side leaves a gap.

import { MessageCircle } from "lucide-react";
import { faq } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "./FaqList";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-20 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-stretch lg:gap-16">
        <div className="flex flex-col gap-8 lg:justify-between">
          <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />

          <div className="rounded-3xl border-t-4 border-marigold bg-white p-6 ring-1 ring-line">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-marigold-soft text-marigold-ink">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-h3 mt-4">{faq.help.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{faq.help.body}</p>
            <a
              href={whatsappLink(faq.help.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {faq.help.cta}
            </a>
          </div>
        </div>

        <FaqList items={faq.items} label={faq.panelLabel} moreLabel={faq.more} />
      </div>
    </section>
  );
}
