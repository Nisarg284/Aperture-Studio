"use client";

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
  { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop", alt: "Artistic Shadows" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", alt: "Fashion Editorial" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop", alt: "Product Photography" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", alt: "Portrait" },
  { src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1200&auto=format&fit=crop", alt: "Editorial Mood" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop", alt: "B&W Portrait" },
  { src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop", alt: "Macro Detail" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop", alt: "Wedding Moments" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ImageStreamHero images={IMAGES} className="h-screen w-full bg-ink">
          {/* Gradient overlay for text readability on mobile */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent md:from-transparent md:via-ink/20 md:to-transparent" />
          <div className="pointer-events-none absolute inset-0 md:hidden bg-radial-[ellipse_at_center] from-ink/70 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end pb-20 justify-center md:items-center md:pb-0 pointer-events-none px-5">
            <div className="text-center">
              <Parallax offset={60} opacity={[1, 0.2]}>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-medium text-parchment tracking-tighter mb-4 md:mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Aperture Studio
                </h1>
              </Parallax>
              <Parallax offset={30} opacity={[1, 0.3]}>
                <p className="text-base sm:text-xl md:text-2xl text-parchment-dim max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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

