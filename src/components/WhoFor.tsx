"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";
import { trackMetaEvent } from "@/components/MetaPixel";

type Persona = { label: string; headline: string; body: string; adapt: string; waMessage: string };

const PERSONAS: Persona[] = [
  {
    label: "Busy women",
    headline: "Your calendar is the real diet-breaker.",
    body: "Back-to-back days, meals on the go, zero energy at night. Plans that need two free hours were never going to survive your Tuesday.",
    adapt: "Your plan bends around your week — meals that survive busy days, 30-minute home workouts when they fit, and check-ins that don't need a free evening.",
    waMessage: "Hi Ridhi! I have a very busy schedule and want to know how RJ Fitness would fit my routine.",
  },
  {
    label: "Mothers",
    headline: "Your body isn't broken. It's healing.",
    body: "Hormones still recalibrating, broken sleep, a child who comes first. Generic shred plans ignore all of it.",
    adapt: "We pace fat loss gently, protect your energy (and milk supply, if you're feeding), and rebuild strength from the core out — on your timeline, not a template's.",
    waMessage: "Hi Ridhi! I'm a mother and want to know how RJ Fitness would work for me.",
  },
  {
    label: "Professionals & entrepreneurs",
    headline: "Deadlines, travel, client dinners — and still results.",
    body: "Work eats your day and your discipline. You don't need more information; you need a system that runs even when you can't.",
    adapt: "Habit coaching over willpower, comeback strategies for travel weeks, and accountability that keeps you on track between meetings.",
    waMessage: "Hi Ridhi! I'm a working professional / entrepreneur and want to know how RJ Fitness would fit my life.",
  },
  {
    label: "Women 30+",
    headline: "The maths that worked at 25 stops adding up.",
    body: "Slower metabolism, PCOD, thyroid, stress — the same plan that works for your younger colleague simply doesn't work for you. That's biology, not failure.",
    adapt: "Hormone-aware nutrition, sleep and stress protocols, and training that builds you up instead of burning you out — so results stick this time.",
    waMessage: "Hi Ridhi! I'm 30+ and want to know how RJ Fitness would work for me.",
  },
];

/** Section 8 — Who this is for. */
export default function WhoFor() {
  const [active, setActive] = useState(0);
  const p = PERSONAS[active];
  const wa = waLink(p.waMessage);

  return (
    <section id="who" className="scroll-mt-24 border-y border-ink-900/8 bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">Who this is for</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            Built for the life <em className="italic text-clay-600">you actually have.</em>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full border border-ink-900/10 bg-white/80 p-1.5 backdrop-blur">
              {PERSONAS.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] transition-colors sm:px-5 ${
                    active === i ? "bg-ink-900 text-cream-50" : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div key={active} className="mt-8 grid gap-6 rounded-[32px] border border-ink-900/8 bg-white p-7 shadow-[0_32px_64px_-40px_rgba(29,24,20,0.35)] sm:p-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-ink-400">The problem</p>
              <h3 className="font-display mt-3 text-[28px] font-semibold leading-tight tracking-tight sm:text-4xl">{p.headline}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
            </div>
            <div className="rounded-3xl bg-cream-100 p-6 sm:p-7">
              <p className="eyebrow text-sage-700">How your plan adapts</p>
              <p className="mt-3 text-[15.5px] font-semibold leading-relaxed text-ink-800">{p.adapt}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMetaEvent("Contact", { placement: "who_for", persona: p.label })}
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:brightness-95"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
                  </a>
                )}
                <a href="#apply" className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-ink-800 transition hover:border-clay-400 hover:text-clay-600">
                  Book a discovery call <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
