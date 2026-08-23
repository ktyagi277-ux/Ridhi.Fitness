import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coachridhijain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ridhi Jain | Nutritionist | Fat Loss Coach for Working Women",
  description:
    "The Metabolic Reset Method™: a hormone-friendly fat-loss program for working women. Desi food, 30-min home workouts, 1:1 coaching by Ridhi Jain (@coachridhijain). Book your free strategy call.",
  keywords: [
    "fat loss coach for women",
    "weight loss program india",
    "PCOS weight loss",
    "thyroid weight loss program",
    "online fitness trainer for women",
    "weight loss coach for working women",
    "Ridhi Jain",
    "12 week transformation",
    "home workout weight loss plan",
    "indian diet plan for weight loss",
  ],
  authors: [{ name: "Ridhi Jain", url: siteUrl }],
  creator: "Ridhi Jain",
  publisher: "Coach Ridhi Jain",
  applicationName: "Coach Ridhi Jain — Metabolic Reset Method",
  category: "Health & Fitness",
  formatDetection: { telephone: false },
  openGraph: {
    title: "Lose 8–10 kgs in 12 Weeks — No Crash Diets",
    description:
      "Hormone-friendly fat loss for working women. Desi food, 30-min home workouts, 1:1 coaching. Book your free strategy call.",
    url: siteUrl,
    siteName: "Coach Ridhi Jain — Metabolic Reset Method",
    locale: "en_IN",
    images: [{ url: "/images/og-card.jpg", width: 1200, height: 630, alt: "Ridhi Jain — Lose 8–10 kgs in 12 weeks, no crash diets" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lose 8–10 kgs in 12 Weeks — Coach Ridhi Jain",
    description: "Hormone-friendly fat loss for working women. Book your free strategy call.",
    images: ["/images/og-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-cream-50 text-ink-900 antialiased">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
        <MetaPixel />
      </body>
    </html>
  );
}
