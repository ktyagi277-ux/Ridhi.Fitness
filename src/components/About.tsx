import Image from "next/image";
import { BadgeCheck, Users, GraduationCap, Flame } from "lucide-react";
import Reveal from "@/components/Reveal";
import { InstagramIcon } from "@/components/icons";

const IG_URL = "https://www.instagram.com/coachridhijain";

const CREDENTIALS = [
  { icon: GraduationCap, title: "Certified Nutritionist", text: "Specialised in women's hormonal & metabolic health" },
  { icon: Users, title: "1,000+ transformations", text: "Working women across India, UAE, UK & US" },
  { icon: Flame, title: "113K Instagram community", text: "Daily free education at @coachridhijain" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-y border-ink-900/8 bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* portrait */}
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-clay-100 shadow-[0_40px_80px_-32px_rgba(29,24,20,0.35)]">
            <Image
              src="/images/ridhi-about-v2.jpg"
              alt="Coach Ridhi Jain — women's fat loss and hormone health coach"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          </div>

          {/* floating badges */}
          {/* On phones the photo is narrow, so keep this badge low (near the waist) — at the top it covers the face. */}
          <div className="absolute -left-2 bottom-32 top-auto animate-float rounded-2xl border border-ink-900/8 bg-white/95 px-5 py-3.5 shadow-[0_16px_40px_-16px_rgba(29,24,20,0.3)] backdrop-blur sm:bottom-auto sm:left-2 sm:top-10">
            <p className="font-display text-2xl font-semibold text-clay-600">12 wks</p>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-500">Average program</p>
          </div>
          <div className="absolute -right-2 bottom-12 animate-float-slow rounded-2xl border border-ink-900/8 bg-white/95 px-5 py-3.5 shadow-[0_16px_40px_-16px_rgba(29,24,20,0.3)] backdrop-blur sm:right-2">
            <div className="flex items-center gap-2">
              <InstagramIcon className="h-4.5 w-4.5 text-clay-600" />
              <p className="font-display text-2xl font-semibold">113K</p>
            </div>
            <p className="mt-0.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-500">Community</p>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <Reveal>
            <p className="eyebrow text-clay-600">Meet your coach</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Hi, I&apos;m <em className="italic text-clay-600">Ridhi.</em>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-ink-600">
              <p>
                A fat-loss coach and nutritionist for women — and someone who has seen too many smart,
                hard-working women blame themselves for what was actually a broken, copy-paste diet plan.
              </p>
              <p>
                Over the last few years I&apos;ve helped <strong className="font-bold text-ink-900">1,000+ working women lose 8–10 kgs in 12 weeks</strong> —
                not with detox teas or boiled vegetables, but by fixing metabolism, hormones and habits
                around their real lives: meetings, maids&apos; off days, business travel and shaadi season included.
              </p>
              <p className="font-display text-xl italic text-ink-800">
                &ldquo;You don&apos;t need more willpower. You need a plan that respects your life.&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 space-y-4">
              {CREDENTIALS.map((c) => (
                <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-ink-900/8 bg-cream-50 p-4.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                    <c.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-[15px] font-extrabold text-ink-900">
                      {c.title} <BadgeCheck className="h-4 w-4 text-sage-600" />
                    </p>
                    <p className="text-[13.5px] font-medium text-ink-500">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#apply"
                className="rounded-full bg-clay-600 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-cream-50 shadow-[0_14px_28px_-12px_rgba(180,72,32,0.55)] transition hover:bg-clay-700"
              >
                Book my free call
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink-900/15 bg-white px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-ink-800 transition hover:border-clay-500 hover:text-clay-600"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
                Follow @coachridhijain
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
