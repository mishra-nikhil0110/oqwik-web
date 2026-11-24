// lib/seo/metadata.ts - builds each page's <head> tags (title, description,
// canonical, Open Graph, Twitter) from one function, so no page forgets one.

import type { Metadata } from "next";
import { absoluteUrl, seo } from "./config";
import type { PageRoute } from "./routes";

export const ogImage = {
  url: "/og/oqwik-og.png",
  width: 1200,
  height: 630,
  alt: seo.ogImageAlt,
};

export function pageMetadata(
  route: PageRoute,
  opts: { title?: string; description?: string; absoluteTitle?: boolean } = {},
): Metadata {
  const description = opts.description ?? seo.description;
  const socialTitle = opts.title ? `${opts.title} | ${seo.siteName}` : seo.defaultTitle;
  return {
    ...(opts.title ? { title: opts.absoluteTitle ? { absolute: opts.title } : opts.title } : {}),
    description,
    alternates: { canonical: absoluteUrl(route.path) },
    openGraph: {
      type: "website",
      siteName: seo.siteName,
      locale: seo.locale,
      url: absoluteUrl(route.path),
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
    ...(route.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
