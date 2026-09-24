"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";

/** Rotates its children gently toward the pointer (mouse parallax). */
export function ParallaxRig({
  children,
  strength = 0.32,
  enabled = true,
}: {
  children: ReactNode;
  strength?: number;
  enabled?: boolean;
}) {
  const ref = useRef<Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const targetX = enabled ? -state.pointer.y * strength * 0.6 : 0;
    const targetY = enabled ? state.pointer.x * strength : 0;
    g.rotation.x = MathUtils.damp(g.rotation.x, targetX, 2.6, dt);
    g.rotation.y = MathUtils.damp(g.rotation.y, targetY, 2.6, dt);
  });
  return <group ref={ref}>{children}</group>;
}

/** Springs the children's scale from 0 → 1 when mounted (entrance pop). */
export function PopIn({ children, delay = 0, enabled = true }: { children: ReactNode; delay?: number; enabled?: boolean }) {
  const ref = useRef<Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    if (!enabled) {
      g.scale.setScalar(1);
      return;
    }
    t.current += dt;
    const x = Math.max(0, t.current - delay);
    // overshooting spring curve
    const s = x <= 0 ? 0 : 1 - Math.exp(-6 * x) * Math.cos(9 * x);
    g.scale.setScalar(Math.max(0.0001, Math.min(1.12, s)));
  });
  return <group ref={ref} scale={0.0001}>{children}</group>;
}

/** Continuous slow spin on chosen axes. */
export function Spin({
  children,
  x = 0,
  y = 0.35,
  z = 0,
  enabled = true,
}: {
  children: ReactNode;
  x?: number;
  y?: number;
  z?: number;
  enabled?: boolean;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g || !enabled) return;
    g.rotation.x += x * dt;
    g.rotation.y += y * dt;
    g.rotation.z += z * dt;
  });
  return <group ref={ref}>{children}</group>;
}
