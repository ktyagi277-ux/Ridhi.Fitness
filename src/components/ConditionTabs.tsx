"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";
import { trackMetaEvent } from "@/components/MetaPixel";

type Condition = {
  label: string;
  headline: string;
  body: string;
  adapt: string;
  waMessage: string;
};

const CONDITIONS: Condition[] = [
  {
    label: "PCOS",
    headline: "Your hormones changed the rules — nobody told you.",
    body: "Insulin resistance makes your body store fat faster than it burns it, so a plain calorie deficit rarely moves the scale. It was never about your willpower.",
    adapt:
      "Your plan manages insulin first — protein-forward desi meals, smart carb timing and strength-based workouts — so your hormones start working with you, not against you.",
    waMessage: "Hi Ridhi! I have PCOS and want to know how the 12-week program would work for me.",
  },
  {
    label: "Thyroid",
    headline: "“Eat less, move more” maths stops adding up.",
    body: "An underactive thyroid slows your metabolism itself. The same plan that works for your friend simply doesn't work for you — and that's biology, not failure.",
    adapt:
      "Your plan assumes a slower baseline: thyroid-friendly nutrition, sleep and stress protocols, and training that builds you up instead of burning you out.",
    waMessage: "Hi Ridhi! I have a thyroid condition and want to know how the 12-week program would work for me.",
  },
  {
    label: "Postpartum",
    headline: "Your body isn't broken. It's healing.",
    body: "Hormones are still recalibrating after delivery, sleep is broken, and generic 90-day shred plans ignore all of it.",
    adapt:
      "We pace fat loss gently, protect your energy (and milk supply, if you're feeding), and rebuild strength from the core out — on your timeline, not a template's.",
    waMessage: "Hi Ridhi! I'm postpartum and want to know how the 12-week program would work for me.",
  },
  {
    label: "Busy 9-to-9",
    headline: "Your calendar is the real diet-breaker.",
    body: "Back-to-back calls, desk lunches, travel weeks and zero energy at night. Plans that demand 2-hour gym sessions were never going to survive your Tuesday.",
    adapt:
      "Your plan bends around work — 30-minute home workouts, meals that survive office days and family dinners, and check-ins that fit between meetings.",
    waMessage: "Hi Ridhi! I have a hectic work schedule and want to know how the 12-week program would fit my routine.",
  },
];

export default function ConditionTabs() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-y border-ink-900/8 bg-cream-100 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">Which one is you?</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Same program. <em className="italic text-clay-600">Shaped around your body.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink-500">
            Tap what describes you — see exactly how the Metabolic Reset Method™ adapts to it.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {CONDITIONS.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-controls={`condition-${i}`}
                className={`rounded-full border-2 px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.08em] transition-all duration-300 sm:px-6 ${
                  i === active
                    ? "border-clay-600 bg-clay-600 text-cream-50 shadow-[0_12px_24px_-10px_rgba(180,72,32,0.6)]"
                    : "border-ink-900/15 bg-white text-ink-600 hover:border-clay-400 hover:text-clay-600"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* All four panels are server-rendered (crawlable); only the active one is shown */}
        <Reveal delay={200}>
          {CONDITIONS.map((condition, i) => {
            const wa = waLink(condition.waMessage);
            return (
              <div
                key={condition.label}
                id={`condition-${i}`}
                hidden={i !== active}
                className="mx-auto mt-8 max-w-3xl rounded-3xl border border-ink-900/8 bg-white p-8 shadow-[0_24px_48px_-24px_rgba(29,24,20,0.18)] sm:p-10"
              >
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                  {condition.headline}
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-500">{condition.body}</p>
                <div className="mt-5 rounded-2xl bg-sage-100/60 p-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-sage-700">
                    How your plan adapts
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{condition.adapt}</p>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaEvent("Contact", { placement: `condition_${condition.label}` })}
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:brightness-95"
                    >
                      <WhatsAppIcon className="h-4.5 w-4.5" /> Talk about {condition.label}
                    </a>
                  ) : (
                    <a
                      href="#apply"
                      className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-cream-50 transition hover:bg-clay-600"
                    >
                      Book your free call <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  <p className="text-xs font-semibold text-ink-400">
                    No obligation — just an honest conversation about your body.
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
