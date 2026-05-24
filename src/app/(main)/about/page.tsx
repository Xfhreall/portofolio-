"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useExperience, Experience } from "@/hooks/useExperience";
import { BackgroundLines } from "@/components/background-lines";
import { PixelatedCanvas } from "@/components/ui/pixel-canvas";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FlipWords } from "@/components/ui/flip-words";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { Calendar, Briefcase, Download } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Individual Sticky Experience Card Component with scroll-driven parallax stack scaling
function StickyExperienceCard({
  exp,
  index,
  total,
  isDesktop,
}: {
  exp: Experience;
  index: number;
  total: number;
  isDesktop: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific card to apply parallax scale/darken as it gets covered
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 24, mass: 0.5 };

  // When the card is covered (scrolls past), scale it down slightly and fade it out
  const scale = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [1, 0.94 - (total - index - 1) * 0.015],
    ),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [1, 0.65]),
    springConfig,
  );
  const blur = useSpring(
    useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(1px)"]),
    springConfig,
  );

  // Format dates and check if ongoing
  const isOngoing =
    !exp.endDate ||
    exp.endDate.trim().toLowerCase() === "now" ||
    exp.endDate.trim().toLowerCase() === "present";

  return (
    <div
      ref={cardRef}
      // Each card sticks at a slightly different top offset to stack neatly (e.g. 15vh + index * 16px) on desktop, slightly lower on mobile
      style={{ top: isDesktop ? `calc(15vh + ${index * 16}px)` : `calc(8vh + ${index * 12}px)` }}
      className="sticky w-full max-w-3xl mx-auto mb-12 lg:mb-16 px-4 md:px-0"
    >
      <motion.div
        style={{ scale, opacity, filter: blur, willChange: 'transform, opacity, filter' }}
        className="w-full border border-neutral-200/80 dark:border-white/5 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl hover:border-[#d97706]/40 dark:hover:border-[#d97706]/35 transition-colors duration-300 relative overflow-hidden"
      >
        {/* Large Index indicator */}
        <div className="absolute top-4 right-6 font-mono text-5xl md:text-7xl font-black text-neutral-100 dark:text-neutral-800/40 select-none pointer-events-none">
          0{index + 1}
        </div>

        {/* Date and Timeline Badge */}
        <div className="flex justify-between items-center font-mono text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase z-10 border-b border-black/5 dark:border-white/5 pb-4 mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
            <span>
              {exp.startDate} - <span className={isOngoing ? "text-[#d97706] font-black tracking-wider" : "font-bold"}>{exp.endDate || "PRESENT"}</span>
            </span>
          </span>
        </div>

        {/* Role & Company */}
        <div className="z-10 relative">
          <h3 className="font-bricolage font-black text-2xl md:text-3xl uppercase tracking-tight text-neutral-950 dark:text-white leading-none">
            {exp.role}
          </h3>
          <p className="font-mono text-xs md:text-sm font-bold text-[#d97706] mt-2 uppercase tracking-widest">
            {exp.company}
          </p>
        </div>

        {/* Highlight points/Description */}
        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed text-justify mt-6 z-10 font-medium border-t border-black/5 dark:border-white/5 pt-6">
          {exp.description ||
            "Contributed to front-end layout styling, designed interactive animations, integrated dynamic data endpoints, and optimized performance guidelines across viewports."}
        </p>

        {/* Small Visual Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#d97706] opacity-30 dark:opacity-50" />
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { experiences, isLoading } = useExperience();
  const words = ["Sir!", "Miss!", "Friend!", "There!"];
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const socials = [
    {
      icon: LinkedInLogoIcon,
      link: "https://www.linkedin.com/in/risqi-achmad-fahreal-a2b7a4289/",
      label: "LinkedIn",
    },
    {
      icon: InstagramLogoIcon,
      link: "https://www.instagram.com/arfah.real_",
      label: "Instagram",
    },
    {
      icon: GitHubLogoIcon,
      link: "https://github.com/Xfhreall",
      label: "GitHub",
    },
  ];

  // Track scroll of About page for section overlapping transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 90, damping: 22, mass: 0.4 };

  // Section transforms (Section 1 scales down slightly as Section 2 scrolls over it) on desktop
  const bioY = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [0, -100]),
    springConfig,
  );
  const bioScale = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [1, 0.92]),
    springConfig,
  );
  const bioOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [1, 0.1]),
    springConfig,
  );


  return (
    <div
      ref={containerRef}
      className="w-full relative bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500 pb-20"
    >
      {/* 1. PROFILE STICKY STAGE (z-10) */}
      <motion.div
        style={{ y: bioY, scale: bioScale, opacity: bioOpacity, willChange: 'transform, opacity' }}
        className="sticky top-0 h-screen w-full z-10 flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-neutral-950"
      >
        {/* Background Grid Lines (Gold/Amber Theme) */}
        <BackgroundLines accentColor="#d97706" />

        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-12 items-center justify-between h-[85vh] md:h-auto pt-2 md:pt-0">
            {/* Left Column: Portrait & Socials */}
            <div className="md:col-span-5 flex flex-col items-center text-center flex-shrink-0">
              <HoverBorderGradient
                containerClassName="rounded-full overflow-hidden isolate shadow-2xl"
                className="dark:bg-black bg-white text-black size-[280px] dark:text-white cursor-default aspect-square border border-black/10 dark:border-white/10"
              >
                <PixelatedCanvas
                  src="https://i.ibb.co.com/Fkzd1dG9/Screenshot-from-2026-01-04-21-30-07-removebg-preview.png"
                  width={270}
                  height={270}
                  cellSize={3}
                  dotScale={0.9}
                  shape="square"
                  backgroundColor="#000000"
                  dropoutStrength={0}
                  interactive
                  distortionStrength={3}
                  distortionRadius={80}
                  distortionMode="swirl"
                  followSpeed={0.2}
                  jitterStrength={5}
                  jitterSpeed={5}
                  sampleAverage
                  tintColor="#FFFFFF"
                  tintStrength={0.12}
                  className="rounded-full brightness-110 block"
                />
              </HoverBorderGradient>

              <div className="mt-5">
                <h1 className="text-2xl md:text-3xl font-black font-bricolage tracking-tight uppercase text-neutral-950 dark:text-white leading-none">
                  Risqi Achmad Fahreal
                </h1>
                <p className="font-mono tracking-widest text-xs text-[#d97706] font-bold uppercase mt-2">
                  Farel — he/him
                </p>
              </div>

              <div className="flex gap-4 items-center justify-center mt-5">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/50 hover:border-[#d97706]/30 hover:text-[#d97706] text-neutral-500 dark:text-neutral-400 transition-colors shadow-sm"
                    title={social.label}
                  >
                    <social.icon className="h-4.5 w-4.5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column: Bio details */}
            <div className="md:col-span-7 space-y-3 md:space-y-6">
              <span className="text-2xl md:text-4xl font-black font-bricolage tracking-tight uppercase text-neutral-950 dark:text-white flex items-center flex-wrap leading-tight">
                Hello
                <FlipWords
                  words={words}
                  className="border border-black/10 dark:border-white/5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black rounded px-2 ml-2 font-mono font-bold"
                />
              </span>

              <p className="text-neutral-600 dark:text-neutral-300 font-medium text-[11px] md:text-sm leading-relaxed text-justify">
                A software engineer based in Malang, Indonesia. I specialize in{" "}
                <strong className="text-neutral-950 dark:text-white font-extrabold">
                  front end development
                </strong>
                . I use technologies such as React, Next.js, Laravel, Tanstack
                Start, Expo, Kotlin, and other libraries and tools to build
                beautiful, highly-responsive web applications, integrate complex
                services, deploy code bases, and maintain performance
                architectures.
              </p>

              <p className="text-neutral-600 dark:text-neutral-300 font-medium text-[11px] md:text-sm leading-relaxed text-justify">
                Additionally, I&apos;m currently pursuing my degree as an{" "}
                <strong className="text-neutral-950 dark:text-white font-extrabold">
                  Informatics Engineering student at Brawijaya University.
                </strong>{" "}
                I am always keen on exploring the boundary lines between premium
                UI/UX designs and solid, clean technological engineering.
              </p>

              {/* Resume download */}
              <div className="pt-2">
                <motion.a
                  href="/CV_Risqi Achmad Fahreal.pdf"
                  download
                  className="relative group inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#d97706]/40 dark:hover:border-[#d97706]/40 hover:shadow-[0_0_25px_rgba(217,119,6,0.15)] dark:hover:shadow-[0_0_30px_rgba(217,119,6,0.25)]"
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { scale: 1.02 },
                    tap: { scale: 0.98 },
                  }}
                >
                  {/* Subtle hover background slide/fade in gradient */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Moving shine reflection line */}
                  <motion.div
                    className="absolute -inset-y-0 -left-[100px] w-[60px] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent skew-x-[30deg] pointer-events-none"
                    variants={{
                      hover: {
                        x: [0, 450],
                        transition: {
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        },
                      },
                    }}
                  />

                  {/* Icon with down arrow animation on hover */}
                  <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-900 group-hover:bg-[#d97706] transition-colors duration-300">
                    <motion.div
                      variants={{
                        hover: {
                          y: [0, 3, -1, 1, 0],
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                    >
                      <Download className="h-3.5 w-3.5 text-[#d97706] group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>

                  <span className="relative z-10 tracking-widest group-hover:text-[#d97706] dark:group-hover:text-[#f59e0b] transition-colors duration-300">
                    DOWNLOAD MY RESUME
                  </span>

                  {/* Active glowing ring or dot */}
                  <span className="relative flex h-2 w-2 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d97706]"></span>
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
          <span>Scroll down for career history</span>
          <span className="mt-1 text-xs font-black text-[#d97706] animate-bounce">
            ↓
          </span>
        </div>
      </motion.div>

      {/* 2. EXPERIENCE TIMELINE STACK STAGE (z-20) - Overlaps Profile on Scroll */}
      <div
        id="experience"
        className="relative z-20 w-full bg-neutral-100 dark:bg-neutral-950 border-t border-black/5 dark:border-white/5 py-24 transition-colors duration-500 shadow-2xl"
      >
        <div className="container mx-auto px-6 max-w-5xl mb-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#d97706]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#d97706] font-bold">
                02 / HISTORY
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-bricolage uppercase tracking-tight text-neutral-950 dark:text-white leading-none">
              CAREER TIMELINE<span className="text-[#d97706]">.</span>
            </h2>
            <p className="text-xs font-mono text-neutral-400 max-w-sm uppercase tracking-wider">
              Scrolling down reveals and stacks my work experiences sequentially
            </p>
          </div>
        </div>

        {/* Sticky Cards Parallax Container */}
        {isLoading ? (
          <div className="space-y-8 max-w-3xl mx-auto px-6">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-neutral-200 dark:bg-neutral-900 animate-pulse border border-black/5 dark:border-white/5"
              />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="p-12 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl max-w-3xl mx-auto text-center text-neutral-400 font-mono text-xs">
            No work experiences documented yet.
          </div>
        ) : (
          <div className="relative w-full max-w-3xl mx-auto flex flex-col pt-10">
            {experiences.map((exp, idx) => (
              <StickyExperienceCard
                key={exp.id}
                exp={exp}
                index={idx}
                total={experiences.length}
                isDesktop={isDesktop}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
