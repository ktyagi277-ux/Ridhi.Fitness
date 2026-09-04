import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Coach Ridhi Jain",
  description: "How we collect, use and protect your information when you enquire about the program.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Information we collect",
    body: [
      "When you fill out an enquiry form on this website, we collect the details you provide: your name, email address, phone/WhatsApp number, age, fitness goals and health-related preferences you choose to share (for example PCOS or thyroid concerns).",
      "We also automatically collect standard technical data such as your IP address, browser type, device information and advertising identifiers (UTM parameters, click IDs like fbclid) that tell us which ad or campaign brought you here.",
    ],
  },
  {
    title: "2. How we use your information",
    body: [
      "To contact you on WhatsApp, phone or email regarding your free strategy call and the coaching program you enquired about.",
      "To understand which marketing campaigns are effective, so we can improve our outreach.",
      "To maintain internal records of enquiries and improve our services. We do not sell, rent or share your personal data with third parties for their marketing.",
    ],
  },
  {
    title: "3. Cookies & advertising pixels",
    body: [
      "This site may use the Meta (Facebook/Instagram) Pixel and similar technologies. These help Meta measure the performance of our ads and show relevant ads to people who have visited our site.",
      "You can control personalised advertising in your Meta ad preferences and disable non-essential cookies in your browser settings.",
    ],
  },
  {
    title: "4. Data storage & security",
    body: [
      "Your enquiry data is stored securely in an access-controlled database. We retain lead information only as long as needed to respond to your enquiry and operate our coaching business, after which it may be anonymised or deleted.",
      "While no method of transmission over the internet is 100% secure, we follow reasonable technical and organisational measures to protect your data.",
    ],
  },
  {
    title: "5. Health information",
    body: [
      "Any health-related details you share (medical conditions, weight goals) are used solely to assess program suitability and to prepare for your consultation. They are treated as confidential and never published or shared without your explicit consent.",
    ],
  },
  {
    title: "6. Your rights",
    body: [
      "You may request access, correction or deletion of your personal data at any time by messaging us on Instagram (@coachridhijain) or replying to any of our emails.",
      "You can opt out of further communication at any time and we will stop contacting you immediately.",
    ],
  },
  {
    title: "7. Updates to this policy",
    body: [
      "We may update this privacy policy from time to time. The latest version will always be available on this page. Last updated: 2026.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <header className="border-b border-ink-900/8 bg-cream-50/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-bold text-ink-600 transition hover:text-clay-600">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
          <p className="font-display text-lg font-semibold">Ridhi Jain</p>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
            <p className="mt-1 text-sm font-semibold text-ink-400">Your data, treated the way we&apos;d want ours treated.</p>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl font-semibold tracking-tight">{section.title}</h2>
              {section.body.map((para, i) => (
                <p key={i} className="mt-3 text-[15px] leading-relaxed text-ink-500">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
