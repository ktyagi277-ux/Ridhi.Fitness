"use client";

import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";
import { trackMetaEvent } from "@/components/MetaPixel";

export default function WhatsAppFloat() {
  const href = waLink(
    "Hi Ridhi! I saw your website and want to know more about the 12-week Metabolic Reset program."
  );
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackMetaEvent("Contact", { placement: "whatsapp_float" })}
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_32px_-8px_rgba(18,140,66,0.55)] transition-transform duration-300 hover:scale-110 md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
