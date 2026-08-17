"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import DustParticles from "./ui/DustParticles";

export default function HeroDynamic() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Intro animation (on page load) ──
      const letters = titleRef.current?.querySelectorAll(".hero-letter");
      if (letters) {
        gsap.fromTo(
          letters,
          {
            yPercent: 120,
            rotateX: -80,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.06,
            ease: "expo.out",
            delay: 0.3,
          }
        );
      }

      // Subtitle and CTA fade in after text
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" }
      );

      // Line grows in
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, delay: 1.0, ease: "power3.inOut" }
      );

      // ── Scroll-triggered: Title spreads and reveals images ──
      // Using a 3-phase timeline:
      //   Phase 1 (0→0.4): Text scatters, overlay fades, images reveal
      //   Phase 2 (0.4→0.7): Images fully visible, slight zoom
      //   Phase 3 (0.7→1.0): Images hold, subtle parallax drift
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 0.8,
          pin: true,
        },
      });

      // ─── Phase 1: Text scatters (0 → 0.4) ───
      if (letters) {
        const center = letters.length / 2;
        letters.forEach((letter, i) => {
          const offset = i - center + 0.5;
          scrollTl.to(
            letter,
            {
              yPercent: offset * -100,
              xPercent: offset * 80,
              scale: 2.2,
              opacity: 0,
              duration: 0.4,
              ease: "power3.in",
            },
            0
          );
        });
      }

      // Eyebrow fades
      scrollTl.to(
        eyebrowRef.current,
        { y: -30, opacity: 0, duration: 0.2, ease: "power2.in" },
        0
      );

      // Subtitle and CTA fade out with the text
      scrollTl.to(
        subtitleRef.current,
        { y: -60, opacity: 0, duration: 0.25, ease: "power2.in" },
        0
      );
      scrollTl.to(
        ctaRef.current,
        { y: -40, opacity: 0, duration: 0.2, ease: "power2.in" },
        0
      );
      scrollTl.to(
        lineRef.current,
        { scaleX: 0, opacity: 0, duration: 0.2, ease: "power2.in" },
        0
      );
      scrollTl.to(
        scrollHintRef.current,
        { opacity: 0, duration: 0.1, ease: "power2.in" },
        0
      );

      // Overlay fades to reveal images
      scrollTl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.4, ease: "none" },
        0
      );

      // ─── Phase 1b: Images rise into view (0.1 → 0.5) ───
      const images = imageGridRef.current?.querySelectorAll(".hero-grid-img");
      if (images) {
        images.forEach((img, i) => {
          scrollTl.fromTo(
            img,
            {
              yPercent: 60 + i * 15,
              scale: 0.75,
              opacity: 0,
              rotateZ: i % 2 === 0 ? -4 : 4,
            },
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              rotateZ: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            0.1
          );
        });
      }

      // ─── Phase 2-3: Images hold with subtle breathing motion (0.5 → 1.0) ───
      if (images) {
        images.forEach((img, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          scrollTl.to(
            img,
            {
              yPercent: direction * -3,
              scale: 1.02,
              duration: 0.5,
              ease: "none",
            },
            0.5
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const word = "APERTURE";

  const gridImages = [
    { src: "/images/studio_wedding_1786909746475.jpg", alt: "Wedding", category: "f/2.0" },
    { src: "/images/studio_portrait_1786909976702.jpg", alt: "Portrait", category: "f/1.4" },
    { src: "/images/studio_commercial_1786910216249.jpg", alt: "Commercial", category: "f/8" },
    { src: "/images/studio_gear_1786910275849.jpg", alt: "Behind the Lens", category: "f/5.6" },
  ];

  return (
    <section ref={sectionRef} id="top" className="relative bg-ink">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Background image grid (hidden initially, revealed on scroll) */}
        <div
          ref={imageGridRef}
          className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-1.5 md:gap-2 md:p-2"
        >
          {gridImages.map((img, i) => (
            <div
              key={i}
              className="hero-grid-img relative overflow-hidden rounded-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700"
              />
              {/* Warm tint overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ backgroundColor: "rgba(120, 80, 20, 0.08)" }}
              />
              {/* Caption bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-4 md:p-6">
                <span className="eyebrow !text-brass-bright text-[0.58rem]">
                  {img.alt}
                </span>
                <span className="ml-3 font-mono text-[0.58rem] text-parchment-faint">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dark overlay (sits above images, fades on scroll) */}
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-ink" />

        <DustParticles count={15} />

        {/* Main content layer */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="eyebrow mb-6 text-[0.62rem] sm:mb-8 sm:text-[0.72rem]"
          >
            Aperture House — Est. 2014
            <span className="hidden sm:inline"> — Portrait / Product / Fashion / Wedding</span>
          </p>

          {/* Massive Typography */}
          <div
            ref={titleRef}
            className="flex items-center justify-center overflow-visible"
            style={{ perspective: "1200px" }}
          >
            <h1 className="flex text-[14vw] md:text-[12vw] lg:text-[11vw] leading-[0.85] font-display font-medium tracking-[-0.04em] text-parchment select-none">
              {word.split("").map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block transform-gpu will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Brass line separator */}
          <div
            ref={lineRef}
            className="mt-6 h-px w-32 origin-center bg-brass sm:mt-8 sm:w-48"
          />

          {/* Subtitle */}
          <div ref={subtitleRef} className="mt-6 text-center sm:mt-8">
            <p className="max-w-xl text-balance text-sm leading-relaxed text-parchment-dim sm:text-base md:text-lg">
              A full-service studio for portrait, product, fashion &amp; wedding
              work — built around patient light, long exposures, and a darkroom
              sensibility that hasn&apos;t changed since film.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
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
          </div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          ref={scrollHintRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-parchment-faint uppercase">
            Scroll — F/2.8
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
