"use client";

import { useMemo } from "react";
import { SRGBColorSpace, Vector2 } from "three";
import { useTexture } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { PALETTE } from "./materials";

type GroupProps = ThreeElements["group"];

/* Materials ---------------------------------------------------------- */

const brass = { color: PALETTE.gold, roughness: 0.2, metalness: 0.95, envMapIntensity: 1.5 } as const;
const enamel = (color: string) => ({ color, roughness: 0.36, metalness: 0.02, clearcoat: 0.7, clearcoatRoughness: 0.25 }) as const;

/* Logo medallion ----------------------------------------------------- */

const COIN_R = 1.5; // outer radius
const COIN_T = 0.13; // half thickness
const RIM_W = 0.14; // gold band width on each face

/** Lathe profile for the gold rim: a band around the edge with chamfered corners. */
function rimProfile(): Vector2[] {
  const c = 0.04;
  return [
    new Vector2(COIN_R - RIM_W, -COIN_T),
    new Vector2(COIN_R - c, -COIN_T),
    new Vector2(COIN_R, -COIN_T + c),
    new Vector2(COIN_R, COIN_T - c),
    new Vector2(COIN_R - c, COIN_T),
    new Vector2(COIN_R - RIM_W, COIN_T),
  ];
}

/**
 * The RJ Fitness badge as a thick gold-rimmed coin: the real logo texture on
 * both faces (readable from either side), a brass band around the edge and a
 * lacquered finish so the studio lights glide across it.
 */
export function LogoMedallion(props: GroupProps) {
  const texture = useTexture("/images/rj-logo-3d.jpg", (t) => {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
  });
  const profile = useMemo(() => rimProfile(), []);
  const faceR = COIN_R - RIM_W + 0.01;

  return (
    <group {...props}>
      {/* gold rim (lathe around Y, then turned to face the camera) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <latheGeometry args={[profile, 128]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      {/* core disc between the faces (dark, so the edge never shows a gap) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[faceR + 0.02, faceR + 0.02, COIN_T * 2 - 0.02, 96]} />
        <meshPhysicalMaterial {...enamel("#2b3a42")} />
      </mesh>
      {/* front face */}
      <mesh position={[0, 0, COIN_T + 0.001]} castShadow>
        <circleGeometry args={[faceR, 96]} />
        <meshPhysicalMaterial map={texture} roughness={0.32} metalness={0.12} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>
      {/* back face (turned around so the logo reads correctly from behind) */}
      <mesh position={[0, 0, -COIN_T - 0.001]} rotation={[0, Math.PI, 0]} castShadow>
        <circleGeometry args={[faceR, 96]} />
        <meshPhysicalMaterial map={texture} roughness={0.32} metalness={0.12} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>
      {/* thin inner ridge on each face */}
      {[COIN_T + 0.004, -COIN_T - 0.004].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[faceR - 0.01, 0.014, 12, 128]} />
          <meshStandardMaterial {...brass} />
        </mesh>
      ))}
    </group>
  );
}

/* Pill / capsule ----------------------------------------------------- */

export function Pill({ color = PALETTE.clayLight, length = 0.5, radius = 0.13, ...props }: { color?: string; length?: number; radius?: number } & ThreeElements["mesh"]) {
  return (
    <mesh castShadow {...props}>
      <capsuleGeometry args={[radius, length, 10, 32]} />
      <meshPhysicalMaterial {...enamel(color)} />
    </mesh>
  );
}

/* Mini gear that orbits the medallion ------------------------------- */

export function MiniDumbbell({ plateColor = PALETTE.clay, barColor = PALETTE.gold, ...props }: { plateColor?: string; barColor?: string } & GroupProps) {
  const side: [number, number, number] = [0, 0, Math.PI / 2];
  return (
    <group {...props}>
      <mesh rotation={side}>
        <cylinderGeometry args={[0.035, 0.035, 0.62, 20]} />
        <meshStandardMaterial {...brass} color={barColor} />
      </mesh>
      {[-0.23, 0.23].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={side} castShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.1, 28]} />
          <meshPhysicalMaterial {...enamel(plateColor)} />
        </mesh>
      ))}
      {[-0.32, 0.32].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={side}>
          <cylinderGeometry args={[0.1, 0.1, 0.07, 28]} />
          <meshPhysicalMaterial {...enamel(plateColor)} />
        </mesh>
      ))}
    </group>
  );
}

export function MiniKettlebell({ color = PALETTE.sage, ...props }: { color?: string } & GroupProps) {
  return (
    <group {...props}>
      <mesh castShadow>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshPhysicalMaterial {...enamel(color)} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[0.11, 0.028, 12, 32, Math.PI]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[0, -0.155, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.02, 24]} />
        <meshPhysicalMaterial {...enamel("#2b3a42")} />
      </mesh>
    </group>
  );
}
