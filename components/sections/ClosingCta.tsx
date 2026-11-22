// components/sections/ClosingCta.tsx - the conversion point every CTA links to (#start-trial).

import { MessageCircle } from "lucide-react";
import { closing, site } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import { TrialForm } from "./TrialForm";

export function ClosingCta() {
  return (
    <section id="start-trial" aria-labelledby="start-title" className="relative overflow-hidden bg-brand py-20 text-white sm:py-24">
      {/* the logo's Marigold dot, large and soft in the corner */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-marigold/25 blur-2xl" />
      <div className="container-page relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <p className="w-fit rounded-full bg-marigold px-3 py-1 text-eyebrow text-ink">{closing.eyebrow}</p>
          <h2 id="start-title" className="text-h2 max-w-[18ch]">
            {closing.title}
          </h2>
          <p className="text-lead max-w-[46ch] text-white/85">{closing.body}</p>
          <p className="flex flex-wrap items-center gap-2 text-[16px] text-white/85">
            Prefer to chat right now?
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-marigold decoration-2 underline-offset-4"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp {site.whatsappDisplay}
            </a>
          </p>
        </div>
        <TrialForm />
      </div>
    </section>
  );
}
