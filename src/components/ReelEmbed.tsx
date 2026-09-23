"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  /** Instagram embed URL, e.g. https://www.instagram.com/reel/XXXX/embed/ */
  src: string;
  poster: string;
  alt: string;
};

/**
 * Lite Instagram embed ("facade"): renders a poster + play button and only loads the real
 * Instagram iframe (~1.5 MB of third-party JS/CSS) when the visitor taps it.
 */
export default function ReelEmbed({ src, poster, alt }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      // Instagram's embed = ~54px header + 16:9-tall video. Shift up so the video fills the card.
      <iframe
        src={src}
        title={alt}
        scrolling="no"
        allow="encrypted-media; autoplay"
        allowFullScreen
        className="absolute left-0 top-0 w-full border-0"
        style={{ height: "720px", transform: "translateY(-54px)" }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play: ${alt}`}
      className="group/reel absolute inset-0 block h-full w-full cursor-pointer bg-ink-900"
    >
      <Image src={poster} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 300px, 360px" />
      <span className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/95 text-ink-900 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover/reel:scale-110">
        <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
      </span>
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-900/85 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-cream-50 backdrop-blur">
        Tap to play reel
      </span>
    </button>
  );
}
