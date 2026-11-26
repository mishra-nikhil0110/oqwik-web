// app/qr-code-menu/page.tsx - "QR code menu" landing page: what a QR menu is,
// the three kinds, how OQwik's ordering menu works, and table-QR tips.

import { Check, Minus } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { qrMenuPage as c } from "@/lib/qr-menu/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { faqSchema, graph, webPageSchema } from "@/lib/seo/schema";

const route = routes.qrMenu;

export const metadata = pageMetadata(route, { title: c.title, description: c.description });

export default function QrCodeMenuPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema(route, { title: c.title, description: c.description }), faqSchema(c.faq.items, route.path))} />
      <Nav />
      <main id="main">
        <PageHero id="qr-menu-title" crumb={route.name} eyebrow={c.eyebrow} title={c.h1} lead={c.lead}>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={c.ctaPrimary.href}>{c.ctaPrimary.label}</ButtonLink>
            <ButtonLink href={c.ctaSecondary.href} variant="secondary">
              {c.ctaSecondary.label}
            </ButtonLink>
          </div>
        </PageHero>

        {/* Definition: written to be quoted as a search answer */}
        <section aria-labelledby="what-title" className="py-16 sm:py-20">
          <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <h2 id="what-title" className="text-h2">
              {c.what.title}
            </h2>
            <div className="flex flex-col gap-4 border-l-4 border-marigold pl-5 sm:pl-7">
              {c.what.body.map((p) => (
                <p key={p} className="text-lead text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Three kinds compared */}
        <section aria-labelledby="kinds-title" className="bg-mist py-16 sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <SectionHeading id="kinds-title" eyebrow={c.kinds.eyebrow} title={c.kinds.title} intro={c.kinds.intro} />
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              <table className="w-full table-fixed border-collapse text-left">
                <caption className="sr-only">Comparison of PDF, view-only and ordering QR code menus</caption>
                <colgroup>
                  <col className="w-[40%] sm:w-[46%]" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="p-3 sm:p-5">
                      <span className="sr-only">Feature</span>
                    </th>
                    {c.kinds.columns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`p-2 text-center align-bottom text-[13px] leading-tight font-semibold sm:p-5 sm:text-[15px] ${
                          i === 2 ? "border-t-4 border-marigold bg-brand-soft text-brand" : "text-ink-2"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.kinds.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <th scope="row" className="p-3 text-[14px] leading-snug font-medium sm:p-5 sm:text-[16px]">
                        {row.label}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={i} className={`p-2 text-center sm:p-5 ${i === 2 ? "bg-brand-soft/60" : ""}`}>
                          {v ? (
                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-success/10 text-success">
                              <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                              <span className="sr-only">Yes</span>
                            </span>
                          ) : (
                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-mist text-ink-3">
                              <Minus className="size-4" aria-hidden="true" />
                              <span className="sr-only">No</span>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[16px] text-ink-2">
              {c.kinds.note}{" "}
              <a href={c.ctaSecondary.href} className="font-semibold text-brand underline underline-offset-2 hover:text-brand-deep">
                {c.ctaSecondary.label}
              </a>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="steps-title" className="py-16 sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <SectionHeading id="steps-title" eyebrow={c.steps.eyebrow} title={c.steps.title} />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.steps.items.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-white p-6 ring-1 ring-line">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-marigold text-[16px] font-bold text-ink tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="text-h3 mt-4">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Table QR tips */}
        <section aria-labelledby="tips-title" className="bg-ink py-16 text-white sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <SectionHeading id="tips-title" eyebrow={c.tips.eyebrow} title={c.tips.title} tone="dark" />
            <ul className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {c.tips.items.map((t) => (
                <li key={t.title} className="bg-ink p-6 sm:p-7">
                  <h3 className="flex items-center gap-2.5 text-[18px] font-semibold">
                    <span className="size-2 rounded-full bg-marigold" aria-hidden="true" />
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-white/75">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="qr-faq-title" className="bg-mist py-16 sm:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeading id="qr-faq-title" eyebrow="FAQ" title={c.faq.title} />
            <FaqList items={c.faq.items} label={c.faq.title} moreLabel="More questions" />
          </div>
        </section>

        {/* Closing */}
        <section aria-labelledby="qr-close-title" className="py-16 sm:py-20">
          <div className="container-page">
            <div className="rounded-3xl border-t-4 border-marigold bg-white p-6 ring-1 ring-line sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <h2 id="qr-close-title" className="text-h2">
                  {c.closing.title}
                </h2>
                <p className="text-lead mt-3 text-ink-2">{c.closing.body}</p>
              </div>
              <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
                <ButtonLink href={c.ctaPrimary.href}>{c.ctaPrimary.label}</ButtonLink>
                <ButtonLink href={c.ctaSecondary.href} variant="secondary">
                  {c.ctaSecondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
