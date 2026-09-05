import { FAQS } from "@/lib/faqs";
import { IG_URL } from "@/lib/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coachridhijain.com";

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
      // Prices are intentionally not published — enquiries go to WhatsApp.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Coaching plans",
        itemListElement: [
          { "@type": "Offer", name: "Guided plans (30 days to 6 months)", url: `${siteUrl}/program#plans-guided` },
          { "@type": "Offer", name: "Elite plans (3 or 6 months, 1:1 with Ridhi Jain)", url: `${siteUrl}/program#plans-elite` },
        ],
      },
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
