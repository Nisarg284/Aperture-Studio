"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: React.ReactNode;
  /** How much to shift on scroll. Positive = moves up slower (lags behind). Negative = moves faster. @default 40 */
  offset?: number;
  /** Scale effect: 1 = no scale, 1.1 = grow 10% as it enters. @default 1 */
  scale?: number;
  /** Opacity range: [start, end]. @default [1, 1] (no fade). Use [0.4, 1] for fade-in. */
  opacity?: [number, number];
  /** Rotation in degrees at scroll start. @default 0 */
  rotate?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "span";
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);
  return isMobile;
}

export default function Parallax({
  children,
  offset = 40,
  scale = 1,
  opacity = [1, 1],
  rotate = 0,
  className,
  as = "div",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const scaleVal = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scale, 1, scale]
  );
  const opacityVal = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [opacity[0], 1, 1, opacity[1]]
  );
  const rotateVal = useTransform(scrollYProgress, [0, 1], [rotate, -rotate]);

  // On mobile / reduced motion, render a plain tag with zero scroll overhead.
  if (prefersReducedMotion || isMobile) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      style={{
        y,
        scale: scale !== 1 ? scaleVal : undefined,
        opacity: opacity[0] !== 1 || opacity[1] !== 1 ? opacityVal : undefined,
        rotate: rotate !== 0 ? rotateVal : undefined,
        willChange: "transform",
      }}
    >
      {children}
    </MotionTag>
  );
}
