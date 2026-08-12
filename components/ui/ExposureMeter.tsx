"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const FSTOPS = [
  { label: "f/1.4", position: 0 },
  { label: "f/2", position: 0.14 },
  { label: "f/2.8", position: 0.28 },
  { label: "f/4", position: 0.42 },
  { label: "f/5.6", position: 0.56 },
  { label: "f/8", position: 0.7 },
  { label: "f/11", position: 0.84 },
  { label: "f/16", position: 0.96 },
];

export default function ExposureMeter() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const meterY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed right-5 top-0 z-40 hidden h-screen md:flex lg:right-7"
    >
      <div className="relative flex h-full flex-col items-center py-20">
        {/* Track line */}
        <div
          className="relative h-full"
          style={{ width: 1, backgroundColor: "var(--color-hairline)" }}
        >
          {/* f-stop labels */}
          {FSTOPS.map((stop) => (
            <div
              key={stop.label}
              className="absolute flex items-center"
              style={{ top: `${stop.position * 100}%`, right: 8 }}
            >
              <span
                className="mr-2"
                style={{
                  width: 6,
                  height: 1,
                  backgroundColor: "var(--color-hairline)",
                  display: "block",
                }}
              />
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-parchment-faint)",
                  opacity: 0.7,
                  whiteSpace: "nowrap",
                }}
              >
                {stop.label}
              </span>
            </div>
          ))}

          {/* Moving indicator — glowing brass dot */}
          <motion.div
            className="absolute flex items-center"
            style={{
              top: meterY,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: "var(--color-brass-bright)",
                boxShadow: "0 0 12px rgba(231, 193, 121, 0.7), 0 0 4px rgba(231, 193, 121, 0.9)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
