"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Crown, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { trackMetaEvent } from "@/components/MetaPixel";
import { waLink } from "@/lib/site";
import { TIERS, plansForTier, type Plan, type Tier } from "@/lib/plans";

/* ---------------------------------------------------------------------------
 * Plans section — no prices, no checkout. Every card sends the visitor straight
 * to WhatsApp (or to the free-call form when the number isn't configured).
 * Both tiers render on the same screen, one after the other — no toggle.
 *
 * Phone (< md): each tier is a horizontal swipe carousel of compact cards —
 * top 3 inclusions visible, the rest behind a "See all inclusions" tap. This
 * keeps the section to ~2 screens instead of ~10 stacked cards.
 * Desktop (md+): the same cards in a grid with everything expanded.
 * ------------------------------------------------------------------------- */

const PREVIEW_COUNT = 3;

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const elite = plan.tier === "elite";
  const wa = waLink(
    `Hi Ridhi! I'm interested in the ${plan.name} plan (${plan.duration}). Can you share the details and pricing?`
  );

  const shell = elite
    ? "bg-ink-900 text-cream-50 border-ink-900 shadow-[0_32px_64px_-32px_rgba(23,19,16,0.7)]"
    : plan.featured
      ? "bg-white border-clay-400 shadow-[0_32px_64px_-32px_rgba(180,72,32,0.35)]"
      : "bg-white border-ink-900/8 hover:border-clay-200";
  const muted = elite ? "text-cream-100/60" : "text-ink-500";
  const strong = elite ? "text-cream-50" : "text-ink-900";
  const rule = elite ? "border-cream-100/10" : "border-ink-900/8";
  const tick = elite ? "bg-gold-400 text-ink-900" : "bg-sage-600 text-white";
  const secondary = elite
    ? "border-cream-100/15 text-cream-100/80 hover:border-cream-100/40"
    : "border-ink-900/10 text-ink-700 hover:border-clay-400";

  const preview = plan.features.slice(0, PREVIEW_COUNT);
  const rest = plan.features.slice(PREVIEW_COUNT);
  // Anything past the preview is hidden on phones until tapped; always shown on md+.
  const extra = expanded ? "block" : "hidden md:block";
  const totalInclusions = plan.features.length + (plan.inherits ? 1 : 0);

  const featureItem = (feature: string) => (
    <li key={feature} className={`flex items-start gap-3 text-[14px] font-semibold ${elite ? "text-cream-100/85" : "text-ink-700"}`}>
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tick}`}>
        <Check className="h-3 w-3" strokeWidth={3.5} />
      </span>
      {feature}
    </li>
  );

  return (
    <Reveal delay={index * 90} className="h-full w-[84vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
      <article
        className={`relative flex h-full flex-col rounded-3xl border-2 p-5 pt-6 transition-all duration-500 sm:p-7 ${shell}`}
        aria-labelledby={`plan-${plan.id}`}
      >
        {plan.badge && (
          <span
            className={`absolute -top-3.5 left-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] sm:left-6 ${
              elite ? "bg-gold-400 text-ink-900" : plan.featured ? "bg-clay-600 text-cream-50" : "bg-cream-200 text-ink-700"
            }`}
          >
            {elite ? <Crown className="h-3 w-3" strokeWidth={2.5} /> : <Sparkles className="h-3 w-3" strokeWidth={2.5} />}
            {plan.badge}
          </span>
        )}

        <div className={`border-b pb-4 pt-1 md:pb-5 md:pt-2 ${rule}`}>
          <p className={`text-[11px] font-extrabold uppercase tracking-[0.24em] ${elite ? "text-gold-400" : "text-clay-600"}`}>
            {elite ? "Elite · 1:1 with Ridhi" : "Guided · Head Nutritionist"}
          </p>
          {/* Phone: name + duration on one line. Desktop: name, tagline, big duration. */}
          <div className="mt-1.5 flex items-end justify-between gap-3 md:block">
            <h3 id={`plan-${plan.id}`} className={`font-display text-[24px] font-semibold leading-tight tracking-tight md:text-[26px] ${strong}`}>
              {plan.name}
            </h3>
            <p className={`font-display shrink-0 text-[22px] font-semibold leading-none tracking-tight md:hidden ${strong}`}>
              {plan.duration}
            </p>
          </div>
          <p className={`mt-1.5 text-[13.5px] font-semibold md:text-[14px] ${muted}`}>{plan.tagline}</p>
          <p className={`font-display mt-4 hidden text-[34px] font-semibold leading-none tracking-tight md:block ${strong}`}>
            {plan.duration}
          </p>
        </div>

        <ul className="mt-4 flex-1 space-y-2.5 md:mt-5 md:space-y-3">
          {plan.inherits && (
            <li className={`flex items-start gap-3 text-[14px] font-extrabold ${strong}`}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${elite ? "bg-cream-50 text-ink-900" : "bg-ink-900 text-cream-50"}`}>
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              {plan.inherits}
            </li>
          )}
          {preview.map(featureItem)}
          {rest.map((feature) => (
            <li key={feature} className={`${extra} items-start gap-3 text-[14px] font-semibold ${expanded ? "flex" : "md:flex"} ${elite ? "text-cream-100/85" : "text-ink-700"}`}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tick}`}>
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {rest.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={`mt-3 inline-flex items-center gap-1.5 self-start text-[12px] font-extrabold uppercase tracking-[0.14em] md:hidden ${
              elite ? "text-gold-400" : "text-clay-600"
            }`}
          >
            {expanded ? "Show less" : `See all ${totalInclusions} inclusions`}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.5} />
          </button>
        )}

        <p className={`mt-5 rounded-2xl px-4 py-3.5 text-[13px] leading-relaxed md:mt-6 ${extra} ${elite ? "bg-cream-50/5 text-cream-100/70" : "bg-cream-100 text-ink-600"}`}>
          {plan.bestFor}
        </p>

        <div className="mt-5 space-y-2.5 md:mt-6">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("Contact", { placement: "plans_whatsapp", content_name: plan.name })}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:brightness-95"
            >
              <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
            </a>
          ) : (
            <a
              href="#apply"
              onClick={() => trackMetaEvent("Lead", { placement: "plans", content_name: plan.name })}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] transition-all duration-300 ${
                elite ? "bg-gold-400 text-ink-900 hover:bg-gold-500" : "bg-clay-600 text-cream-50 hover:bg-clay-700"
              }`}
            >
              Start with a free call <ArrowRight className="h-4 w-4" />
            </a>
          )}
          <a
            href="#apply"
            onClick={() => trackMetaEvent("Lead", { placement: "plans_free_call", content_name: plan.name })}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] transition-colors ${secondary}`}
          >
            Free call first <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

/** Phone-only swipe indicator: one dot per card, follows the scroll position. */
function useActiveSlide(ref: React.RefObject<HTMLDivElement | null>, count: number) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const slide = el.scrollWidth / count;
      setActive(Math.min(count - 1, Math.round(el.scrollLeft / slide)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [ref, count]);
  return active;
}

function TierBlock({ tier, first }: { tier: Tier; first: boolean }) {
  const plans = plansForTier(tier.id);
  const elite = tier.id === "elite";
  const trackRef = useRef<HTMLDivElement | null>(null);
  const active = useActiveSlide(trackRef, plans.length);

  return (
    <div id={`plans-${tier.id}`} className={first ? "mt-10 md:mt-12" : "mt-14 md:mt-20 lg:mt-24"}>
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] ${
              elite ? "bg-ink-900 text-gold-400" : "bg-clay-600 text-cream-50"
            }`}
          >
            {elite && <Crown className="h-3.5 w-3.5" strokeWidth={2.5} />}
            {tier.label} plans
          </span>
          <h3 className="font-display mt-5 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">{tier.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{tier.intro}</p>
        </div>
      </Reveal>

      {/* Phone: snap carousel that bleeds to the screen edge. md+: grid. */}
      <div
        ref={trackRef}
        className={`-mx-5 mt-8 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 pt-4 md:items-stretch [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-10 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:pt-0 ${
          plans.length > 2 ? "xl:grid-cols-4" : "md:mx-auto md:max-w-4xl"
        }`}
        style={{ scrollPaddingLeft: 20 }}
      >
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>

      {/* Phone-only: dots + swipe hint */}
      <div className="mt-3 flex items-center justify-center gap-3 md:hidden" aria-hidden="true">
        <span className="flex items-center gap-1.5">
          {plans.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? (elite ? "w-5 bg-ink-900" : "w-5 bg-clay-600") : "w-1.5 bg-ink-900/20"
              }`}
            />
          ))}
        </span>
        <span className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-ink-400">
          Swipe · {active + 1}/{plans.length}
        </span>
      </div>

      {tier.note && (
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[13.5px] italic leading-relaxed text-ink-500 md:mt-8">
            &ldquo;{tier.note}&rdquo;
          </p>
        </Reveal>
      )}
    </div>
  );
}

export default function Pricing() {
  const wa = waLink("Hi Ridhi! I'm not sure which plan is right for me. Can you help me choose?");

  return (
    <section id="plans" className="scroll-mt-24 border-y border-ink-900/8 bg-cream-100 py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">Coaching plans</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Pick the level of support <em className="italic text-clay-600">you actually need.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink-500">
            Two formats, one method. <strong className="font-bold text-ink-800">Guided</strong> plans are run by your
            Head Nutritionist with Ridhi overseeing strategy. <strong className="font-bold text-ink-800">Elite</strong> plans
            are built and coached by Ridhi personally, every single week.
          </p>
        </Reveal>

        {TIERS.map((tier, i) => (
          <TierBlock key={tier.id} tier={tier} first={i === 0} />
        ))}

        <Reveal delay={240}>
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-3xl border border-ink-900/8 bg-white p-6 text-[13.5px] font-semibold text-ink-600 sm:grid-cols-3 sm:p-7 md:mt-14">
            <p><span className="text-ink-900">Every plan is strategy-led by Ridhi</span> — Guided plans are executed by your Head Nutritionist, Elite plans by Ridhi herself.</p>
            <p><span className="text-ink-900">Pricing is shared personally on WhatsApp</span> — one-time fee, no subscription, no payment on this website.</p>
            <p>
              <span className="text-ink-900">Not sure which one?</span>{" "}
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="font-extrabold text-clay-600 hover:underline">
                  Message the team on WhatsApp
                </a>
              ) : (
                <a href="#apply" className="font-extrabold text-clay-600 hover:underline">Book the free strategy call</a>
              )}{" "}
              and they&apos;ll recommend the right plan for your goal and budget.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
