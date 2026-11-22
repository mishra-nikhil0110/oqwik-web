import type { Metadata, Viewport } from "next";
// Outfit is the only typeface in the OQwik brand. It is self-hosted from
// app/fonts via @font-face in globals.css, so builds need no network access.
import "./globals.css";

export const metadata: Metadata = {
  title: "OQwik | QR ordering and billing for restaurants",
  description:
    "Guests scan the table QR, order and pay online. Orders reach your kitchen tagged with the table number and the GST bill writes itself. Start a 15-day free trial.",
  openGraph: {
    title: "OQwik | Your tables take their own orders",
    description: "QR ordering, online payments and automatic billing for restaurants. 15 days free.",
    type: "website",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
