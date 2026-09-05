import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { recordLeadInSheet } from "@/lib/sheet";
import { isRateLimited } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

/**
 * Lead capture: validates the form and appends a row to the Google Sheet.
 * No database, no payments — the client sends the visitor to WhatsApp right after.
 * A Sheet failure is logged but never blocks the visitor (they still reach WhatsApp).
 */
export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes or message us on WhatsApp." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request. Please try again." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: issue?.message ?? "Please check the form and try again.",
        field: typeof issue?.path?.[0] === "string" ? issue.path[0] : undefined,
      },
      { status: 422 }
    );
  }

  const { company, utm, consent: _consent, ...lead } = parsed.data;

  // Honeypot filled → silently accept but do nothing (spam bot)
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp === "unknown" ? "" : clientIp;

  const recorded = await recordLeadInSheet({
    ...lead,
    utm: utm ?? {},
    ip,
    page: req.headers.get("referer") ?? "",
  });

  return NextResponse.json({ ok: true, recorded });
}
