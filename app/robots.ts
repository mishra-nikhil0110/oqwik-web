// app/robots.ts - served at /robots.txt.
// Production: everything public is crawlable except the form API; /_next/ stays
// open because Google needs the CSS and JS to render the page.
// Preview/staging (or NEXT_PUBLIC_NOINDEX=true): block all crawling.

import type { MetadataRoute } from "next";
import { absoluteUrl, indexable } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
