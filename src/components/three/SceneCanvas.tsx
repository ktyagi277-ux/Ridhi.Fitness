"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, Environment, Lightformer, Preload } from "@react-three/drei";

type SceneCanvasProps = {
  children: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  /** Ground contact shadow y-position; omit to disable */
  shadowY?: number;
  shadowOpacity?: number;
  /** Optional lower resolution cap for decorative scenes */
  maxDpr?: number;
};

/**
 * Shared Canvas wrapper: transparent background, studio lighting via procedural
 * Lightformers (no HDR download), soft contact shadow, and the render loop is
 * paused entirely while the canvas is off-screen so multiple scenes on one page
 * never compete for the GPU.
 */
export default function SceneCanvas({
  children,
  className = "",
  camera = { position: [0, 0, 9], fov: 34 },
  shadowY,
  shadowOpacity = 0.32,
  maxDpr = 2,
}: SceneCanvasProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px 0px",
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        dpr={[1, maxDpr]}
        camera={camera}
        shadows
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 8, 6]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0002}
        />
        <spotLight position={[-6, 5, 5]} intensity={1.1} angle={0.6} penumbra={1} color="#f5e2d6" />
        <pointLight position={[0, -4, 3]} intensity={0.5} color="#e4e8d8" />

        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 6, -9]} scale={[12, 10, 1]} form="rect" color="#fff7ee" />
          <Lightformer intensity={1.1} position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 0.6, 1]} color="#f5e2d6" />
          <Lightformer intensity={1.0} position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} color="#e4e8d8" />
          <Lightformer intensity={0.7} position={[0, -4, 5]} scale={[12, 5, 1]} color="#fbf8f3" />
          <Lightformer intensity={0.9} form="ring" position={[4, 4, 6]} scale={3} color="#ffe9d3" />
        </Environment>

        {children}

        {shadowY !== undefined && (
          <ContactShadows position={[0, shadowY, 0]} opacity={shadowOpacity} scale={16} blur={2.6} far={6} color="#1d1814" />
        )}

        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
}
