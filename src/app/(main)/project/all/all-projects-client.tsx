'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, FolderGit } from 'lucide-react'
import { BackgroundLines } from '@/components/background-lines'
import type { Project } from '@/lib/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}

export function AllProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <div className="min-h-screen pb-16 w-full bg-white dark:bg-neutral-950 relative overflow-hidden select-none">
      
      {/* Grid lines with Projects page accent (Orange) */}
      <BackgroundLines accentColor="#FF8A00" />

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/project">
            <Button
              variant="ghost"
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-mono text-xs uppercase tracking-widest font-bold focus:outline-none"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Featured
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderGit className="w-4 h-4 text-[#FF8A00]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF8A00] font-bold">
              Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-bricolage uppercase tracking-tight text-neutral-900 dark:text-white mb-3">
            All{' '}
            <span className="italic underline decoration-[#FF8A00] underline-offset-8">
              Projects
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-xs mt-6 font-bold uppercase tracking-wider">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">
              No projects yet. Check back soon.
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 && (
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
      </div>
    </div>
  )
}
