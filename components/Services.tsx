"use client";

import Reveal from "./ui/Reveal";

const SERVICES = [
  {
    fstop: "f/1.4",
    name: "Portrait & Headshot",
    copy: "Shallow focus, one true expression. For actors, founders, and anyone who needs a face that holds a room.",
  },
  {
    fstop: "f/2.8",
    name: "Fashion & Editorial",
    copy: "Motion, mood, and a wardrobe department's worth of changes. Built for lookbooks and magazine spreads.",
  },
  {
    fstop: "f/8",
    name: "Product & Commercial",
    copy: "Edge-to-edge sharpness for catalogues, campaigns, and packaging that has to survive a zoom-in.",
  },
  {
    fstop: "f/5.6",
    name: "Wedding & Documentary",
    copy: "A full day, told in order. Vows in the morning light, the last dance under something dimmer.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow">What We Shoot</span>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] text-parchment sm:mt-4 sm:text-4xl md:text-5xl">
                Four ways we see.
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-parchment-dim md:text-base">
                Every service is a different relationship with the aperture
                ring — how much of the frame stays sharp, and how much is
                allowed to fall away.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-hairline-soft border-t border-hairline-soft">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} index={i}>
                <div className="group grid grid-cols-1 items-start gap-2 py-6 transition-colors sm:grid-cols-[6rem_1fr_1fr] sm:items-center sm:gap-8 sm:py-8">
                  <span className="font-mono text-sm text-brass sm:text-base">
                    {service.fstop}
                  </span>
                  <h3 className="font-display text-xl text-parchment transition-colors group-hover:text-brass-bright sm:text-2xl">
                    {service.name}
                  </h3>
                  <p className="col-span-2 mt-2 text-sm leading-relaxed text-parchment-dim sm:col-span-1 sm:mt-0 sm:text-right md:text-left">
                    {service.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
