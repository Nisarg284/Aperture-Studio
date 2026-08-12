"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — multiplies the base delay. */
  index?: number;
  /** "up" | "fade" — fade never translates, for large/hero elements. */
  variant?: "up" | "fade";
  as?: "div" | "span" | "li";
  delay?: number;
};

export default function Reveal({
  children,
  className,
  index = 0,
  variant = "up",
  as = "div",
  delay = 0,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === "up" && !prefersReducedMotion ? 28 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: delay + index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
