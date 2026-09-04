"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { CheckCircle2, CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { collectUtm } from "@/components/LeadForm";
import { trackMetaEvent } from "@/components/MetaPixel";
import { getSelectedPlan, getServerSelectedPlan, selectPlan, subscribeSelectedPlan } from "@/components/Pricing";
import { DEFAULT_PLAN_ID, PLANS, TIERS, formatInr, getPlan } from "@/lib/plans";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  config: { display: { hide: Array<{ method: string }> } };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: () => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentCta() {
  // Selected plan comes from the Pricing cards, the <select> below, or an ad
  // deep-link such as /program?plan=elite-90#pay — all via one shared store.
  const selectedPlanId = useSyncExternalStore(subscribeSelectedPlan, getSelectedPlan, getServerSelectedPlan);
  const [fields, setFields] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "email", string>>>({});
  const [formError, setFormError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const plan = getPlan(selectedPlanId) ?? getPlan(DEFAULT_PLAN_ID)!;
  const priceDisplay = formatInr(plan.priceInr);

  const set = (key: "name" | "phone" | "email", value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const nextErrors: typeof errors = {};
    if (fields.name.trim().length < 2) nextErrors.name = "Please enter your full name";
    if (!/^\+?[0-9\s\-()]{10,16}$/.test(fields.phone.trim())) nextErrors.phone = "Enter a valid 10-digit WhatsApp number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) nextErrors.email = "Please enter a valid email";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setProcessing(true);
    trackMetaEvent("InitiateCheckout", {
      content_name: plan.name,
      content_ids: [plan.id],
      value: plan.priceInr,
      currency: "INR",
    });

    try {
      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, planId: plan.id, utm: collectUtm() }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        field?: string;
        keyId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
      };

      if (!res.ok || !data.ok || !data.keyId || !data.orderId) {
        if (data.field && data.field in fields) setErrors((prev) => ({ ...prev, [data.field as "name" | "phone" | "email"]: data.error }));
        else setFormError(data.error ?? "Something went wrong. Please try again.");
        setProcessing(false);
        return;
      }

      const loaded = await loadCheckoutScript();
      if (!loaded || !window.Razorpay) {
        setFormError("Could not load the secure payment window. Please check your connection and try again.");
        setProcessing(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount ?? plan.priceInr * 100,
        currency: data.currency ?? "INR",
        name: "Coach Ridhi Jain",
        description: `${plan.name} — Metabolic Reset Method™`,
        order_id: data.orderId,
        prefill: {
          name: fields.name.trim(),
          email: fields.email.trim(),
          contact: fields.phone.trim(),
        },
        // Full payment only — EMI hidden per Ridhi's requirement
        config: { display: { hide: [{ method: "emi" }] } },
        theme: { color: "#C8592F" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verify = (await verifyRes.json()) as { ok: boolean; error?: string };
            if (verifyRes.ok && verify.ok) {
              trackMetaEvent("Purchase", {
                content_name: plan.name,
                content_ids: [plan.id],
                value: plan.priceInr,
                currency: "INR",
              });
              setSuccess(true);
            } else {
              setFormError(verify.error ?? "Payment verification failed. WhatsApp us with your payment ID.");
            }
          } catch {
            setFormError("Payment done but we couldn't confirm it here. WhatsApp us your payment ID — we'll sort it out.");
          } finally {
            setProcessing(false);
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      });

      razorpay.on("payment.failed", () => {
        setFormError("Payment didn't go through. No money was deducted for failed attempts — please try again.");
        setProcessing(false);
      });

      razorpay.open();
    } catch {
      setFormError("Network issue — please check your connection and try again.");
      setProcessing(false);
    }
  }

  return (
    <section id="pay" className="scroll-mt-24 border-t border-ink-900/8 bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-clay-600">Ready to commit?</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Skip the queue — <em className="italic text-clay-600">reserve your spot today.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Already follow Ridhi and know which plan is for you? Pick it below and secure your place in the
              next batch right now. Payment is processed securely by Razorpay — UPI, cards and netbanking all work.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3.5">
              {[
                "Onboarding call within 24 hours of payment",
                "Custom nutrition & training plan built around your routine",
                "Strategy overseen by Ridhi on every plan — Guided or Elite",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] font-bold text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" strokeWidth={2} />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          {success ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-sage-200 bg-white p-8 text-center shadow-[0_24px_60px_-24px_rgba(29,24,20,0.25)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
                <CheckCircle2 className="h-9 w-9 text-sage-600" strokeWidth={1.75} />
              </div>
              <h3 className="font-display mt-6 text-3xl font-semibold text-ink-900">
                Payment received, {fields.name.split(" ")[0] || "champ"}!
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-500">
                Welcome to the <strong className="font-bold text-ink-800">{plan.name}</strong> plan. You&apos;ll get a
                confirmation on WhatsApp and email, and Ridhi&apos;s team will call you within 24 hours to start your onboarding.
              </p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Your {plan.duration} transformation starts now
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(29,24,20,0.28)] sm:p-8">
              <div className="mb-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-clay-50 px-3.5 py-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-clay-700" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-clay-700">
                    Secure checkout via Razorpay
                  </span>
                </div>
                <h3 className="font-display text-[26px] font-semibold leading-tight text-ink-900">
                  {plan.name} — <span className="text-clay-600">{priceDisplay}</span>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  One-time payment for {plan.duration}. UPI, cards &amp; netbanking supported.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="pay-plan" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                    Your plan
                  </label>
                  <select
                    id="pay-plan"
                    value={plan.id}
                    onChange={(e) => selectPlan(e.target.value)}
                    className="field cursor-pointer"
                  >
                    {TIERS.map((tier) => (
                      <optgroup key={tier.id} label={tier.title}>
                        {PLANS.filter((p) => p.tier === tier.id).map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {formatInr(p.priceInr)}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <a href="#plans" className="mt-1.5 inline-block text-xs font-semibold text-ink-400 underline-offset-2 hover:text-clay-600 hover:underline">
                    Compare what each plan includes
                  </a>
                </div>

                <div>
                  <label htmlFor="pay-name" className="sr-only">Full name</label>
                  <input
                    id="pay-name"
                    type="text"
                    placeholder="Full name *"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={`field ${errors.name ? "field-error" : ""}`}
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-700">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="pay-phone" className="sr-only">WhatsApp number</label>
                  <input
                    id="pay-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="WhatsApp number *"
                    value={fields.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={`field ${errors.phone ? "field-error" : ""}`}
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-700">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="pay-email" className="sr-only">Email address</label>
                  <input
                    id="pay-email"
                    type="email"
                    inputMode="email"
                    placeholder="Email address *"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={`field ${errors.email ? "field-error" : ""}`}
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-700">{errors.email}</p>}
                </div>

                {formError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-600 px-6 py-4 text-[15px] font-extrabold uppercase tracking-[0.08em] text-cream-50 shadow-[0_16px_32px_-12px_rgba(180,72,32,0.55)] transition-all duration-300 hover:bg-clay-700 hover:shadow-[0_20px_40px_-12px_rgba(160,62,28,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Opening secure payment…
                    </>
                  ) : (
                    <>
                      <Lock className="h-4.5 w-4.5" /> Pay {priceDisplay} securely
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-5 pt-1 text-[11px] font-semibold text-ink-400">
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> PCI-DSS secure</span>
                  <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Powered by Razorpay</span>
                </div>
              </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
