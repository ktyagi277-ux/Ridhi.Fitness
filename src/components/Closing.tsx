import Image from "next/image";
import { Check, X, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CornerAccent from "@/components/CornerAccent";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";

const IG_URL = "https://www.instagram.com/coachridhijain";

const FOR_YOU = [
  "You're a working woman with 10kg+ to lose — or just the stubborn last 5",
  "You want to eat Indian food and still see results",
  "You can commit 45 minutes a day for 12 weeks",
  "You're done with quick fixes and want permanent change",
  "You have PCOS/thyroid and need a plan that understands it",
];

const NOT_FOR_YOU = [
  "You're looking for a 7-day detox or a magic pill",
  "You want to lose 10 kg before a wedding next week",
  "You won't track, check in, or show up consistently",
  "You expect results while changing nothing at all",
];

export function FitCheck() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
      <Reveal>
        <p className="eyebrow text-center text-clay-600">Honest fit check</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          This works brilliantly — <em className="italic text-clay-600">for the right woman.</em>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border-2 border-sage-200 bg-white p-8 sm:p-10">
            <p className="eyebrow text-sage-600">This IS for you if…</p>
            <ul className="mt-6 space-y-4">
              {FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-[15px] font-semibold text-ink-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-600 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="h-full rounded-3xl border-2 border-clay-100 bg-clay-50/60 p-8 sm:p-10">
            <p className="eyebrow text-clay-600">This is NOT for you if…</p>
            <ul className="mt-6 space-y-4">
              {NOT_FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-[15px] font-semibold text-ink-500">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-200 text-clay-700">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="book" className="relative overflow-hidden bg-ink-900 py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-clay-700/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-sage-700/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-clay-400">Last call</p>
            <h2 className="font-display mt-4 text-[40px] font-semibold leading-[1.05] tracking-tight text-cream-50 sm:text-6xl">
              Your future self is <em className="italic text-clay-400">12 weeks</em> away.
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-cream-100/70">
              Every Monday you wait is a Monday your transformation waits. Book the free call —
              worst case, you leave with a plan. Best case, you never diet again.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <ul className="mt-8 space-y-3.5">
              {[
                "Free 20-min strategy call — ₹1,999 value",
                "Custom fat-loss roadmap in 48 hours",
                "Only 10 free slots this week — batch starts Monday",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3 text-[15px] font-bold text-cream-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay-600">
                    <ArrowRight className="h-3.5 w-3.5 text-cream-50" strokeWidth={2.5} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <LeadForm id="apply-bottom" source="final_cta_form" compactNote="Fill this in — the team will WhatsApp you within 24 hours to lock your slot." />
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFaq() {
  return <Faq />;
}

export function Footer() {
  const wa = waLink("Hi Ridhi! I have a question about the 12-week program.");
  return (
    <footer className="relative overflow-hidden border-t border-cream-100/10 bg-ink-950 pb-28 pt-14 md:pb-14">
      {/* fitness-themed corner accents */}
      <CornerAccent className="pointer-events-none absolute -bottom-1 -left-1 h-44 w-44 opacity-45 sm:h-64 sm:w-64" />
      <CornerAccent className="pointer-events-none absolute -bottom-1 -right-1 h-44 w-44 -scale-x-100 opacity-45 sm:h-64 sm:w-64" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="relative mb-4 block h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold-400/40">
              <Image src="/images/rj-logo.jpg" alt="RJ Fitness logo" fill className="object-cover" sizes="56px" />
            </span>
            <p className="font-display text-2xl font-semibold text-cream-50">Ridhi Jain</p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-clay-400">
              Fat Loss Coach for Women
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/50">
              The Metabolic Reset Method™ — hormone-friendly fat loss for working women.
              Desi food. Home workouts. Permanent results.
            </p>
          </div>
          <div>
            <p className="eyebrow text-cream-100/40">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-cream-100/70">
              <li><a href="#method" className="transition hover:text-clay-400">The Method</a></li>
              <li><a href="#results" className="transition hover:text-clay-400">Results</a></li>
              <li><a href="#about" className="transition hover:text-clay-400">About Ridhi</a></li>
              <li><a href="#faq" className="transition hover:text-clay-400">FAQ</a></li>
              <li><a href="/coaching-offer.pdf" target="_blank" rel="noopener noreferrer" className="transition hover:text-clay-400">Coaching Offer (PDF)</a></li>
              <li><a href="/privacy" className="transition hover:text-clay-400">Privacy Policy</a></li>
              <li><a href="/terms" className="transition hover:text-clay-400">Terms &amp; Conditions</a></li>
              <li><a href="/refund-policy" className="transition hover:text-clay-400">Refund Policy</a></li>
              <li><a href="/contact" className="transition hover:text-clay-400">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-cream-100/40">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-cream-100/70">
              <li>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-clay-400">
                  <InstagramIcon className="h-4 w-4" /> @coachridhijain
                </a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-clay-400">
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
                  </a>
                </li>
              )}
              <li><a href="#apply" className="transition hover:text-clay-400">Book a free call</a></li>
              <li><span className="text-cream-100/40">Mon–Sat · 10 am – 7 pm IST</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-100/10 pt-6">
          <p className="text-xs leading-relaxed text-cream-100/35">
            © {new Date().getFullYear()} Coach Ridhi Jain. All rights reserved. Disclaimer: Results vary from
            person to person based on consistency, medical history and adherence. This program is not a substitute
            for medical advice — please consult your physician before starting any diet or exercise program.
          </p>
        </div>
      </div>
    </footer>
  );
}
