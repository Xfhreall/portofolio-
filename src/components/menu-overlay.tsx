"use client";

import React, { useState } from "react";
import { TransitionLink as Link } from "./transition-link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundLines } from "./background-lines";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MenuOverlayProps {
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/project" },
  { label: "CONTACT", href: "/contact" },
];

export function MenuOverlay({ onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Determine active item
  const activeIdx = MENU_ITEMS.findIndex((item) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-950 w-screen h-screen overflow-hidden select-none"
    >
      {/* Background Grid Lines inside the menu */}
      <BackgroundLines accentColor="#d1d5db" />

      {/* Close Button Container */}
      <div className="absolute top-6 md:top-10 right-6 md:p-10 z-50 pointer-events-auto">
        <button
          onClick={onClose}
          className="group relative flex items-center justify-center p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors duration-300 focus:outline-none"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 37 37"
            fill="none"
            className="text-black dark:text-white fill-current transform transition-transform duration-500 ease-in-out group-hover:rotate-90"
          >
            <path d="M4.20458 -0.000234323L0 4.20435L32.7958 37.0001L37.0003 32.7955L4.20458 -0.000234323Z" />
            <path d="M5.47257e-06 32.7955L4.20459 37.0001L37.0003 4.20434L32.7958 -0.000244141L5.47257e-06 32.7955Z" />
          </svg>
        </button>
      </div>

      {/* Navigation Layout */}
      <nav className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
        
        {/* Navigation list */}
        <div className="relative flex flex-col space-y-4 md:space-y-6 w-full py-10">
          {/* Menu Items */}
          {MENU_ITEMS.map((item, idx) => {
            const isActive = idx === activeIdx;

            return (
              <motion.div
                key={item.href}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.08,
                }}
                className="w-full text-center"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative inline-flex items-center justify-center text-4xl md:text-6xl font-black uppercase tracking-[0.1em] transition-all duration-300 py-2 border-b border-transparent hover:border-black/10 dark:hover:border-white/10 ${
                    isActive 
                      ? "text-black dark:text-white" 
                      : "text-neutral-400 hover:text-black dark:text-neutral-600 dark:hover:text-white"
                  }`}
                >
                  {/* Left indicator arrow with smooth scale/fade */}
                  <div className="hidden md:flex items-center justify-end w-12 h-6 mr-2 relative">
                    <AnimatePresence>
                      {(isActive || hoveredIdx === idx) && (
                        <motion.span
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className={isActive ? "text-black dark:text-white" : "text-neutral-400"}
                        >
                          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* DynamicHover Shift Effect */}
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 block transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </span>
                  </span>

                  {/* Right indicator arrow with smooth scale/fade */}
                  <div className="hidden md:flex items-center justify-start w-12 h-6 ml-2 relative">
                    <AnimatePresence>
                      {(isActive || hoveredIdx === idx) && (
                        <motion.span
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className={isActive ? "text-black dark:text-white" : "text-neutral-400"}
                        >
                          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Language & Info */}
        <div className="absolute bottom-[-100px] flex space-x-6 text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
          <span>EN</span>
          <span>/</span>
          <span>ID</span>
        </div>
      </nav>
    </motion.div>
  );
}
