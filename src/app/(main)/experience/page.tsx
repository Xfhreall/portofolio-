'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BriefcaseIcon, CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useExperience } from '@/hooks/useExperience'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

const INITIAL_VISIBLE = 3
const PAGE_SIZE = 3

function ExperienceSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="relative pl-8">
          <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ExperiencePage() {
  const { experiences, isLoading } = useExperience()
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const visibleExperiences = experiences.slice(0, visibleCount)
  const hasMore = visibleCount < experiences.length

  return (
    <div
      className="min-h-screen w-full bg-inherit dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative pb-16"
      id="experience"
    >
      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 container mx-auto px-4 py-20 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <BriefcaseIcon className="w-5 h-5 text-neutral-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Career
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Work{' '}
            <span className="italic border-b-2 border-neutral-900 dark:border-white pb-0.5">
              Experience
            </span>
          </h1>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800"
          />

          {/* Loading */}
          {isLoading && (
            <div className="pl-8">
              <ExperienceSkeleton />
            </div>
          )}

          {/* Empty */}
          {!isLoading && experiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pl-8 py-12 text-center"
            >
              <p className="text-neutral-500 dark:text-neutral-400">
                No experience entries yet.
              </p>
            </motion.div>
          )}

          {/* Entries */}
          {!isLoading &&
            visibleExperiences.map((exp, index) => (
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
                  className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-600"
                />

                {/* Date range */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <CalendarIcon className="w-3 h-3 text-neutral-400" />
                  <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    {exp.startDate} —{' '}
                  </span>
                  {(!exp.endDate || exp.endDate === 'Now') ? (
                    <span className="flex items-center gap-1">
                      <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400">Now</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    </span>
                  ) : exp.endDate === 'Recent' ? (
                    <span className="flex items-center gap-1">
                      <span className="text-xs font-mono text-amber-500 dark:text-amber-400">Recent</span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{exp.endDate}</span>
                  )}
                </div>

                {/* Role */}
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white leading-tight">
                  {exp.role}
                </h3>

                {/* Company */}
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {exp.company}
                </p>

                {/* Description */}
                {exp.description && (
                  <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </motion.div>
            ))}
        </div>

        {/* Show More Button */}
        {!isLoading && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mt-8"
          >
            <HoverBorderGradient
              as="button"
              containerClassName="rounded-full"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-4 py-2"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Show more
              <ChevronDownIcon className="w-4 h-4" />
            </HoverBorderGradient>
          </motion.div>
        )}
      </div>
    </div>
  )
}
