import type { CSSProperties } from "react";

interface BackgroundLinesProps {
  accentColor?: string;
}

export function BackgroundLines({ accentColor = "#9c41f7" }: BackgroundLinesProps) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-60"
      style={
        {
          "--grid-color": accentColor,
          backgroundImage:
            "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "33.333% 25%",
          backgroundPosition: "0 0",
          opacity: 0.12,
        } as CSSProperties
      }
    />
  );
}
