import Reveal from "@/components/Reveal";

const MILESTONES = [
  {
    when: "Day 0",
    title: "You book the free strategy call",
    text: "20 minutes to map your goals, medical history and routine. You leave with a roadmap — whether you join or not.",
  },
  {
    when: "Day 1",
    title: "Deep-dive onboarding",
    text: "A detailed questionnaire plus your onboarding call — your hormones, reports, kitchen, work hours and what's failed before. Nothing is built until we truly know you.",
  },
  {
    when: "Within 48 hours",
    title: "Your custom blueprint arrives",
    text: "Meals built on your plate, 30-minute home workouts, step targets and a sleep protocol — mapped to your actual week, not a template's.",
  },
  {
    when: "Weeks 1–12",
    title: "We walk every week with you",
    text: "Weekly 1:1 check-ins, plan tweaks based on your body's response, and WhatsApp support when cravings hit at 11pm. Low week? We pick you up — that's the job.",
  },
  {
    when: "Week 12 & beyond",
    title: "You keep the result",
    text: "Maintenance isn't left for later — it's built into the program. You leave with a system you can live with, not a diet you escaped from.",
  },
];

export default function Roadmap() {
  return (
    <section className="border-y border-ink-900/8 bg-cream-100 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">No black box</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Exactly what happens <em className="italic text-clay-600">after you join.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink-500">
            Most coaching feels like a mystery until you've paid. Ours is a map — here it is, step by step.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <div className="flex gap-5 sm:gap-7">
                <div className="flex flex-col items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-[15px] font-semibold text-cream-50 ring-4 ring-cream-50">
                    {i + 1}
                  </span>
                  {i < MILESTONES.length - 1 && (
                    <span className="my-1.5 w-0.5 flex-1 rounded-full bg-ink-900/12" aria-hidden />
                  )}
                </div>
                <div className={i < MILESTONES.length - 1 ? "pb-9" : ""}>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-clay-600">{m.when}</p>
                  <h3 className="font-display mt-1.5 text-[21px] font-semibold leading-snug">{m.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{m.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-cream-50 transition hover:bg-clay-600"
            >
              Start at step 1 — it's free
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
