const GOLD = "#C0913F";
const GOLD_DEEP = "#9A712E";

/**
 * Bold fitness corner accent, anchored to a bottom-left corner:
 * a large diagonal line-art dumbbell framed by soft corner arcs,
 * a heartbeat pulse running along the bottom edge, energy ticks
 * and a weight-plate ring. Premium gold line-art, no florals.
 * For the bottom-right corner, add `-scale-x-100` to className to mirror it.
 */
export default function CornerAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" fill="none" aria-hidden="true" className={className}>
      {/* corner frame arcs */}
      <path d="M 176 294 Q 10 286, 8 128" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 150 285 Q 20 278, 17 160" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

      {/* heartbeat pulse along the bottom edge */}
      <path
        d="M 118 288 l 22 0 l 10 -24 l 13 34 l 10 -22 l 8 12 l 30 0 c 16 0 30 -2 44 -8"
        stroke={GOLD}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* large diagonal dumbbell */}
      <g transform="translate(74 224) rotate(-38)" stroke={GOLD} strokeWidth="1.8">
        {/* bar */}
        <path d="M -36 0 L 36 0" strokeWidth="3.2" strokeLinecap="round" />
        {/* grip knurling */}
        <g strokeWidth="1" opacity="0.55">
          <path d="M -18 -3.5 l 0 7" />
          <path d="M -9 -3.5 l 0 7" />
          <path d="M 0 -3.5 l 0 7" />
          <path d="M 9 -3.5 l 0 7" />
          <path d="M 18 -3.5 l 0 7" />
        </g>
        {/* collars */}
        <rect x="-43" y="-8" width="5" height="16" rx="2" fill={GOLD} fillOpacity="0.14" />
        <rect x="38" y="-8" width="5" height="16" rx="2" fill={GOLD} fillOpacity="0.14" />
        {/* plates — big, medium, end cap */}
        <rect x="-54" y="-19" width="8" height="38" rx="3" fill={GOLD} fillOpacity="0.14" />
        <rect x="-63" y="-14" width="6" height="28" rx="2.5" fill={GOLD} fillOpacity="0.14" />
        <rect x="-69" y="-8" width="4" height="16" rx="2" fill={GOLD} fillOpacity="0.14" />
        <rect x="46" y="-19" width="8" height="38" rx="3" fill={GOLD} fillOpacity="0.14" />
        <rect x="57" y="-14" width="6" height="28" rx="2.5" fill={GOLD} fillOpacity="0.14" />
        <rect x="65" y="-8" width="4" height="16" rx="2" fill={GOLD} fillOpacity="0.14" />
      </g>

      {/* energy ticks off the top plates */}
      <g stroke={GOLD_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
        <path d="M 138 160 l 15 -9" />
        <path d="M 146 176 l 17 -6" />
        <path d="M 128 147 l 11 -11" />
      </g>

      {/* weight-plate ring near the corner */}
      <circle cx="30" cy="276" r="10" stroke={GOLD} strokeWidth="1.6" opacity="0.85" />
      <circle cx="30" cy="276" r="3.4" fill={GOLD} fillOpacity="0.5" />

      {/* trailing dots */}
      <g fill={GOLD} fillOpacity="0.55">
        <circle cx="256" cy="278" r="2.2" />
        <circle cx="272" cy="272" r="1.7" />
        <circle cx="285" cy="265" r="1.3" />
      </g>
    </svg>
  );
}
