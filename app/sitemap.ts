
import type { MetadataRoute } from "next";
import { generateSitemap, staticSource } from "@/lib/seo/sitemap";

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap([staticSource]);
}
