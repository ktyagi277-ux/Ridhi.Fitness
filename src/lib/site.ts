export const IG_URL = "https://www.instagram.com/coachridhijain";
export const IG_HANDLE = "@coachridhijain";

// WhatsApp number in international format without "+" or spaces, e.g. "919876543210".
// Set via NEXT_PUBLIC_WHATSAPP_NUMBER in .env — while empty, every WhatsApp button
// on the site stays hidden (or falls back to the enquiry form), so nothing breaks.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function waLink(message: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
