import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { paymentVerifySchema } from "@/lib/validation";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { sendPaymentEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = paymentVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payment data." }, { status: 422 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  if (!verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    console.error("[payment] Signature verification failed for order:", razorpay_order_id);
    return NextResponse.json(
      { ok: false, error: "Payment verification failed. If money was deducted, WhatsApp us with your payment ID." },
      { status: 400 }
    );
  }

  try {
    const [payment] = await db
      .update(payments)
      .set({ status: "paid", razorpayPaymentId: razorpay_payment_id, paidAt: new Date() })
      .where(eq(payments.razorpayOrderId, razorpay_order_id))
      .returning();

    if (!payment) {
      // Signature is valid, so the payment is genuine even if our order row is missing.
      console.error("[payment] Verified payment for unknown order:", razorpay_order_id);
      return NextResponse.json({ ok: true });
    }

    await sendPaymentEmail(payment);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Payment already succeeded at Razorpay — never show a failure to the client here.
    console.error("[payment] Failed to record verified payment:", error);
    return NextResponse.json({ ok: true });
  }
}
