"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import { trackMetaEvent } from "@/components/MetaPixel";
import { FAQS } from "@/lib/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="eyebrow text-center text-clay-600">Before you ask</p>
        <h2 className="font-display mt-4 text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Questions? <em className="italic text-clay-600">Answered.</em>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3.5">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.q} delay={i * 60}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-clay-200 bg-white shadow-[0_16px_40px_-24px_rgba(29,24,20,0.25)]" : "border-ink-900/8 bg-white/60 hover:border-ink-900/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(isOpen ? -1 : i);
                    if (!isOpen) trackMetaEvent("FAQOpened", { question: faq.q });
                  }}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold leading-snug sm:text-xl">{faq.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                      isOpen ? "rotate-45 bg-clay-600 text-cream-50" : "bg-cream-200 text-ink-700"
                    }`}
                  >
                    <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
                  </span>
                </button>
                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
