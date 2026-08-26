import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { paymentOrderSchema } from "@/lib/validation";
import { createRazorpayOrder, getProgramPriceInr, isRazorpayConfigured } from "@/lib/razorpay";

export const dynamic = "force-dynamic";

// In-memory rate limit (single pm2 instance): max 5 order attempts per IP per 15 minutes.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const orderAttempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (orderAttempts.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    orderAttempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  orderAttempts.set(ip, recent);
  if (orderAttempts.size > 5000) {
    for (const [k, v] of orderAttempts) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) orderAttempts.delete(k);
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Payments are not enabled yet. Please WhatsApp us instead." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request. Please try again." }, { status: 400 });
  }

  const parsed = paymentOrderSchema.safeParse(body);
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

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const { name, email, phone, utm } = parsed.data;
  const amountPaise = getProgramPriceInr() * 100;

  try {
    const receipt = `mrm_${Date.now().toString(36)}`;
    const order = await createRazorpayOrder({
      amountPaise,
      receipt,
      notes: { name, email, phone, program: "Metabolic Reset Method — 12 weeks" },
    });

    await db.insert(payments).values({
      name,
      email,
      phone,
      amount: order.amount,
      currency: order.currency,
      razorpayOrderId: order.id,
      utm: utm ?? null,
    });

    return NextResponse.json({
      ok: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("[payment] Failed to create order:", error);
    return NextResponse.json(
      { ok: false, error: "Could not start the payment. Please try again or WhatsApp us." },
      { status: 500 }
    );
  }
}
