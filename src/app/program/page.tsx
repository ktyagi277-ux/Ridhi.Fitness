import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Marquee, PainPoints, StatsBand } from "@/components/SocialProof";
import { Method, Steps } from "@/components/Program";
import { Transformations } from "@/components/Results";
import About from "@/components/About";
import InstaFeed from "@/components/InstaFeed";
import { FitCheck, FinalCta, Footer } from "@/components/Closing";
import Faq from "@/components/Faq";
import StickyCta from "@/components/StickyCta";
import PaymentCta from "@/components/PaymentCta";
import ConditionTabs from "@/components/ConditionTabs";
import Roadmap from "@/components/Roadmap";
import Quiz from "@/components/Quiz";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Pricing from "@/components/Pricing";
import { programJsonLd } from "@/lib/jsonld";
import { isRazorpayConfigured } from "@/lib/razorpay";

export const metadata: Metadata = {
  title: "Fat Loss Coaching Plans & Pricing | Coach Ridhi Jain",
  description:
    "Hormone-friendly fat loss for working women — desi food, 30-min home workouts. Guided plans from ₹5,999, Elite 1:1 coaching with Ridhi from ₹19,999.",
  alternates: { canonical: "/program" },
  openGraph: {
    title: "Lose 8–10 kgs in 12 Weeks — Guided & Elite Coaching Plans",
    description:
      "Hormone-friendly fat loss for working women. Guided plans from ₹5,999, Elite coaching with Ridhi from ₹19,999. Free strategy call.",
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
      <Hero />
      <Marquee />
      <PainPoints />
      <ConditionTabs />
      <Transformations />
      <StatsBand />
      <Method />
      <Steps />
      <About />
      <InstaFeed />
      <Roadmap />
      <Quiz />
      <FitCheck />
      <Pricing checkoutEnabled={isRazorpayConfigured()} />
      <Faq />
      {/* Payment section only renders once RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are set */}
      {isRazorpayConfigured() && <PaymentCta />}
      <FinalCta />
      <Footer />
      <StickyCta />
      <WhatsAppFloat />
    </main>
  );
}
