// app/manifest.ts - served at /manifest.webmanifest (name, icons and colours
// when the site is saved to a phone's home screen).

import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OQwik: QR ordering and billing for restaurants",
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3a36e0",
    lang: seo.language,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
