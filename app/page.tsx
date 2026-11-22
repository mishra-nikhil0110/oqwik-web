import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Testimonial } from "@/components/sections/Testimonial";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="scroll-mt-0">
        <div id="top" />
        <Hero />
        <TrustStrip />
        <ValueProps />
        <HowItWorks />
        <Features />
        <Testimonial />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
