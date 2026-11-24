// lib/seo/sitemap.ts - sitemap generation. app/sitemap.ts calls
// generateSitemap(), which merges every registered source of pages.
//
// Adding a section later (blog, features, city pages) means adding a source:
//
//   const blogSource: SitemapSource = async () =>
//     (await getAllPosts()).map((post) => ({
//       path: `/blog/${post.slug}`,
//       name: post.title,
//       lastModified: post.updatedAt,
//       changeFrequency: "monthly",
//       priority: 0.6,
//       images: post.cover ? [post.cover] : [],
//     }));
//
//   generateSitemap([staticSource, blogSource])
//
// A sitemap may hold 50,000 URLs; past that, split with generateSitemaps().

import type { MetadataRoute } from "next";
import { absoluteUrl } from "./config";
import { staticRoutes, type PageRoute } from "./routes";

export type SitemapSource = () => PageRoute[] | Promise<PageRoute[]>;

export const staticSource: SitemapSource = () => staticRoutes;

/** Turns page routes into sitemap entries: absolute URLs, de-duplicated, noindex pages dropped. */
export function toSitemapEntries(pages: PageRoute[]): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return pages
    .filter((p) => !p.noindex)
    .filter((p) => (seen.has(p.path) ? false : (seen.add(p.path), true)))
    .sort((a, b) => b.priority - a.priority || a.path.localeCompare(b.path))
    .map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: new Date(`${p.lastModified}T00:00:00+05:30`),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(p.images?.length ? { images: p.images.map((src) => absoluteUrl(src)) } : {}),
    }));
}

/** Collects pages from every source (static pages first) and builds the sitemap. */
export async function generateSitemap(sources: SitemapSource[] = [staticSource]): Promise<MetadataRoute.Sitemap> {
  const pages = (await Promise.all(sources.map((source) => source()))).flat();
  return toSitemapEntries(pages);
}
