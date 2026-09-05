/**
 * Google Sheets lead store.
 *
 * Leads are POSTed to a Google Apps Script "web app" bound to the sheet
 * (see google-apps-script/Code.gs + GOOGLE-SHEET-SETUP.md). The script appends
 * one row per lead. Runs server-side only, so the webhook URL is never exposed.
 *
 * Env:
 *   GOOGLE_SHEET_WEBHOOK_URL  — the deployed Apps Script URL (…/exec)
 *   GOOGLE_SHEET_SECRET       — optional shared secret, must match SECRET in Code.gs
 */

export type LeadRow = {
  name: string;
  age: number;
  height: string;
  weight: string;
  profession: string;
  medicalHistory: string;
  majorConcern: string;
  preferredTime: string;
  phone: string;
  readyToInvest: string;
  country: string;
  expectedOutcome?: string;
  source?: string;
  utm: Record<string, string>;
  ip: string;
  page: string;
};

/** Column order in the sheet — keep in sync with HEADERS in google-apps-script/Code.gs */
export const SHEET_COLUMNS = [
  "timestamp",
  "name",
  "age",
  "height",
  "weight",
  "profession",
  "medical_history",
  "major_concern",
  "preferred_time",
  "phone",
  "ready_to_invest",
  "country",
  "expected_outcome",
  "source",
  "page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ip",
] as const;

function istTimestamp(date = new Date()): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/** Returns true when the row was accepted by the sheet. Never throws. */
export async function recordLeadInSheet(lead: LeadRow): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[sheet] GOOGLE_SHEET_WEBHOOK_URL not set — lead NOT recorded:", lead.name, lead.phone);
    return false;
  }

  const row: Record<(typeof SHEET_COLUMNS)[number], string | number> = {
    timestamp: istTimestamp(),
    name: lead.name,
    age: lead.age,
    height: lead.height,
    weight: lead.weight,
    profession: lead.profession,
    medical_history: lead.medicalHistory,
    major_concern: lead.majorConcern,
    preferred_time: lead.preferredTime,
    phone: lead.phone,
    ready_to_invest: lead.readyToInvest,
    country: lead.country,
    expected_outcome: lead.expectedOutcome ?? "",
    source: lead.source ?? "",
    page: lead.page,
    utm_source: lead.utm.utm_source ?? "",
    utm_medium: lead.utm.utm_medium ?? "",
    utm_campaign: lead.utm.utm_campaign ?? "",
    utm_content: lead.utm.utm_content ?? "",
    utm_term: lead.utm.utm_term ?? "",
    fbclid: lead.utm.fbclid ?? "",
    ip: lead.ip,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: "POST",
      // text/plain keeps Apps Script happy — e.postData.contents is the raw JSON string
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.GOOGLE_SHEET_SECRET ?? "", ...row }),
      redirect: "follow", // Apps Script answers with a 302 to googleusercontent.com
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);

    const text = await res.text();
    if (!res.ok) {
      console.error("[sheet] HTTP", res.status, text.slice(0, 200));
      return false;
    }
    try {
      const json = JSON.parse(text) as { ok?: boolean; error?: string };
      if (json.ok === false) {
        console.error("[sheet] Script rejected lead:", json.error);
        return false;
      }
    } catch {
      /* non-JSON body — treat 2xx as success */
    }
    return true;
  } catch (error) {
    console.error("[sheet] Failed to record lead:", error);
    return false;
  }
}
