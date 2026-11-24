import type { Metadata, Viewport } from "next";
// Outfit is the only typeface in the OQwik brand. It is self-hosted from
// app/fonts via @font-face in globals.css, so builds need no network access.
import "./globals.css";
import { indexable, seo, siteUrl } from "@/lib/seo/config";
import { ogImage } from "@/lib/seo/metadata";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

// Site-wide defaults. Each page adds its own title, canonical URL and social
// tags with pageMetadata() from lib/seo/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.description,
  applicationName: seo.siteName,
  keywords: seo.keywords,
  category: "Restaurant software",
  creator: seo.siteName,
  publisher: seo.siteName,
  formatDetection: { telephone: false, email: false, address: false },
  robots: indexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: seo.siteName,
    locale: seo.locale,
    title: seo.defaultTitle,
    description: seo.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: seo.defaultTitle, description: seo.description, images: [ogImage.url] },
  verification: {
    ...(seo.verification.google ? { google: seo.verification.google } : {}),
    ...(seo.verification.bing ? { other: { "msvalidate.01": seo.verification.bing } } : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3A36E0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={seo.language}>
      <body>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {children}
      </body>
    </html>
  );
}
