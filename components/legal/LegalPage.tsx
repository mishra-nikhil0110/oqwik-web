
import { Building2, Check, ChevronDown, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/content";
import { grievanceEmail, legal } from "@/lib/legal/config";
import type { LegalBlock, LegalDoc, LegalItem } from "@/lib/legal/types";
import { whatsappLink } from "@/lib/whatsapp";

function Item({ item }: { item: LegalItem }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <>
      <strong className="font-semibold text-ink">{item.term}</strong> {item.text}
    </>
  );
}

function ContactCard() {
  const rows = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: site.whatsappDisplay,
      href: whatsappLink("Hi OQwik, I have a question about your privacy policy or terms."),
    },
    legal.email ? { icon: Mail, label: "Email", value: legal.email, href: `mailto:${legal.email}` } : null,
    {
      icon: ShieldCheck,
      label: "Grievance Officer",
      value: [legal.grievanceOfficer.name || "Grievance Officer, OQwik", grievanceEmail].filter(Boolean).join(" · "),
      href: grievanceEmail ? `mailto:${grievanceEmail}` : undefined,
    },
    legal.registeredAddress || legal.entityName
      ? {
          icon: Building2,
          label: "Registered office",
          value: [legal.entityName, legal.registeredAddress].filter(Boolean).join(", "),
        }
      : null,
  ].filter((r): r is NonNullable<typeof r> => r !== null);

  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {rows.map(({ icon: Icon, label, value, href }) => {
        const body = (
          <>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-marigold-soft text-marigold-ink">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold tracking-wide text-ink-2 uppercase">{label}</span>
              <span className="block text-[16px] font-medium break-words text-ink">{value}</span>
            </span>
          </>
        );
        return (
          <li key={label}>
            {href ? (
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-line transition-colors hover:ring-brand"
              >
                {body}
              </a>
            ) : (
              <div className="flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "contact") return <ContactCard />;
  if (block.type === "ul") {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-marigold" aria-hidden="true" />
            <span>
              <Item item={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
      {block.text}
      {block.link ? (
        <>
          {" "}
          <a href={block.link.href} className="font-medium text-brand underline underline-offset-2 hover:text-brand-deep">
            {block.link.label}
          </a>
        </>
      ) : null}
    </p>
  );
}

function Toc({ doc }: { doc: LegalDoc }) {
  return (
    <ol className="space-y-0.5">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-[15px] text-ink-2 transition-colors hover:bg-marigold-soft hover:text-ink"
          >
            <span className="w-5 shrink-0 text-[13px] font-semibold text-marigold-ink tabular-nums">{i + 1}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function LegalPage({ doc, related }: { doc: LegalDoc; related: { href: string; label: string } }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {/* Header */}
        <section aria-labelledby="legal-title" className="relative overflow-hidden bg-mist">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute -top-24 -right-24 size-[22rem] rounded-full border-[30px] border-brand-soft sm:-right-10" />
            <span className="absolute top-10 right-[14%] size-12 rounded-full bg-marigold sm:size-16" />
          </div>
          <div className="container-page relative pt-10 pb-12 sm:pt-14 sm:pb-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[14px] text-ink-2">
                <li>
                  <a href="/" className="hover:text-brand">
                    Home
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-ink">
                  {doc.title}
                </li>
              </ol>
            </nav>
            <p className="mt-8 inline-flex items-center gap-2 text-eyebrow text-brand">
              <span className="h-0.5 w-6 rounded-full bg-marigold" aria-hidden="true" />
              {doc.eyebrow}
            </p>
            <h1 id="legal-title" className="text-display mt-4">
              {doc.title}
            </h1>
            <p className="mt-4 inline-flex rounded-full bg-marigold-soft px-3.5 py-1.5 text-[14px] font-semibold text-marigold-ink ring-1 ring-marigold/50">
              Effective <time dateTime={legal.effectiveDateIso}>&nbsp;{legal.effectiveDate}</time>
            </p>
            <p className="text-lead mt-6 max-w-[62ch] text-ink-2">{doc.intro}</p>

            <div className="mt-10 max-w-4xl rounded-3xl border-t-4 border-marigold bg-white p-6 ring-1 ring-line sm:p-8">
              <h2 className="text-h3">In short</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
                {doc.summary.map((s) => (
                  <li key={s} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                      <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Body */}
        <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[17rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <details className="group rounded-2xl bg-white ring-1 ring-line lg:hidden">
              <summary className="flex min-h-12 items-center justify-between px-4 text-[16px] font-semibold">
                On this page
                <ChevronDown className="size-5 text-marigold-ink transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <nav aria-label="On this page" className="px-1 pb-2">
                <Toc doc={doc} />
              </nav>
            </details>
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="px-3 pb-2 text-eyebrow text-ink-3">On this page</p>
              <Toc doc={doc} />
            </nav>
          </aside>

          <article className="min-w-0 max-w-[70ch]">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-32 border-b border-line py-8 first:pt-0 last:border-0">
                <h2 id={`${s.id}-title`} className="flex items-center gap-3 text-[22px] leading-tight font-semibold text-ink sm:text-[24px]">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-marigold text-[15px] font-bold text-ink tabular-nums">
                    {i + 1}
                  </span>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </section>
            ))}

            <p className="mt-6 rounded-2xl bg-brand-soft px-5 py-4 text-[15px] text-ink-2">
              Also read:{" "}
              <a href={related.href} className="font-semibold text-brand underline underline-offset-2 hover:text-brand-deep">
                {related.label}
              </a>
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
