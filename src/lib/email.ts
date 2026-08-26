import type { Enquiry, Payment } from "@/db/schema";

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value?: string | number | null): string {
  if (value === undefined || value === null || value === "") return "";
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #EDE5D6;color:#6E6357;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;">${esc(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #EDE5D6;color:#1D1814;font-size:14px;font-weight:600;">${esc(value)}</td>
    </tr>`;
}

function buildHtml(lead: Enquiry): string {
  const utm = (lead.utm ?? {}) as Record<string, string>;
  const utmRows = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => row(k, v))
    .join("");

  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F6F1E8;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:24px auto;background:#FBF8F3;border:1px solid #EDE5D6;border-radius:16px;overflow:hidden;">
    <div style="background:#1D1814;color:#FBF8F3;padding:20px 24px;">
      <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#C8592F;font-weight:700;">New Enquiry — coachridhijain.com</div>
      <div style="font-size:22px;margin-top:6px;">${esc(lead.name)} wants a Free Strategy Call</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Phone / WhatsApp", lead.phone)}
      ${row("Email", lead.email)}
      ${row("Age", lead.age)}
      ${row("Goal", lead.goal)}
      ${row("Biggest struggle", lead.struggle)}
      ${row("Wants to start", lead.startTimeline)}
      ${row("Form", lead.source)}
      ${utmRows}
      ${row("Submitted", lead.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}
    </table>
    <div style="padding:16px 24px;background:#EDE5D6;color:#453D35;font-size:12px;font-family:Arial,sans-serif;">
      Reply within 24&nbsp;hours for the highest conversion. Saved in the enquiries dashboard too.
    </div>
  </div>
</body>
</html>`;
}

function buildPaymentHtml(payment: Payment): string {
  const amountInr = (payment.amount / 100).toLocaleString("en-IN");
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F6F1E8;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:24px auto;background:#FBF8F3;border:1px solid #EDE5D6;border-radius:16px;overflow:hidden;">
    <div style="background:#1D1814;color:#FBF8F3;padding:20px 24px;">
      <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#5E7B5A;font-weight:700;">Payment Received — coachridhijain.com</div>
      <div style="font-size:22px;margin-top:6px;">${esc(payment.name)} paid ₹${esc(amountInr)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Amount", `₹${amountInr} ${payment.currency}`)}
      ${row("Phone / WhatsApp", payment.phone)}
      ${row("Email", payment.email)}
      ${row("Razorpay Order ID", payment.razorpayOrderId)}
      ${row("Razorpay Payment ID", payment.razorpayPaymentId)}
      ${row("Paid at", payment.paidAt?.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}
    </table>
    <div style="padding:16px 24px;background:#EDE5D6;color:#453D35;font-size:12px;font-family:Arial,sans-serif;">
      Verify the payment in the Razorpay dashboard, then WhatsApp the client to onboard them.
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends the enquiry notification email.
 * Priority: Resend API (RESEND_API_KEY) → SMTP via nodemailer (SMTP_*) → console log.
 * Never throws — email failures must not break lead capture.
 */
export async function sendEnquiryEmail(lead: Enquiry): Promise<void> {
  const subject = `New Lead: ${lead.name} — ${lead.goal ?? "Free Strategy Call"}`;
  await deliverEmail(subject, buildHtml(lead), `${lead.name} ${lead.phone}`);
}

/** Sends the payment notification email. Never throws. */
export async function sendPaymentEmail(payment: Payment): Promise<void> {
  const amountInr = (payment.amount / 100).toLocaleString("en-IN");
  const subject = `💰 Payment Received: ₹${amountInr} from ${payment.name}`;
  await deliverEmail(subject, buildPaymentHtml(payment), `${payment.name} ${payment.phone}`);
}

async function deliverEmail(subject: string, html: string, logContext: string): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;

  if (!to) {
    console.log("[email] NOTIFY_EMAIL not set. Captured:", logContext);
    return;
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM ?? "Ridhi Jain Leads <onboarding@resend.dev>",
          to: [to],
          subject,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
      return;
    }

    if (process.env.SMTP_HOST) {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      return;
    }

    console.log("[email] No provider configured (set RESEND_API_KEY or SMTP_*). Captured:", logContext);
  } catch (error) {
    console.error("[email] Failed to send notification:", error);
  }
}
