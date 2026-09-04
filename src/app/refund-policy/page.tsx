import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Coach Ridhi Jain",
  description: "Refund and cancellation policy for the Metabolic Reset Method™ Guided and Elite coaching plans.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/refund-policy" },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. The short version",
    body: [
      "The free strategy call costs nothing and commits you to nothing. Every paid plan (Guided or Elite, 30 days to 6 months) is a personalised coaching service — once your custom plan is built and onboarding begins, the fee is non-refundable. Failed or duplicate payments are always refunded in full.",
    ],
  },
  {
    title: "2. Failed or duplicate transactions",
    body: [
      "If money was deducted but your enrolment was not confirmed, or you were charged twice for the same order, the amount is refunded automatically to the source payment method by Razorpay — typically within 5–7 business days.",
      "If a refund hasn't reached you in that window, contact us with your payment ID and we'll chase it with the payment gateway immediately.",
    ],
  },
  {
    title: "3. Cancelling before onboarding",
    body: [
      "If you change your mind after paying but before your onboarding call and questionnaire are completed, write to us within 48 hours of payment. We'll cancel your enrolment and process a refund of the program fee, minus any payment-gateway charges.",
    ],
  },
  {
    title: "4. After onboarding begins",
    body: [
      "Once your onboarding is done and your personalised plan has been prepared, the program fee is non-refundable — significant 1:1 work is invested in your plan from day one.",
      "If something genuinely isn't working, talk to us. We would rather fix your plan, pause your program for a medical situation, or find another fair solution than leave you stuck.",
    ],
  },
  {
    title: "5. Pausing the program",
    body: [
      "If a medical issue, pregnancy or family emergency interrupts your plan, we can pause it and resume when you're ready. Message your coach on WhatsApp and we'll work it out — no penalty.",
    ],
  },
  {
    title: "6. How to reach us",
    body: [
      "For any payment or refund query, message us on Instagram (@coachridhijain) or via the contact details on our Contact page, with your name and Razorpay payment ID. We respond within 24 hours, Mon–Sat.",
      "This policy may be updated from time to time — the latest version will always be on this page. Last updated: 2026.",
    ],
  },
];

export default function RefundPolicyPage() {
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
            <ReceiptText className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Refund &amp; Cancellation Policy</h1>
            <p className="mt-1 text-sm font-semibold text-ink-400">Fair, simple, and in plain English.</p>
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
