import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";

const POINTS = [
  { icon: Clock, title: "20 minutes, zero pitch", text: "We map your goals, medical history and routine — you leave with a plan either way." },
  { icon: CalendarCheck, title: "Slots within 24 hours", text: "The team calls or WhatsApps you at your preferred time with available slots." },
  { icon: ShieldCheck, title: "Private & no spam", text: "Your details go straight to Ridhi's team. No mailing lists, no pressure." },
];

/** Bottom of the page — the only lead form on the site. Every "#apply" link lands here. */
export default function ApplySection() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-900/8 bg-cream-100 py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-clay-100/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow text-clay-600">Free discovery call — 20 minutes, zero pitch</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
              Your transformation <em className="italic text-clay-600">starts with one call.</em>
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-500">
              Fill the 2-minute form and Ridhi&apos;s team will reach out with call slots. The more we know, the more useful your call — a clear roadmap for your goal, whether you join or not.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={100 + i * 80}>
                <div className="flex items-start gap-4 rounded-2xl border border-ink-900/8 bg-white/80 p-4.5 backdrop-blur">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                    <p.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="text-[15px] font-extrabold text-ink-900">{p.title}</p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-500">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <LeadForm id="apply" source="bottom_form" />
        </Reveal>
      </div>
    </section>
  );
}
