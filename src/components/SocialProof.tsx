import { Asterisk, RefreshCcw, HeartPulse, Briefcase, UtensilsCrossed } from "lucide-react";
import Reveal from "@/components/Reveal";

const MARQUEE_ITEMS = [
  "No crash diets",
  "Desi food friendly",
  "30-min home workouts",
  "PCOS & thyroid friendly",
  "1:1 accountability",
  "Permanent results",
];

export function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-ink-900/10 bg-ink-900 py-4 marquee-mask">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {[...doubled, ...doubled].map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-[13px] font-extrabold uppercase tracking-[0.26em] text-cream-100">
            {item}
            <Asterisk className="h-4 w-4 text-clay-400" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

const PAINS = [
  {
    icon: RefreshCcw,
    title: "You've lost weight before…",
    text: "…and gained it all back (plus interest). Diets end, life happens, and the weighing scale betrays you again.",
  },
  {
    icon: HeartPulse,
    title: "PCOS, thyroid or bloating",
    text: "Hormones make every kilo a fight. Generic plans ignore them — your metabolism needs a smarter protocol.",
  },
  {
    icon: Briefcase,
    title: "Your 9-to-9 owns you",
    text: "Back-to-back calls, desk lunches, zero energy left. You need a plan that bends around work, not the opposite.",
  },
  {
    icon: UtensilsCrossed,
    title: "You can't live on salads",
    text: "Dal, sabzi, roti, chai — this is real life. Your plan should be built on your plate, not a fancy Western template.",
  },
];

export function PainPoints() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="eyebrow text-clay-600">The honest truth</p>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          If any of this sounds familiar, <em className="italic text-clay-600">you&apos;re exactly who I coach.</em>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PAINS.map((pain, i) => (
          <Reveal key={pain.title} delay={i * 90}>
            <div className="group h-full rounded-3xl border border-ink-900/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.22)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-600 transition-colors duration-500 group-hover:bg-clay-600 group-hover:text-cream-50">
                <pain.icon className="h-5.5 w-5.5" strokeWidth={1.9} />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold leading-snug">{pain.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">{pain.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="font-display mx-auto mt-16 max-w-3xl text-center text-3xl font-medium italic leading-snug text-ink-700 sm:text-4xl">
          &ldquo;It&apos;s not a <span className="text-clay-600">you</span> problem.
          It&apos;s a <span className="text-clay-600">method</span> problem.&rdquo;
        </p>
      </Reveal>
    </section>
  );
}

const STATS = [
  { value: "1,000+", label: "Women coached to a leaner body" },
  { value: "8–10 kg", label: "Average fat loss in 12 weeks" },
  { value: "30 min", label: "Daily home workouts — no gym" },
  { value: "1:1", label: "Weekly check-ins with your coach on WhatsApp" },
];

export function StatsBand() {
  return (
    <section className="bg-ink-900 py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="text-center lg:text-left">
              <p className="font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-cream-100/50">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
