"use client";

import Image from "next/image";
import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";
import Parallax from "./ui/Parallax";

const STATS = [
  { to: 2300, suffix: "+", label: "Sessions shot" },
  { to: 14, suffix: "", label: "Awards & nominations" },
  { to: 11, suffix: "", label: "Years in this space" },
  { to: 38, suffix: "", label: "Countries, on location" },
];

const img_src = "/studio.jpg";

export default function About() {
  return (
    <section id="studio" className="relative bg-ink overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 sm:py-28 md:grid-cols-2 md:gap-16 md:px-10 md:py-36">
        <Parallax offset={50} scale={1.03} className="h-full w-full">
          <Reveal variant="fade" className="h-full w-full">
            <div className="relative h-[300px] overflow-hidden border border-hairline-soft sm:h-[420px] md:h-full w-full">
              <Image
                  src={img_src}
                alt="Aperture House studio space with lighting rig"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover grayscale-[20%]"
              />
            </div>
          </Reveal>
        </Parallax>

        <Parallax offset={-20} opacity={[0.5, 1]}>
          <div>
            <Reveal>
              <span className="eyebrow">The Studio</span>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] text-parchment sm:mt-4 sm:text-4xl md:text-5xl">
                Twelve years in one room, mostly with the lights off.
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 text-sm leading-relaxed text-parchment-dim md:text-base">
                Aperture House started as a single north-facing room and a
                second-hand strobe. It is still, at its core, that same
                instinct — get the light right first, and let the camera do
                less work. Our team now splits its time between the home
                studio and location work for weddings and campaigns, but the
                darkroom habits stayed: we still pull a test frame before the
                real one, and we still trust our eyes over the histogram.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 text-sm leading-relaxed text-parchment-dim md:text-base">
                Five photographers, one retoucher, and a shared belief that
                restraint reads as confidence.
              </p>
            </Reveal>

            <Parallax offset={-10}>
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-hairline-soft pt-10">
                {STATS.map((stat, i) => (
                  <Reveal key={stat.label} index={i}>
                    <p className="font-display text-3xl text-brass-bright md:text-4xl">
                      <Counter to={stat.to} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-parchment-faint">
                      {stat.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </Parallax>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

