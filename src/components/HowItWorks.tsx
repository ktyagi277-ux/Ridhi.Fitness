import { UtensilsCrossed, Repeat, MessageCircleHeart, Dumbbell, SlidersHorizontal, HandHeart, RotateCcw } from "lucide-react";
import Reveal from "@/components/Reveal";

const PILLARS = [
  { icon: UtensilsCrossed, title: "Nutrition", text: "A plan built on the food you already eat — portions, protein and timing adjusted to your day, not a template." },
  { icon: Repeat, title: "Habit coaching", text: "Small, repeatable habits that hold on office days, travel weeks and family dinners." },
  { icon: MessageCircleHeart, title: "Accountability", text: "Weekly check-ins over call and a team that notices when you go quiet." },
  { icon: Dumbbell, title: "Workouts, where applicable", text: "30-minute home sessions when they fit your life — never a gym membership as a condition." },
  { icon: SlidersHorizontal, title: "Adjustments", text: "Your plan is reviewed and changed every week based on how your body responds." },
  { icon: HandHeart, title: "Hand-holding", text: "You are never left to figure it out alone — questions, cravings, low weeks, all covered." },
  { icon: RotateCcw, title: "Comeback strategies", text: "A clear playbook for the week after a wedding, a holiday or a bad stretch — so one slip never becomes a restart." },
];

/** Section 7 — How RJ Fitness works. */
export default function HowItWorks() {
  return (
    <section id="method" className="relative scroll-mt-24 overflow-x-clip py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full bg-clay-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-clay-600">How RJ Fitness works</p>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            Seven things working <em className="italic text-clay-600">together.</em>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-500">
            Nutrition, habit coaching, accountability, workouts where applicable, adjustments, hand-holding and comeback strategies — one system, built around your real life.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={60 + i * 60} className={`h-full ${i === PILLARS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <div className="group h-full rounded-3xl border border-ink-900/8 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.2)] sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-600 transition-colors duration-500 group-hover:bg-clay-600 group-hover:text-cream-50">
                  <p.icon className="h-5.5 w-5.5" strokeWidth={1.9} />
                </span>
                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-400">0{i + 1}</p>
                <h3 className="font-display mt-1.5 text-[22px] font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-500">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
