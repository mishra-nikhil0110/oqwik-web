// lib/seo/schema.ts - JSON-LD structured data (schema.org). Each builder reads
// the same content the visitor sees, so the markup can never drift from the page
// (Google penalises markup that describes content not on the page).
//
// Deliberately NOT included:
// - aggregateRating / Review for the testimonial: Google treats reviews a
//   business publishes about itself as self-serving and ignores or penalises them.
// - Offer with price 0: the product is paid after the trial; a ₹0 price would mislead.

import { faq, features, site } from "@/lib/content";
import { legal } from "@/lib/legal/config";
import { absoluteUrl, seo, siteUrl } from "./config";
import type { PageRoute } from "./routes";

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const APP_ID = `${siteUrl}/#software`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: seo.siteName,
    ...(legal.entityName ? { legalName: legal.entityName } : {}),
    alternateName: "OQwik Order Quick",
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl("/apple-icon.png"), width: 180, height: 180 },
    slogan: site.tagline,
    description: seo.description,
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${site.whatsappNumber}`,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
        ...(legal.email ? { email: legal.email } : {}),
      },
    ],
    ...(seo.sameAs.length ? { sameAs: seo.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: seo.siteName,
    url: absoluteUrl("/"),
    inLanguage: seo.language,
    publisher: { "@id": ORG_ID },
  };
}

export function softwareSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: seo.siteName,
    url: absoluteUrl("/"),
    description: seo.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Restaurant QR ordering, KOT and billing software",
    operatingSystem: "Web browser (Android, iOS, Windows, macOS)",
    inLanguage: seo.language,
    image: absoluteUrl("/og/oqwik-og.png"),
    featureList: features.items.map((f) => f.title),
    audience: { "@type": "BusinessAudience", audienceType: "Restaurant, cafe and QSR owners" },
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** WebPage + BreadcrumbList for an inner page (legal pages now; blog/features later). */
export function webPageSchema(route: PageRoute, opts: { title: string; description: string }) {
  const url = absoluteUrl(route.path);
  return [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: opts.title,
      description: opts.description,
      inLanguage: seo.language,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORG_ID },
      dateModified: route.lastModified,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: route.name, item: url },
      ],
    },
  ];
}

/** Wraps nodes in one @graph so entities can reference each other by @id. */
export function graph(...nodes: (object | object[])[]) {
  return { "@context": "https://schema.org", "@graph": nodes.flat() };
}
