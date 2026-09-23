import type { NextConfig } from "next";

// Baseline security headers. A Content-Security-Policy is deliberately NOT set here yet:
// Meta Pixel, Google Fonts and the Instagram embed each need allow-listing — add it after testing.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coachridhijain.com";
const canonicalHost = new URL(siteUrl).host;
// Hosts that serve this app but are NOT the canonical one — 301 them so Google sees a single URL.
const ALIAS_HOSTS = ["vishaltechnopower.in", "www.vishaltechnopower.in", `www.${canonicalHost}`].filter(
  (h) => h !== canonicalHost,
);

const immutableCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // Filenames are versioned (…-v6.jpg, …-v2.mp4) so these can be cached for a year.
      { source: "/images/:path*", headers: immutableCache },
      { source: "/videos/:path*", headers: immutableCache },
    ];
  },
  async redirects() {
    return ALIAS_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${siteUrl}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
