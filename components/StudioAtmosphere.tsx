"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./ui/Reveal";
import DustParticles from "./ui/DustParticles";

export default function StudioAtmosphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Existing overlay opacity
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Existing parallax on video
      gsap.to(videoRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Clip-path wipe reveal
      if (wipeRef.current) {
        gsap.fromTo(
          wipeRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 25%",
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-[60vh] min-h-[400px] w-full items-center justify-center overflow-hidden bg-ink sm:h-[80vh] sm:min-h-[520px]"
    >
      <div ref={wipeRef} className="absolute inset-0">
        <div ref={videoRef} className="absolute inset-0 -z-10 h-[125%] w-full">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1920&auto=format&fit=crop"
          >
            <source src="/videos/studio-atmosphere.mp4" type="video/mp4" />
          </video>
        </div>
        <div ref={overlayRef} className="absolute inset-0 -z-10 bg-ink" />
      </div>

      <DustParticles count={16} />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
        <Reveal variant="fade">
          <p className="font-display text-xl italic leading-relaxed text-parchment sm:text-2xl md:text-3xl lg:text-4xl">
            &ldquo;Behind every frame is a room full of patience &mdash; and
            someone watching the light change their mind.&rdquo;
          </p>
        </Reveal>
        <Reveal variant="fade" index={1}>
          <p className="eyebrow mt-8">Inside the studio, Bay 2</p>
        </Reveal>
      </div>
    </section>
  );
}
