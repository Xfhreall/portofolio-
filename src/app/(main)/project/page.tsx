'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import { ProjectGridSkeleton } from '@/components/skeleton'
import { ArrowRight } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

export default function ProjectPage() {
  const { projects: allProjects, isLoading: loading } = useProjects({ featured: true })
  const projects = allProjects.slice(0, 3)

  return (
    <div className="min-h-screen pb-8 w-full bg-inherit dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-neutral-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-neutral-400/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Featured{' '}
            <span className="italic border-b-2 border-neutral-900 dark:border-white pb-0.5">
              Projects
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto text-sm md:text-base">
            A selection of work I&apos;m proud of.
          </p>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && <ProjectGridSkeleton />}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              No featured projects yet. Check back soon.
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* View All Projects Link */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/project/all"
              className="group inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span className="text-sm font-medium border-b border-current pb-0.5">
                View all projects
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
