"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./ui/Reveal";

type Shot = {
  src: string;
  category: string;
  exif: string;
  title: string;
  width: string;
};

const SHOTS: Shot[] = [
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop",
    category: "Portrait",
    exif: "85mm — f/1.4 — 1/200s — ISO 200",
    title: "Studio Sitting, No. 4",
    width: "w-[74vw] sm:w-[42vw] lg:w-[26vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1400&auto=format&fit=crop",
    category: "Fashion",
    exif: "50mm — f/2.8 — 1/320s — ISO 400",
    title: "Rune Editorial, S/S",
    width: "w-[80vw] sm:w-[52vw] lg:w-[34vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop",
    category: "Product",
    exif: "100mm macro — f/8 — 1/125s — ISO 100",
    title: "Fielding & Vance, Catalogue",
    width: "w-[64vw] sm:w-[36vw] lg:w-[22vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
    category: "Wedding",
    exif: "35mm — f/2 — 1/500s — ISO 320",
    title: "Meera & Théo, June",
    width: "w-[80vw] sm:w-[52vw] lg:w-[34vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop",
    category: "Portrait",
    exif: "135mm — f/1.8 — 1/250s — ISO 160",
    title: "Founder Series, No. 11",
    width: "w-[74vw] sm:w-[42vw] lg:w-[26vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop",
    category: "Product",
    exif: "90mm macro — f/9 — 1/160s — ISO 100",
    title: "Loom & Co, Footwear",
    width: "w-[64vw] sm:w-[36vw] lg:w-[22vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1400&auto=format&fit=crop",
    category: "Fashion",
    exif: "70mm — f/2.5 — 1/400s — ISO 250",
    title: "Rune Editorial, Backstage",
    width: "w-[80vw] sm:w-[52vw] lg:w-[34vw]",
  },
];

export default function Portfolio() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const pinEl = pinRef.current;
      if (!track || !pinEl) return;

      const getScrollDistance = () =>
        Math.max(track.scrollWidth - pinEl.offsetWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.15}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-28 md:px-10 md:pt-36">
        <Reveal>
          <span className="eyebrow">Selected Work</span>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-[1.1] text-parchment sm:mt-4 sm:text-4xl md:text-5xl">
            A contact sheet, not a grid.
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-parchment-dim sm:mt-5 sm:text-sm md:text-base">
            Every frame here shipped to a client. Scroll to move through the
            sheet the way you would across a light table.
          </p>
        </Reveal>
      </div>

      <div ref={pinRef} className="relative h-[80svh] overflow-hidden sm:h-[100svh]">
        <div
          ref={trackRef}
          className="flex h-full items-center gap-3 pl-5 will-change-transform sm:gap-5 sm:pl-6 md:gap-8 md:pl-10"
        >
          {SHOTS.map((shot, i) => (
            <figure
              key={shot.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-cursor="view"
              className={`group relative h-[50vh] shrink-0 overflow-hidden border border-hairline-soft bg-surface sm:h-[55vh] md:h-[62vh] ${shot.width} ${
                i % 2 === 1 ? "md:mt-10" : "md:-mt-6"
              }`}
              style={{ willChange: "transform" }}
            >
              <Image
                src={shot.src}
                alt={`${shot.category} photograph — ${shot.title}`}
                fill
                sizes="80vw"
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                style={{
                  filter: "grayscale(60%) sepia(20%) blur(0.4px) brightness(0.9)",
                  transitionProperty: "transform, filter",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) sepia(0%) blur(0px) brightness(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(60%) sepia(20%) blur(0.4px) brightness(0.9)";
                }}
              />
              {/* Warm brass tint overlay — fades on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                style={{ backgroundColor: "rgba(120, 80, 20, 0.12)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="eyebrow !text-brass-bright">{shot.category}</p>
                  <p className="mt-1 font-display text-base text-parchment sm:text-lg">
                    {shot.title}
                  </p>
                </div>
                <p className="hidden shrink-0 font-mono text-[0.65rem] tracking-[0.08em] text-parchment-faint sm:block">
                  {shot.exif}
                </p>
              </figcaption>
            </figure>
          ))}
          <div className="w-[6vw] shrink-0 md:w-[10vw]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
