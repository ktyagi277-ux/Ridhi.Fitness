import Reveal from "@/components/Reveal";

/**
 * "Every plan includes" — six hand-drawn line illustrations in the brand palette
 * (clay outline, cream fill, gold/sage accents). Pure inline SVG, no image files.
 */

const STROKE = "var(--color-clay-500)";
const FILL = "var(--color-cream-100)";
const FILL2 = "var(--color-clay-100)";
const GOLD = "var(--color-gold-400)";
const SAGE = "var(--color-sage-500)";

const common = {
  fill: "none",
  stroke: STROKE,
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Thali() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      <ellipse cx="80" cy="84" rx="66" ry="52" {...common} fill={FILL} />
      <ellipse cx="80" cy="84" rx="56" ry="43" {...common} strokeWidth={1.4} />
      {/* dal bowl */}
      <ellipse cx="60" cy="66" rx="20" ry="13" {...common} fill={GOLD} />
      <path d="M46 62c6-3 22-3 28 0" {...common} strokeWidth={1.4} />
      {/* sabzi bowl */}
      <ellipse cx="104" cy="66" rx="19" ry="12" {...common} fill={SAGE} />
      <circle cx="98" cy="64" r="2.5" fill={FILL} stroke="none" />
      <circle cx="108" cy="68" r="2.5" fill={FILL} stroke="none" />
      <circle cx="104" cy="61" r="2" fill={FILL} stroke="none" />
      {/* roti */}
      <path d="M40 104c0-14 12-24 30-24 4 0 8 1 11 2L54 118c-9-2-14-7-14-14z" {...common} fill={FILL2} />
      <path d="M52 92c3-4 8-6 14-7M50 102c3-4 9-7 15-8" {...common} strokeWidth={1.2} />
      {/* rice */}
      <path d="M88 108c-3-12 4-22 16-22s19 10 16 22c-7 4-25 4-32 0z" {...common} fill={FILL} />
      <path d="M96 96h4M104 92h4M100 102h5" {...common} strokeWidth={1.4} />
      {/* lemon */}
      <circle cx="126" cy="102" r="8" {...common} fill={GOLD} />
      <path d="M126 94v16M118 102h16" {...common} strokeWidth={1.2} />
    </svg>
  );
}

function Workout() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      {/* checklist card */}
      <rect x="34" y="22" width="66" height="84" rx="8" {...common} fill={FILL} />
      {[40, 56, 72, 88].map((y) => (
        <g key={y}>
          <circle cx="48" cy={y} r="5" {...common} fill={y < 80 ? SAGE : FILL2} strokeWidth={1.6} />
          {y < 80 && <path d={`M45.5 ${y}l2 2 3.5-4`} stroke={FILL} strokeWidth={1.6} fill="none" strokeLinecap="round" />}
          <path d={`M60 ${y}h30`} {...common} strokeWidth={1.6} />
        </g>
      ))}
      {/* dumbbell */}
      <g transform="rotate(-30 104 110)">
        <rect x="70" y="104" width="68" height="12" rx="6" {...common} fill={FILL2} />
        <rect x="58" y="96" width="16" height="28" rx="4" {...common} fill={GOLD} />
        <rect x="134" y="96" width="16" height="28" rx="4" {...common} fill={GOLD} />
        <rect x="50" y="101" width="8" height="18" rx="3" {...common} fill={FILL2} />
        <rect x="150" y="101" width="8" height="18" rx="3" {...common} fill={FILL2} />
      </g>
      {/* 30 min badge */}
      <circle cx="122" cy="42" r="16" {...common} fill={GOLD} />
      <text x="122" y="47" textAnchor="middle" fontSize="12" fontWeight="800" fill={STROKE} fontFamily="Manrope, sans-serif">30</text>
    </svg>
  );
}

function BloodWork() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      {/* vial */}
      <rect x="34" y="34" width="24" height="96" rx="12" {...common} fill={FILL} />
      <path d="M36 82h20v36a10 10 0 0 1-20 0z" fill={STROKE} stroke="none" />
      <rect x="30" y="24" width="32" height="14" rx="4" {...common} fill={FILL2} />
      <path d="M36 28v6M42 28v6M48 28v6M54 28v6" {...common} strokeWidth={1.2} />
      {/* chart card */}
      <rect x="72" y="52" width="66" height="60" rx="8" {...common} fill={FILL} />
      <path d="M82 100l14-16 12 8 20-24" stroke={SAGE} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 68h8v8" stroke={SAGE} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 104h48" {...common} strokeWidth={1.2} />
      <circle cx="96" cy="84" r="2.5" fill={GOLD} stroke="none" />
      <circle cx="108" cy="92" r="2.5" fill={GOLD} stroke="none" />
    </svg>
  );
}

