// components/ui/Logo.tsx - the official OQwik lockup from the brand assets
// (public/brand), never redrawn in text. Brand rule: the horizontal lockup is
// never shown narrower than 96px. `withTagline` sets "Order Quick" under the
// wordmark, starting where the wordmark starts (the symbol takes ~34% of the width).

import Image from "next/image";
import { site } from "@/lib/content";

const RATIO = 183.19 / 675.86; // intrinsic height / width of the horizontal lockup
const WORDMARK_START = "34.5%";

export function Logo({
  tone = "color",
  width = 120,
  priority,
  withTagline = false,
  className = "",
}: {
  tone?: "color" | "white";
  width?: number;
  priority?: boolean;
  withTagline?: boolean;
  className?: string;
}) {
  const w = Math.max(96, width);
  const img = (
    <Image
      src={`/brand/oqwik-logo-horizontal-${tone}.svg`}
      alt="OQwik"
      width={w}
      height={Math.round(w * RATIO)}
      priority={priority}
      unoptimized
      className="block h-auto"
    />
  );
  if (!withTagline) return <span className={`inline-block ${className}`}>{img}</span>;
  return (
    <span className={`inline-flex flex-col ${className}`} style={{ width: w }}>
      {img}
      <span
        className={`-mt-[3px] flex items-center gap-1 text-[8px] leading-none font-semibold tracking-normal ${
          tone === "white" ? "text-white/70" : "text-ink-2"
        }`}
        style={{ paddingLeft: WORDMARK_START }}
      >
        {site.tagline}
      </span>
    </span>
  );
}
