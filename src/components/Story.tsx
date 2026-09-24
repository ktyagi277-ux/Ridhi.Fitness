import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const POINTS = [
  {
    title: "My own health journey became my first classroom.",
    text: "PCOD and severe acne made wellness deeply personal to me.",
  },
  {
    title: "Motherhood gave that journey another meaning.",
    text: "Despite being told I might need assistance, I conceived my first child naturally while navigating PCOD.",
  },
  {
    title: "My family history made prevention feel even more important.",
    text: "With diabetes and heart-related concerns present on both sides of my family, health was never something I wanted to postpone.",
  },
];

function Portrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden bg-clay-100 shadow-[0_40px_80px_-32px_rgba(29,24,20,0.35)]">
        <Image
          src="/images/ridhi-about-v2.jpg"
          alt="Ridhi Jain — nutritionist and fat loss coach for women"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 460px"
        />
      </div>
      <div className="absolute -left-2 bottom-10 rounded-2xl border border-ink-900/8 bg-white/95 px-5 py-3.5 shadow-[0_16px_40px_-16px_rgba(29,24,20,0.3)] backdrop-blur sm:left-2">
        <p className="font-display text-2xl font-semibold text-clay-600">PCOD</p>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-500">Lived it. Coach it.</p>
      </div>
    </div>
  );
}

/** Section 2 — Ridhi's story. Sits right after the hero + lead form. */
export default function Story() {
  return (
    <section id="story" className="relative scroll-mt-24 overflow-x-clip border-t border-ink-900/8 bg-cream-100">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-clay-100/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-48 bottom-0 h-[520px] w-[520px] rounded-full bg-sage-100/80 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/10 bg-white/70 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-600" />
              <span className="eyebrow text-ink-600">My story · Why RJ Fitness exists</span>
            </div>
            <h2 className="font-display mt-6 text-[clamp(30px,8vw,36px)] font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[52px]">
              I didn&apos;t enter wellness because it was trending. I entered it because my own body{" "}
              <em className="italic text-clay-600">forced me to pay attention.</em>
            </h2>
          </Reveal>

          {/* phone: portrait right after the heading */}
          <Reveal className="mt-8 lg:hidden">
            <Portrait className="mx-auto w-full max-w-md" />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-7 max-w-xl space-y-3 text-[17px] leading-relaxed text-ink-600">
              <p>After college, I was diagnosed with PCOD, followed by a severe phase of acne.</p>
              <p>That experience changed the way I looked at my body, food and health.</p>
              <p>It pushed me first toward fitness, and then deeper into nutrition and wellness.</p>
              <p>
                Over time, health stopped being something I wanted to &ldquo;fix.&rdquo; It became something I wanted to{" "}
                <strong className="font-bold text-ink-900">understand, build and protect.</strong>
              </p>
            </div>
          </Reveal>

          <div className="mt-9 space-y-4">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={120 + i * 80}>
                <div className="flex gap-4 rounded-2xl border border-ink-900/8 bg-white/80 p-5 backdrop-blur sm:gap-5 sm:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-[15px] font-semibold text-cream-50">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-[19px] font-semibold leading-snug text-ink-900 sm:text-[21px]">{p.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={380}>
            <p className="font-display mt-10 max-w-xl border-l-4 border-clay-500 pl-5 text-2xl font-medium italic leading-snug text-ink-800 sm:text-[28px]">
              My work today comes from lived experience — not just information.
            </p>
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2.5 rounded-full bg-clay-600 px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-cream-50 shadow-[0_18px_36px_-14px_rgba(180,72,32,0.55)] transition hover:bg-clay-700"
              >
                Book a discovery call
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#plans" className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900/10 bg-white/80 px-6 py-[14px] text-[13px] font-extrabold uppercase tracking-[0.1em] text-ink-800 transition hover:border-clay-400 hover:text-clay-600">
                See the plans
              </a>
            </div>
          </Reveal>
        </div>

        {/* desktop: sticky portrait */}
        <Reveal className="hidden lg:sticky lg:top-28 lg:block">
          <Portrait />
        </Reveal>
      </div>
    </section>
  );
}
