import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const STAGES = [
  { label: "Before", image: "/images/ridhi-before.jpg", alt: "Ridhi before her postpartum transformation", note: "Postpartum" },
  { label: "After", image: "/images/ridhi-after.jpg", alt: "Ridhi after her transformation", note: "13 kg down" },
  { label: "Maintained", image: "/images/ridhi-about-v2.jpg", alt: "Ridhi today — result maintained", note: "Today" },
];

/** Section 3 — Ridhi's own transformation: Before → After → Maintained. */
export default function Transformation() {
  return (
    <section id="transformation" className="relative scroll-mt-24 overflow-x-clip border-t border-ink-900/8 py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-clay-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-clay-600">My own transformation · I had to build it too</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
              I didn&apos;t just learn transformation. <em className="italic text-clay-600">I had to live it.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-600">
              Motherhood changed my body, routine and priorities too. My own postpartum journey taught me something that still shapes the way I coach today:
            </p>
            <p className="font-display mx-auto mt-6 max-w-2xl text-2xl font-medium italic leading-snug text-ink-800 sm:text-[28px]">
              You don&apos;t need perfect conditions to transform.
              <br />
              You need a system that works when life isn&apos;t perfect.
            </p>
          </Reveal>
        </div>

        {/* Before → After → Maintained */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {STAGES.map((s, i) => (
            <Reveal key={s.label} delay={120 + i * 100} className="relative">
              <div className="overflow-hidden rounded-[28px] border border-ink-900/8 bg-white shadow-[0_28px_56px_-32px_rgba(29,24,20,0.35)]">
                <div className="relative aspect-[4/5] w-full bg-cream-200">
                  <Image src={s.image} alt={s.alt} fill className="object-cover object-top" sizes="(max-width: 640px) 90vw, 33vw" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream-50/92 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-clay-700 backdrop-blur">
                    {s.note}
                  </span>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <p className="font-display text-2xl font-semibold tracking-tight">{s.label}</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 font-display text-[14px] font-semibold text-cream-50">{i + 1}</span>
                </div>
              </div>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-clay-600 text-cream-50 shadow-[0_12px_24px_-10px_rgba(180,72,32,0.7)] sm:flex lg:-right-6"
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
