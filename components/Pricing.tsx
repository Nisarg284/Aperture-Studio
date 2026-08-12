"use client";

import { Check } from "lucide-react";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "The Sitting",
    price: "$450",
    unit: "per session",
    desc: "A focused single-subject session — portrait or headshot.",
    features: [
      "1-hour studio session",
      "One backdrop + lighting setup",
      "15 retouched images",
      "Private online gallery",
      "Personal print release",
    ],
    highlighted: false,
  },
  {
    name: "The Production",
    price: "$1,650",
    unit: "per half-day",
    desc: "For fashion, product, or small commercial work.",
    features: [
      "Half-day session (4 hours)",
      "Full lighting + set design",
      "Wardrobe & styling consult",
      "40 retouched images",
      "Digital + print usage license",
      "On-site creative director",
    ],
    highlighted: true,
  },
  {
    name: "The Feature",
    price: "From $4,200",
    unit: "per event",
    desc: "Full-day coverage for weddings and brand campaigns.",
    features: [
      "Full-day coverage, up to 10 hours",
      "Second shooter included",
      "Cinematic highlight reel add-on",
      "120+ retouched images",
      "Custom-bound print album",
      "Extended usage license",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36">
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow">Packages</span>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] text-parchment sm:mt-4 sm:text-4xl md:text-5xl">
              Three ways in.
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
              Every package includes a pre-shoot planning call and a private
              gallery. Custom scopes for campaigns and multi-day work are
              quoted separately.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} index={i}>
              <div
                className={cn(
                  "flex h-full flex-col border p-6 sm:p-8",
                  tier.highlighted
                    ? "border-brass bg-surface-2"
                    : "border-hairline-soft bg-surface"
                )}
              >
                {tier.highlighted && (
                  <span className="eyebrow mb-4 w-fit rounded-full border border-brass/50 px-3 py-1">
                    Most Booked
                  </span>
                )}
                <h3 className="font-display text-2xl text-parchment">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-parchment-dim">{tier.desc}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-brass-bright">
                    {tier.price}
                  </span>
                  <span className="font-mono text-xs text-parchment-faint">
                    {tier.unit}
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-parchment-dim"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <MagneticButton className="mt-8">
                  <a
                    href="#contact"
                    className={cn(
                      "inline-block w-full rounded-full px-6 py-3 text-center text-xs uppercase tracking-[0.15em] transition-colors",
                      tier.highlighted
                        ? "bg-brass text-ink hover:bg-brass-bright"
                        : "border border-parchment/25 text-parchment hover:border-brass hover:text-brass"
                    )}
                  >
                    Enquire
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
