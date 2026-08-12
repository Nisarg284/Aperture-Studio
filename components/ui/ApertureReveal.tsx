"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Full-bleed iris made of eight blades, layered over the hero on first
 * paint. Mimics a camera aperture racking open — blades retract toward
 * the rim so the frame reveals from the centre outward, then the whole
 * mechanism is removed from the flow.
 */
export default function ApertureReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bladeRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const wrap = wrapRef.current;
    if (!wrap) return;

    if (prefersReducedMotion) {
      gsap.set(wrap, { autoAlpha: 0, display: "none" });
      return;
    }

    const blades = bladeRefs.current;
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        gsap.set(wrap, { display: "none" });
      },
    });

    tl.set(blades, { scale: 1, transformOrigin: "54% 8%" })
      .to(wrap, { rotate: -6, duration: 1.25, ease: "power3.inOut" }, 0)
      .to(
        blades,
        {
          scale: 0,
          duration: 1.05,
          ease: "power3.inOut",
          stagger: { each: 0.045, from: "random" },
        },
        0.05
      )
      .to(wrap, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, "-=0.25");

    return () => {
      tl.kill();
    };
  }, []);

  const blades = Array.from({ length: 8 });

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden bg-ink"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="h-[145vmax] w-[145vmax] shrink-0"
        style={{ filter: "drop-shadow(0 0 40px rgba(0,0,0,0.6))" }}
      >
        {blades.map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 200 200)`}>
            <path
              ref={(el) => {
                if (el) bladeRefs.current[i] = el;
              }}
              d="M200,200 L200,-10 A210,210 0 0,1 348.5,51.5 Z"
              fill="var(--color-charcoal)"
              stroke="var(--color-hairline)"
              strokeWidth="1"
              style={{ transformBox: "fill-box" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
