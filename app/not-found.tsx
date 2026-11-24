// app/not-found.tsx - branded 404. Next serves it with a real 404 status, so
// broken links never get indexed as thin pages.

import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-mist">
        <div className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-marigold-soft px-3.5 py-1.5 text-[14px] font-semibold text-marigold-ink ring-1 ring-marigold/50">
            404
          </p>
          <h1 className="text-display max-w-[18ch]">This table isn&apos;t on our floor plan.</h1>
          <p className="text-lead max-w-[46ch] text-ink-2">
            The page you&apos;re looking for has moved or never existed. Let&apos;s get you back to the menu.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Back to the home page</ButtonLink>
            <ButtonLink href="/#start-trial" variant="secondary">
              Start my 15-day free trial
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
