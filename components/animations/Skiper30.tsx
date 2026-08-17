"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const images = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=400&auto=format&fit=crop", // Portrait
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=60&w=400&auto=format&fit=crop", // Fashion
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=60&w=400&auto=format&fit=crop", // Product
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=60&w=400&auto=format&fit=crop", // Wedding
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=60&w=400&auto=format&fit=crop", // B&W Portrait
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=60&w=400&auto=format&fit=crop", // Architecture
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=60&w=400&auto=format&fit=crop", // Editorial
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=60&w=400&auto=format&fit=crop", // Shadows/Artistic
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=60&w=400&auto=format&fit=crop", // Moody Landscape
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=60&w=400&auto=format&fit=crop", // Detail
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=60&w=400&auto=format&fit=crop", // Auto/Vintage
  "https://images.unsplash.com/photo-1540039155732-680874e8a514?q=60&w=400&auto=format&fit=crop", // Event/Concert
  "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=60&w=400&auto=format&fit=crop", // Minimalist
];

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

// ─── Mobile: static masonry grid (zero JS animation overhead) ──────
const MobileGallery = () => (
  <div className="relative mt-10">
    {/* Horizontal scroll carousel with CSS scroll-snap */}
    <div className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory scrollbar-hide"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {images.slice(0, 8).map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex-shrink-0 snap-center overflow-hidden rounded-2xl",
            i % 3 === 0 ? "w-[72vw] aspect-[3/4]" : "w-[60vw] aspect-[4/5]"
          )}
        >
          <img
            src={src}
            alt="Gallery"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </div>
    {/* Scroll hint gradient */}
    <div className="pointer-events-none absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-ink to-transparent" />
  </div>
);

// ─── Desktop: parallax columns (original effect) ───────────────────
const DesktopGallery = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      ref={gallery}
      className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-ink p-[2vw]"
    >
      <Column images={[images[0], images[1], images[2]]} y={y} />
      <Column images={[images[3], images[4], images[5]]} y={y2} />
      <Column images={[images[6], images[7], images[8]]} y={y3} />
      <Column images={[images[9], images[10], images[11]]} y={y4} />
    </div>
  );
};

const Skiper30 = () => {
  const isMobile = useIsMobile();

  return (
    <main className="w-full bg-ink text-parchment py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid content-start justify-items-center gap-6 text-center text-parchment">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-parchment mb-4">
            Our Visual Symphony
          </h2>
          <p className="text-parchment-dim md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px] mx-auto">
            Explore our curated collection of moments captured in time.
          </p>
        </div>
      </div>

      {isMobile ? <MobileGallery /> : <DesktopGallery />}
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-xl">
          <img
            src={src}
            alt="image"
            loading="lazy"
            decoding="async"
            className="pointer-events-none object-cover h-full w-full"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
