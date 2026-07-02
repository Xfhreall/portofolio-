"use client";

import React from "react";
import { TransitionLink as Link } from "@/components/transition-link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FolderKanban } from "lucide-react";
import { BackgroundLines } from "@/components/background-lines";
import type { Project } from "@/lib/data";

export function ProjectClient({ projects }: { projects: Project[] }) {
  // Custom colors for sticky cards overlay sequence
  const cardColors = [
    "#D4A89A",
    "#333896",
    "#E70000",
    "#2B3240",
    "#28F5AA",
    "#e31836",
    "#20105C",
    "#FA60BE",
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-950 relative overflow-visible select-none">
      {/* 1. PROJECTS LANDING HERO (100vh) */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        <BackgroundLines accentColor="#FF8A00" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <FolderKanban className="w-4 h-4 text-[#FF8A00]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF8A00] font-bold">
              Works
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[11vw] font-black font-bricolage uppercase tracking-tighter leading-none text-neutral-900 dark:text-white">
            PROJECTS
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-600">
          <span>VIEW WORK</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mt-2 text-sm font-bold text-[#FF8A00]"
          >
            ↓
          </motion.span>
        </div>
      </section>

      {/* 2. STICKY CARDS OVERLAPPING FLOW */}
      <div className="relative w-full">
        {projects.length === 0 ? (
          <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-neutral-950">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              No projects found.
            </span>
          </div>
        ) : (
          projects.map((project, index) => {
            const cardBgColor = cardColors[index % cardColors.length];
            return (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: index + 1,
                  backgroundColor: cardBgColor,
                }}
                className="relative w-full h-screen flex flex-col justify-between p-8 md:p-20 overflow-hidden border-t border-white/10 group cursor-pointer"
              >
                {/* Background Image with Hover Scale */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-cover opacity-25 group-hover:opacity-40 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Card Top Info */}
                <div className="relative z-10 flex justify-between items-start font-mono text-xs text-white/80 tracking-widest uppercase font-bold">
                  <span>{project.role.join(" / ")}</span>
                  <span>
                    {index + 1} / {projects.length}
                  </span>
                </div>

                {/* Card Center Title - Text Shifting Up on Hover */}
                <div className="relative z-10 flex items-baseline text-white">
                  <span className="font-bricolage text-3xl md:text-5xl font-light opacity-50 mr-4 md:mr-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-bricolage font-black text-5xl md:text-8xl uppercase tracking-tighter leading-none">
                    <span className="relative block overflow-hidden">
                      <span className="block transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                        {project.name}
                      </span>
                      <span className="absolute inset-0 block transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-white/80">
                        {project.name}
                      </span>
                    </span>
                  </h2>
                </div>

                {/* Card Bottom Tech Stack */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] md:text-xs uppercase tracking-wider bg-white/15 border border-white/10 text-white px-4 py-1.5 rounded-full backdrop-blur-md font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* 3. MORE LINK / FOOTER TRANSITION (Link to Contact) */}
      <Link
        href="/contact"
        className="relative w-full h-[30vh] bg-white dark:bg-neutral-950 flex flex-col justify-center items-center overflow-hidden border-t border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300 group"
      >
        <BackgroundLines accentColor="#00d8f6" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-lg md:text-2xl font-black font-bricolage uppercase tracking-wider text-neutral-900 dark:text-white">
            CONTACT ME
          </span>
          <ArrowRight className="w-5 h-5 text-neutral-900 dark:text-white transform group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
}
