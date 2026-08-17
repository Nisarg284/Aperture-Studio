"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";

import { cn } from "@/lib/utils";

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  description?: string;
  fstop?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Mobile: simple vertical card stack (zero GSAP, zero pinning) ──
const MobileCards = ({ cards, imageClassName }: { cards: CardData[]; imageClassName?: string }) => (
  <div className="flex flex-col gap-6 px-4">
    {cards.map((card) => (
      <div key={card.id} className="relative h-[60vh] w-full overflow-hidden rounded-2xl">
        <img
          src={card.image}
          alt={card.alt || ""}
          loading="lazy"
          decoding="async"
          className={cn("absolute h-full w-full object-cover", imageClassName)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6">
          {card.fstop && (
            <span className="eyebrow rounded-full border border-brass/40 bg-ink/40 px-3 py-1 backdrop-blur-sm">
              {card.fstop}
            </span>
          )}
          {card.title && (
            <h3 className="font-display text-2xl font-medium text-parchment">
              {card.title}
            </h3>
          )}
          {card.description && (
            <p className="max-w-md text-sm leading-relaxed text-parchment-dim">
              {card.description}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

// ─── Desktop: GSAP pinned sticky cards (original effect) ───────────
const DesktopCards = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const stickyCardsRef = useRef(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current.filter(Boolean);
      const totalCards = imageElements.length;

      if (totalCards === 0 || !stickyCardsRef.current) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });
      for (let i = 1; i < totalCards; i++) {
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stickyCardsRef.current,
          start: "top top",
          end: `+=${window.innerHeight * totalCards}`,
          pin: true,
          scrub: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.85,
            rotation: i % 2 === 0 ? -4 : 4,
            duration: 1,
            ease: "none",
          },
          i,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          i,
        );
      }
    },
    { scope: container },
  );

  return (
    <div className={cn("relative h-full w-full bg-ink py-20", className)} ref={container}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 pb-12">
        <div className="grid content-start justify-items-center gap-4 text-center">
          <span className="eyebrow">Our Craft</span>
          <h2 className="font-display text-3xl font-medium leading-[1.1] text-parchment sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <p className="text-parchment-dim md:text-lg max-w-[600px] mx-auto">
            We offer premium quality services for your special moments.
          </p>
        </div>
      </div>
      <div
        ref={stickyCardsRef}
        className="sticky-cards relative flex h-[80vh] w-full items-center justify-center overflow-hidden p-3 lg:p-8"
      >
        <div
          className={cn(
            "relative h-[90%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute h-full w-full"
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                className={cn(
                  "rounded-4xl absolute h-full w-full object-cover",
                  imageClassName,
                )}
              />
              <div className="rounded-4xl absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-8 sm:p-10 md:p-12">
                {card.fstop && (
                  <span className="eyebrow rounded-full border border-brass/40 bg-ink/40 px-3 py-1 backdrop-blur-sm">
                    {card.fstop}
                  </span>
                )}
                {card.title && (
                  <h3 className="font-display text-2xl font-medium text-parchment sm:text-3xl md:text-4xl">
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <p className="max-w-md text-sm leading-relaxed text-parchment-dim sm:text-base">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StickyCard002 = (props: StickyCard002Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={cn("relative bg-ink py-16", props.className)}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 pb-10">
          <div className="grid content-start justify-items-center gap-4 text-center">
            <span className="eyebrow">Our Craft</span>
            <h2 className="font-display text-3xl font-medium leading-[1.1] text-parchment">
              Our Services
            </h2>
            <p className="text-parchment-dim max-w-[600px] mx-auto">
              We offer premium quality services for your special moments.
            </p>
          </div>
        </div>
        <MobileCards cards={props.cards} imageClassName={props.imageClassName} />
      </div>
    );
  }

  return <DesktopCards {...props} />;
};

// Example usage component with default data
const Skiper17 = () => {
  const defaultCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=60&w=600&auto=format&fit=crop",
      alt: "Wedding Photography",
      title: "Wedding & Documentary",
      description: "A full day, told in order. Vows in the morning light, the last dance under something dimmer.",
      fstop: "f/5.6",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=600&auto=format&fit=crop",
      alt: "Portrait Photography",
      title: "Portrait & Headshot",
      description: "Shallow focus, one true expression. For actors, founders, and anyone who needs a face that holds a room.",
      fstop: "f/1.4",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=60&w=600&auto=format&fit=crop",
      alt: "Commercial Photography",
      title: "Product & Commercial",
      description: "Edge-to-edge sharpness for catalogues, campaigns, and packaging that has to survive a zoom-in.",
      fstop: "f/8",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=60&w=600&auto=format&fit=crop",
      alt: "Fashion & Editorial",
      title: "Fashion & Editorial",
      description: "Motion, mood, and a wardrobe department's worth of changes. Built for lookbooks and magazine spreads.",
      fstop: "f/2.8",
    },
  ];

  return (
    <div className="h-full w-full bg-ink">
      <StickyCard002 cards={defaultCards} />
    </div>
  );
};

export { Skiper17, StickyCard002 };
