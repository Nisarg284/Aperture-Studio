"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorState = "default" | "view" | "action";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Step 1: Detect pointer type and screen width
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia("(pointer: fine) and (min-width: 768px)").matches);
    };
    
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Step 2: Set up GSAP only after the DOM has rendered with refs
  useEffect(() => {
    if (!isDesktop) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    const trail = trailRef.current;
    if (!ring || !dot || !label || !trail) return;

    // Start hidden at center
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    gsap.set([ring, dot, trail], { x: startX, y: startY, opacity: 0 });

    let hasMoved = false;

    // Smooth cursor follow via quickTo
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2" });
    const trailX = gsap.quickTo(trail, "x", { duration: 0.8, ease: "power3" });
    const trailY = gsap.quickTo(trail, "y", { duration: 0.8, ease: "power3" });

    let currentState: CursorState = "default";

    const setState = (state: CursorState) => {
      if (state === currentState) return;
      currentState = state;

      switch (state) {
        case "view":
          gsap.to(ring, {
            width: 80,
            height: 80,
            borderColor: "rgba(231, 193, 121, 0.8)",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
          gsap.to(dot, { scale: 0, duration: 0.2 });
          gsap.to(trail, { scale: 1.5, opacity: 0.08, duration: 0.4 });
          break;

        case "action":
          gsap.to(ring, {
            width: 16,
            height: 16,
            borderColor: "rgba(231, 193, 121, 1)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
          gsap.to(dot, { scale: 0, duration: 0.2 });
          gsap.to(trail, { scale: 0.5, opacity: 0, duration: 0.3 });
          break;

        default:
          gsap.to(ring, {
            width: 36,
            height: 36,
            borderColor: "rgba(231, 193, 121, 0.45)",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
          gsap.to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" });
          gsap.to(trail, { scale: 1, opacity: 0.12, duration: 0.4 });
          break;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to(ring, { opacity: 1, duration: 0.4 });
        gsap.to(dot, { opacity: 1, duration: 0.4 });
        gsap.to(trail, { opacity: 0.12, duration: 0.6 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
      trailX(e.clientX);
      trailY(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) {
        setState("default");
        return;
      }
      const value = (target as HTMLElement).dataset.cursor;
      if (value === "view") setState("view");
      else if (value === "action") setState("action");
      else setState("default");
    };

    const onMouseLeave = () => {
      gsap.to([ring, dot, trail], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        gsap.to(ring, { opacity: 1, duration: 0.3 });
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        gsap.to(trail, { opacity: 0.12, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isDesktop]); // ← runs again once isDesktop flips to true and refs are mounted

  if (!isDesktop) return null;

  return (
    <>
      {/* Soft ambient trail — follows with heavy lag */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
        style={{
          width: 60,
          height: 60,
          background: "radial-gradient(circle, rgba(231,193,121,0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          filter: "blur(8px)",
        }}
      />

      {/* Brass ring — the main cursor element */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid rgba(231, 193, 121, 0.45)",
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height",
        }}
      >
        <span
          ref={labelRef}
          className="pointer-events-none select-none font-mono uppercase text-brass-bright"
          style={{
            fontSize: "0.55rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            opacity: 0,
            transform: "scale(0.5)",
          }}
        >
          View
        </span>
      </div>

      {/* Center dot — snaps instantly to mouse */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 5,
          height: 5,
          backgroundColor: "var(--color-brass-bright)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          boxShadow: "0 0 6px rgba(231, 193, 121, 0.5)",
        }}
      />
    </>
  );
}
