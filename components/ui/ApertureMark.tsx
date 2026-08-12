import { cn } from "@/lib/utils";

/** Static six-blade aperture icon used as the studio's brand mark. */
export default function ApertureMark({ className }: { className?: string }) {
  const blades = Array.from({ length: 6 });
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-6 w-6", className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {blades.map((_, i) => (
        <path
          key={i}
          d="M24,24 L24,7 L34.5,13.2 Z"
          fill="currentColor"
          opacity="0.9"
          transform={`rotate(${i * 60} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="6.5" fill="var(--color-ink)" />
    </svg>
  );
}
