import Image from "next/image";
import { Zap, ArrowDown, ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import HeroBadge from "@/components/HeroBadge";

const IG_URL = "https://www.instagram.com/coachridhijain";

export default function Hero() {
  return (
    <>
      {/* announcement bar */}
      <div className="flex items-center justify-center gap-2 bg-ink-900 px-4 py-2.5 text-center">
        <Zap className="h-3.5 w-3.5 shrink-0 text-gold-400" fill="currentColor" />
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-cream-100 sm:text-xs sm:tracking-[0.14em]">
          1,000+ women coached · Book a discovery call
        </p>
      </div>

      {/* navbar */}
      <header className="sticky top-0 z-50 border-b border-ink-900/8 bg-cream-50/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-full shadow-sm ring-2 ring-gold-500/50">
              <Image src="/images/rj-logo.jpg" alt="RJ Fitness — Coach Ridhi Jain" fill className="object-cover" sizes="40px" />
            </span>
            <span className="leading-none">
              <span className="wordmark block text-lg tracking-tight">Ridhi Jain</span>
              <span className="block text-[9.5px] font-extrabold uppercase tracking-[0.3em] text-clay-600">Fat Loss Coach</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-[0.12em] text-ink-500 md:flex">
            <a href="#method" className="link-lux transition-colors hover:text-ink-900">Method</a>
            <a href="#results" className="link-lux transition-colors hover:text-ink-900">Results</a>
            <a href="#about" className="link-lux transition-colors hover:text-ink-900">About</a>
            <a href="#plans" className="link-lux transition-colors hover:text-ink-900">Plans</a>
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
              Discovery call
            </a>
          </div>
        </div>
      </header>

      {/* Intro band — Ridhi's name + positioning line. Section 1 (My Story) follows right after. */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-clay-100/70 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-48 top-10 h-[520px] w-[520px] rounded-full bg-sage-100/80 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-10 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-14 lg:pt-14">
          <div>
            <p className="wordmark text-2xl tracking-tight text-ink-900 sm:text-3xl">Ridhi Jain</p>
            <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.3em] text-clay-600">Nutritionist &amp; fat loss coach · RJ Fitness</p>
            <h1 className="font-display mt-6 text-[clamp(32px,9.5vw,40px)] font-semibold leading-[1.04] tracking-tight text-ink-900 sm:text-5xl lg:text-[54px]">
              Build a body and lifestyle you love — <em className="italic text-clay-600">without living on a diet.</em>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-500">
              Personalised nutrition, habit coaching and real-life accountability for women who are done starting over.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2.5 rounded-full bg-clay-600 px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-cream-50 shadow-[0_18px_36px_-14px_rgba(180,72,32,0.55)] transition hover:bg-clay-700"
              >
                Book a discovery call
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#story" className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-ink-400 transition hover:text-clay-600">
                Read my story <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* right: 3D RJ badge */}
          <div className="lg:self-center">
            <HeroBadge />
          </div>
        </div>
      </section>
    </>
  );
}
