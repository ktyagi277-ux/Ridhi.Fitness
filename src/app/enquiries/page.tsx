import type { Metadata } from "next";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft, Inbox, KeyRound, Mail, Phone, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enquiries Dashboard | Coach Ridhi Jain",
  robots: { index: false, follow: false },
};

function formatDate(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  // No fallback — the repo is public, so a hardcoded default key would leak.
  // If ADMIN_KEY is not set in the environment, the dashboard stays locked.
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || key !== adminKey) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-50 px-5">
        <div className="w-full max-w-sm rounded-3xl border border-cream-200 bg-white p-8 text-center shadow-[0_24px_60px_-24px_rgba(29,24,20,0.25)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
            <KeyRound className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <h1 className="font-display mt-5 text-2xl font-semibold">Enquiries Dashboard</h1>
          <p className="mt-2 text-sm text-ink-500">Enter your admin access key to view leads.</p>
          <form method="GET" action="/enquiries" className="mt-6 space-y-3">
            <input
              type="password"
              name="key"
              placeholder="Admin key"
              className="field text-center"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-ink-900 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-cream-50 transition hover:bg-clay-600"
            >
              Unlock dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  const leads = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(300);

  return (
    <main className="min-h-screen bg-cream-50 pb-20">
      <header className="sticky top-0 z-10 border-b border-ink-900/8 bg-cream-50/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p className="eyebrow text-clay-600">Admin</p>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Enquiries Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-2 text-xs font-extrabold text-sage-700">
              <Users className="h-3.5 w-3.5" /> {leads.length} leads
            </span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-500 transition hover:text-clay-600">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-6xl px-5 sm:px-8">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink-900/15 bg-white/60 py-20 text-center">
            <Inbox className="h-10 w-10 text-ink-400" strokeWidth={1.5} />
            <p className="font-display mt-4 text-xl font-semibold">No enquiries yet</p>
            <p className="mt-1 text-sm text-ink-500">New leads from the landing page will appear here instantly.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {leads.map((lead) => {
              const utm = (lead.utm ?? {}) as Record<string, string>;
              const utmText = Object.entries(utm)
                .filter(([, v]) => v)
                .map(([k, v]) => `${k.replace("utm_", "")}: ${v}`)
                .join(" · ");
              return (
                <article
                  key={lead.id}
                  className="rounded-2xl border border-cream-200 bg-white p-5 transition hover:border-clay-200 hover:shadow-[0_16px_40px_-24px_rgba(29,24,20,0.25)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold leading-tight">{lead.name}</p>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">
                        {formatDate(lead.createdAt)} IST · via {lead.source === "hero_form" ? "Hero form" : lead.source === "final_cta_form" ? "Bottom form" : lead.source}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-clay-50 text-clay-600 transition hover:bg-clay-600 hover:text-white"
                        aria-label={`Call ${lead.name}`}
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-sage-600 transition hover:bg-sage-600 hover:text-white"
                        aria-label={`Email ${lead.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-ink-600 sm:grid-cols-2 lg:grid-cols-3">
                    <p><span className="font-bold text-ink-400">WhatsApp:</span> {lead.phone}</p>
                    <p><span className="font-bold text-ink-400">Email:</span> {lead.email}</p>
                    {lead.age ? <p><span className="font-bold text-ink-400">Age:</span> {lead.age}</p> : null}
                    {lead.goal ? <p><span className="font-bold text-ink-400">Goal:</span> {lead.goal}</p> : null}
                    {lead.struggle ? <p><span className="font-bold text-ink-400">Struggle:</span> {lead.struggle}</p> : null}
                    {lead.startTimeline ? <p><span className="font-bold text-ink-400">Start:</span> {lead.startTimeline}</p> : null}
                  </div>

                  {utmText && (
                    <p className="mt-3 rounded-lg bg-cream-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-500">
                      {utmText}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
