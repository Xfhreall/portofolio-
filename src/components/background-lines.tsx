"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface BackgroundLinesProps {
  accentColor?: string; // e.g. '#9c41f7' for home, '#06BA63' for experience, etc.
}

export function BackgroundLines({ accentColor = "#9c41f7" }: BackgroundLinesProps) {
  // We'll define vertical lines (columns) and horizontal lines (rows)
  const columns = [0, 33.33, 66.66, 100];
  const rows = [0, 25, 50, 75, 100];
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Grid container with custom styling */}
      <div 
        className="relative w-full h-full"
        style={{ "--grid-color": accentColor } as React.CSSProperties}
      >
        {/* Vertical Lines */}
        <div className="absolute inset-0 flex justify-between">
          {columns.map((pos, idx) => (
            <motion.div
              key={`v-${idx}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1], // Custom ease-out expo
                delay: idx * 0.15,
              }}
              style={{
                left: `${pos}%`,
                originY: 0,
                backgroundColor: `var(--grid-color)`,
                opacity: 0.12,
              }}
              className="absolute top-0 bottom-0 w-[1px] h-full"
            >
              {/* Optional moving glowing dot along the vertical line */}
              {isDesktop && idx > 0 && idx < columns.length - 1 && (
                <motion.div
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{
                    duration: 8 + idx * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 1.5,
                  }}
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 8px ${accentColor}`,
                  }}
                  className="absolute left-[-1.5px] w-[4px] h-[4px] rounded-full opacity-60"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Horizontal Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {rows.map((pos, idx) => (
            <motion.div
              key={`h-${idx}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.12,
              }}
              style={{
                top: `${pos}%`,
                originX: 0,
                backgroundColor: `var(--grid-color)`,
                opacity: 0.12,
              }}
              className="absolute left-0 right-0 h-[1px] w-full"
            >
              {/* Optional moving glowing dot along the horizontal line */}
              {isDesktop && idx > 0 && idx < rows.length - 1 && (
                <motion.div
                  initial={{ left: "-10%" }}
                  animate={{ left: "110%" }}
                  transition={{
                    duration: 9 + idx * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 2,
                  }}
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 8px ${accentColor}`,
                  }}
                  className="absolute top-[-1.5px] h-[4px] w-[4px] rounded-full opacity-60"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
