// app/m/page.tsx - the page a free QR menu opens (oqwik.in/m#...). Each
// restaurant's menu lives in its own link, so this page is kept out of search:
// it has no content of its own to rank. Printed QR codes point here, so this
// route must never be removed or renamed.

import type { Metadata } from "next";
import { MenuViewer } from "@/components/qr-menu/MenuViewer";

export const metadata: Metadata = {
  title: "Menu",
  description: "Restaurant menu",
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  return <MenuViewer />;
}
