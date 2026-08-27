import Image from "next/image";
import Reveal from "@/components/Reveal";

type Slide = {
  image: string;
  alt: string;
  name: string;
  role: string;
  result: string;
  tags: string[];
  quote: string;
  href?: string;
  imgClass?: string;
};

const SLIDES: Slide[] = [
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
    image: "/images/ig-client-collage.png",
    alt: "Four RJ Fitness client transformations, before and after",
    name: "The community",
    role: "Four more real journeys",
    result: "4 transformations",
    tags: ["Real clients"],
    quote: "Down 6 kgs, better habits, better sleep, happier me. This community is gold.",
    href: "https://www.instagram.com/coachridhijain",
    imgClass: "object-top",
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
    image: "/images/ig-pattern-of-wins.jpg",
    alt: "Not one client — a pattern of wins. Real weekly progress messages from people inside RJ Fitness",
    name: "Weekly wins",
    role: "Real messages · real people",
    result: "Pattern of wins",
    tags: ["Screenshots from clients"],
    quote: "I've lost 7 kgs and feel more confident than ever. RJ Fitness changed my whole routine!",
    href: "https://www.instagram.com/p/Dbn6rcVj_Pa/",
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

function PhotoCard({ t }: { t: Slide }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(29,24,20,0.28)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        {t.href ? (
          <a href={t.href} target="_blank" rel="noopener noreferrer" aria-label={`See ${t.name}'s transformation post on Instagram`} className="absolute inset-0">
            <Image
              src={t.image}
              alt={t.alt}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-[1.05] ${t.imgClass ?? ""}`}
              sizes="(max-width: 640px) 300px, 360px"
            />
          </a>
        ) : (
          <Image
            src={t.image}
            alt={t.alt}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.05] ${t.imgClass ?? ""}`}
            sizes="(max-width: 640px) 300px, 360px"
          />
        )}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink-900/85 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-cream-50 backdrop-blur">
          {t.result}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
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
  );
}

function SlideTrackItem({ slide }: { slide: Slide }) {
  return (
    <div className="w-[300px] shrink-0 sm:w-[360px]">
      <PhotoCard t={slide} />
    </div>
  );
}

export function Transformations() {
  return (
    <section id="results" className="scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
      </div>

      {/* auto-sliding right-to-left carousel — pauses on hover */}
      <Reveal>
        <div className="marquee-mask mt-12 overflow-hidden">
          <div className="flex w-max animate-[marquee_38s_linear_infinite] items-stretch gap-5 pr-5 hover:[animation-play-state:paused]">
            {SLIDES.map((slide, i) => (
              <SlideTrackItem key={`a-${i}`} slide={slide} />
            ))}
            {/* duplicate set for the seamless loop */}
            <div aria-hidden="true" className="contents">
              {SLIDES.map((slide, i) => (
                <SlideTrackItem key={`b-${i}`} slide={slide} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-8 px-5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
        Real client results, as shared on @coachridhijain · Individual outcomes vary with consistency
      </p>

      {/* Ridhi's own journey — dedicated highlight */}
      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <a
            href="https://www.instagram.com/p/DbV6s6gj-7c/"
            target="_blank"
            rel="noopener noreferrer"
            className="group grid overflow-hidden rounded-[32px] bg-ink-900 text-cream-100 shadow-[0_32px_64px_-28px_rgba(29,24,20,0.5)] transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="relative min-h-[340px] overflow-hidden md:min-h-[420px]">
              <Image
                src="/images/ig-ridhi-13kg-crop.jpg"
                alt="Coach Ridhi's own before and after — 13 kgs down"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-ink-900">
                13 kg down · kept off
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="eyebrow text-gold-400">Coach&apos;s own journey</p>
              <h3 className="font-display mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                Before she coached 1,000+ women, Ridhi transformed{" "}
                <em className="italic text-clay-400">herself first.</em>
              </h3>
              <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-cream-100/70">
                Down 13 kgs with the exact system she now teaches — desi food, home workouts, no crash
                diets. The method she coaches is the method she lived. That&apos;s why it works in real life,
                not just on paper.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-gold-400 transition group-hover:text-gold-500">
                See her journey on Instagram →
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
