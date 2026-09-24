"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { LogoMedallion, MiniDumbbell } from "@/components/three/Objects";
import { ParallaxRig, PopIn } from "@/components/three/rigs";
import { PALETTE } from "@/components/three/materials";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), { ssr: false });

type ProgressRef = React.MutableRefObject<number>;

/** Idle turn + one full flip while the visitor scrolls through the hero. */
function CoinTurn({ progress, enabled }: { progress: ProgressRef; enabled: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = enabled ? progress.current : 0;
    const idle = enabled ? Math.sin(t * 0.45) * 0.18 : 0;
    g.rotation.y = MathUtils.damp(g.rotation.y, idle + p * Math.PI * 2, 3, dt);
    g.rotation.x = MathUtils.damp(g.rotation.x, 0.02 + p * 0.2, 3, dt);
  });
  return (
    <group ref={ref}>
      <Float speed={enabled ? 1 : 0} rotationIntensity={0.12} floatIntensity={0.5}>
        <LogoMedallion />
      </Float>
    </group>
  );
}

/** Six mini dumbbells in different brand colours orbit the coin — nothing else. */
const GEAR = [
  { plate: PALETTE.clay, bar: PALETTE.gold },
  { plate: PALETTE.gold, bar: "#ece8e1" },
  { plate: PALETTE.sage, bar: PALETTE.gold },
  { plate: PALETTE.ink, bar: PALETTE.gold },
  { plate: PALETTE.clayLight, bar: "#ece8e1" },
  { plate: PALETTE.sageDeep, bar: PALETTE.gold },
] as const;

function GearOrbit({ progress, enabled, radius }: { progress: ProgressRef; enabled: boolean; radius: number }) {
  const ring = useRef<Group>(null);
  const items = useRef<(Group | null)[]>([]);
  const layout = useMemo(
    () =>
      GEAR.map((g, i) => {
        const a = (i / GEAR.length) * Math.PI * 2;
        return {
          ...g,
          pos: [Math.cos(a) * radius, Math.sin(a * 2) * 0.22, Math.sin(a) * radius] as [number, number, number],
          rot: [a * 0.5, a, a * 0.25] as [number, number, number],
          spin: 0.45 + (i % 3) * 0.2,
        };
      }),
    [radius],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (ring.current) {
      const target = enabled ? t * 0.2 + progress.current * Math.PI * 2 : 0;
      ring.current.rotation.y = MathUtils.damp(ring.current.rotation.y, target, 4, dt);
    }
    if (!enabled) return;
    items.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.y += layout[i].spin * dt;
      g.rotation.z += layout[i].spin * 0.4 * dt;
    });
  });

  return (
    <group rotation={[0.4, 0, -0.08]}>
      <group ref={ring}>
        {layout.map((it, i) => (
          <group
            key={i}
            position={it.pos}
            rotation={it.rot}
            ref={(el) => {
              items.current[i] = el;
            }}
          >
            <MiniDumbbell plateColor={it.plate} barColor={it.bar} />
          </group>
        ))}
      </group>
    </group>
  );
}

type Props = {
  className?: string;
  /** scroll distance (px) over which the coin completes one flip */
  range?: number;
  /** overall scale of coin + orbit inside the box */
  scale?: number;
};

/**
 * Compact 3D RJ badge with six small dumbbells (different colours) orbiting it.
 * Give it a fixed-size box via className — it lives in normal flow and never
 * overlaps text.
 */
export default function LogoBadge3D({ className = "", range = 700, scale = 0.78 }: Props) {
  const progress = useRef(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const onScroll = () => {
      progress.current = Math.min(1, Math.max(0, window.scrollY / range));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", sync);
    };
  }, [range]);

  return (
    <div className={className} aria-hidden>
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 5.6], fov: 36 }} shadowY={-1.7} shadowOpacity={0.16} maxDpr={2}>
        <ParallaxRig enabled={animate} strength={0.18}>
          <PopIn delay={0.15} enabled={animate}>
            <group scale={scale}>
              <Suspense fallback={null}>
                <CoinTurn progress={progress} enabled={animate} />
              </Suspense>
              <GearOrbit progress={progress} enabled={animate} radius={2.35} />
            </group>
          </PopIn>
        </ParallaxRig>
      </SceneCanvas>
    </div>
  );
}
