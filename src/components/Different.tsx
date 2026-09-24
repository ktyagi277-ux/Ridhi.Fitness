import Reveal from "@/components/Reveal";

const LIFE = ["A difficult workday.", "A child who needs you.", "Travel.", "Social occasions.", "Low-energy days.", "Hormonal changes.", "A week where you simply cannot give 100%."];

const PILLARS = [
  {
    title: "Nourishment, Not Punishment",
    lines: [
      "You do not need to keep eating less or punishing yourself every time life goes off-plan.",
      "You need to learn how to nourish your body in a way that supports your health, energy and goals.",
    ],
  },
  {
    title: "Consistency, Not Perfection",
    lines: [
      "A perfect week is not the goal.",
      "The goal is building a system you can keep returning to — even when some days look completely different from others.",
      "Your 30% day still counts.",
    ],
  },
  {
    title: "Execution, Not More Information",
    lines: [
      "Most women don't need another PDF telling them what to eat.",
      "They need support turning what they already know into something they can actually execute consistently.",
      "That means guidance, accountability, adjustments and hand-holding through real life.",
    ],
  },
  {
    title: "The Comeback Is Part Of The Program",
    lines: [
      "A meal out is not failure.",
      "A holiday is not failure.",
      "A difficult week is not failure.",
      "The skill we build is knowing how to come back without guilt, punishment or waiting for Monday.",
    ],
  },
];

/** Section 5 — Why RJ Fitness is different (Ridhi's full copy, 24 Sep 2026). */
export default function Different() {
  return (
    <section id="different" className="relative scroll-mt-24 overflow-x-clip border-t border-ink-900/8 bg-cream-100 py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-sage-100/80 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* headline + "when life happens" */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-clay-600">Why RJ Fitness is different</p>
              <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
                I&apos;m not here to help you follow a perfect plan.{" "}
                <em className="italic text-clay-600">I&apos;m here to help you keep going when life stops being perfect.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-7 max-w-xl space-y-3 text-[17px] leading-relaxed text-ink-600">
                <p>Most women already know they should eat better, move more, sleep better and stay consistent.</p>
                <p className="font-semibold text-ink-900">The real struggle begins when life happens.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="rounded-[28px] border border-ink-900/8 bg-white p-7 sm:p-8">
              <ul className="space-y-2.5">
                {LIFE.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-[15.5px] font-semibold text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                    {l}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-ink-900/8 pt-5 text-[15px] leading-relaxed text-ink-600">
                <p className="font-display text-xl font-semibold text-ink-900">That is where coaching matters.</p>
                <p className="mt-2">At RJ Fitness, we don&apos;t just work on what you should do on your best days.</p>
                <p className="mt-1">
                  We work on helping you know what to do on your <strong className="font-bold text-clay-700">30%, 50% and difficult days</strong> too.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* four pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={80 + i * 80} className="h-full">
              <div className="h-full rounded-3xl border border-ink-900/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_24px_48px_-24px_rgba(29,24,20,0.2)] sm:p-8">
                <span className="font-display text-sm font-semibold italic text-clay-500">0{i + 1}</span>
                <h3 className="font-display mt-2 text-[24px] font-semibold leading-tight tracking-tight text-ink-900 sm:text-[26px]">{p.title}</h3>
                <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-500">
                  {p.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* strongest line + brand statement */}
        <Reveal delay={120} className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-2xl font-medium italic leading-snug text-ink-800 sm:text-[30px]">
            Because the goal isn&apos;t to never go off-plan.
            <br />
            The goal is to become very good at coming back.
          </p>
          <div className="mx-auto mt-10 inline-block rounded-[28px] bg-ink-900 px-8 py-7 text-cream-50 shadow-[0_32px_64px_-32px_rgba(0,0,0,0.5)] sm:px-12 sm:py-9">
            <p className="font-display text-2xl font-semibold leading-snug sm:text-[32px]">
              We don&apos;t coach perfection.
              <br />
              We coach <span className="text-gold-400">consistency that survives real life.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
