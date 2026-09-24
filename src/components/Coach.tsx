import Image from "next/image";
import { BadgeCheck, GraduationCap, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { InstagramIcon } from "@/components/icons";
import { IG_URL } from "@/lib/site";

const MARKERS = [
  { value: "1,000+", label: "Women Coached", icon: Users },
  { value: "112K+", label: "Instagram Community", icon: InstagramIcon, href: IG_URL },
  { value: "Certified", label: "Nutrition & Wellness Coach", icon: GraduationCap },
];

/** Section 4 — Meet your coach: personal proof turned into authority. */
export default function Coach() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-x-clip border-y border-ink-900/8 bg-ink-900 py-20 text-cream-50 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-clay-700/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-sage-700/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)] ring-4 ring-gold-400/40">
              <Image src="/images/ridhi-about-v2.jpg" alt="Ridhi Jain" fill className="object-cover object-[50%_18%]" sizes="96px" />
            </span>
            <p className="eyebrow mt-6 text-clay-400">Meet your coach</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
              Hi, I&apos;m <em className="italic text-clay-400">Ridhi.</em> Now I help other women build their own version of this.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5">
          {MARKERS.map((m, i) => {
            const Icon = m.icon;
            const inner = (
              <div className="flex h-full flex-col items-center rounded-3xl border border-cream-100/10 bg-cream-50/[0.04] px-6 py-8 text-center backdrop-blur transition duration-500 hover:border-gold-400/40 hover:bg-cream-50/[0.07]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-400">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.9} />
                </span>
                <p className="font-display mt-5 text-4xl font-semibold tracking-tight text-cream-50 sm:text-5xl">{m.value}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-cream-100/60">
                  {m.label}
                  {m.value === "Certified" && <BadgeCheck className="h-4 w-4 text-sage-500" />}
                </p>
              </div>
            );
            return (
              <Reveal key={m.label} delay={100 + i * 90} className="h-full">
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-[17px] leading-relaxed text-cream-100/75">
            What started as my own journey with health eventually became my work with women. Today, through RJ Fitness, I help women move beyond temporary diets and build nutrition, habits, accountability and consistency around their actual lives.
          </p>
          <p className="font-display mx-auto mt-8 max-w-2xl text-2xl font-medium italic leading-snug text-cream-50 sm:text-[30px]">
            We don&apos;t coach perfection.
            <br />
            We coach <span className="text-gold-400">consistency that survives real life.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
