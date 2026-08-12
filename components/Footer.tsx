import ApertureMark from "./ui/ApertureMark";

const LINKS = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = ["Instagram", "Behance", "Vimeo"];

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline-soft bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 text-parchment">
              <ApertureMark className="h-6 w-6 text-brass" />
              <span className="font-display text-sm font-semibold tracking-[0.08em]">
                APERTURE HOUSE
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-parchment-dim">
              A full-service photography studio for portrait, product,
              fashion and wedding work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-4">Navigate</p>
              <ul className="space-y-2.5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-parchment-dim transition-colors hover:text-brass"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Follow</p>
              <ul className="space-y-2.5">
                {SOCIALS.map((social) => (
                  <li key={social}>
                    <a
                      href="#"
                      className="text-sm text-parchment-dim transition-colors hover:text-brass"
                    >
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline-soft pt-8 font-mono text-[0.68rem] text-parchment-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aperture House Studio Ltd.</p>
          <p>14 Ashford Mews, London N1 — bookings@aperturehouse.studio</p>
        </div>
      </div>
    </footer>
  );
}
