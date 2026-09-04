import { FAQS } from "@/lib/faqs";
import { PLANS } from "@/lib/plans";
import { IG_URL } from "@/lib/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coachridhijain.com";

/** Bump whenever plan prices are revised — feeds every Offer.priceValidUntil. */
const PRICE_VALID_UNTIL = "2026-12-31";

const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "RJ Fitness",
  alternateName: "Coach Ridhi Jain",
  url: siteUrl,
  logo: `${siteUrl}/images/rj-logo.jpg`,
  image: `${siteUrl}/images/rj-logo.jpg`,
  founder: { "@id": `${siteUrl}/#person` },
  sameAs: [IG_URL],
  areaServed: { "@type": "Country", name: "India" },
};

const person = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Ridhi Jain",
  alternateName: "Coach Ridhi Jain",
  url: siteUrl,
  image: `${siteUrl}/images/coach-hero.png`,
  jobTitle: "Fat Loss Coach & Nutritionist",
  description:
    "Fat loss coach for working women. The Metabolic Reset Method™ helps women lose 8–10 kgs in 12 weeks with hormone-friendly, desi-food-approved plans.",
  sameAs: [IG_URL],
  knowsAbout: ["Weight loss", "Nutrition", "PCOS", "Thyroid", "Women's hormonal health", "Metabolic health"],
  worksFor: { "@id": `${siteUrl}/#organization` },
};

const website = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Coach Ridhi Jain — Metabolic Reset Method",
  inLanguage: "en-IN",
  publisher: { "@id": `${siteUrl}/#organization` },
};

/** Entity graph for the link-in-bio homepage — same @ids as /program so Google merges them. */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, person, website],
};

/** Full graph for the /program landing page. */
export const programJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    person,
    website,
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/program#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Program & Plans", item: `${siteUrl}/program` },
      ],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "The Metabolic Reset Method™ — Online Fat Loss Coaching",
      serviceType: "Online fitness & nutrition coaching",
      description:
        "Hormone-friendly fat-loss coaching for working women with desi-food meal plans, 30-minute home workouts and 1:1 accountability. Guided plans (30 days to 6 months) run by a Head Nutritionist with Ridhi overseeing strategy; Elite plans (3 or 6 months) coached by Ridhi Jain personally.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      url: `${siteUrl}/program#plans`,
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        "@id": `${siteUrl}/program#offer-${plan.id}`,
        name: plan.name,
        description: `${plan.tagline}. ${plan.bestFor}`,
        price: String(plan.priceInr),
        priceCurrency: "INR",
        priceValidUntil: PRICE_VALID_UNTIL,
        eligibleDuration: { "@type": "QuantitativeValue", value: plan.days, unitCode: "DAY" },
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/program?plan=${plan.id}#pay`,
        category: plan.tier === "elite" ? "Elite coaching (1:1 with Ridhi Jain)" : "Guided coaching (Head Nutritionist, strategy by Ridhi Jain)",
        eligibleRegion: { "@type": "Country", name: "India" },
        seller: { "@id": `${siteUrl}/#organization` },
      })),
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
