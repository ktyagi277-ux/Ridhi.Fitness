"use client";

import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { trackMetaEvent } from "@/components/MetaPixel";
import { waLink } from "@/lib/site";
import { TIERS, plansForTier, type Plan, type Tier } from "@/lib/plans";

/* ---------------------------------------------------------------------------
 * Plans section — no prices, no checkout. Every card sends the visitor straight
 * to WhatsApp (or to the free-call form when the number isn't configured).
 * Both tiers render on the same screen, one after the other — no toggle.
 * ------------------------------------------------------------------------- */

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
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

        <div className={`border-b pb-5 pt-2 ${rule}`}>
          <p className={`text-[11px] font-extrabold uppercase tracking-[0.24em] ${elite ? "text-gold-400" : "text-clay-600"}`}>
            {elite ? "Elite · 1:1 with Ridhi" : "Guided · Head Nutritionist"}
          </p>
          <h3 id={`plan-${plan.id}`} className={`font-display mt-1.5 text-[26px] font-semibold leading-tight tracking-tight ${strong}`}>
            {plan.name}
          </h3>
          <p className={`mt-1.5 text-[14px] font-semibold ${muted}`}>{plan.tagline}</p>
          <p className={`font-display mt-4 text-[34px] font-semibold leading-none tracking-tight ${strong}`}>
            {plan.duration}
          </p>
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

function TierBlock({ tier, first }: { tier: Tier; first: boolean }) {
  const plans = plansForTier(tier.id);
  const elite = tier.id === "elite";
  return (
    <div id={`plans-${tier.id}`} className={first ? "mt-12" : "mt-20 lg:mt-24"}>
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

      <div className={`mt-10 grid gap-6 md:grid-cols-2 ${plans.length > 2 ? "xl:grid-cols-4" : "mx-auto max-w-4xl"}`}>
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>

      {tier.note && (
        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13.5px] italic leading-relaxed text-ink-500">
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
    <section id="plans" className="scroll-mt-24 border-y border-ink-900/8 bg-cream-100 py-20 lg:py-28">
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
          <div className="mx-auto mt-14 grid max-w-4xl gap-3 rounded-3xl border border-ink-900/8 bg-white p-6 text-[13.5px] font-semibold text-ink-600 sm:grid-cols-3 sm:p-7">
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
