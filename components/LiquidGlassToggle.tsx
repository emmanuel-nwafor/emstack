"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { GlassKnobProps, LiquidGlassToggleProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

function GlassKnob({ isToggled }: GlassKnobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const travelX = viewport.width * 0.25;
  const radius = Math.min(viewport.height * 0.42, 1.4);

  useGSAP(() => {
    if (!meshRef.current) return;
    const targetX = isToggled ? travelX : -travelX;

    gsap.to(meshRef.current.position, {
      x: targetX,
      duration: 0.7,
      ease: "power3.inOut",
    });

    gsap.timeline()
      .to(meshRef.current.scale, {
        x: 1.18,
        y: 0.88,
        z: 0.95,
        duration: 0.28,
        ease: "power2.out",
      })
      .to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.45,
        ease: "elastic.out(1.1, 0.5)",
      });
  }, [isToggled, travelX]);

  return (
    <group>
      
      <mesh
        ref={meshRef}
        position={[-travelX, 0, 0.4]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.5}
          roughness={0}
          chromaticAberration={0.04}
          ior={1.45}
        />
      </mesh>
    </group>
  );
}

export default function LiquidGlassToggle({
  leftLabel = "Sleep",
  rightLabel = "Work",
  initialState = false,
  onToggle,
  className = "",
}: LiquidGlassToggleProps) {
  const [isToggled, setIsToggled] = useState(initialState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleToggle = () => {
    const nextState = !isToggled;
    setIsToggled(nextState);
    onToggle?.(nextState);
  };

  return (
    <div className={`relative inline-flex select-none ${className}`}>
      
      <div
        role="switch"
        aria-checked={isToggled}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={`group relative flex h-20 w-80 cursor-pointer items-center justify-between rounded-full p-2.5 
          border border-white/15 bg-neutral-900/70 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.6)]
          transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
      >
        
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-700 pointer-events-none ${
            isToggled
              ? "bg-gradient-to-r from-transparent via-amber-500/10 to-orange-500/20 opacity-100"
              : "bg-gradient-to-r from-indigo-500/20 via-sky-500/10 to-transparent opacity-100"
          }`}
        />

        <div className="relative z-10 flex flex-1 items-center justify-center gap-2">
          <Icon
            icon="lucide:moon"
            className={`w-5 h-5 transition-all duration-300 ${
              !isToggled
                ? "text-sky-300 scale-110 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                : "text-neutral-500 scale-95 opacity-60"
            }`}
          />
          <span
            className={`text-base font-semibold tracking-wide transition-all duration-300 ${
              !isToggled
                ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                : "text-neutral-400 opacity-60"
            }`}
          >
            {leftLabel}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center gap-2">
          <Icon
            icon="lucide:briefcase"
            className={`w-5 h-5 transition-all duration-300 ${
              isToggled
                ? "text-amber-300 scale-110 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]"
                : "text-neutral-500 scale-95 opacity-60"
            }`}
          />
          <span
            className={`text-base font-semibold tracking-wide transition-all duration-300 ${
              isToggled
                ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                : "text-neutral-400 opacity-60"
            }`}
          >
            {rightLabel}
          </span>
        </div>

        
        {isClient && (
          <div className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
              }}
              style={{ pointerEvents: "none" }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[0, 5, 5]} intensity={1.2} />
              <Suspense fallback={null}>
                <Environment preset="city" />
                <GlassKnob isToggled={isToggled} />
              </Suspense>
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
}
