"use client";

import { useState } from "react";
import { ArrowRight, Check, Crown, Lock, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { trackMetaEvent } from "@/components/MetaPixel";
import { waLink } from "@/lib/site";
import { PLANS, TIERS, formatInr, perDay, type Plan, type PlanTier } from "@/lib/plans";

type PricingProps = {
  /** True when Razorpay keys are set — enables the "Choose plan" checkout button */
  checkoutEnabled: boolean;
};

/* ---------------------------------------------------------------------------
 * Tiny external store for "which plan is selected for checkout".
 * Written by the Pricing cards, read by PaymentCta via useSyncExternalStore.
 * Also seeded from ?plan=<id> so ads can deep-link straight to a plan.
 * ------------------------------------------------------------------------- */
let selectedPlanId: string | null = null;
const listeners = new Set<() => void>();

export function selectPlan(id: string) {
  selectedPlanId = id;
  listeners.forEach((listener) => listener());
}

export function subscribeSelectedPlan(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSelectedPlan(): string {
  if (selectedPlanId === null && typeof window !== "undefined") {
    selectedPlanId = new URLSearchParams(window.location.search).get("plan") ?? "";
  }
  return selectedPlanId ?? "";
}

export function getServerSelectedPlan(): string {
  return "";
}

function selectPlanForCheckout(plan: Plan) {
  trackMetaEvent("AddToCart", {
    content_name: plan.name,
    content_ids: [plan.id],
    value: plan.priceInr,
    currency: "INR",
  });
  selectPlan(plan.id);
  document.getElementById("pay")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PlanCard({ plan, index, checkoutEnabled }: { plan: Plan; index: number; checkoutEnabled: boolean }) {
  const elite = plan.tier === "elite";
  const wa = waLink(`Hi Ridhi! I'm interested in the ${plan.name} plan (${formatInr(plan.priceInr)}). Can you tell me more?`);

  const shell = elite
    ? "bg-ink-900 text-cream-50 border-ink-900 shadow-[0_32px_64px_-32px_rgba(23,19,16,0.7)]"
    : plan.featured
      ? "bg-white border-clay-400 shadow-[0_32px_64px_-32px_rgba(180,72,32,0.35)]"
      : "bg-white border-ink-900/8 hover:border-clay-200";
  const muted = elite ? "text-cream-100/60" : "text-ink-500";
  const strong = elite ? "text-cream-50" : "text-ink-900";
  const rule = elite ? "border-cream-100/10" : "border-ink-900/8";
  const tick = elite ? "bg-gold-400 text-ink-900" : "bg-sage-600 text-white";

  return (
    <Reveal delay={index * 90} className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-3xl border-2 p-6 transition-all duration-500 sm:p-7 ${shell}`}
        aria-labelledby={`plan-${plan.id}`}
      >
        {plan.badge && (
          <span
            className={`absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] ${
              elite ? "bg-gold-400 text-ink-900" : plan.featured ? "bg-clay-600 text-cream-50" : "bg-cream-200 text-ink-700"
            }`}
          >
            {elite ? <Crown className="h-3 w-3" strokeWidth={2.5} /> : <Sparkles className="h-3 w-3" strokeWidth={2.5} />}
            {plan.badge}
          </span>
        )}

        <div className="pt-2">
          <p className={`text-[11px] font-extrabold uppercase tracking-[0.24em] ${elite ? "text-gold-400" : "text-clay-600"}`}>
            {plan.duration}
          </p>
          <h3 id={`plan-${plan.id}`} className={`font-display mt-1.5 text-[26px] font-semibold leading-tight tracking-tight ${strong}`}>
            {plan.name}
          </h3>
          <p className={`mt-1.5 text-[14px] font-semibold ${muted}`}>{plan.tagline}</p>
        </div>

        <div className={`mt-5 flex flex-wrap items-end gap-x-2 gap-y-1 border-b pb-5 ${rule}`}>
          <span className={`font-display text-[40px] font-semibold leading-none tracking-tight ${strong}`}>
            {formatInr(plan.priceInr)}
          </span>
          <span className={`pb-1 text-[12px] font-bold ${muted}`}>
            one-time · {perDay(plan)}
          </span>
        </div>

        <ul className="mt-5 flex-1 space-y-3">
          {plan.inherits && (
            <li className={`flex items-start gap-3 text-[14px] font-extrabold ${strong}`}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${elite ? "bg-cream-50 text-ink-900" : "bg-ink-900 text-cream-50"}`}>
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              {plan.inherits}
            </li>
          )}
          {plan.features.map((feature) => (
            <li key={feature} className={`flex items-start gap-3 text-[14px] font-semibold ${elite ? "text-cream-100/85" : "text-ink-700"}`}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tick}`}>
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <p className={`mt-6 rounded-2xl px-4 py-3.5 text-[13px] leading-relaxed ${elite ? "bg-cream-50/5 text-cream-100/70" : "bg-cream-100 text-ink-600"}`}>
          {plan.bestFor}
        </p>

        <div className="mt-6 space-y-2.5">
          {checkoutEnabled ? (
            <button
              type="button"
              onClick={() => selectPlanForCheckout(plan)}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] transition-all duration-300 ${
                elite
                  ? "bg-gold-400 text-ink-900 hover:bg-gold-500"
                  : plan.featured
                    ? "bg-clay-600 text-cream-50 hover:bg-clay-700"
                    : "bg-ink-900 text-cream-50 hover:bg-clay-600"
              }`}
            >
              <Lock className="h-4 w-4" /> Choose this plan
            </button>
          ) : (
            <a
              href="#apply"
              onClick={() => trackMetaEvent("Lead", { placement: "pricing", content_name: plan.name })}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] transition-all duration-300 ${
                elite
                  ? "bg-gold-400 text-ink-900 hover:bg-gold-500"
                  : plan.featured
                    ? "bg-clay-600 text-cream-50 hover:bg-clay-700"
                    : "bg-ink-900 text-cream-50 hover:bg-clay-600"
              }`}
            >
              Start with a free call <ArrowRight className="h-4 w-4" />
            </a>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("Contact", { placement: "pricing_whatsapp", content_name: plan.name })}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                elite
                  ? "border-cream-100/15 text-cream-100/80 hover:border-cream-100/40"
                  : "border-ink-900/10 text-ink-700 hover:border-clay-400"
              }`}
            >
              <WhatsAppIcon className="h-4 w-4" /> Ask about this plan
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Pricing({ checkoutEnabled }: PricingProps) {
  const [tier, setTier] = useState<PlanTier>("guided");
  const activeTier = TIERS.find((t) => t.id === tier)!;
  const plans = PLANS.filter((p) => p.tier === tier);

  return (
    <section id="plans" className="scroll-mt-24 border-y border-ink-900/8 bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">Plans &amp; pricing</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Pick the level of support <em className="italic text-clay-600">you actually need.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink-500">
            Two formats, one method. <strong className="font-bold text-ink-800">Guided</strong> plans are run by your
            Head Nutritionist with Ridhi overseeing strategy. <strong className="font-bold text-ink-800">Elite</strong> plans
            are built and coached by Ridhi personally, every single week.
          </p>
        </Reveal>

        {/* tier toggle */}
        <Reveal delay={80}>
          <div className="mt-10 flex justify-center">
            <div role="tablist" aria-label="Plan type" className="inline-flex rounded-full border border-ink-900/10 bg-white p-1.5 shadow-sm">
              {TIERS.map((t) => {
                const active = t.id === tier;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    aria-controls={`plans-${t.id}`}
                    onClick={() => {
                      setTier(t.id);
                      trackMetaEvent("ViewContent", { content_name: `${t.label} plans` });
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] transition-all duration-300 sm:px-8 ${
                      active ? (t.id === "elite" ? "bg-ink-900 text-gold-400" : "bg-clay-600 text-cream-50") : "text-ink-500 hover:text-ink-900"
                    }`}
                  >
                    {t.id === "elite" && <Crown className="h-3.5 w-3.5" strokeWidth={2.5} />}
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* tier intro */}
        <div key={tier} id={`plans-${tier}`} role="tabpanel">
          <Reveal>
            <div className="mx-auto mt-8 max-w-2xl text-center">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900">{activeTier.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{activeTier.intro}</p>
            </div>
          </Reveal>

          <div className={`mt-12 grid gap-6 md:grid-cols-2 ${plans.length > 2 ? "xl:grid-cols-4" : "mx-auto max-w-4xl"}`}>
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} checkoutEnabled={checkoutEnabled} />
            ))}
          </div>

          {activeTier.note && (
            <Reveal delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-center text-[13.5px] italic leading-relaxed text-ink-500">
                &ldquo;{activeTier.note}&rdquo;
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={240}>
          <div className="mx-auto mt-12 grid max-w-4xl gap-3 rounded-3xl border border-ink-900/8 bg-white p-6 text-[13.5px] font-semibold text-ink-600 sm:grid-cols-3 sm:p-7">
            <p><span className="text-ink-900">Every plan is strategy-led by Ridhi</span> — Guided plans are executed by your Head Nutritionist, Elite plans by Ridhi herself.</p>
            <p><span className="text-ink-900">One-time payment, no subscription.</span> UPI, cards and netbanking via Razorpay, or pay on WhatsApp.</p>
            <p><span className="text-ink-900">Not sure which one?</span> Book the free strategy call — the team will recommend the right plan for your goal and budget.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
