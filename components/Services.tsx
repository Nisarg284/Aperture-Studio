"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Reveal from "./ui/Reveal";
import Parallax from "./ui/Parallax";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    fstop: "f/1.4",
    name: "Portrait & Headshot",
    copy: "Shallow focus, one true expression. For actors, founders, and anyone who needs a face that holds a room.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    fstop: "f/2.8",
    name: "Fashion & Editorial",
    copy: "Motion, mood, and a wardrobe department's worth of changes. Built for lookbooks and magazine spreads.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  },
  {
    fstop: "f/8",
    name: "Product & Commercial",
    copy: "Edge-to-edge sharpness for catalogues, campaigns, and packaging that has to survive a zoom-in.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  {
    fstop: "f/5.6",
    name: "Wedding & Documentary",
    copy: "A full day, told in order. Vows in the morning light, the last dance under something dimmer.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Mouse tracking for floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    const checkHoverState = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      if (!el) {
        setActiveIndex(null);
        return;
      }
      
      const row = el.closest("[data-service-index]");
      if (row) {
        const index = parseInt(row.getAttribute("data-service-index") || "0", 10);
        setActiveIndex(index);
      } else {
        setActiveIndex(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      lastX = e.clientX;
      lastY = e.clientY;
      
      // Offset by half the image dimensions (w-64 = 256px / 2 = 128px, h-80 = 320px / 2 = 160px)
      mouseX.set(e.clientX - 128);
      mouseY.set(e.clientY - 160);
      
      checkHoverState(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (!hasMoved) return;
      checkHoverState(lastX, lastY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY]);

  return (
    <section id="services" className="relative bg-ink py-24 sm:py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <Parallax offset={20} opacity={[0.4, 1]}>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-hairline-soft pb-10">
            <div>
              <Reveal>
                <span className="eyebrow">What We Shoot</span>
              </Reveal>
              <Reveal index={1}>
                <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] text-parchment sm:mt-4 sm:text-4xl md:text-5xl max-w-lg">
                  Four ways we see.
                </h2>
              </Reveal>
            </div>
            <Reveal index={2}>
              <p className="max-w-xs text-sm leading-relaxed text-parchment-dim sm:text-base md:text-right">
                Every service is a different relationship with the aperture
                ring — how much of the frame stays sharp, and how much is
                allowed to fall away.
              </p>
            </Reveal>
          </div>
        </Parallax>

        <div className="relative flex flex-col">
          {SERVICES.map((service, i) => {
            const isActive = activeIndex === i;

            return (
              <Parallax key={service.name} offset={-5 * i}>
                <Reveal index={i * 0.2}>
                  <div
                    data-service-index={i}
                    className="group relative flex cursor-pointer flex-col md:flex-row md:items-center justify-between border-b border-hairline-soft py-10 transition-colors hover:border-brass/30"
                  >
                    {/* Title Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 md:w-1/2">
                      <div className="flex items-center gap-6">
                        <span className={cn(
                          "font-mono text-sm tracking-widest transition-colors duration-500",
                          isActive ? "text-brass" : "text-parchment-faint"
                        )}>
                          0{i + 1}
                        </span>
                        <h3 className={cn(
                          "font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-all duration-500",
                          isActive ? "text-parchment translate-x-4" : "text-parchment-dim"
                        )}>
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    {/* Copy & Details Section */}
                    <div className="mt-6 md:mt-0 flex flex-col md:flex-row md:items-center justify-between md:w-1/2 gap-6 md:pl-12">
                      <p className={cn(
                        "text-sm sm:text-base leading-relaxed max-w-sm transition-colors duration-500",
                        isActive ? "text-parchment" : "text-parchment-dim"
                      )}>
                        {service.copy}
                      </p>
                      <span className={cn(
                        "font-mono text-sm transition-colors duration-500 md:text-right",
                        isActive ? "text-brass-bright" : "text-parchment-faint"
                      )}>
                        {service.fstop}
                      </span>
                    </div>

                    {/* Mobile Inline Image (Hidden on Desktop) */}
                    <div className="mt-8 relative h-64 w-full overflow-hidden rounded-lg md:hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="absolute inset-0 h-full w-full object-cover grayscale-[20%]" 
                      />
                    </div>
                  </div>
                </Reveal>
              </Parallax>
            );
          })}
        </div>
      </div>

      {/* Floating Follow Cursor Image */}
      <div className="pointer-events-none fixed inset-0 z-50 hidden md:block overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-80 w-64 overflow-hidden rounded-xl shadow-2xl"
          style={{
            x: imageX,
            y: imageY,
            opacity: activeIndex !== null ? 1 : 0,
            scale: activeIndex !== null ? 1 : 0.8,
          }}
          transition={{
            opacity: { duration: 0.3, ease: "easeOut" },
            scale: { duration: 0.4, ease: "backOut" },
          }}
        >
          <AnimatePresence mode="popLayout">
            {activeIndex !== null && (
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={SERVICES[activeIndex].image}
                alt={SERVICES[activeIndex].name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

