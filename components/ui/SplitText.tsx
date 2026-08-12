"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type SplitTextProps = {
  children: string;
  className?: string;
  /** Split by "word" (default) or "char". */
  by?: "word" | "char";
  /** Base delay before stagger starts. */
  delay?: number;
  /** Stagger between each unit. Default 0.04s. */
  stagger?: number;
  /** Element tag for the container. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Use animate (plays on mount) instead of whileInView. */
  animateOnMount?: boolean;
};

export default function SplitText({
  children,
  className,
  by = "word",
  delay = 0,
  stagger = 0.04,
  as: Tag = "span",
  animateOnMount = false,
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();

  const units = useMemo(() => {
    if (by === "char") {
      return children.split("").map((char, i) => ({
        key: `${char}-${i}`,
        text: char === " " ? "\u00A0" : char,
        isSpace: char === " ",
      }));
    }
    return children.split(/(\s+)/).map((segment, i) => ({
      key: `${segment}-${i}`,
      text: segment,
      isSpace: /^\s+$/.test(segment),
    }));
  }, [children, by]);

  // If reduced motion, render plain text
  if (prefersReducedMotion) {
    const MotionTag = motion[Tag];
    return (
      <MotionTag
        className={cn(className)}
        initial={{ opacity: 0 }}
        {...(animateOnMount
          ? { animate: { opacity: 1 } }
          : { whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 } }
        )}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  const MotionTag = motion[Tag];

  const containerVariants: Variants = {
    hidden: {},
    show: {},
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      {...(animateOnMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.3 } }
      )}
      variants={containerVariants}
      aria-label={children}
    >
      {units.map((unit, i) => {
        if (unit.isSpace && by === "word") {
          return <span key={unit.key}>{unit.text}</span>;
        }

        return (
          <span
            key={unit.key}
            style={{
              display: "inline-block",
              clipPath: "inset(-10% -5% -15% -5%)",
              verticalAlign: "bottom",
            }}
          >
            <motion.span
              style={{
                display: "inline-block",
                willChange: "transform, opacity",
              }}
              initial={{ y: "110%", opacity: 0 }}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: delay + i * stagger,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  },
                },
              }}
              aria-hidden="true"
            >
              {unit.text}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

