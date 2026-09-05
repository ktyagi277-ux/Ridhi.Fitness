export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ok: true,
    sheet: Boolean(process.env.GOOGLE_SHEET_WEBHOOK_URL),
    whatsapp: Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  });
}
