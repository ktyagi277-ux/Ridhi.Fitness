"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Eye, Volume2, VolumeX } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { IG_URL } from "@/lib/site";

export default function ReelCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-[270px] overflow-hidden rounded-[26px] border border-ink-900/10 bg-white shadow-[0_28px_56px_-22px_rgba(29,24,20,0.45)]">
      {/* IG-style header */}
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3.5 py-2.5 transition hover:bg-cream-100/60"
      >
        <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-clay-500/30">
          <Image src="/images/ridhi-profile-v3.jpg" alt="Ridhi Jain" fill className="object-cover" sizes="32px" />
        </span>
        <span className="min-w-0 flex-1 text-left leading-tight">
          <span className="block truncate text-[12.5px] font-extrabold text-ink-900">coachridhijain</span>
          <span className="block text-[10px] font-semibold text-ink-400">Original audio · Reel</span>
        </span>
        <InstagramIcon className="h-4.5 w-4.5 shrink-0 text-ink-400" />
      </a>

      {/* video — autoplays muted on loop like a real reel; tap for sound */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute Ridhi's reel" : "Mute Ridhi's reel"}
        className="relative block aspect-[9/16] w-full cursor-pointer bg-ink-900"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/reel-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/ridhi-reel.mp4" type="video/mp4" />
        </video>

        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] font-extrabold text-white backdrop-blur-sm">
          <Eye className="h-3.5 w-3.5" /> 1M+ views
        </span>

        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] font-extrabold text-white backdrop-blur-sm">
          {muted ? (
            <>
              <VolumeX className="h-3.5 w-3.5" /> Tap for sound
            </>
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </span>
      </button>
    </div>
  );
}
