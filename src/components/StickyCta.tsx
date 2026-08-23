"use client";

import { ArrowRight } from "lucide-react";
import { trackMetaEvent } from "@/components/MetaPixel";

export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="border-t border-ink-900/10 bg-cream-50/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <a
          href="#apply"
          onClick={() => trackMetaEvent("Contact", { placement: "sticky_bar" })}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-clay-600 py-4 text-[14px] font-extrabold uppercase tracking-[0.1em] text-cream-50 shadow-[0_16px_32px_-12px_rgba(180,72,32,0.6)] transition active:scale-[0.98]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-cream-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cream-50" />
          </span>
          Book my free strategy call
          <ArrowRight className="h-4.5 w-4.5" />
        </a>
      </div>
    </div>
  );
}
