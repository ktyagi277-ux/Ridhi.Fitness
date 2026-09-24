"use client";

import { useSyncExternalStore } from "react";
import LogoBadge3D from "@/components/LogoBadge3D";

const QUERY = "(min-width: 1024px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnapshot = () => (window.matchMedia(QUERY).matches ? "desktop" : "phone");
const getServerSnapshot = () => "none";

/**
 * Renders the 3D badge in exactly one place depending on screen size:
 *  - desktop: the empty space under the hero copy (form is taller, so no height is added)
 *  - phone:   after the form, so the form is never pushed down and no text is covered
 * Only one WebGL canvas ever exists.
 */
export default function HeroBadge({ slot }: { slot: "desktop" | "phone" }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (current !== slot) return null;
  return slot === "desktop" ? (
    <LogoBadge3D className="mt-8 h-[280px] w-full max-w-[460px]" scale={0.8} />
  ) : (
    <LogoBadge3D className="mx-auto mt-10 h-[210px] w-full max-w-[420px]" scale={0.7} range={900} />
  );
}
