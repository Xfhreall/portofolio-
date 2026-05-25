'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { TransitionLink as Link } from '@/components/transition-link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Briefcase, UserCheck, Calendar, ArrowUpRight, FolderGit2 } from 'lucide-react'
import { Hero } from '../(landing)/hero'
import { useExperience, Experience } from '@/hooks/useExperience'
import { useProjects } from '@/hooks/useProjects'
import { BackgroundLines } from '@/components/background-lines'
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Individual Sticky Experience Card Component with scroll-driven parallax stack scaling
function StickyHomepageExperienceCard({
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

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 24, mass: 0.5 };

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

  const isOngoing = (date: string | null) => {
    if (!date) return true;
    const normalized = date.trim().toLowerCase();
    return normalized === "now" || normalized === "present" || normalized === "ongoing" || normalized === "";
  };

  return (
    <div
      ref={cardRef}
      style={{ top: isDesktop ? `calc(15vh + ${index * 16}px)` : `calc(10vh + ${index * 12}px)` }}
      className="sticky w-full max-w-3xl mx-auto mb-12 lg:mb-16 px-4 md:px-0"
    >
      <motion.div
        style={{ scale, opacity, filter: blur, willChange: 'transform, opacity, filter' }}
        className="w-full border border-neutral-200/80 dark:border-white/5 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl hover:border-[#06BA63]/40 dark:hover:border-[#06BA63]/35 transition-colors duration-300 relative overflow-hidden"
      >
        <div className="absolute top-4 right-6 font-mono text-5xl md:text-7xl font-black text-neutral-200 dark:text-neutral-800/40 select-none pointer-events-none">
          0{index + 1}
        </div>

        <div className="flex justify-between items-center font-mono text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase z-10 border-b border-black/5 dark:border-white/5 pb-4 mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#06BA63]" />
            <span>
              {exp.startDate} - <span className={isOngoing(exp.endDate) ? "text-[#06BA63] font-black tracking-wider" : "font-bold"}>{exp.endDate || "NOW"}</span>
            </span>
          </span>
        </div>

        <div className="z-10 relative">
          <h3 className="font-bricolage font-black text-2xl md:text-3xl uppercase tracking-tight text-neutral-950 dark:text-white leading-none">
            {exp.role}
          </h3>
          <p className="font-mono text-xs md:text-sm font-bold text-[#06BA63] mt-2 uppercase tracking-widest">
            {exp.company}
          </p>
        </div>

        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-6 z-10 font-medium text-justify">
          {exp.description || "Building and integrating modern web components, maintaining software quality, and collaborating with cross-functional teams."}
        </p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { experiences, isLoading: loadingExp } = useExperience()
  const { projects, isLoading: loadingProjects } = useProjects({ limit: 3 })
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Track scroll progress of the entire 4-section homepage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring configuration for parallax transforms
  const springConfig = { stiffness: 90, damping: 22, mass: 0.4 }

  // Dynamic offset values based on isDesktop to ensure smooth rendering on smaller viewports
  const projOffset1 = isDesktop ? 250 : 80
  const projOffset2 = isDesktop ? 400 : 140
  const projOffset3 = isDesktop ? 550 : 200

  const heroTranslateY = isDesktop ? -120 : -40
  const overviewTranslateY = isDesktop ? 180 : 60
  const projectsTranslateY = isDesktop ? 120 : 40

  // 1. HERO PARALLAX (Active between scroll 0.0 -> 0.20)
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.20], [0, heroTranslateY]), springConfig)
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.20], [1, 0.95]), springConfig)
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.18], [1, 0]), springConfig)

  // 2. OVERVIEW PARALLAX (Active between scroll 0.0 -> 0.66)
  const overviewContentY = useSpring(useTransform(scrollYProgress, [0, 0.20, 0.66], [overviewTranslateY, 0, -100]), springConfig)
  const overviewTitleX = useSpring(useTransform(scrollYProgress, [0, 0.20], [isDesktop ? -100 : -30, 0]), springConfig)
  const overviewSubtitleX = useSpring(useTransform(scrollYProgress, [0, 0.20], [isDesktop ? 80 : 25, 0]), springConfig)
  const overviewBgY = useSpring(useTransform(scrollYProgress, [0, 0.66], [isDesktop ? -60 : -20, isDesktop ? 60 : 20]), springConfig)
  const overviewOpacity = useSpring(useTransform(scrollYProgress, [0.05, 0.20, 0.58, 0.66], [0, 1, 1, 0]), springConfig)

  // 4. PROJECTS PARALLAX (Active between scroll 0.66 -> 1.0)
  const projectsTitleY = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [isDesktop ? 100 : 30, 0]), springConfig)
  const projectsContentY = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [projectsTranslateY, 0]), springConfig)
  const projectsBgY = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [isDesktop ? -80 : -25, 0]), springConfig)
  const projectsOpacity = useSpring(useTransform(scrollYProgress, [0.66, 0.77], [0, 1]), springConfig)

  // Staggered offsets for Recent Project cards
  const projCard1Y = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [projOffset1, 0]), springConfig)
  const projCard2Y = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [projOffset2, 0]), springConfig)
  const projCard3Y = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [projOffset3, 0]), springConfig)




  return (
    <div ref={containerRef} className="w-full relative overflow-visible bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      
      {/* 1. HERO SECTION (z-10) */}
      <motion.div 
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity, willChange: 'transform, opacity' }}
        className="sticky top-0 h-screen w-full z-10 origin-bottom bg-white dark:bg-neutral-950"
      >
        <Hero />
      </motion.div>

      {/* 2. OVERVIEW SECTION (z-20) - Overlaps Hero */}
      <div className="sticky top-0 h-screen w-full z-20 bg-neutral-100 dark:bg-neutral-900 border-t border-black/5 dark:border-white/5 shadow-2xl flex flex-col justify-center items-center overflow-hidden transition-colors duration-500">
        {/* Parallax Background Grid Lines (Purple Theme) */}
        <motion.div style={{ y: overviewBgY, willChange: 'transform' }} className="absolute inset-0 z-0">
          <BackgroundLines accentColor="#9c41f7" />
        </motion.div>

        {/* Overview Layout Container */}
        <motion.div 
          style={{ y: overviewContentY, opacity: overviewOpacity, willChange: 'transform, opacity' }}
          className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col justify-between h-[85vh] py-4 md:py-0 md:h-[75vh]"
        >
          {/* Header Tag */}
          <div className="flex items-center gap-3">
            <UserCheck className="w-4 h-4 text-[#9c41f7]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#9c41f7] font-bold">
              01 / OVERVIEW
            </span>
          </div>

          {/* Asymmetric Split Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-center flex-1 py-6">
            {/* Left side: Large bold title */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <motion.h2 
                style={{ x: overviewTitleX, willChange: 'transform' }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-bricolage tracking-tighter text-neutral-950 dark:text-white uppercase leading-none select-none"
              >
                ABOUT<span className="text-[#9c41f7]">.</span>
              </motion.h2>
              <motion.p 
                style={{ x: overviewSubtitleX, willChange: 'transform' }}
                className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-2"
              >
                Risqi Achmad Fahreal — Indonesia
              </motion.p>
            </div>

            {/* Right side: Styled Paragraph Content */}
            <div className="lg:col-span-7 space-y-6 lg:pl-10">
              <p className="text-xl md:text-3xl font-bold font-bricolage text-neutral-800 dark:text-neutral-100 leading-tight">
                Engineering visual emotions through code.
              </p>
              <p className="text-sm md:text-base font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                I am a fullstack developer specializing in frontend engineering and creative development. I bridge the gap between design thinking and technological execution, building production-grade interfaces that are visually memorable, smooth, and highly performant.
              </p>

              {/* Styled Premium CTA Link with Text-Shift Effect */}
              <div className="pt-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-neutral-900/10 dark:shadow-white/5"
                >
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                      READ MY FULL BIO
                    </span>
                    <span className="absolute inset-0 block transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-[#9c41f7] dark:text-[#9c41f7]">
                      READ MY FULL BIO
                    </span>
                  </span>
                  <div className="w-5 h-5 rounded-full bg-neutral-800 dark:bg-neutral-100 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-3 h-3 text-white dark:text-neutral-950" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Info Row */}
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 border-t border-black/5 dark:border-white/5 pt-4">
            <span>SCROLL TO DISCOVER EXPERIENCES</span>
            <span>NEXT UP: WORK HISTORY</span>
          </div>
        </motion.div>
      </div>      {/* 3. EXPERIENCE SECTION (z-30) - Overlaps Overview */}
      <div className="relative z-30 w-full bg-neutral-50 dark:bg-neutral-950 border-t border-black/5 dark:border-white/5 py-24 transition-colors duration-500 shadow-2xl">
        {/* Parallax Background Grid Lines (Green Theme) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <BackgroundLines accentColor="#06BA63" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col pt-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-4 h-4 text-[#06BA63]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#06BA63] font-bold">
                  02 / EXPERIENCES
                </span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black font-bricolage uppercase tracking-tight text-neutral-950 dark:text-white leading-none">
                RECENT EXPERIENCE<span className="text-[#06BA63]">.</span>
              </h2>
            </div>
          </div>

          {/* Experience Timeline Cards */}
          {loadingExp ? (
            <div className="h-60 flex items-center justify-center font-mono text-xs text-neutral-400 tracking-wider">
              Loading timeline entries...
            </div>
          ) : experiences.length === 0 ? (
            <div className="h-60 flex items-center justify-center font-mono text-xs text-neutral-400 tracking-wider">
              No entries found.
            </div>
          ) : (
            <div className="relative w-full max-w-3xl mx-auto flex flex-col pt-10">
              {experiences.slice(0, 3).map((exp, idx) => (
                <StickyHomepageExperienceCard
                  key={exp.id}
                  exp={exp}
                  index={idx}
                  total={Math.min(experiences.length, 3)}
                  isDesktop={isDesktop}
                />
              ))}
            </div>
          )}

          {/* Bottom Info Row */}
          <div className="flex flex-col items-center gap-6 mt-16 pb-8">
            <Link
              href="/about#experience"
              className="group inline-flex items-center gap-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-neutral-900/10 dark:shadow-white/5"
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                  VIEW FULL HISTORY
                </span>
                <span className="absolute inset-0 block transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-[#06BA63] dark:text-[#06BA63]">
                  VIEW FULL HISTORY
                </span>
              </span>
              <div className="w-5 h-5 rounded-full bg-neutral-800 dark:bg-neutral-100 flex items-center justify-center group-hover:-rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-white dark:text-neutral-950" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. PROJECTS SECTION (z-40) - Overlaps Experience */}
      <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full z-40 bg-white dark:bg-neutral-900 border-t border-black/5 dark:border-white/5 shadow-2xl flex flex-col justify-center items-center overflow-visible lg:overflow-hidden transition-colors duration-500 py-16 lg:py-0">
        {/* Parallax Background Grid Lines (Cyan Theme) */}
        <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
          <BackgroundLines accentColor="#00d8f6" />
        </div>
        <motion.div style={{ y: projectsBgY, willChange: 'transform' }} className="absolute inset-0 z-0 hidden lg:block">
          <BackgroundLines accentColor="#00d8f6" />
        </motion.div>

        {/* Content Area */}
        <motion.div 
          style={{ y: isDesktop ? projectsContentY : 0, opacity: isDesktop ? projectsOpacity : 1, willChange: 'transform, opacity' }}
          className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col justify-between h-auto lg:h-[80vh] py-4 lg:py-0"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <FolderGit2 className="w-4 h-4 text-[#00d8f6]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00d8f6] font-bold">
                  03 / PORTFOLIO
                </span>
              </div>
              <motion.h2 
                style={{ y: isDesktop ? projectsTitleY : 0, willChange: 'transform' }}
                className="text-4xl md:text-7xl font-black font-bricolage uppercase tracking-tight text-neutral-950 dark:text-white leading-none"
              >
                RECENT WORK<span className="text-[#00d8f6]">.</span>
              </motion.h2>
            </div>
            
            <Link 
              href="/project" 
              className="group hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-neutral-500 hover:text-[#00d8f6] transition-colors"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Project List Cards */}
          {loadingProjects ? (
            <div className="h-60 flex items-center justify-center font-mono text-xs text-neutral-400 tracking-wider">
              Loading recent projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="h-60 flex items-center justify-center font-mono text-xs text-neutral-400 tracking-wider border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl">
              No recent projects found.
            </div>
          ) : (
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 w-full pt-6 md:pt-10 pb-4">
              {/* Card 1 */}
              {projects[0] && (
                <motion.div
                  style={{ y: isDesktop ? projCard1Y : 0, willChange: 'transform' }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-950/60 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#00d8f6]/30 dark:hover:border-[#00d8f6]/30 transition-colors duration-355 h-[320px] relative overflow-hidden w-full"
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative mb-4">
                    {/* Project Image */}
                    {projects[0].imageUrl ? (
                      <Image 
                        src={projects[0].imageUrl} 
                        alt={projects[0].name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                        NO IMAGE
                      </div>
                    )}
                    <div className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link 
                        href={`/project/${projects[0].id}`}
                        className="p-2.5 rounded-full bg-white text-neutral-950 hover:scale-110 transition-transform shadow-lg"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bricolage font-black text-xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight">
                        {projects[0].name}
                      </h3>
                      <p className="font-mono text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
                        {projects[0].techStack.slice(0, 3).join(' · ')}
                      </p>
                    </div>

                    <Link
                      href={`/project/${projects[0].id}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 group-hover:text-[#00d8f6] transition-colors mt-3 w-fit"
                    >
                      <span>Explore Case</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Card 2 */}
              {projects[1] && (
                <motion.div
                  style={{ y: isDesktop ? projCard2Y : 0, willChange: 'transform' }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-950/60 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#00d8f6]/30 dark:hover:border-[#00d8f6]/30 transition-colors duration-355 h-[320px] relative overflow-hidden w-full"
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative mb-4">
                    {/* Project Image */}
                    {projects[1].imageUrl ? (
                      <Image 
                        src={projects[1].imageUrl} 
                        alt={projects[1].name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                        NO IMAGE
                      </div>
                    )}
                    <div className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link 
                        href={`/project/${projects[1].id}`}
                        className="p-2.5 rounded-full bg-white text-neutral-950 hover:scale-110 transition-transform shadow-lg"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bricolage font-black text-xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight">
                        {projects[1].name}
                      </h3>
                      <p className="font-mono text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
                        {projects[1].techStack.slice(0, 3).join(' · ')}
                      </p>
                    </div>

                    <Link
                      href={`/project/${projects[1].id}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 group-hover:text-[#00d8f6] transition-colors mt-3 w-fit"
                    >
                      <span>Explore Case</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Card 3 */}
              {projects[2] && (
                <motion.div
                  style={{ y: isDesktop ? projCard3Y : 0, willChange: 'transform' }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-950/60 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#00d8f6]/30 dark:hover:border-[#00d8f6]/30 transition-colors duration-355 h-[320px] relative overflow-hidden w-full"
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative mb-4">
                    {/* Project Image */}
                    {projects[2].imageUrl ? (
                      <Image 
                        src={projects[2].imageUrl} 
                        alt={projects[2].name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                        NO IMAGE
                      </div>
                    )}
                    <div className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link 
                        href={`/project/${projects[2].id}`}
                        className="p-2.5 rounded-full bg-white text-neutral-950 hover:scale-110 transition-transform shadow-lg"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bricolage font-black text-xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight">
                        {projects[2].name}
                      </h3>
                      <p className="font-mono text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
                        {projects[2].techStack.slice(0, 3).join(' · ')}
                      </p>
                    </div>

                    <Link
                      href={`/project/${projects[2].id}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 group-hover:text-[#00d8f6] transition-colors mt-3 w-fit"
                    >
                      <span>Explore Case</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Button linking to full project list */}
          <div className="flex justify-center items-center py-6">
            <Link
              href="/project"
              className="group inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-[#00d8f6] transition-colors"
            >
              <span className="text-xs uppercase font-mono tracking-widest font-bold border-b border-current pb-1">
                View all case archives
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
