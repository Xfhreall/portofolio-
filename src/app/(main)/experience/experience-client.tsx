'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BriefcaseIcon, CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { BackgroundLines } from '@/components/background-lines'
import type { Experience } from '@/lib/data'

const INITIAL_VISIBLE = 3
const PAGE_SIZE = 3

export function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const visibleExperiences = experiences.slice(0, visibleCount)
  const hasMore = visibleCount < experiences.length

  return (
    <div
      className="min-h-screen w-full bg-white dark:bg-neutral-950 relative pb-20 overflow-hidden"
      id="experience"
    >
      {/* Grid lines with Experience page accent (Green) */}
      <BackgroundLines accentColor="#06BA63" />

      <div className="relative z-10 container mx-auto px-6 py-24 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <BriefcaseIcon className="w-4 h-4 text-[#06BA63]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#06BA63] font-bold">
              Career
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-bricolage uppercase tracking-tight text-neutral-900 dark:text-white">
            Work{" "}
            <span className="italic underline decoration-[#06BA63] underline-offset-8">
              Experience
            </span>
          </h1>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline divider line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10"
          />

          {/* Empty */}
          {experiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pl-8 py-12 text-center"
            >
              <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">
                No experience entries yet.
              </p>
            </motion.div>
          )}

          {/* Entries */}
          {visibleExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
                  style={{ borderColor: "#06BA63" }}
                  className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-neutral-950 border-2"
                />

                {/* Date range */}
                <div className="flex items-center gap-1.5 mb-2">
                  <CalendarIcon className="w-3 h-3 text-neutral-400" />
                  <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold">
                    {exp.startDate} —{' '}
                  </span>
                  {(!exp.endDate || exp.endDate === 'Now') ? (
                    <span className="flex items-center gap-1">
                      <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400 font-bold">Now</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    </span>
                  ) : exp.endDate === 'Recent' ? (
                    <span className="flex items-center gap-1">
                      <span className="text-xs font-mono text-amber-500 dark:text-amber-400 font-bold">Recent</span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-semibold">{exp.endDate}</span>
                  )}
                </div>

                {/* Role */}
                <h3 className="text-xl font-bold font-bricolage text-neutral-900 dark:text-white leading-tight uppercase tracking-tight">
                  {exp.role}
                </h3>

                {/* Company */}
                <p className="text-sm font-semibold font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                  {exp.company}
                </p>

                {/* Description */}
                {exp.description && (
                  <p className="mt-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                    {exp.description}
                  </p>
                )}
              </motion.div>
            ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mt-12"
          >
            <HoverBorderGradient
              as="button"
              containerClassName="rounded-full"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Show more
              <ChevronDownIcon className="w-4 h-4 text-[#06BA63]" />
            </HoverBorderGradient>
          </motion.div>
        )}
      </div>
    </div>
  )
}
