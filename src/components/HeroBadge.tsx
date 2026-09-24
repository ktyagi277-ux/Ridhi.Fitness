"use client";

import LogoBadge3D from "@/components/LogoBadge3D";

/** The 3D RJ badge for the hero's right column (stacks under the copy on phones). */
export default function HeroBadge() {
  return (
    <LogoBadge3D
      className="mx-auto h-[220px] w-full max-w-[360px] sm:h-[260px] sm:max-w-[420px] lg:h-[340px] lg:max-w-[460px]"
      scale={0.7}
      range={800}
    />
  );
}
