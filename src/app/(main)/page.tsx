'use client'

import React, { useRef } from 'react'
import { TransitionLink as Link } from '@/components/transition-link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Briefcase, UserCheck, Calendar, ArrowUpRight, FolderGit2 } from 'lucide-react'
import { Hero } from '../(landing)/hero'
import { useExperience } from '@/hooks/useExperience'
import { useProjects } from '@/hooks/useProjects'
import { BackgroundLines } from '@/components/background-lines'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { experiences, isLoading: loadingExp } = useExperience()
  const { projects, isLoading: loadingProjects } = useProjects({ limit: 3 })

  // Track scroll progress of the entire 4-section homepage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring configuration for parallax transforms
  const springConfig = { stiffness: 90, damping: 22, mass: 0.4 }

  // 1. HERO PARALLAX (Active between scroll 0.0 -> 0.33)
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.33], [0, -120]), springConfig)
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.33], [1, 0.9]), springConfig)
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.22], [1, 0]), springConfig)

  // 2. OVERVIEW PARALLAX (Active between scroll 0.0 -> 0.66)
  const overviewContentY = useSpring(useTransform(scrollYProgress, [0, 0.33, 0.66], [180, 0, -100]), springConfig)
  const overviewTitleX = useSpring(useTransform(scrollYProgress, [0, 0.33], [-100, 0]), springConfig)
  const overviewSubtitleX = useSpring(useTransform(scrollYProgress, [0, 0.33], [80, 0]), springConfig)
  const overviewBgY = useSpring(useTransform(scrollYProgress, [0, 0.66], [-60, 60]), springConfig)
  const overviewOpacity = useSpring(useTransform(scrollYProgress, [0.22, 0.33, 0.58, 0.66], [0, 1, 1, 0]), springConfig)

  // 3. EXPERIENCE PARALLAX (Active between scroll 0.33 -> 1.0)
  const experienceTitleY = useSpring(useTransform(scrollYProgress, [0.33, 0.66], [100, 0]), springConfig)
  const experienceContentY = useSpring(useTransform(scrollYProgress, [0.33, 0.66, 1.0], [120, 0, -100]), springConfig)
  const experienceBgY = useSpring(useTransform(scrollYProgress, [0.33, 1.0], [-100, 50]), springConfig)
  const experienceOpacity = useSpring(useTransform(scrollYProgress, [0.33, 0.44, 0.88, 1.0], [0, 1, 1, 0]), springConfig)

  // Staggered offsets for Experience cards
  const expCard1Y = useSpring(useTransform(scrollYProgress, [0.33, 0.66], [250, 0]), springConfig)
  const expCard2Y = useSpring(useTransform(scrollYProgress, [0.33, 0.66], [400, 0]), springConfig)
  const expCard3Y = useSpring(useTransform(scrollYProgress, [0.33, 0.66], [550, 0]), springConfig)

  // 4. PROJECTS PARALLAX (Active between scroll 0.66 -> 1.0)
  const projectsTitleY = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [100, 0]), springConfig)
  const projectsContentY = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [120, 0]), springConfig)
  const projectsBgY = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [-80, 0]), springConfig)
  const projectsOpacity = useSpring(useTransform(scrollYProgress, [0.66, 0.77], [0, 1]), springConfig)

  // Staggered offsets for Recent Project cards
  const projCard1Y = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [250, 0]), springConfig)
  const projCard2Y = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [400, 0]), springConfig)
  const projCard3Y = useSpring(useTransform(scrollYProgress, [0.66, 1.0], [550, 0]), springConfig)

  // Helper to determine if date matches ongoing/now status
  const isOngoing = (date: string | null) => {
    if (!date) return true
    const normalized = date.trim().toLowerCase()
    return normalized === 'now' || normalized === 'present' || normalized === 'ongoing' || normalized === ''
  }

  return (
    <div ref={containerRef} className="w-full relative overflow-visible bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      
      {/* 1. HERO SECTION (z-10) */}
      <motion.div 
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full z-10 origin-bottom bg-white dark:bg-neutral-950"
      >
        <Hero />
      </motion.div>

      {/* 2. OVERVIEW SECTION (z-20) - Overlaps Hero */}
      <div className="sticky top-0 h-screen w-full z-20 bg-neutral-100 dark:bg-neutral-900 border-t border-black/5 dark:border-white/5 shadow-2xl flex flex-col justify-center items-center overflow-hidden transition-colors duration-500">
        {/* Parallax Background Grid Lines (Purple Theme) */}
        <motion.div style={{ y: overviewBgY }} className="absolute inset-0 z-0">
          <BackgroundLines accentColor="#9c41f7" />
        </motion.div>

        {/* Overview Layout Container */}
        <motion.div 
          style={{ y: overviewContentY, opacity: overviewOpacity }}
          className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col justify-between h-[75vh]"
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
                style={{ x: overviewTitleX }}
                className="text-6xl md:text-8xl lg:text-9xl font-black font-bricolage tracking-tighter text-neutral-950 dark:text-white uppercase leading-none select-none"
              >
                ABOUT<span className="text-[#9c41f7]">.</span>
              </motion.h2>
              <motion.p 
                style={{ x: overviewSubtitleX }}
                className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-2"
              >
                Risqi Achmad Fahreal — Indonesia
              </motion.p>
            </div>

            {/* Right side: Styled Paragraph Content */}
            <div className="lg:col-span-7 space-y-6 lg:pl-10">
              <p className="text-xl md:text-3xl font-bold font-bricolage text-neutral-850 dark:text-neutral-100 leading-tight">
                Engineering visual emotions through code.
              </p>
              <p className="text-sm md:text-base font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                I am a software engineer specializing in frontend engineering and creative development. I bridge the gap between design thinking and technological execution, building production-grade interfaces that are visually memorable, smooth, and highly performant.
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
      </div>

      {/* 3. STICKY EXPERIENCE SECTION (z-30) - Overlaps Overview */}
      <div className="sticky top-0 h-screen w-full z-30 bg-neutral-50 dark:bg-neutral-950 border-t border-black/5 dark:border-white/5 shadow-2xl flex flex-col justify-center items-center overflow-hidden transition-colors duration-500">
        {/* Parallax Background Grid Lines (Green Theme) */}
        <motion.div style={{ y: experienceBgY }} className="absolute inset-0 z-0">
          <BackgroundLines accentColor="#06BA63" />
        </motion.div>

        {/* Content Area */}
        <motion.div 
          style={{ y: experienceContentY, opacity: experienceOpacity }}
          className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col justify-between h-[80vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-4 h-4 text-[#06BA63]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#06BA63] font-bold">
                  02 / EXPERIENCES
                </span>
              </div>
              <motion.h2 
                style={{ y: experienceTitleY }}
                className="text-4xl md:text-7xl font-black font-bricolage uppercase tracking-tight text-neutral-950 dark:text-white leading-none"
              >
                EXPERIENCE<span className="text-[#06BA63]">.</span>
              </motion.h2>
            </div>
            
            <Link 
              href="/about#experience" 
              className="group hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-neutral-500 hover:text-[#06BA63] transition-colors"
            >
              <span>View Full History</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
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
            <div className="grid md:grid-cols-3 gap-8 w-full pt-10">
              
              {/* Card 1 */}
              {experiences[0] && (
                <motion.div
                  style={{ y: expCard1Y }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/60 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#06BA63]/30 dark:hover:border-[#06BA63]/30 transition-colors duration-300 relative overflow-hidden h-[300px]"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-black text-neutral-200 dark:text-neutral-800/40 select-none">
                    01
                  </div>
                  
                  <div className="flex justify-between z-10 items-start font-mono text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#06BA63]" />
                      {experiences[0].startDate}
                    </span>
                    <span className={isOngoing(experiences[0].endDate) ? 'text-[#06BA63] font-black' : 'text-neutral-500 dark:text-neutral-450 font-bold'}>
                      {experiences[0].endDate || "NOW"}
                    </span>
                  </div>

                  <div className="mt-8 z-10">
                    <h3 className="font-bricolage font-black text-2xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight">
                      {experiences[0].role}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#06BA63] mt-1.5 uppercase tracking-widest">
                      {experiences[0].company}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed mt-4 z-10 font-medium">
                    {experiences[0].description || "Building and integrating modern web components, maintaining software quality, and collaborating with cross-functional teams."}
                  </p>
                </motion.div>
              )}

              {/* Card 2 */}
              {experiences[1] && (
                <motion.div
                  style={{ y: expCard2Y }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/60 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#06BA63]/30 dark:hover:border-[#06BA63]/30 transition-colors duration-300 relative overflow-hidden h-[300px]"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-black text-neutral-200 dark:text-neutral-800/40 select-none">
                    02
                  </div>
                  
                  <div className="flex justify-between z-10 items-start font-mono text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#06BA63]" />
                      {experiences[1].startDate}
                    </span>
                    <span className={isOngoing(experiences[1].endDate) ? 'text-[#06BA63] font-black' : 'text-neutral-500 dark:text-neutral-400 font-bold'}>
                      {experiences[1].endDate}
                    </span>
                  </div>

                  <div className="mt-8 z-10">
                    <h3 className="font-bricolage font-black text-2xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight">
                      {experiences[1].role}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#06BA63] mt-1.5 uppercase tracking-widest">
                      {experiences[1].company}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed mt-4 z-10 font-medium">
                    {experiences[1].description || "Assisted in front-end development, wrote clean React components, integrated RESTful APIs, and refined user experience flows."}
                  </p>
                </motion.div>
              )}

              {/* Card 3 */}
              {experiences[2] && (
                <motion.div
                  style={{ y: expCard3Y }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/60 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#06BA63]/30 dark:hover:border-[#06BA63]/30 transition-colors duration-300 relative overflow-hidden h-[300px]"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-black text-neutral-200 dark:text-neutral-800/40 select-none">
                    03
                  </div>
                  
                  <div className="flex justify-between z-10 items-start font-mono text-[10px] text-neutral-400 dark:text-neutral-500 z-10 font-bold uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#06BA63]" />
                      {experiences[2].startDate}
                    </span>
                    <span className={isOngoing(experiences[2].endDate) ? 'text-[#06BA63] font-black' : 'text-neutral-500 dark:text-neutral-400 font-bold'}>
                      {experiences[2].endDate}
                    </span>
                  </div>

                  <div className="mt-8 z-10">
                    <h3 className="font-bricolage font-black text-2xl uppercase tracking-tight text-neutral-955 dark:text-white leading-tight">
                      {experiences[2].role}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#06BA63] mt-1.5 uppercase tracking-widest">
                      {experiences[2].company}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed mt-4 z-10 font-medium">
                    {experiences[2].description || "Built web pages, optimized loading speeds, worked closely with designer teams, and debugged frontend performance issues."}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* Bottom Info Row */}
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 border-t border-black/5 dark:border-white/5 pt-4">
            <span>SCROLL TO DISCOVER RECENT WORK</span>
            <span>NEXT UP: PROJECTS</span>
          </div>
        </motion.div>
      </div>

      {/* 4. STICKY PROJECTS SECTION (z-40) - Overlaps Experience */}
      <div className="sticky top-0 h-screen w-full z-40 bg-white dark:bg-neutral-900 border-t border-black/5 dark:border-white/5 shadow-2xl flex flex-col justify-center items-center overflow-hidden transition-colors duration-500">
        {/* Parallax Background Grid Lines (Cyan Theme) */}
        <motion.div style={{ y: projectsBgY }} className="absolute inset-0 z-0">
          <BackgroundLines accentColor="#00d8f6" />
        </motion.div>

        {/* Content Area */}
        <motion.div 
          style={{ y: projectsContentY, opacity: projectsOpacity }}
          className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col justify-between h-[80vh]"
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
                style={{ y: projectsTitleY }}
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
            <div className="h-60 flex items-center justify-center font-mono text-xs text-neutral-400 tracking-wider border border-dashed border-neutral-350 dark:border-neutral-800 rounded-2xl">
              No recent projects found.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 w-full pt-10">
              {/* Card 1 */}
              {projects[0] && (
                <motion.div
                  style={{ y: projCard1Y }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-950/60 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#00d8f6]/30 dark:hover:border-[#00d8f6]/30 transition-colors duration-350 h-[320px] relative overflow-hidden"
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative mb-4">
                    {/* Project Image */}
                    {projects[0].imageUrl ? (
                      <img 
                        src={projects[0].imageUrl} 
                        alt={projects[0].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  style={{ y: projCard2Y }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-950/60 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#00d8f6]/30 dark:hover:border-[#00d8f6]/30 transition-colors duration-350 h-[320px] relative overflow-hidden"
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative mb-4">
                    {/* Project Image */}
                    {projects[1].imageUrl ? (
                      <img 
                        src={projects[1].imageUrl} 
                        alt={projects[1].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <h3 className="font-bricolage font-black text-xl uppercase tracking-tight text-neutral-955 dark:text-white leading-tight">
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
                  style={{ y: projCard3Y }}
                  className="group border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-950/60 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#00d8f6]/30 dark:hover:border-[#00d8f6]/30 transition-colors duration-350 h-[320px] relative overflow-hidden"
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative mb-4">
                    {/* Project Image */}
                    {projects[2].imageUrl ? (
                      <img 
                        src={projects[2].imageUrl} 
                        alt={projects[2].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <h3 className="font-bricolage font-black text-xl uppercase tracking-tight text-neutral-960 dark:text-white leading-tight">
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
