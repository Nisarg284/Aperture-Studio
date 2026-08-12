# Aperture House — Photography Studio Website

An ultra-premium, dark & cinematic Next.js site for an all-purpose photography
studio (portrait / product / fashion / wedding). Built with the App Router,
Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, and Lenis for inertia
scrolling.

## Design direction

- **Palette** — warm near-black ("darkroom" tones), aged brass accent,
  parchment/ivory text, a safelight-red accent used sparingly.
- **Type** — Fraunces (display, serif), Manrope (body), IBM Plex Mono
  (EXIF-style captions and data — the studio's own vocabulary).
- **Signature element** — an eight-blade aperture iris that racks open over
  the hero on load (`components/ui/ApertureReveal.tsx`), echoed in the small
  static logomark in the nav and footer.
- **Structure** — portfolio captions use real EXIF-style data (lens,
  aperture, shutter, ISO); each service is labelled by the f-stop that
  actually suits it (f/1.4 portrait, f/8 product, etc.) instead of generic
  numbering.

## Scroll animations

- **Lenis** (`components/SmoothScroll.tsx`) drives inertia scrolling
  site-wide and is wired into GSAP's ticker + ScrollTrigger.
- **Hero** — aperture-iris load animation, plus a GSAP parallax on the
  background video/gradient as you scroll past it.
- **Portfolio** — a pinned, horizontally-scrolling gallery
  (`components/Portfolio.tsx`): vertical scroll drives horizontal motion
  through the frames, GSAP ScrollTrigger `pin` + `scrub`.
- **Studio Atmosphere** — full-bleed video break section that darkens and
  drifts as it scrolls through view.
- **Everything else** — Framer Motion `whileInView` reveals
  (`components/ui/Reveal.tsx`), staggered per section, plus a scroll-into-
  view number counter in the About stats.
- All motion respects `prefers-reduced-motion` (Lenis, GSAP timelines, and
  Framer Motion all check it and fall back to instant/native behaviour).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build && npm run start` for a
production build.

> Note: `next/font` fetches Fraunces / Manrope / IBM Plex Mono from Google
> Fonts at build time, so you'll need normal internet access the first time
> you build — no different from any Next.js app using next/font/google.

## Project structure

```
app/
  layout.tsx        fonts, metadata, smooth-scroll + grain overlay
  page.tsx           section order
  globals.css        design tokens (@theme), grain, eyebrow style, marquee keyframes
components/
  Navbar.tsx, Hero.tsx, Portfolio.tsx, StudioAtmosphere.tsx,
  Services.tsx, Pricing.tsx, About.tsx, Testimonials.tsx,
  Contact.tsx, Footer.tsx, SmoothScroll.tsx
  ui/
    Reveal.tsx        scroll-into-view fade/slide wrapper
    ApertureMark.tsx   static logomark
    ApertureReveal.tsx animated hero iris
    Counter.tsx        scroll-triggered number counter
public/videos/       drop the two generated clips here (see below)
```

## What to customise before launch

- Swap the Unsplash portfolio/about photography (`components/Portfolio.tsx`,
  `components/About.tsx`) for real studio work.
- Studio name, address, email, and pricing in `Pricing.tsx` and `Contact.tsx`
  are placeholder copy — replace with the real numbers.
- Wire `Contact.tsx`'s `handleSubmit` to a real endpoint (a Next.js API
  route, Formspree, Resend, etc.) — it currently just shows a confirmation
  state client-side.
- Drop in the two background videos described below (optional — the site
  looks complete without them, using a poster image + gradient fallback).

## Video prompts

Two short, muted, seamlessly-looping background clips will finish the
cinematic feel. Generate them with any AI video tool (Runway, Pika, Kling,
Sora, Luma) or shoot them practically, then drop the files straight into
`public/videos/` with these exact names — no code changes needed.

### 1. `hero-loop.mp4` — hero background

> Cinematic slow-motion footage inside a dark, warm-toned photography
> studio at night. A single hard shaft of tungsten light cuts across the
> frame, dust motes drifting through it. A photographer's silhouette
> (out of focus, unrecognisable) adjusts a softbox in the background.
> Foreground has soft bokeh of camera gear — a lens, a roll of film — just
> out of focus. Slow, minimal camera movement: a gentle push-in or subtle
> handheld drift, nothing fast. Near-black shadows, warm amber highlights,
> visible film grain, moody and quiet. No visible faces in sharp focus. 16:9,
> at least 1920×1080, 8–12 seconds, first and last frame matched for a
> seamless loop. No text, no logos, no audio needed.

### 2. `studio-atmosphere.mp4` — mid-page break section

> Quiet, documentary-style behind-the-scenes footage in the same dark, warm
> studio. Static or slow tripod dolly shots: hands loading film into a
> camera back, adjusting a light stand, reviewing a contact sheet under a
> loupe. One shot includes a faint red safelight glow in the background.
> Slower and calmer than a typical hero clip — this is a quiet pause on the
> page, not an establishing shot. Same warm-dark, high-contrast grade as
> `hero-loop.mp4`, heavier film grain. 16:9, at least 1920×1080, 8–12
> seconds, seamless loop, no text, no audio needed.

Both videos are used purely as ambient background layers behind gradient
overlays, so slight imperfections in the loop point won't be very visible —
prioritise mood and grade over perfect technical looping.
