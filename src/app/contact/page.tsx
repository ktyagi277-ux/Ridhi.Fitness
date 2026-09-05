import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, Clock, MessageSquareText } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { IG_HANDLE, IG_URL, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Coach Ridhi Jain",
  description: "Reach the Coach Ridhi Jain team on Instagram or WhatsApp — replies within 24 hours, Mon–Sat.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = waLink("Hi Ridhi! I found your website and have a question.");

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
            <MessageSquareText className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Contact us</h1>
            <p className="mt-1 text-sm font-semibold text-ink-400">Real humans, real replies — within 24 hours.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-ink-900/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.22)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#128C42]">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <h2 className="font-display mt-5 text-xl font-semibold">WhatsApp</h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                The fastest way to reach the team — plan details, pricing, payment queries, anything.
              </p>
            </a>
          )}

          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-ink-900/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.22)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
              <InstagramIcon className="h-6 w-6" />
            </span>
            <h2 className="font-display mt-5 text-xl font-semibold">Instagram</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
              DM {IG_HANDLE} — Ridhi and the team read every message.
            </p>
          </a>

          <Link
            href="/program#apply"
            className="group rounded-3xl border border-ink-900/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.22)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
              <CalendarCheck className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h2 className="font-display mt-5 text-xl font-semibold">Book a free call</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
              Serious about starting? Skip the DMs — book the free 20-minute strategy call directly.
            </p>
          </Link>

          <div className="rounded-3xl border border-ink-900/8 bg-white p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-100 text-ink-600">
              <Clock className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h2 className="font-display mt-5 text-xl font-semibold">Hours</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
              Mon–Sat · 10 am – 7 pm IST. Messages outside these hours are answered the next working morning.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-ink-400">
          For payment or refund queries, include your name and the WhatsApp number you enrolled with so we can resolve it in one go.
          See our <Link href="/refund-policy" className="font-bold text-clay-600 hover:underline">Refund Policy</Link> and{" "}
          <Link href="/terms" className="font-bold text-clay-600 hover:underline">Terms</Link>.
        </p>
      </article>
    </main>
  );
}
