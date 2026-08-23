import Image from "next/image";
import { Star, CheckCircle2, Zap, ArrowDown } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { InstagramIcon } from "@/components/icons";

const IG_URL = "https://www.instagram.com/coachridhijain";

export default function Hero() {
  return (
    <>
      {/* announcement bar */}
      <div className="flex items-center justify-center gap-2 bg-ink-900 px-4 py-2.5 text-center">
        <Zap className="h-3.5 w-3.5 shrink-0 text-gold-400" fill="currentColor" />
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cream-100 sm:text-xs">
          New batch starts Monday — only 10 free strategy calls this week
        </p>
      </div>

      {/* navbar */}
      <header className="sticky top-0 z-50 border-b border-ink-900/8 bg-cream-50/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-clay-500/30">
              <Image src="/images/ridhi-profile.jpg" alt="Coach Ridhi Jain" fill className="object-cover" sizes="40px" priority />
            </span>
            <span className="leading-none">
              <span className="font-display block text-lg font-semibold tracking-tight">Ridhi Jain</span>
              <span className="block text-[9.5px] font-extrabold uppercase tracking-[0.3em] text-clay-600">Fat Loss Coach</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-[0.12em] text-ink-500 md:flex">
            <a href="#method" className="link-lux transition-colors hover:text-ink-900">Method</a>
            <a href="#results" className="link-lux transition-colors hover:text-ink-900">Results</a>
            <a href="#about" className="link-lux transition-colors hover:text-ink-900">About</a>
            <a href="#faq" className="link-lux transition-colors hover:text-ink-900">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — @coachridhijain"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-700 transition hover:border-clay-500 hover:text-clay-600 sm:flex"
            >
              <InstagramIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="#apply"
              className="rounded-full bg-ink-900 px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-cream-50 transition hover:bg-clay-600"
            >
              Book Free Call
            </a>
          </div>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        {/* ambient blobs */}
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-clay-100/70 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-48 top-40 h-[520px] w-[520px] rounded-full bg-sage-100/80 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14 lg:pb-24 lg:pt-16">
          {/* copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/10 bg-white/70 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-600" />
                <span className="eyebrow text-ink-600">For working women · 12-week program</span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="font-display mt-6 text-[42px] font-semibold leading-[1.04] tracking-tight text-ink-900 sm:text-6xl lg:text-[64px]">
                Lose{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <em className="italic text-clay-600">8–10 kgs</em>
                  <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 220 12" fill="none" aria-hidden>
                    <path d="M3 9C55 3 120 2 217 7" stroke="var(--color-clay-400)" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                in 12 weeks — without crash diets or giving up{" "}
                <em className="italic">dal-roti.</em>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500">
                The <strong className="font-bold text-ink-800">Metabolic Reset Method™</strong> — a hormone-friendly,
                desi-food-approved system that helps busy professional women get leaner, more energetic and
                unrecognisably confident. No gym. No starving. No rebound.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-7 space-y-3">
                {[
                  "Eat ghar ka khana — plans built around your meetings & family meals",
                  "30-min home workouts, zero equipment needed",
                  "Weekly 1:1 check-ins + WhatsApp support when motivation dips",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] font-semibold text-ink-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" strokeWidth={2} />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center">
                  {["PJ", "SK", "AM", "NR"].map((initials, i) => (
                    <span
                      key={initials}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream-50 text-[11px] font-extrabold text-cream-50 ${
                        ["bg-clay-500", "bg-sage-600", "bg-ink-700", "bg-gold-500"][i]
                      } ${i > 0 ? "-ml-3" : ""}`}
                    >
                      {initials}
                    </span>
                  ))}
                  <span className="-ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream-50 bg-cream-200 text-[10px] font-extrabold text-ink-700">
                    1k+
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gold-400" fill="currentColor" strokeWidth={0} />
                    ))}
                    <span className="ml-1.5 text-sm font-extrabold text-ink-900">4.9/5</span>
                  </div>
                  <p className="text-xs font-semibold text-ink-500">from 500+ coached women</p>
                </div>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/70 px-4 py-2 transition hover:border-clay-400">
                  <InstagramIcon className="h-4 w-4 text-clay-600" />
                  <span className="text-xs font-bold text-ink-700">
                    113K community · <span className="text-ink-500 group-hover:text-clay-600">@coachridhijain</span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <a href="#method" className="mt-10 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-ink-400 transition hover:text-clay-600">
                See how the method works <ArrowDown className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={220} className="lg:sticky lg:top-24">
            <LeadForm id="apply" source="hero_form" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
