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
  title: "Ridhi Jain | Nutritionist & Fat Loss Coach | RJ Fitness",
  description:
    "Nutritionist and fat loss coach Ridhi Jain. Build a body and lifestyle you love — without living on a diet. Personalised nutrition, habit coaching and real-life accountability. Book a discovery call.",
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
    title: "Build a body and lifestyle you love — without living on a diet",
    description:
      "Personalised nutrition, habit coaching and real-life accountability for women who are done starting over. Book a discovery call.",
    url: siteUrl,
    siteName: "Coach Ridhi Jain — Metabolic Reset Method",
    locale: "en_IN",
    images: [{ url: "/images/og-card.jpg", width: 1200, height: 630, alt: "Ridhi Jain — RJ Fitness" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build a body and lifestyle you love — Ridhi Jain, RJ Fitness",
    description: "Personalised nutrition, habit coaching and real-life accountability. Book a discovery call.",
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
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-cream-50 text-ink-900 antialiased">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
        <MetaPixel />
      </body>
    </html>
  );
}
