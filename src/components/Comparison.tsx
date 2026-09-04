import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";

type Row = {
  label: string;
  pdf: boolean | "sometimes";
  apps: boolean | "sometimes";
  trainer: boolean | "sometimes";
};

const ROWS: Row[] = [
  { label: "Built around YOUR hormones — PCOS, thyroid, postpartum", pdf: false, apps: false, trainer: false },
  { label: "Desi meals from your own kitchen — dal, roti, sabzi stay", pdf: false, apps: "sometimes", trainer: false },
  { label: "Plan adjusts every week to how your body responds", pdf: false, apps: false, trainer: "sometimes" },
  { label: "Someone checks in on YOU — not the other way around", pdf: false, apps: false, trainer: false },
  { label: "Accountability on the days motivation runs out", pdf: false, apps: false, trainer: "sometimes" },
  { label: "Maintenance built in, so the weight stays off", pdf: false, apps: false, trainer: false },
];

function Cell({ value }: { value: boolean | "sometimes" }) {
  if (value === "sometimes") {
    return <span className="text-[11px] font-bold uppercase tracking-wide text-ink-400">Sometimes</span>;
  }
  return value ? (
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-white">
      <Check className="h-4 w-4" strokeWidth={3} />
    </span>
  ) : (
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-cream-200 text-ink-400">
      <X className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="eyebrow text-center text-clay-600">The honest comparison</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Why a coach — not another <em className="italic text-clay-600">PDF, app or ChatGPT plan.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink-500">
          You&apos;ve probably tried at least one of these. Here&apos;s exactly where they fall short.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-12 overflow-x-auto rounded-3xl border border-ink-900/8 bg-white shadow-[0_24px_48px_-24px_rgba(29,24,20,0.15)]">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="bg-ink-900 text-cream-50">
                <th className="px-6 py-5 text-[13px] font-extrabold uppercase tracking-[0.1em]">
                  What actually gets you results
                </th>
                <th className="px-4 py-5 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-cream-100/70">
                  Diet PDF
                </th>
                <th className="px-4 py-5 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-cream-100/70">
                  Apps &amp; ChatGPT
                </th>
                <th className="px-4 py-5 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-cream-100/70">
                  Gym trainer
                </th>
                <th className="bg-clay-600 px-4 py-5 text-center text-[12px] font-extrabold uppercase tracking-[0.08em]">
                  Metabolic Reset™
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-cream-100/60" : ""}>
                  <td className="px-6 py-4 text-[14.5px] font-semibold text-ink-700">{row.label}</td>
                  <td className="px-4 py-4 text-center"><Cell value={row.pdf} /></td>
                  <td className="px-4 py-4 text-center"><Cell value={row.apps} /></td>
                  <td className="px-4 py-4 text-center"><Cell value={row.trainer} /></td>
                  <td className="bg-clay-50/70 px-4 py-4 text-center"><Cell value={true} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={220}>
        <p className="mt-8 text-center text-sm font-semibold text-ink-400">
          Information was never your problem. <span className="text-ink-800">Accountability was.</span>
        </p>
      </Reveal>
    </section>
  );
}
