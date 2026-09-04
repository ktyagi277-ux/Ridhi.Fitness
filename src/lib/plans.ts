/**
 * Single source of truth for every coaching plan Ridhi sells.
 * Prices are read server-side at checkout (never trusted from the client),
 * rendered in the Pricing section, and published as Offers in JSON-LD.
 */

export type PlanTier = "guided" | "elite";

export type Plan = {
  id: string;
  tier: PlanTier;
  name: string;
  /** Short duration label shown on the card, e.g. "30 days" */
  duration: string;
  /** Duration in days — used for per-day pricing and the success screen */
  days: number;
  /** ISO 8601 duration for schema.org, e.g. "P30D" */
  isoDuration: string;
  priceInr: number;
  /** Small badge on the card, e.g. "Best starting point" */
  badge?: string;
  /** One-line positioning under the plan name */
  tagline: string;
  /** Visually featured card inside its tier */
  featured?: boolean;
  /** "Everything in …" line, rendered before the feature list */
  inherits?: string;
  features: string[];
  /** Who this plan is for — rendered as the closing note on the card */
  bestFor: string;
};

export type Tier = {
  id: PlanTier;
  label: string;
  title: string;
  intro: string;
  note?: string;
};

export const TIERS: Tier[] = [
  {
    id: "guided",
    label: "Guided",
    title: "Guided Plans",
    intro:
      "The perfect balance between expert guidance and accountability. Every Guided plan is built and executed by your Head Nutritionist, with strategy and progress overseen by Ridhi throughout.",
  },
  {
    id: "elite",
    label: "Elite",
    title: "Elite Plans",
    intro:
      "The coaching format with Ridhi's highest completion and results rate. Ridhi builds your plan personally and speaks to you every week — this is for people who want a complete transformation, not just a lower number on the scale.",
    note:
      "After years of coaching and personally testing different levels of accountability, this is the format where Ridhi has seen clients finish, hit their goal and keep the result most consistently.",
  },
];

export const PLANS: Plan[] = [
  {
    id: "guided-30",
    tier: "guided",
    name: "Guided 30 Days",
    duration: "30 days",
    days: 30,
    isoDuration: "P30D",
    priceInr: 5999,
    tagline: "Just the roadmap",
    features: [
      "Custom nutrition plan",
      "Custom training plan",
      "1 long intro call with Ridhi",
      "1 monthly call with Ridhi",
      "2 calls with the Head Nutritionist / Head Coach",
      "Weekly check-ins every Monday or Tuesday",
      "Ridhi accessible in your WhatsApp group throughout",
      "Recipe book included",
    ],
    bestFor:
      "Best suited for people who are already disciplined and consistent, and simply want an expert to tell them exactly what to do. Expect early wins in 30 days — the full 8–10 kg transformation is a 12-week journey.",
  },
  {
    id: "guided-60",
    tier: "guided",
    name: "Guided 60 Days",
    duration: "60 days",
    days: 60,
    isoDuration: "P60D",
    priceInr: 11999,
    badge: "Best starting point",
    tagline: "More support, more accountability",
    featured: true,
    inherits: "Everything in Guided 30 Days",
    features: [
      "8 calls with the Head Nutritionist / Head Coach",
      "More accountability and more support",
      "More time to create permanent results",
    ],
    bestFor:
      "The ideal first plan if you want enough runway to build habits that actually stick. Enough time for a clear, visible change — continue into the 90-day plan for the full 8–10 kg result.",
  },
  {
    id: "guided-90",
    tier: "guided",
    name: "Guided 90 Days",
    duration: "90 days",
    days: 90,
    isoDuration: "P90D",
    priceInr: 16999,
    badge: "Most economical",
    tagline: "The full 12-week transformation",
    inherits: "Everything in Guided 60 Days",
    features: [
      "Blood work analysis",
      "Supplement guidance",
      "2 recipe books included",
      "3 calls with Ridhi throughout the plan",
      "Unlimited WhatsApp support",
    ],
    bestFor:
      "The lowest per-day price on the menu — for people who are serious about a complete 12-week transformation.",
  },
  {
    id: "guided-180",
    tier: "guided",
    name: "Guided 6 Months",
    duration: "6 months",
    days: 180,
    isoDuration: "P6M",
    priceInr: 22999,
    badge: "Most comprehensive",
    tagline: "Where the most permanent results happen",
    inherits: "Everything in Guided 90 Days",
    features: [
      "6 calls with Ridhi throughout the plan",
      "Full strategy and revisions by Ridhi for 6 months",
      "More support, more accountability, more touch points",
    ],
    bestFor:
      "For people with a bigger goal or a long history of yo-yo dieting — six months is where results become permanent.",
  },
  {
    id: "elite-90",
    tier: "elite",
    name: "Elite 3 Months",
    duration: "3 months",
    days: 90,
    isoDuration: "P3M",
    priceInr: 19999,
    badge: "Most intensive",
    tagline: "Our most intensive 3-month transformation program",
    featured: true,
    features: [
      "Plan built by Ridhi personally",
      "1 long strategy call with Ridhi",
      "Weekly calls with Ridhi every Monday or Tuesday, throughout",
      "Daily accountability with the Head Coach",
      "Weekly 1:1 WhatsApp communication with Ridhi",
      "Recipe book included",
      "Unlimited WhatsApp support with the Head Coach",
    ],
    bestFor:
      "If you want a one-stop solution and simply want to be told what to do every step of the way, this is it.",
  },
  {
    id: "elite-180",
    tier: "elite",
    name: "Elite 6 Months",
    duration: "6 months",
    days: 180,
    isoDuration: "P6M",
    priceInr: 25999,
    badge: "Highest level of coaching",
    tagline: "The highest level of coaching we offer",
    inherits: "Everything in Elite 3 Months",
    features: [
      "Weekly calls with Ridhi every Monday or Tuesday, for the full 6 months",
      "Full 6 months of coaching, strategy revisions and adjustments by Ridhi",
      "Twice the runway to make the transformation permanent",
    ],
    bestFor:
      "For people who don't just want to lose weight, but want to completely transform their lifestyle, health and physique.",
  },
];

export const PLAN_IDS = PLANS.map((p) => p.id) as [string, ...string[]];

export const DEFAULT_PLAN_ID = "elite-90";

export function getPlan(id: string | null | undefined): Plan | undefined {
  if (!id) return undefined;
  return PLANS.find((p) => p.id === id);
}

export function plansForTier(tier: PlanTier): Plan[] {
  return PLANS.filter((p) => p.tier === tier);
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Whole-rupee price per day, e.g. "₹189/day" */
export function perDay(plan: Plan): string {
  return `${formatInr(Math.round(plan.priceInr / plan.days))}/day`;
}
