import Image from "next/image";
import Reveal from "@/components/Reveal";
import { InstagramIcon } from "@/components/icons";

type Slide = {
  image: string;
  alt: string;
  name: string;
  /** One short line under the name — keep it under ~5 words */
  role: string;
  /** Badge on the photo, e.g. "72 → 60 kg" */
  result: string;
  href?: string;
  imgClass?: string;
  /** Instagram reel/post URL to embed as a live player instead of a still image */
  embed?: string;
};

// NOTE: Meera, Anjali, Priya, Neha, Rahul, Shreya, Pooja and Kavita are PLACEHOLDER names —
// the Instagram captions were not readable when these were added. Replace with the real
// names once Ridhi confirms them (only the `name` and `alt` fields need changing).
const SLIDES: Slide[] = [
  {
    image: "/images/ig-postpartum-12kg.jpg",
    alt: "Postpartum mom before and after — 72 to 60 kg in 4 months, 5 months post C-section",
    name: "Meera",
    role: "Mom of 2 · 4 months",
    result: "72 → 60 kg",
    href: "https://www.instagram.com/p/DcgdJUKjzDV/",
  },
  {
    image: "/images/ig-akanksha-12kg.jpg",
    alt: "Akanksha before and after — 12 kgs down in 3 months",
    name: "Akanksha",
    role: "New mom · 3 months",
    result: "12 kgs down",
    href: "https://www.instagram.com/p/DWbYAMLD3cR/",
    imgClass: "object-top",
  },
  {
    image: "/images/ig-mom-of-2-90days.jpg",
    alt: "Mother of two before and after — 88 to 77.5 kg in 90 days, 3 months postpartum",
    name: "Anjali",
    role: "Mom of 2 · 90 days",
    result: "88 → 77.5 kg",
    href: "https://www.instagram.com/p/DZxS9aKj53k/",
  },
  {
    image: "",
    embed: "https://www.instagram.com/reel/DBBfgSkz5eD/embed/",
    alt: "Client transformation reel from @coachridhijain",
    name: "New mom · 60 days",
    role: "Watch on Instagram",
    result: "▶ 60-day reel",
    href: "https://www.instagram.com/reel/DBBfgSkz5eD/",
  },
  {
    image: "/images/ig-client-purple-floral.jpg",
    alt: "Priya before and after transformation",
    name: "Priya",
    role: "Working professional",
    result: "Before → After",
    href: "https://www.instagram.com/p/DRcG82uj-JU/",
  },
  {
    image: "/images/ig-client-peach-mint.jpg",
    alt: "Neha before and after — same room, months apart",
    name: "Neha",
    role: "Busy mom",
    result: "Before → After",
    href: "https://www.instagram.com/p/DW0UTI2j5UD/",
  },
  {
    image: "/images/ig-client-nike.jpg",
    alt: "Rahul before and after — same t-shirt, months apart",
    name: "Rahul",
    role: "Same tee, months apart",
    result: "Before → After",
    href: "https://www.instagram.com/p/DQrL0BJj_LD/",
  },
  {
    image: "/images/ig-client-floral-coral.jpg",
    alt: "Shreya before and after transformation",
    name: "Shreya",
    role: "Steady & sustainable",
    result: "Before → After",
    href: "https://www.instagram.com/p/DO0ouQFj7Re/",
  },
  {
    image: "/images/ig-client-blue-tee.jpg",
    alt: "Pooja before and after — coached online, same tee",
    name: "Pooja",
    role: "Coached online",
    result: "Before → After",
    href: "https://www.instagram.com/p/DKt_pF_Tcmn/",
  },
  {
    image: "/images/ig-client-yellow.jpg",
    alt: "Kavita before and after — same pyjamas, new body",
    name: "Kavita",
    role: "Same outfit, new body",
    result: "Before → After",
    href: "https://www.instagram.com/p/DNGA54pvE9I/",
  },
  {
    image: "/images/ig-ayushi-bride.jpg",
    alt: "Ayushi before and after — 5.5 kgs down before her July wedding, same dress",
    name: "Ayushi",
    role: "Bride-to-be",
    result: "66.5 → 61 kg",
    href: "https://www.instagram.com/p/DZXgNE-Dzbu/",
  },
  {
    image: "/images/ig-hitesh-transformation.jpg",
    alt: "Hitesh before and after — lost 10 kgs in 2.5 months before his engagement",
    name: "Hitesh",
    role: "Groom-to-be · 2.5 months",
    result: "98 → 88 kg",
    href: "https://www.instagram.com/p/DbLoWdwj5Li/",
  },
];

function PhotoCard({ t }: { t: Slide }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(29,24,20,0.28)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        {t.embed ? (
          // Instagram's embed = ~54px header + 16:9-tall video. Shift up so the video fills the card.
          <iframe
            src={t.embed}
            title={t.alt}
            loading="lazy"
            scrolling="no"
            allow="encrypted-media"
            allowFullScreen
            className="absolute left-0 top-0 w-full border-0"
            style={{ height: "720px", transform: "translateY(-54px)" }}
          />
        ) : t.href ? (
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
        {/* kg / reel badge — only when there is a real number or a video to call out */}
        {t.result !== "Before → After" && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink-900/85 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-cream-50 backdrop-blur">
            {t.result}
          </span>
        )}
        {/* BEFORE / AFTER labels on their own halves of the photo */}
        {!t.embed && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/70 to-transparent" />
            <span className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-cream-50/25 bg-ink-900/85 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-cream-100 backdrop-blur">
              Before
            </span>
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-sage-600 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]">
              After
            </span>
          </>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <h3 className="font-display truncate text-lg font-semibold leading-tight text-ink-900">{t.name}</h3>
          <p className="mt-0.5 truncate text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">{t.role}</p>
        </div>
        {t.href && (
          <a
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${t.name}'s post on Instagram`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-500 transition hover:border-clay-400 hover:text-clay-600"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
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
              1,000+ transformations and counting — PCOS, thyroid, postpartum, brides-to-be and desk-bound 9-to-9 lives.
            </p>
          </div>
        </Reveal>
      </div>

      {/* transformation grid — row by row, no slider */}
      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SLIDES.map((slide, i) => (
            <Reveal key={slide.href ?? i} delay={(i % 4) * 80} className="h-full">
              <PhotoCard t={slide} />
            </Reveal>
          ))}
        </div>
      </div>

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
