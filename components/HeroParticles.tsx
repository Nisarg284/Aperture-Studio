"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import ApertureReveal from "./ui/ApertureReveal";
import SplitText from "./ui/SplitText";
import MagneticButton from "./ui/MagneticButton";
import DustParticles from "./ui/DustParticles";
import InteractiveParticles from "./ui/interactive-particles";

export default function HeroParticles() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-0 flex h-[100svh] min-h-[580px] w-full items-end overflow-hidden bg-ink"
    >
      {/* Background: Particles take center stage without the video */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 h-[120%] w-full scale-105"
        data-cursor="view"
      >
        {/* A deep radial gradient to give depth behind the particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,23,16,0.3),rgba(10,9,8,1))] z-0" />
        
        {/* Gradients to blend the edges into the rest of the dark site */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Interactive Particles */}
        <div className="absolute inset-0 z-20 opacity-100">
          <InteractiveParticles
            src="/images/studio_portrait_1786909976702.jpg"
            color="#d4af37" 
            background="transparent"
            allowUpload={false}
            size={1.8}
            threshold={15}
          />
        </div>
      </div>

      <ApertureReveal />
      <DustParticles count={20} />

      <div className="relative z-30 mx-auto w-full max-w-7xl px-5 pb-10 pt-32 sm:px-6 sm:pb-16 md:px-10 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-4 text-[0.62rem] sm:mb-6 sm:text-[0.72rem]"
        >
          Aperture House — Est. 2014
          <span className="hidden sm:inline"> — Portrait / Product / Fashion / Wedding</span>
        </motion.p>

        <SplitText
          as="h1"
          className="max-w-4xl font-display text-[2.2rem] font-medium leading-[1.08] tracking-tight text-parchment sm:text-5xl md:text-6xl lg:text-7xl"
          delay={1.2}
          stagger={0.055}
          animateOnMount
        >
          Photography, shot in available darkness.
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-balance text-sm leading-relaxed text-parchment-dim sm:mt-7 sm:text-base md:text-lg"
        >
          A full-service studio for portrait, product, fashion and wedding
          work — built around patient light, long exposures, and a darkroom
          sensibility that hasn&apos;t changed since film.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
        >
          <MagneticButton>
            <a
              href="#portfolio"
              className="rounded-full bg-brass px-6 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-ink transition-transform hover:scale-[1.03] sm:px-7 sm:py-3 sm:text-xs"
            >
              View the Portfolio
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="rounded-full border border-parchment/25 px-6 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-parchment transition-colors hover:border-brass hover:text-brass sm:px-7 sm:py-3 sm:text-xs"
            >
              Book a Session
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="pointer-events-none absolute bottom-8 right-6 z-30 hidden flex-col items-end gap-2 md:flex md:right-10"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-parchment-faint">
          SCROLL — F/2.8
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent" />
      </motion.div>
    </section>
  );
}
