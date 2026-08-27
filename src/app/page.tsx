import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Dumbbell, FileText, HelpCircle, Sparkles, Star } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import ReelCard from "@/components/ReelCard";
import CornerAccent from "@/components/CornerAccent";
import { IG_HANDLE, IG_URL, waLink } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const wa = waLink("Hi Ridhi! I came from your Instagram and want to know more about the 12-week program.");

  const links = [
    wa && {
      href: wa,
      label: "Chat with the team on WhatsApp",
      icon: <WhatsAppIcon className="h-5 w-5" />,
      external: true,
      style: "bg-[#25D366] text-white hover:brightness-95",
    },
    {
      href: "/program#apply",
      label: "Book your FREE strategy call",
      icon: <CalendarCheck className="h-5 w-5" strokeWidth={2} />,
      external: false,
      style: "bg-clay-600 text-cream-50 hover:bg-clay-700",
    },
    {
      href: "/program",
      label: "The Metabolic Reset Method™",
      icon: <Dumbbell className="h-5 w-5" strokeWidth={2} />,
      external: false,
      style: "border-2 border-ink-900/10 bg-white text-ink-800 hover:border-clay-400",
    },
    {
      href: "/program#results",
      label: "Real client transformations",
      icon: <Star className="h-5 w-5" strokeWidth={2} />,
      external: false,
      style: "border-2 border-ink-900/10 bg-white text-ink-800 hover:border-clay-400",
    },
    {
      href: "/program#assessment",
      label: "60-sec check: how much can you lose?",
      icon: <Sparkles className="h-5 w-5" strokeWidth={2} />,
      external: false,
      style: "border-2 border-ink-900/10 bg-white text-ink-800 hover:border-clay-400",
    },
    {
      href: "/coaching-offer.pdf",
      label: "Coaching offer — full details (PDF)",
      icon: <FileText className="h-5 w-5" strokeWidth={2} />,
      external: true,
      style: "border-2 border-ink-900/10 bg-white text-ink-800 hover:border-clay-400",
    },
    {
      href: "/program#faq",
      label: "Questions? Read the FAQ",
      icon: <HelpCircle className="h-5 w-5" strokeWidth={2} />,
      external: false,
      style: "border-2 border-ink-900/10 bg-white text-ink-800 hover:border-clay-400",
    },
    {
      href: IG_URL,
      label: `Instagram · ${IG_HANDLE}`,
      icon: <InstagramIcon className="h-5 w-5" />,
      external: true,
      style: "border-2 border-ink-900/10 bg-white text-ink-800 hover:border-clay-400",
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    icon: React.ReactNode;
    external: boolean;
    style: string;
  }[];

  return (
    <main className="relative min-h-screen overflow-hidden bg-cream-50">
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-clay-100/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-[380px] w-[380px] rounded-full bg-sage-100/80 blur-3xl" />

      {/* RJ Fitness brand mark — top corner */}
      <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <span className="relative block h-11 w-11 overflow-hidden rounded-full shadow-[0_10px_24px_-10px_rgba(29,24,20,0.45)] ring-2 ring-gold-500/40 sm:h-14 sm:w-14">
          <Image src="/images/rj-logo.jpg" alt="RJ Fitness" fill className="object-cover" sizes="56px" priority />
        </span>
      </div>

      {/* fitness-themed corner accents */}
      <CornerAccent className="pointer-events-none absolute bottom-0 left-0 z-0 h-44 w-44 opacity-80 sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
      <CornerAccent className="pointer-events-none absolute bottom-0 right-0 z-0 h-44 w-44 -scale-x-100 opacity-80 sm:h-64 sm:w-64 lg:h-80 lg:w-80" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-12">
        <div className="text-center">
          <div className="relative mx-auto h-24 w-24">
            <span className="relative block h-24 w-24 overflow-hidden rounded-full ring-4 ring-clay-500/25">
              <Image src="/images/ridhi-profile.jpg" alt="Coach Ridhi Jain" fill className="object-cover" sizes="96px" priority />
            </span>
            <span className="absolute -bottom-1 -right-1 block h-9 w-9 overflow-hidden rounded-full border-2 border-cream-50 shadow-md">
              <Image src="/images/rj-logo.jpg" alt="RJ Fitness logo" fill className="object-cover" sizes="36px" />
            </span>
          </div>
          <h1 className="font-display mt-5 text-3xl font-semibold tracking-tight text-ink-900">Ridhi Jain</h1>
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-clay-600">
            Fat Loss Coach for Working Women
          </p>
          <p className="mx-auto mt-4 max-w-xs text-[14.5px] leading-relaxed text-ink-500">
            Lose 8–10 kgs in 12 weeks — desi food, 30-min home workouts, no crash diets. 1,000+ women transformed.
          </p>
        </div>

        <div className="mt-8 space-y-3.5">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-[14px] font-extrabold uppercase tracking-[0.06em] shadow-[0_12px_28px_-16px_rgba(29,24,20,0.35)] transition-all duration-200 hover:-translate-y-0.5 ${link.style}`}
              >
                {link.icon} {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-[14px] font-extrabold uppercase tracking-[0.06em] shadow-[0_12px_28px_-16px_rgba(29,24,20,0.35)] transition-all duration-200 hover:-translate-y-0.5 ${link.style}`}
              >
                {link.icon} {link.label}
              </Link>
            )
          )}
        </div>

        {/* Ridhi's own journey card */}
        <a
          href="https://www.instagram.com/p/DbV6s6gj-7c/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center gap-4 rounded-2xl bg-ink-900 p-4 text-left shadow-[0_16px_36px_-16px_rgba(29,24,20,0.5)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <span className="relative block h-20 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold-400/40">
            <Image
              src="/images/ig-ridhi-13kg.jpg"
              alt="Coach Ridhi's own transformation — 13 kgs down"
              fill
              className="object-cover object-top"
              sizes="64px"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[9.5px] font-extrabold uppercase tracking-[0.24em] text-gold-400">
              Coach&apos;s own journey
            </span>
            <span className="font-display mt-1 block text-lg font-semibold leading-tight text-cream-50">
              Ridhi herself — 13 kg down
            </span>
            <span className="mt-1 block text-[12px] font-semibold text-cream-100/60">
              The method she coaches is the method she lived →
            </span>
          </span>
        </a>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-clay-600">
            Watch · Straight from Ridhi
          </p>
          <p className="mt-2 text-[13.5px] font-semibold text-ink-500">
            Ridhi&apos;s most-watched reel
          </p>
          <ReelCard />
        </div>

        <div className="mt-auto pt-10 text-center">
          <Link
            href="/program"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-400 transition hover:text-clay-600"
          >
            Full website <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <p className="mt-3 text-[11px] text-ink-400/70">
            © Coach Ridhi Jain · <Link href="/privacy" className="hover:underline">Privacy</Link> ·{" "}
            <Link href="/terms" className="hover:underline">Terms</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
