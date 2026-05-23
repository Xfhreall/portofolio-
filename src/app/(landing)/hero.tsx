"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/background-lines";

export function Hero() {
  // Path data extracted from the target website's landing background
  const signaturePath =
    "M600,1300 C650,1350 750,1300 800,1200 L1000,450 C1020,380 980,300 900,300 C800,300 700,400 700,500 C700,600 1200,200 1400,250 C1500,280 1500,380 1400,420 C1300,450 850,480 850,480 M800,800 L1200,800";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-white dark:bg-neutral-950 overflow-hidden select-none">
      {/* Grid lines with home page accent (Purple) */}
      <BackgroundLines accentColor="#9c41f7" />

      {/* Signature SVG overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.06] dark:opacity-[0.09] p-10">
        <svg
          viewBox="0 0 2025 1583"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-5xl transition-colors duration-500 text-[#9c41f7]"
        >
          <motion.path
            d={signaturePath}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </svg>
      </div>

      {/* Hero Typography Content */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 max-w-4xl">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="font-bricolage font-black text-6xl md:text-8xl lg:text-[10vw] leading-none uppercase tracking-[-0.03em] text-neutral-900 dark:text-white flex flex-wrap justify-center gap-x-4 md:gap-x-6"
        >
          <span className="inline-block overflow-hidden py-2">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block"
            >
              Risqi
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden py-2">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block "
            >
              Fahreal
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle / Description - Animating letter-spacing */}
        <motion.p
          initial={{ opacity: 0, y: 15, letterSpacing: "0.35em" }}
          animate={{ opacity: 0.7, y: 0, letterSpacing: "0.18em" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="mt-6 text-xs md:text-sm font-mono text-neutral-500 dark:text-neutral-400 uppercase max-w-md"
        >
          CREATIVE DEVELOPER & INTEGRATION ENGINEER
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-600 uppercase"
      >
        <span>SCROLL DOWN</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-2 text-sm font-bold"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
