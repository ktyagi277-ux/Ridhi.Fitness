"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, Lock, ShieldCheck, MessageCircle } from "lucide-react";
import { GOAL_OPTIONS, STRUGGLE_OPTIONS, TIMELINE_OPTIONS } from "@/lib/validation";
import { trackMetaEvent } from "@/components/MetaPixel";

type LeadFormProps = {
  id: string;
  source: string;
  dark?: boolean;
  compactNote?: string;
};

type Fields = {
  name: string;
  phone: string;
  email: string;
  age: string;
  goal: string;
  struggle: string;
  startTimeline: string;
  consent: boolean;
  company: string;
};

const initialFields: Fields = {
  name: "",
  phone: "",
  email: "",
  age: "",
  goal: "",
  struggle: "",
  startTimeline: "",
  consent: false,
  company: "",
};

export function collectUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const current = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem("rj_utm") ?? "{}");
  } catch {
    stored = {};
  }
  const fresh: Record<string, string> = {};
  keys.forEach((key) => {
    const value = current.get(key);
    if (value) fresh[key] = value;
  });
  const merged = { ...stored, ...fresh };
  if (Object.keys(fresh).length > 0) {
    try {
      sessionStorage.setItem("rj_utm", JSON.stringify(merged));
    } catch {
      /* private mode */
    }
  }
  if (Object.keys(merged).length === 0) merged.utm_source = "direct";
  return merged;
}

export default function LeadForm({ id, source, dark = false, compactNote }: LeadFormProps) {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [formError, setFormError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    trackMetaEvent("ViewContent", { content_name: "Free Strategy Call Form" });
  }, []);

  const set = (key: keyof Fields, value: string | boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) nextErrors.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) nextErrors.email = "Please enter a valid email";
    if (!/^\+?[0-9\s\-()]{10,16}$/.test(fields.phone.trim())) nextErrors.phone = "Enter a valid 10-digit WhatsApp number";
    if (!fields.consent) nextErrors.consent = "Required so we can contact you";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, source, utm: collectUtm() }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; field?: string };

      if (!res.ok || !data.ok) {
        if (data.field) setErrors((prev) => ({ ...prev, [data.field as keyof Fields]: data.error }));
        else setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      trackMetaEvent("Lead", { content_name: source });
      setSuccess(true);
    } catch {
      setFormError("Network issue — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waText = encodeURIComponent(
    `Hi Ridhi! I'm ${fields.name || "interested"} — I just booked my free fat-loss strategy call. Looking forward to it!`
  );

  if (success) {
    return (
      <div id={id} className="flex min-h-[480px] flex-col items-center justify-center rounded-3xl border border-sage-200 bg-white p-8 text-center shadow-[0_24px_60px_-24px_rgba(29,24,20,0.25)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
          <CheckCircle2 className="h-9 w-9 text-sage-600" strokeWidth={1.75} />
        </div>
        <h3 className="font-display mt-6 text-3xl font-semibold text-ink-900">
          You&apos;re on the list, {fields.name.split(" ")[0] || "champ"}!
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-500">
          Your free strategy-call request is confirmed. Ridhi&apos;s team will reach out on your
          WhatsApp within 24 hours with available slots. Keep an eye on your inbox (and spam folder) too.
        </p>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-sage-700"
          >
            <MessageCircle className="h-4.5 w-4.5" /> Say hi on WhatsApp for a faster slot
          </a>
        )}
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          Step 1 of your transformation — done
        </p>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`relative scroll-mt-28 rounded-3xl border p-6 shadow-[0_24px_60px_-24px_rgba(29,24,20,0.28)] sm:p-8 ${
        dark ? "border-cream-200/20 bg-white" : "border-cream-200 bg-white"
      }`}
    >
      {/* header */}
      <div className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-clay-50 px-3.5 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-clay-500" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-clay-600" />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-clay-700">
            Free strategy call — ₹1,999 value
          </span>
        </div>
        <h3 className="font-display text-[26px] font-semibold leading-tight text-ink-900">
          Book your <em className="italic text-clay-600">free</em> fat-loss strategy call
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
          {compactNote ?? "20 minutes. Zero judgement. A clear roadmap for your first 10 kg — whether you join or not."}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* honeypot */}
        <input
          type="text"
          name="company"
          value={fields.company}
          onChange={(e) => set("company", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <label htmlFor={`${id}-name`} className="sr-only">Full name</label>
          <input
            id={`${id}-name`}
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
          <label htmlFor={`${id}-phone`} className="sr-only">WhatsApp number</label>
          <input
            id={`${id}-phone`}
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
          <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
          <input
            id={`${id}-email`}
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${id}-age`} className="sr-only">Age</label>
            <input
              id={`${id}-age`}
              type="number"
              inputMode="numeric"
              min={16}
              max={80}
              placeholder="Age"
              value={fields.age}
              onChange={(e) => set("age", e.target.value)}
              className={`field ${errors.age ? "field-error" : ""}`}
            />
            {errors.age && <p className="mt-1.5 text-xs font-semibold text-red-700">{errors.age}</p>}
          </div>
          <div>
            <label htmlFor={`${id}-goal`} className="sr-only">Weight you want to lose</label>
            <select
              id={`${id}-goal`}
              value={fields.goal}
              onChange={(e) => set("goal", e.target.value)}
              className="field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236e6357%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-9"
            >
              <option value="">Weight to lose?</option>
              {GOAL_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-struggle`} className="sr-only">Biggest struggle</label>
          <select
            id={`${id}-struggle`}
            value={fields.struggle}
            onChange={(e) => set("struggle", e.target.value)}
            className="field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236e6357%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-9"
          >
            <option value="">Your biggest struggle right now</option>
            {STRUGGLE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-timeline`} className="sr-only">When do you want to start?</label>
          <select
            id={`${id}-timeline`}
            value={fields.startTimeline}
            onChange={(e) => set("startTimeline", e.target.value)}
            className="field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236e6357%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-9"
          >
            <option value="">When do you want to start?</option>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-cream-100 p-3.5">
            <input
              type="checkbox"
              checked={fields.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer accent-clay-600"
            />
            <span className="text-xs leading-relaxed text-ink-500">
              I agree to be contacted on WhatsApp/email about the program. My data stays private — no spam, ever.
            </span>
          </label>
          {errors.consent && <p className="mt-1.5 text-xs font-semibold text-red-700">{errors.consent}</p>}
        </div>

        {formError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-600 px-6 py-4 text-[15px] font-extrabold uppercase tracking-[0.08em] text-cream-50 shadow-[0_16px_32px_-12px_rgba(180,72,32,0.55)] transition-all duration-300 hover:bg-clay-700 hover:shadow-[0_20px_40px_-12px_rgba(160,62,28,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Securing your spot…
            </>
          ) : (
            <>
              Claim my free call
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-5 pt-1 text-[11px] font-semibold text-ink-400">
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> 100% private</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> No spam, no pressure</span>
        </div>
      </form>
    </div>
  );
}
