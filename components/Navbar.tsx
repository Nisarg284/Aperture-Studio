"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ApertureMark from "./ui/ApertureMark";
import MagneticButton from "./ui/MagneticButton";

const LINKS = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        open
          ? "bg-ink"
          : scrolled
          ? "border-b border-hairline-soft bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2 text-parchment sm:gap-2.5" data-cursor="action">
          <ApertureMark className="h-5 w-5 text-brass sm:h-6 sm:w-6" />
          <span className="font-display text-[0.82rem] font-semibold tracking-[0.08em] sm:text-[0.95rem]">
            APERTURE HOUSE
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="eyebrow text-[0.68rem] text-parchment-dim transition-colors hover:text-brass"
              data-cursor="action"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <MagneticButton>
          <a
            href="#contact"
            className="hidden rounded-full border border-brass/60 px-5 py-2 text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink md:inline-block"
          >
            Book a Session
          </a>
        </MagneticButton>

        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center text-parchment md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor="action"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-ink px-8 md:hidden"
            style={{ height: "100dvh" }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-2.5 font-display text-2xl font-medium text-parchment transition-colors hover:text-brass"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + LINKS.length * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 rounded-full border border-brass/60 px-8 py-3 text-xs uppercase tracking-[0.15em] text-brass transition-colors"
            >
              Book a Session
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
