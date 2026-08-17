import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ExposureMeter from "@/components/ui/ExposureMeter";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Aperture House — Photography Studio",
  description:
    "Aperture House is a full-service photography studio for portrait, product, fashion and wedding work — shot in available darkness.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full", fraunces.variable, manrope.variable, plexMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-ink text-parchment font-body antialiased">
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
        <ExposureMeter />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
