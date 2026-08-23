import Image from "next/image";
import { CalendarCheck, Route, TrendingUp } from "lucide-react";
import Reveal from "@/components/Reveal";

type Pillar = {
  number: string;
  title: string;
  text: string;
  image?: string;
  alt?: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "The Metabolic Plate",
    text: "A personalised meal plan built on dal, paneer, roti and real Indian kitchens — mapped to your work hours, travel and family meals. You will never be \"on a diet\" again.",
    image: "/images/meal-prep.jpg",
    alt: "Healthy Indian meal prep bowls",
  },
  {
    number: "02",
    title: "30-Minute Home Workouts",
    text: "Efficient strength-based sessions you can finish before your first stand-up call. No gym, minimal equipment, maximum afterburn.",
    image: "/images/home-workout.jpg",
    alt: "Home workout setup with dumbbells and yoga mat",
  },
  {
    number: "03",
    title: "Hormone & Sleep Reset",
    text: "PCOS, thyroid, bloating, low energy — we fix the root with cycle-aware nutrition, steps targets and sleep protocols designed for female metabolism.",
  },
  {
    number: "04",
    title: "1:1 Accountability",
    text: "Weekly check-in calls, WhatsApp access when cravings hit at 11pm, and plan adjustments every single week based on your body's response.",
  },
];

export function Method() {
  return (
    <section id="method" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow text-clay-600">The program</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              The Metabolic Reset <em className="italic text-clay-600">Method™</em>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-500">
              Four pillars that work with your body and your calendar — not against them.
              This is why our women don&apos;t just lose weight. They keep it off.
            </p>
            <a
              href="#apply"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-cream-50 transition hover:bg-clay-600"
            >
              Start with a free call
            </a>
          </Reveal>
        </div>

        {/* pillars */}
        <div className="space-y-5">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 70}>
              <div className="group overflow-hidden rounded-3xl border border-ink-900/8 bg-white transition-all duration-500 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.2)]">
                <div className="p-7 sm:p-8">
                  <span className="font-display text-sm font-semibold italic text-clay-500">{pillar.number}</span>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{pillar.text}</p>
                </div>
                {pillar.image && (
                  <div className="relative h-52 w-full overflow-hidden sm:h-60">
                    <Image
                      src={pillar.image}
                      alt={pillar.alt ?? pillar.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: CalendarCheck,
    step: "Step 1",
    title: "Book your free strategy call",
    text: "20 minutes with the team to map your goals, medical history and lifestyle. No pitch — a plan either way.",
  },
  {
    icon: Route,
    step: "Step 2",
    title: "Get your custom blueprint",
    text: "Within 48 hours: your meals, workouts, step targets and sleep protocol — built around your real schedule.",
  },
  {
    icon: TrendingUp,
    step: "Step 3",
    title: "Transform in 12 weeks",
    text: "Weekly 1:1 check-ins, plan tweaks and WhatsApp support until the mirror (and your jeans) confirm it.",
  },
];

export function Steps() {
  return (
    <section className="border-y border-ink-900/8 bg-cream-100 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">Simple by design</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            From &ldquo;stuck&rdquo; to <em className="italic text-clay-600">transformed</em> in 3 steps
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-5 md:grid-cols-3">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-ink-900/15 md:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 110}>
              <div className="relative h-full rounded-3xl border border-ink-900/8 bg-cream-50 p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.22)]">
                <span className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ink-900 text-cream-50 ring-8 ring-cream-100">
                  <step.icon className="h-8 w-8" strokeWidth={1.6} />
                </span>
                <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.24em] text-clay-600">{step.step}</p>
                <h3 className="font-display mt-2 text-[22px] font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm font-semibold text-ink-400">
            Average time Investment: <span className="text-ink-800">45 minutes a day</span>. Less than your Instagram scroll time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
