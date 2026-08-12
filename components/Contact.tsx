"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./ui/Reveal";

const PROJECT_TYPES = ["Portrait", "Product", "Fashion", "Wedding", "Other"];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your own endpoint (API route, Formspree, etc).
    // Left as a client-side confirmation so the template works out of the box.
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 sm:py-28 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-10 md:py-36">
        <div>
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
          </Reveal>
          <Reveal index={1}>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] text-parchment sm:mt-4 sm:text-4xl md:text-5xl">
              Tell us what you&apos;re making.
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-parchment-dim md:text-base">
              Send a few details and we&apos;ll reply within two working days
              with availability and a tailored quote.
            </p>
          </Reveal>

          <Reveal index={3}>
            <dl className="mt-10 space-y-4 border-t border-hairline-soft pt-8 font-mono text-xs text-parchment-dim">
              <div className="flex justify-between gap-4">
                <dt className="text-parchment-faint">Studio</dt>
                <dd className="text-right">14 Ashford Mews, London N1</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-parchment-faint">Email</dt>
                <dd className="text-right">bookings@aperturehouse.studio</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-parchment-faint">Phone</dt>
                <dd className="text-right">+44 20 7946 0192</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-parchment-faint">Hours</dt>
                <dd className="text-right">Tue–Sat, 09:00–19:00</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal variant="fade" index={1}>
          {status === "sent" ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center border border-hairline-soft bg-surface p-10 text-center">
              <p className="font-display text-2xl text-brass-bright">
                Inquiry sent.
              </p>
              <p className="mt-3 max-w-xs text-sm text-parchment-dim">
                We&apos;ll be in touch within two working days. Thank you for
                thinking of us.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 border border-hairline-soft bg-surface p-8 md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-parchment-faint">
                    Name
                  </span>
                  <input
                    required
                    type="text"
                    name="name"
                    className="mt-2 w-full border-b border-hairline bg-transparent py-2 text-sm text-parchment outline-none transition-colors focus:border-brass"
                    placeholder="Jordan Ellis"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-parchment-faint">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full border-b border-hairline bg-transparent py-2 text-sm text-parchment outline-none transition-colors focus:border-brass"
                    placeholder="jordan@studio.com"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-parchment-faint">
                    Project type
                  </span>
                  <select
                    name="projectType"
                    defaultValue="Portrait"
                    className="mt-2 w-full border-b border-hairline bg-transparent py-2 text-sm text-parchment outline-none transition-colors focus:border-brass"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-ink">
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-parchment-faint">
                    Preferred date
                  </span>
                  <input
                    type="date"
                    name="date"
                    className="mt-2 w-full border-b border-hairline bg-transparent py-2 text-sm text-parchment outline-none transition-colors focus:border-brass"
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-parchment-faint">
                  Tell us about the project
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-none border-b border-hairline bg-transparent py-2 text-sm text-parchment outline-none transition-colors focus:border-brass"
                  placeholder="Where, when, and what you have in mind."
                />
              </label>

              <button
                type="submit"
                className="rounded-full bg-brass px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-ink transition-transform hover:scale-[1.02]"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
