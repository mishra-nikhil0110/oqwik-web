// lib/seo/config.ts - one place for everything search engines read about the
// site: the canonical domain, default titles and descriptions, and whether this
// deployment may be indexed at all.
//
// Keyword strategy (see README "SEO"): we target restaurant OWNERS looking for
// software, not diners looking for somewhere to eat. Diner searches such as
// "restaurant near me", "veg restaurant near me" or celebrity restaurants bring
// visitors who will never start a trial, so they are deliberately left out.

// The live domain. oqwik.in redirects to www, so www is the canonical host.
// NEXT_PUBLIC_SITE_URL in the hosting dashboard overrides it (keep them equal).
// Every canonical URL, the sitemap and the structured data are built from it.
const FALLBACK_SITE_URL = "https://www.oqwik.in";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "");

/** Absolute URL for a path on this site ("/privacy-policy" -> "https://…/privacy-policy"). */
export function absoluteUrl(path = "/") {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

// Preview and staging deployments must never be indexed, or they compete with
// the live site. Vercel sets VERCEL_ENV; elsewhere set NEXT_PUBLIC_NOINDEX=true.
const vercelEnv = process.env.VERCEL_ENV;
export const indexable = process.env.NEXT_PUBLIC_NOINDEX !== "true" && (vercelEnv ? vercelEnv === "production" : true);

export const seo = {
  siteName: "OQwik",
  locale: "en_IN",
  language: "en-IN",
  // Titles: primary keyword first, brand last, under ~60 characters.
  defaultTitle: "QR Code Ordering & Billing System for Restaurants | OQwik",
  titleTemplate: "%s | OQwik",
  // ~155 characters: what it is, the outcome, and the offer.
  description:
    "OQwik is a QR code ordering and billing system for restaurants in India. Guests scan, order and pay at the table; KOTs and GST bills are automatic. 15 days free.",
  // Meta keywords are ignored by Google; kept short as a record of what each page targets.
  keywords: [
    "QR code ordering system for restaurants",
    "QR code order online",
    "QR code food ordering",
    "restaurant billing software",
    "QR menu for restaurants",
    "restaurant POS India",
    "KOT software",
    "GST billing for restaurants",
    "contactless table ordering",
  ],
  ogImageAlt: "OQwik: guests scan the table QR, order and pay. The kitchen gets a KOT tagged with the table number.",
  // Add the brand's real profiles as they go live (LinkedIn, Instagram, YouTube…).
  // They feed Organization.sameAs, which helps Google connect the brand entity.
  sameAs: [] as string[],
  // Paste the code from Google Search Console / Bing Webmaster Tools.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
  },
};
