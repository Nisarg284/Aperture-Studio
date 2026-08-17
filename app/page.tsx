"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ImageStreamHero from "@/components/ImageStreamHero";
import Portfolio from "@/components/Portfolio";
import { Skiper30 } from "@/components/animations/Skiper30";
import StudioAtmosphere from "@/components/StudioAtmosphere";
import Services from "@/components/Services";
import { Skiper17 } from "@/components/animations/StickyCard002";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Parallax from "@/components/ui/Parallax";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop", alt: "Artistic Shadows" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", alt: "Fashion Editorial" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop", alt: "Product Photography" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", alt: "Portrait" },
  { src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=600&auto=format&fit=crop", alt: "Editorial Mood" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", alt: "B&W Portrait" },
  { src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop", alt: "Macro Detail" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop", alt: "Wedding Moments" },
];

// ─── Mobile hero: fullscreen crossfading slideshow ─────────────────
function MobileHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-ink md:hidden">
      {/* Auto-crossfading background images */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={IMAGES[current].src}
          alt={IMAGES[current].alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30 pointer-events-none" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-end pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl font-display font-medium text-parchment tracking-tighter mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          Aperture Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base text-parchment-dim mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          Capturing moments, creating memories.
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="rounded-full border border-brass/60 bg-brass/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-brass backdrop-blur-sm transition-all hover:bg-brass/20 mb-10"
        >
          Book a Session
        </motion.a>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment-faint">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-[1px] bg-gradient-to-b from-brass/60 to-transparent"
          />
        </motion.div>

        {/* Image indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {IMAGES.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current % 5 ? "w-6 bg-brass" : "w-1 bg-parchment-faint/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Mobile hero: fullscreen slideshow */}
        <MobileHero />

        {/* Desktop hero: 3D corridor */}
        <ImageStreamHero images={IMAGES} cards={5} className="hidden md:block h-screen w-full bg-ink">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-ink/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-5">
            <div className="text-center">
              <Parallax offset={60} opacity={[1, 0.2]}>
                <h1 className="text-6xl md:text-8xl font-display font-medium text-parchment tracking-tighter mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Aperture Studio
                </h1>
              </Parallax>
              <Parallax offset={30} opacity={[1, 0.3]}>
                <p className="text-xl md:text-2xl text-parchment-dim max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Capturing moments, creating memories.
                </p>
              </Parallax>
            </div>
          </div>
        </ImageStreamHero>
        <Portfolio />
        <Skiper30 />
        <StudioAtmosphere />
        <Services />
        <Skiper17 />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
