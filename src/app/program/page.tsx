import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Marquee, StatsBand } from "@/components/SocialProof";
import { Method } from "@/components/Program";
import { Transformations } from "@/components/Results";
import About from "@/components/About";
import { FitCheck, FinalCta, Footer } from "@/components/Closing";
import Faq from "@/components/Faq";
import StickyCta from "@/components/StickyCta";
import ConditionTabs from "@/components/ConditionTabs";
import Roadmap from "@/components/Roadmap";
import Quiz from "@/components/Quiz";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Pricing from "@/components/Pricing";
import TimedOffer from "@/components/TimedOffer";
import { programJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Fat Loss Coaching Plans — Guided & Elite | Coach Ridhi Jain",
  description:
    "Hormone-friendly fat loss for working women — desi food, 30-min home workouts. Guided plans run by a Head Nutritionist, Elite 1:1 coaching with Ridhi. Free strategy call, chat on WhatsApp.",
  alternates: { canonical: "/program" },
  openGraph: {
    title: "Lose 8–10 kgs in 12 Weeks — Guided & Elite Coaching Plans",
    description:
      "Hormone-friendly fat loss for working women. Guided plans with a Head Nutritionist, Elite 1:1 coaching with Ridhi. Free strategy call — chat on WhatsApp.",
    url: "/program",
  },
};

export default function ProgramPage() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }}
      />
      {/* 1. Hook + lead form above the fold */}
      <Hero />
      <Marquee />
      {/* 2. The offer — plans come early so ad traffic sees them immediately */}
      <Pricing />
      {/* 3. Proof it works */}
      <Transformations />
      <StatsBand />
      {/* 4. "Which one is you" — PCOS / thyroid / postpartum / busy (replaces the old pain-points grid, which said the same things) */}
      <ConditionTabs />
      {/* 5. How the method works */}
      <Method />
      {/* 6. Self-qualify: quiz, what happens after you join, honest fit check */}
      <Quiz />
      <Roadmap />
      <FitCheck />
      {/* 7. Objections, then one last CTA (no second form — the hero form is the only form) */}
      <Faq />
      <FinalCta />
      {/* 8. Meet Ridhi — deliberately last, right above the footer */}
      <About />
      <Footer />
      <StickyCta />
      <TimedOffer />
      <WhatsAppFloat />
    </main>
  );
}
