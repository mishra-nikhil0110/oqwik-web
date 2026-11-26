// lib/seo/routes.ts - the registry of public pages. The sitemap, canonical URLs
// and breadcrumbs all read from here, so a new page is added in one place.
//
// lastModified: change it only when the page's content really changes. Google
// trusts <lastmod> only when it is accurate, so we never stamp "now" on every build.

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type PageRoute = {
  path: string;
  /** Short name used in breadcrumbs and the footer. */
  name: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful content change. */
  lastModified: string;
  changeFrequency: ChangeFrequency;
  /** 0.0–1.0, relative to other pages on this site (Bing reads it; Google ignores it). */
  priority: number;
  /** Images that appear on the page, for image search. Paths under /public. */
  images?: string[];
  /** Set true to keep a page out of the sitemap (e.g. a thank-you page). */
  noindex?: boolean;
};

export const routes = {
  home: {
    path: "/",
    name: "Home",
    lastModified: "2026-11-24",
    changeFrequency: "weekly",
    priority: 1,
  },
  qrMenu: {
    path: "/qr-code-menu",
    name: "QR Code Menu",
    lastModified: "2026-11-26",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  qrMenuGenerator: {
    path: "/free-qr-menu-generator",
    name: "Free QR Menu Generator",
    lastModified: "2026-11-26",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  privacy: {
    path: "/privacy-policy",
    name: "Privacy Policy",
    lastModified: "2026-11-26",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  terms: {
    path: "/terms-and-conditions",
    name: "Terms and Conditions",
    lastModified: "2026-11-24",
    changeFrequency: "yearly",
    priority: 0.3,
  },
} satisfies Record<string, PageRoute>;

export const staticRoutes: PageRoute[] = Object.values(routes);
