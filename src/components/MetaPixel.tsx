"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Loads the Meta (Facebook/Instagram) Pixel when NEXT_PUBLIC_META_PIXEL_ID is set.
 * Tracks PageView automatically; Lead events are fired from the enquiry form.
 * Safe no-op when the env var is missing — nothing breaks.
 */
export default function MetaPixel() {
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId || window.fbq) return;

    const w = window as unknown as Record<string, unknown>;
    const doc = document;
    const fbq = function (...args: unknown[]) {
      (fbq as unknown as { queue: unknown[] }).queue.push(args);
    } as unknown as {
      (...args: unknown[]): void;
      queue: unknown[];
      loaded?: boolean;
      version?: string;
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    w.fbq = fbq;
    w._fbq = fbq;

    const script = doc.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const first = doc.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(script, first);

    fbq("init", pixelId);
    fbq("track", "PageView");
  }, []);

  return null;
}

export function trackMetaEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, data);
  }
}
