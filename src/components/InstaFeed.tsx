import Image from "next/image";
import { CheckCircle2, PlayCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { InstagramIcon } from "@/components/icons";

const IG_URL = "https://www.instagram.com/coachridhijain";
const REEL_URL = "https://www.instagram.com/reel/DGvHa1mzTJj/";
const EDUCATION_POST_URL = "https://www.instagram.com/p/DbBWqe_j9kN/";

const PLAN_POINTS = [
  "Custom diet plans — delicious meals that support fat loss & gut health",
  "Sustainable fat loss — burn belly fat while keeping muscle",
  "Daily support & accountability with expert guidance",
  "Simple home workouts for fat loss & toning",
  "Quick, nutritious recipes for your busy lifestyle",
];

export default function InstaFeed() {
  return (
    <section id="plan" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="eyebrow text-clay-600">Straight from Instagram</p>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Watch a real <em className="italic text-clay-600">7-day plan</em> — day by day, meal by meal.
        </h2>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-500">
          No secrets, no gimmicks. This is the same style of routine your custom plan is built on —
          straight from Ridhi&apos;s Instagram, playing right here.
        </p>
      </Reveal>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* reel — plays on the page via Instagram's official embed */}
        <Reveal>
          <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-3xl border border-ink-900/8 bg-white shadow-[0_28px_56px_-24px_rgba(29,24,20,0.28)]">
            <iframe
              src="https://www.instagram.com/reel/DGvHa1mzTJj/embed"
              title="7-day fat-loss diet routine — reel by Coach Ridhi Jain"
              className="h-[560px] w-full border-0 sm:h-[600px]"
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <a
              href={REEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-t border-ink-900/8 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink-500 transition hover:text-clay-600"
            >
              <PlayCircle className="h-4 w-4" /> Watch on Instagram
            </a>
          </div>
        </Reveal>

        {/* copy + education post */}
        <div>
          <Reveal delay={120}>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              What your plan includes
            </h3>
            <ul className="mt-6 space-y-3.5">
              {PLAN_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] font-semibold text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <a
              href={EDUCATION_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 flex flex-col gap-5 rounded-3xl border border-ink-900/8 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.22)] sm:flex-row sm:items-center"
            >
              <div className="relative aspect-[601/693] w-full shrink-0 overflow-hidden rounded-2xl bg-cream-100 sm:w-44">
                <Image
                  src="/images/ig-legs-education.png"
                  alt="Instagram post by Ridhi Jain — Your legs are ageing you, or saving you"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 176px"
                />
              </div>
              <div>
                <p className="eyebrow text-clay-600">Free daily education</p>
                <p className="font-display mt-2 text-xl font-semibold leading-snug">
                  &ldquo;Your legs are ageing you. Or saving you.&rdquo;
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                  Science-first breakdowns like this drop on the feed every week — hormones, home
                  workouts, real-food nutrition and more.
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink-700 transition group-hover:text-clay-600">
                  <InstagramIcon className="h-4 w-4" /> Read the post
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#apply"
                className="rounded-full bg-clay-600 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-cream-50 shadow-[0_14px_28px_-12px_rgba(180,72,32,0.55)] transition hover:bg-clay-700"
              >
                Get my custom plan
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/15 bg-white px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-ink-800 transition hover:border-clay-500 hover:text-clay-600"
              >
                <InstagramIcon className="h-4.5 w-4.5" /> @coachridhijain
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
