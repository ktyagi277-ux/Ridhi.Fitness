import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coachridhijain.com";

const PRIVATE_PATHS = ["/api/"];

// AI search crawlers are explicitly allowed — the site exists to be found and cited.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
