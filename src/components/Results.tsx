import Image from "next/image";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

type Transformation = {
  image: string;
  alt: string;
  name: string;
  role: string;
  result: string;
  tags: string[];
  quote: string;
  href?: string;
};

const TRANSFORMATIONS: Transformation[] = [
  {
    image: "/images/ig-ayushi-bride.jpg",
    alt: "Ayushi before and after — 5.5 kgs down before her July wedding, same dress",
    name: "Ayushi",
    role: "Bride-to-be · July 2026",
    result: "66.5 → 61 kg",
    tags: ["Wedding deadline", "No crash diet"],
    quote: "She didn't buy a new wardrobe for her wedding — she built the body that filled the old one beautifully.",
    href: "https://www.instagram.com/p/DZXgNE-Dzbu/",
  },
  {
    image: "/images/ig-mohit-journey.jpg",
    alt: "Mohit before and after — 87 to 82 kg with 7 inch loss",
    name: "Mohit",
    role: "Slow, steady & sustainable",
    result: "87 → 82 kg · −7 in",
    tags: ["Visible inch loss", "Better energy"],
    quote: "Visible inch loss, better energy and disciplined eating habits — progress that actually stays.",
    href: "https://www.instagram.com/p/DUz-3y3jw7H/",
  },
  {
    image: "/images/ig-hitesh-transformation.jpg",
    alt: "Hitesh before and after — lost 10 kgs in 2.5 months before his engagement",
    name: "Hitesh",
    role: "Groom-to-be · Engagement prep",
    result: "98 → 88 kg",
    tags: ["Vegetarian", "2.5 months"],
    quote: "He lost 10 kgs before his engagement — but the biggest transformation wasn't visible on the scale.",
    href: "https://www.instagram.com/p/DbLoWdwj5Li/",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I've lost 7 kgs and feel more confident than ever. RJ Fitness changed my whole routine!",
    name: "RJ Fitness client",
    detail: "Lost 7 kg · Weekly win shared on Instagram",
  },
  {
    quote:
      "Down 6 kgs, better habits, better sleep, happier me. This community is gold.",
    name: "RJ Fitness client",
    detail: "Lost 6 kg · Weekly win shared on Instagram",
  },
];

export function Transformations() {
  return (
    <section id="results" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-clay-600">Proof over promises</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Real people. Real deadlines. <em className="italic text-clay-600">Real results.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-semibold leading-relaxed text-ink-400">
            1,000+ transformations and counting — across PCOS, thyroid, postpartum and desk-bound lives.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TRANSFORMATIONS.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <article className="group h-full overflow-hidden rounded-3xl border border-ink-900/8 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(29,24,20,0.28)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" aria-label={`See ${t.name}'s transformation post on Instagram`} className="absolute inset-0">
                    <Image
                      src={t.image}
                      alt={t.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </a>
                ) : (
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink-900/85 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-cream-50 backdrop-blur">
                  {t.result}
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">{t.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {t.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-sage-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-sage-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 border-l-2 border-clay-400 pl-4 text-[14px] italic leading-relaxed text-ink-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* testimonials */}
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.detail} delay={i * 120}>
            <figure className="h-full rounded-3xl bg-ink-900 p-8 text-cream-100 sm:p-10">
              <Quote className="h-7 w-7 text-clay-400" fill="currentColor" strokeWidth={0} />
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 text-gold-400" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-display mt-4 text-[19px] font-medium leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-[13px] font-extrabold uppercase tracking-[0.14em] text-cream-100/60">
                {t.name} — <span className="text-clay-400">{t.detail}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
        Real client results, as shared on @coachridhijain · Individual outcomes vary with consistency
      </p>
    </section>
  );
}
