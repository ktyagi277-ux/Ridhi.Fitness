import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Coach Ridhi Jain",
  description: "Terms and conditions for the Metabolic Reset Method™ coaching program and this website.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. About these terms",
    body: [
      "These terms apply to your use of this website and your enrolment in the Metabolic Reset Method™ — the online fitness and nutrition coaching programs (Guided and Elite plans of 30 days to 6 months) run by Coach Ridhi Jain (\"we\", \"us\"). By enquiring, booking a call or purchasing any plan, you agree to these terms.",
    ],
  },
  {
    title: "2. What the program is",
    body: [
      "Each plan provides personalised nutrition guidance, home workout plans, habit coaching, scheduled check-ins or calls and WhatsApp support for the duration you purchased (30, 60 or 90 days, or 6 months), counted from your onboarding date. The exact inclusions of each plan — number of calls, who conducts them, and support level — are listed on the Plans section of the website at the time of purchase.",
      "It is a coaching and educational service. It is not medical treatment, and no specific weight-loss outcome is guaranteed — results depend on your consistency, adherence, medical history and individual body response.",
    ],
  },
  {
    title: "3. Not medical advice",
    body: [
      "Nothing on this website or in the program is a substitute for professional medical advice, diagnosis or treatment. If you have a medical condition (including PCOS, thyroid disorders, diabetes, or if you are pregnant or recently postpartum), consult your physician before starting any diet or exercise program, and keep them informed during it.",
      "You agree to share accurate health information during onboarding so your plan can be built safely.",
    ],
  },
  {
    title: "4. Payments",
    body: [
      "Program fees are listed on this website in Indian Rupees and are payable one-time in full through our secure payment partner, Razorpay (UPI, cards, netbanking). We never see or store your card details.",
      "Your enrolment is confirmed once payment is successful, and onboarding begins within 24 hours of payment.",
    ],
  },
  {
    title: "5. Refunds & cancellations",
    body: [
      "Refunds and cancellations are governed by our Refund Policy, available on this website. Failed or duplicate transactions are refunded automatically to the source payment method.",
    ],
  },
  {
    title: "6. Your responsibilities",
    body: [
      "The program works when you do — you agree to attend scheduled check-ins, follow the plan to the best of your ability, and communicate honestly about your progress and any difficulties.",
      "Program access, plans and materials are personal to you and may not be shared, resold or redistributed.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "All content on this website and in the program — plans, templates, guides, branding and the Metabolic Reset Method™ name — remains our intellectual property and is licensed to you for personal use only.",
    ],
  },
  {
    title: "8. Communications",
    body: [
      "By submitting an enquiry or purchasing the program, you consent to being contacted on WhatsApp, phone and email about your enquiry, onboarding and coaching. You can opt out of marketing messages at any time.",
    ],
  },
  {
    title: "9. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, our total liability for any claim arising out of the program or this website is limited to the amount you paid for the program. We are not liable for injuries or health outcomes arising from information you withheld or medical advice you chose not to follow.",
    ],
  },
  {
    title: "10. Governing law",
    body: [
      "These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of India.",
      "We may update these terms from time to time — the latest version will always be available on this page. Last updated: 2026.",
    ],
  },
];

export default function TermsPage() {
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
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
            <ScrollText className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
            <p className="mt-1 text-sm font-semibold text-ink-400">The plain-English rules of working together.</p>
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
