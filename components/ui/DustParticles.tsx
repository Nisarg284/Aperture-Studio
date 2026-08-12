"use client";

import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
};

export default function DustParticles({ count = 24 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${50 + Math.random() * 55}%`,
        size: 1.5 + Math.random() * 3,
        duration: 14 + Math.random() * 20,
        delay: -(Math.random() * 20),
        opacity: 0.25 + Math.random() * 0.45,
        drift: -25 + Math.random() * 50,
      }))
    );
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust-mote absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor:
              p.id % 3 === 0
                ? "var(--color-brass-bright)"
                : "var(--color-parchment)",
            opacity: 0,
            animationName: "dust-float",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            animationFillMode: "both",
            "--dust-drift": `${p.drift}px`,
            "--dust-opacity": p.opacity,
            boxShadow: p.id % 3 === 0
              ? "0 0 4px rgba(231, 193, 121, 0.4)"
              : "0 0 3px rgba(239, 232, 219, 0.3)",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
