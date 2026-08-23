import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiryEmail } from "@/lib/email";
import { and, eq, gte } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
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

  const { company, consent, utm, ...data } = parsed.data;

  // Honeypot filled → silently accept but do nothing (spam bot)
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;

  try {
    // Idempotency: same phone within the last 24h → treat as success, don't duplicate.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await db
      .select({ id: enquiries.id })
      .from(enquiries)
      .where(and(eq(enquiries.phone, data.phone), gte(enquiries.createdAt, since)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const [lead] = await db
      .insert(enquiries)
      .values({
        ...data,
        utm: utm ?? null,
        ip: ip ?? null,
      })
      .returning();

    await sendEnquiryEmail(lead);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[enquiry] Failed to store enquiry:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Please WhatsApp us or try again in a minute." },
      { status: 500 }
    );
  }
}
