import crypto from "crypto";

const RAZORPAY_API = "https://api.razorpay.com/v1";

// Plan prices live in src/lib/plans.ts (single source of truth for UI, checkout and JSON-LD).

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function authHeader(): string {
  const creds = `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`;
  return `Basic ${Buffer.from(creds).toString("base64")}`;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export async function createRazorpayOrder(params: {
  amountPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  const res = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amountPaise,
      currency: "INR",
      receipt: params.receipt,
      notes: params.notes ?? {},
    }),
  });

  if (!res.ok) {
    throw new Error(`Razorpay order creation failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as RazorpayOrder;
}

/**
 * Verifies the checkout callback signature: HMAC-SHA256 of "order_id|payment_id"
 * with the key secret must equal razorpay_signature.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
