// components/sections/TrustStrip.tsx - launch partner + accepted payment methods.
// Only real names appear here: add restaurant logos as each one goes live.
// The partner badge settles in with a small turn, then a Marigold-to-Indigo
// ring orbits it slowly (stops under prefers-reduced-motion).

import Image from "next/image";
import { trust } from "@/lib/content";

export function PartnerBadge({ size = 72 }: { size?: number }) {
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size + 12, height: size + 12 }}>
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-spin-slow rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-marigold), var(--color-brand) 35%, transparent 55%, var(--color-marigold) 100%)",
        }}
      />
      <span aria-hidden="true" className="absolute inset-[3px] rounded-full bg-white" />
      <Image
        src="/images/maholi/logo-badge.webp"
        alt="Maholi Rasoi & Cafe logo"
        width={size}
        height={size}
        unoptimized
        className="relative animate-badge-in rounded-full"
        style={{ width: size, height: size }}
      />
    </span>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Launch partner and payment methods" className="border-y border-line bg-mist">
      <div className="container-page flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex items-center gap-4">
          <PartnerBadge />
          <div className="flex flex-col gap-1">
            <p className="text-eyebrow text-marigold-ink">{trust.partnerLabel}</p>
            <p className="text-[20px] leading-tight font-bold tracking-tight text-ink">{trust.partnerName}</p>
            <p className="inline-flex items-center gap-2 text-[14px] text-ink-2">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {trust.partnerStatus}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-[15px] text-ink-2">{trust.paymentsLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {trust.payments.map((p) => (
              <li key={p} className="rounded-full bg-white px-3.5 py-1.5 text-[14px] font-semibold text-ink ring-1 ring-line">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
