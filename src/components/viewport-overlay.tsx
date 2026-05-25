"use client";

import React, { useState, useEffect } from "react";
import { TransitionLink as Link } from "./transition-link";
import { motion, AnimatePresence } from "framer-motion";
import { MenuOverlay } from "./menu-overlay";
import { ThemeSwitcher } from "./theme-switcher";

const ROLES = [
  "CREATIVE DEVELOPER",
  "FULLSTACK DEVELOPER",
  "INFORMATICS STUDENT",
];

export function ViewportOverlay() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Viewport Frame Container - fixed, pointer-events-none */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-xs tracking-wider select-none text-white mix-blend-difference">
        {/* Top Header Row */}
        <div className="w-full flex justify-end sm:justify-between items-start pointer-events-auto">
          {/* Top-Left: Cycling role & availability (hidden on mobile to prevent overlapping) */}
          <div className="hidden sm:flex flex-col space-y-1 text-left uppercase max-w-[200px] md:max-w-none">
            <div className="h-[15px] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ROLES[roleIndex]}
                  initial={{ y: 15 }}
                  animate={{ y: 0 }}
                  exit={{ y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="opacity-50 font-mono text-[10px]">
              AVAILABLE FOR FREELANCE & CDI
            </div>
          </div>

          {/* Top-Center: Styled Wordmark Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <Link href="/" className="group flex flex-col items-center">
              <span className="font-sans font-black text-lg sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-300">
                xfhreall
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="h-[2px] bg-current opacity-70"
              />
            </Link>
          </div>

          {/* Top-Right: Theme Switcher & ME NU Opener */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex flex-col text-right font-extrabold uppercase items-end leading-none space-y-0.5 cursor-pointer text-sm tracking-widest focus:outline-none"
            >
              <span className="relative overflow-hidden h-[14px] flex items-center">
                <span className="block transition-transform duration-500 ease-in-out group-hover:translate-y-[-100%]">
                  ME
                </span>
                <span className="absolute block transition-transform duration-500 ease-in-out translate-y-[100%] group-hover:translate-y-0">
                  ME
                </span>
              </span>
              <span className="relative overflow-hidden h-[14px] flex items-center">
                <span className="block transition-transform duration-500 ease-in-out group-hover:translate-y-[-100%] delay-75">
                  NU
                </span>
                <span className="absolute block transition-transform duration-500 ease-in-out translate-y-[100%] group-hover:translate-y-0 delay-75">
                  NU
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="w-full flex justify-between items-end pointer-events-auto opacity-50 uppercase font-bold text-[9px] sm:text-[10px] md:text-xs">
          {/* Bottom-Left */}
          <div>
            <span className="hidden sm:inline">PORTFOLIO 2026 — ALL RIGHTS RESERVED</span>
            <span className="inline sm:hidden">PORTFOLIO 2026</span>
          </div>
          {/* Bottom-Right */}
          <div className="text-right">
            <span className="hidden sm:inline">BASED IN MALANG, INDONESIA</span>
            <span className="inline sm:hidden">MALANG, INDONESIA</span>
          </div>
        </div>
      </div>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && <MenuOverlay onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
