// app/free-qr-menu-generator/page.tsx - the free QR code menu generator. The
// tool sits right under the heading; the how-to and FAQ below give search
// engines (and owners) the full picture in plain HTML.

import { Check } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { MenuGenerator } from "@/components/qr-menu/MenuGenerator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { generatorPage as c } from "@/lib/qr-menu/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { faqSchema, freeToolSchema, graph, webPageSchema } from "@/lib/seo/schema";

const route = routes.qrMenuGenerator;

export const metadata = pageMetadata(route, { title: c.title, description: c.description });

export default function FreeQrMenuGeneratorPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema(route, { title: c.title, description: c.description }),
          freeToolSchema(route, { name: "OQwik Free QR Menu Generator", description: c.description, features: c.points }),
          faqSchema(c.faq.items, route.path),
        )}
      />
      <Nav />
      <main id="main">
        <PageHero id="generator-title" crumb={route.name} eyebrow={c.eyebrow} title={c.h1} lead={c.lead}>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {c.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[15px] font-medium text-ink">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-marigold" aria-hidden="true">
                  <Check className="size-3.5 text-ink" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </PageHero>

        <section aria-label="QR menu generator" className="py-10 sm:py-14">
          <div className="container-page">
            <MenuGenerator />
          </div>
        </section>

        <section aria-labelledby="how-title" className="bg-mist py-16 sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <SectionHeading id="how-title" eyebrow={c.how.eyebrow} title={c.how.title} />
            <ol className="grid gap-4 md:grid-cols-3">
              {c.how.items.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-white p-6 ring-1 ring-line">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-marigold text-[16px] font-bold text-ink tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="text-h3 mt-4">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="text-[16px] text-ink-2">
              Comparing options first? Read{" "}
              <a href={routes.qrMenu.path} className="font-semibold text-brand underline underline-offset-2 hover:text-brand-deep">
                what a QR code menu can do for your restaurant
              </a>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="pdf-title" className="py-16 sm:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHeading id="pdf-title" eyebrow={c.pdf.eyebrow} title={c.pdf.title} intro={c.pdf.intro} />
            <div>
              <ol className="divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                {c.pdf.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 p-5 sm:p-6">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-marigold text-[15px] font-bold text-ink tabular-nums">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold">{s.title}</h3>
                      <p className="mt-1 text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 rounded-2xl bg-marigold-soft px-5 py-4 text-[15px] leading-relaxed text-marigold-ink">{c.pdf.note}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="gen-faq-title" className="bg-mist py-16 sm:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeading id="gen-faq-title" eyebrow="FAQ" title={c.faq.title} />
            <FaqList items={c.faq.items} label={c.faq.title} moreLabel="More questions" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
