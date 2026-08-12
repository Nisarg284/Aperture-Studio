"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Max px the element can shift toward the cursor. Default 15. */
  strength?: number;
  as?: "div" | "span";
};

export default function MagneticButton({
  children,
  className = "",
  strength = 15,
  as: Tag = "div",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Stronger pull toward cursor
    const maxDist = Math.max(rect.width, rect.height) * 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const factor = Math.min(dist / maxDist, 1);

    gsap.to(el, {
      x: (dx / maxDist) * strength * factor,
      y: (dy / maxDist) * strength * factor,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="action"
      style={{ willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}
