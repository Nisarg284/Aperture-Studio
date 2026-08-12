"use client";

import Reveal from "./ui/Reveal";

const QUOTES = [
  {
    quote:
      "They lit my face like they'd been doing it for years. Fifteen years, actually, it turns out.",
    name: "Priya Nathan",
    role: "Founder, Loom & Co.",
  },
  {
    quote:
      "Our catalogue shoot wrapped a day early and still looked like it took a week.",
    name: "Declan Marsh",
    role: "Creative Director, Fielding & Vance",
  },
  {
    quote: "Every guest asked who shot the wedding. We're still asked.",
    name: "Meera & Théo Alonso",
    role: "Married June 2024",
  },
  {
    quote:
      "The retouching is so restrained you can't see it — which is exactly the point.",
    name: "Ines Wallberg",
    role: "Editor, Rune Magazine",
  },
];

export default function Testimonials() {
  const looped = [...QUOTES, ...QUOTES];

  return (
    <section className="relative overflow-hidden border-y border-hairline-soft bg-charcoal py-16 sm:py-24 md:py-28">
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:mb-14 sm:px-6 md:px-10">
        <Reveal>
          <span className="eyebrow">In Their Words</span>
        </Reveal>
      </div>

      <div className="group flex w-max animate-marquee gap-6 px-3 [animation-play-state:running] hover:[animation-play-state:paused]">
        {looped.map((t, i) => (
          <blockquote
            key={i}
            className="w-[82vw] shrink-0 border border-hairline-soft bg-surface p-8 sm:w-[420px]"
          >
            <p className="font-display text-xl italic leading-relaxed text-parchment md:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-parchment-faint">
              {t.name} — {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
