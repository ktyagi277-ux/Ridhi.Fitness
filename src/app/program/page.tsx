import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Transformation from "@/components/Transformation";
import Coach from "@/components/Coach";
import Different from "@/components/Different";
import { Transformations } from "@/components/Results";
import HowItWorks from "@/components/HowItWorks";
import WhoFor from "@/components/WhoFor";
import Pricing from "@/components/Pricing";
import Includes from "@/components/Includes";
import Faq from "@/components/Faq";
import { FinalCta, Footer } from "@/components/Closing";
import ApplySection from "@/components/ApplySection";
import StickyCta from "@/components/StickyCta";
import TimedOffer from "@/components/TimedOffer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { programJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "RJ Fitness — Build a body and lifestyle you love, without living on a diet | Ridhi Jain",
  description:
    "Personalised nutrition, habit coaching and real-life accountability for women who are done starting over. Guided plans with a Head Nutritionist, Elite 1:1 coaching with Ridhi Jain. Book a discovery call.",
  alternates: { canonical: "/program" },
  openGraph: {
    title: "Build a body and lifestyle you love — without living on a diet",
    description:
      "Personalised nutrition, habit coaching and real-life accountability for women who are done starting over. Book a discovery call with RJ Fitness.",
    url: "/program",
    images: [
      {
        url: "/images/og-card.jpg",
        width: 1200,
        height: 630,
        alt: "Ridhi Jain — RJ Fitness",
      },
    ],
  },
};

/**
 * Page flow (agreed with Ridhi, 24 Sep 2026):
 * belief-building first, selling only at the end.
 */
export default function ProgramPage() {
  return (
    <main className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }} />
      {/* Intro band — Ridhi's name + positioning line (no form here any more) */}
      <Hero />
      {/* 1. My story — why RJ Fitness exists */}
      <Story />
      {/* 2. My own transformation — Before → After → Maintained */}
      <Transformation />
      {/* 3. Meet your coach — personal proof into authority */}
      <Coach />
      {/* 4. Why RJ Fitness is different */}
      <Different />
      {/* 5. Client proof */}
      <Transformations />
      {/* 6. How RJ Fitness works */}
      <HowItWorks />
      {/* 7. Who this is for */}
      <WhoFor />
      {/* 8. Your program — Guided & Elite, then what every plan includes */}
      <Pricing />
      <Includes />
      {/* 9. FAQ + final CTA, then the only form on the page */}
      <Faq />
      <FinalCta />
      <ApplySection />
      <Footer />
      <StickyCta />
      <TimedOffer />
      <WhatsAppFloat />
    </main>
  );
}
