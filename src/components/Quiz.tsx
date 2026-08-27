"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";
import { trackMetaEvent } from "@/components/MetaPixel";

type Question = {
  key: "goal" | "condition" | "time";
  eyebrow: string;
  title: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    key: "goal",
    eyebrow: "Question 1 of 3",
    title: "How much weight do you want to lose?",
    options: ["3–5 kg", "5–10 kg", "10–20 kg", "20+ kg"],
  },
  {
    key: "condition",
    eyebrow: "Question 2 of 3",
    title: "Does any of this apply to you?",
    options: ["PCOS / Thyroid", "Postpartum", "None of these"],
  },
  {
    key: "time",
    eyebrow: "Question 3 of 3",
    title: "Can you give 45 minutes a day?",
    options: ["Yes, easily", "Most days", "Barely any time"],
  },
];

// Realistic 12-week ranges per goal bucket — deliberately conservative, no crash-diet promises.
const GOAL_RANGES: Record<string, [number, number]> = {
  "3–5 kg": [3, 5],
  "5–10 kg": [5, 8],
  "10–20 kg": [8, 12],
  "20+ kg": [10, 14],
};

function estimate(answers: Record<string, string>): { lo: number; hi: number; note: string } {
  const [lo, baseHi] = GOAL_RANGES[answers.goal] ?? [5, 8];
  let hi = baseHi;
  let note =
    "With a consistent plan, this range is very achievable in 12 weeks — without crash diets.";

  if (answers.condition === "PCOS / Thyroid") {
    hi = Math.max(lo, hi - 2);
    note =
      "With PCOS/thyroid we pace it slightly steadier so your hormones improve along the way — slower on the scale, permanent in the mirror.";
  } else if (answers.condition === "Postpartum") {
    hi = Math.max(lo, hi - 2);
    note =
      "Postpartum, we protect your recovery and energy first — steady fat loss that respects what your body just did.";
  }
  if (answers.time === "Barely any time") {
    hi = Math.max(lo, hi - 1);
  }
  return { lo, hi, note };
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= QUESTIONS.length;

  function pick(key: string, value: string) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step === QUESTIONS.length - 1) {
      trackMetaEvent("ViewContent", { content_name: "assessment_result" });
    }
    setStep(step + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  const result = done ? estimate(answers) : null;
  const wa = done
    ? waLink(
        `Hi Ridhi! I just took the 60-second check on your website. Goal: ${answers.goal}, situation: ${answers.condition}, time: ${answers.time}. It says I can realistically lose ${result!.lo}–${result!.hi} kg in 12 weeks — I'd love to know more.`
      )
    : null;

  return (
    <section id="assessment" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="eyebrow text-center text-clay-600">The 60-second check</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          How much can <em className="italic text-clay-600">you</em> lose in 12 weeks?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-ink-500">
          Three taps. No email, no phone number — just an honest answer.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-ink-900/8 bg-white p-8 shadow-[0_24px_48px_-24px_rgba(29,24,20,0.18)] sm:p-10">
          {!done ? (
            <>
              <div className="mb-6 flex gap-1.5">
                {QUESTIONS.map((q, i) => (
                  <span
                    key={q.key}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      i <= step ? "bg-clay-500" : "bg-cream-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-clay-600">
                {QUESTIONS[step].eyebrow}
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold leading-snug">
                {QUESTIONS[step].title}
              </h3>
              <div className="mt-6 space-y-3">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => pick(QUESTIONS[step].key, option)}
                    className="group flex w-full items-center justify-between rounded-2xl border-2 border-ink-900/10 bg-cream-50 px-5 py-4 text-left text-[15px] font-bold text-ink-700 transition-all duration-200 hover:border-clay-500 hover:bg-clay-50"
                  >
                    {option}
                    <ArrowRight className="h-4.5 w-4.5 text-ink-400 transition group-hover:translate-x-1 group-hover:text-clay-600" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                <Sparkles className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-400">
                Your realistic 12-week range
              </p>
              <p className="font-display mt-2 text-5xl font-semibold text-ink-900 sm:text-6xl">
                {result!.lo}–{result!.hi} <span className="text-3xl sm:text-4xl">kg</span>
              </p>
              <p className="mx-auto mt-4 max-w-sm text-[14.5px] leading-relaxed text-ink-500">{result!.note}</p>

              <div className="mt-8 space-y-3">
                <a
                  href="#apply"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-600 px-6 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-cream-50 transition hover:bg-clay-700"
                >
                  Map my 12 weeks — free call <ArrowRight className="h-4.5 w-4.5" />
                </a>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMetaEvent("Contact", { placement: "quiz_result" })}
                    className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-4 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:brightness-95"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> WhatsApp my result to the team
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={restart}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-ink-400 transition hover:text-clay-600"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Retake
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