function CoachCall() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      {/* phone */}
      <rect x="52" y="20" width="56" height="120" rx="14" {...common} fill={FILL} />
      <rect x="60" y="34" width="40" height="86" rx="6" {...common} fill={FILL2} strokeWidth={1.2} />
      <path d="M72 27h16" {...common} strokeWidth={1.6} />
      <circle cx="80" cy="130" r="3" fill={STROKE} stroke="none" />
      {/* mic */}
      <rect x="73" y="58" width="14" height="24" rx="7" {...common} fill={GOLD} />
      <path d="M68 74a12 12 0 0 0 24 0M80 86v8M74 94h12" {...common} strokeWidth={1.8} />
      {/* sound waves */}
      <path d="M40 66c-4 6-4 14 0 20M32 60c-7 10-7 22 0 32" {...common} strokeWidth={1.8} />
      <path d="M120 66c4 6 4 14 0 20M128 60c7 10 7 22 0 32" {...common} strokeWidth={1.8} />
    </svg>
  );
}

function WhatsAppSupport() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      {/* big bubble */}
      <path d="M30 42a14 14 0 0 1 14-14h58a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14H60l-20 16 2-16h-4a8 8 0 0 1-8-8z" {...common} fill={FILL} />
      <path d="M46 48h52M46 60h40M46 72h30" {...common} strokeWidth={1.6} />
      {/* small reply bubble */}
      <path d="M78 96a12 12 0 0 1 12-12h32a12 12 0 0 1 12 12v18a12 12 0 0 1-12 12h-6l14 12-24-12H90a12 12 0 0 1-12-12z" {...common} fill={GOLD} />
      <circle cx="96" cy="105" r="2.5" fill={STROKE} stroke="none" />
      <circle cx="106" cy="105" r="2.5" fill={STROKE} stroke="none" />
      <circle cx="116" cy="105" r="2.5" fill={STROKE} stroke="none" />
      {/* tick */}
      <circle cx="120" cy="44" r="12" {...common} fill={SAGE} />
      <path d="M114 44l4 4 8-8" stroke={FILL} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RecipeBook() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      {/* book */}
      <path d="M38 36h44v96H38a6 6 0 0 1-6-6V42a6 6 0 0 1 6-6z" {...common} fill={FILL2} />
      <path d="M82 36h44a6 6 0 0 1 6 6v84a6 6 0 0 1-6 6H82z" {...common} fill={FILL} />
      <path d="M82 36v96" {...common} />
      <path d="M46 52h26M46 64h26M46 76h18" {...common} strokeWidth={1.4} />
      <path d="M94 52h26M94 64h26M94 76h18M94 96h26M94 108h14" {...common} strokeWidth={1.4} />
      {/* bookmark */}
      <path d="M112 30v30l-7-6-7 6V30z" {...common} fill={GOLD} />
      {/* chef hat */}
      <path d="M54 100c-8 0-12-6-10-12 1-5 6-8 11-7 2-6 14-6 16 0 5-1 10 2 11 7 2 6-2 12-10 12z" {...common} fill={FILL} />
      <path d="M52 100v10h20v-10" {...common} />
      <path d="M52 106h20" {...common} strokeWidth={1.2} />
    </svg>
  );
}

const ITEMS = [
  { Icon: Thali, label: "Custom nutrition plan", note: "Dal, roti, sabzi — built on your plate" },
  { Icon: Workout, label: "30-min home workouts", note: "No gym, minimal equipment" },
  { Icon: BloodWork, label: "Blood work analysis", note: "Hormones & markers reviewed" },
  { Icon: CoachCall, label: "Calls with Ridhi", note: "Strategy, reviews, course-corrections" },
  { Icon: WhatsAppSupport, label: "Weekly WhatsApp check-ins", note: "Accountability that actually shows up" },
  { Icon: RecipeBook, label: "Recipe book", note: "Quick desi recipes for busy days" },
];

export default function Includes() {
  return (
    <section id="includes" className="scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-center text-clay-600">What you get</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Every plan <em className="italic text-clay-600">includes</em>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-[14.5px] leading-relaxed text-ink-500">
            The essentials that come with Guided and Elite plans alike.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
          {ITEMS.map(({ Icon, label, note }, i) => (
            <Reveal key={label} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-ink-900/8 bg-white px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_20px_40px_-24px_rgba(29,24,20,0.25)] sm:px-4 sm:py-6">
                <div className="h-16 w-16 sm:h-20 sm:w-20">
                  <Icon />
                </div>
                <h3 className="mt-3 text-[12.5px] font-extrabold leading-snug text-ink-900 sm:text-[13.5px]">{label}</h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-500 sm:text-[12px]">{note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[12.5px] leading-relaxed text-ink-400 sm:text-[13.5px]">
            Plus habit coaching, travel &amp; festival guidelines, and a plan built only after a proper onboarding
            questionnaire — never a copy-paste template.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
