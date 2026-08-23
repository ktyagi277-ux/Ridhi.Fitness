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
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coachridhijain.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ridhi Jain",
      url: siteUrl,
      image: `${siteUrl}/images/coach-hero.png`,
      jobTitle: "Fat Loss Coach & Nutritionist",
      description:
        "Fat loss coach for working women. The Metabolic Reset Method™ helps women lose 8–10 kgs in 12 weeks with hormone-friendly, desi-food-approved plans.",
      sameAs: ["https://www.instagram.com/coachridhijain"],
      knowsAbout: ["Weight loss", "Nutrition", "PCOS", "Women's hormonal health", "Metabolic health"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Coach Ridhi Jain — Metabolic Reset Method",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "The Metabolic Reset Method™ — 12-Week Fat Loss Program",
      serviceType: "Online fitness & nutrition coaching",
      description:
        "A 12-week, hormone-friendly fat-loss program for working women with desi-food meal plans, 30-minute home workouts and weekly 1:1 coaching.",
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "IN",
      url: `${siteUrl}/#apply`,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Marquee />
      <PainPoints />
      <Transformations />
      <StatsBand />
      <Method />
      <Steps />
      <About />
      <InstaFeed />
      <FitCheck />
      <Faq />
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
