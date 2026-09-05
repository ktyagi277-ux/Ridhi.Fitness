"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Zap } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { trackMetaEvent } from "@/components/MetaPixel";
import { waLink } from "@/lib/site";

/**
 * One-time "ad" popup. Appears after the visitor has spent DELAY_MS on the page,
 * can be closed (X, backdrop, Esc), and is then not shown again for HIDE_DAYS.
 * Never shows if the visitor already submitted the lead form in this session.
 */
const DELAY_MS = 15_000;
const HIDE_DAYS = 3;
const STORAGE_KEY = "rj_offer_seen";

function seenRecently(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < HIDE_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* private mode */
  }
}

export default function TimedOffer() {
  const [open, setOpen] = useState(false);
  const wa = waLink("Hi Ridhi! I saw the free strategy call offer on your website. Can I book a slot this week?");

  useEffect(() => {
    if (seenRecently()) return;
    const timer = window.setTimeout(() => {
      // Don't interrupt someone who is already filling the form or has finished it.
      const active = document.activeElement;
      const typing = active instanceof HTMLInputElement || active instanceof HTMLSelectElement;
      const submitted = Boolean(document.querySelector("[data-lead-submitted]"));
      if (typing || submitted) return;
      setOpen(true);
      markSeen();
      trackMetaEvent("ViewContent", { content_name: "timed_offer_popup" });
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-t-[28px] bg-ink-900 text-cream-50 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)] animate-offer-in sm:rounded-[28px]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition hover:bg-cream-50/25"
        >
          <X className="h-4.5 w-4.5" strokeWidth={2.5} />
        </button>

        <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
          {/* photo */}
          <div className="relative h-44 sm:h-auto sm:min-h-[340px]">
            <Image
              src="/images/ridhi-about-v2.jpg"
              alt="Coach Ridhi Jain"
              fill
              className="object-cover object-[50%_20%]"
              sizes="(max-width: 640px) 100vw, 220px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-ink-900" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-900">
              <Zap className="h-3 w-3" fill="currentColor" /> This week only
            </span>
          </div>

          {/* copy */}
          <div className="p-6 pt-4 sm:p-7 sm:pt-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-clay-400">Still thinking?</p>
            <h2 id="offer-title" className="font-display mt-2 text-[28px] font-semibold leading-[1.08] tracking-tight sm:text-[32px]">
              Only <em className="italic text-gold-400">10 free</em> strategy calls left this week.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-cream-100/70">
              20 minutes with Ridhi&apos;s team. You leave with a clear plan for your first 8–10 kg — whether you join or not.
            </p>

            <div className="mt-6 space-y-2.5">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackMetaEvent("Contact", { placement: "timed_offer_whatsapp" });
                    close();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:brightness-95"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" /> Chat on WhatsApp
                </a>
              )}
              <a
                href="#apply"
                onClick={() => {
                  trackMetaEvent("Lead", { placement: "timed_offer_form" });
                  close();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-cream-100/15 px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-cream-100/85 transition hover:border-cream-100/40"
              >
                Book the free call <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={close}
              className="mt-4 w-full text-center text-[11.5px] font-semibold text-cream-100/40 transition hover:text-cream-100/70"
            >
              No thanks, I&apos;ll keep reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
