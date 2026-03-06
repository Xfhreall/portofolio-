'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import { getTechIcon } from '@/lib/icon/techIcon'

interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  url: string
  repoUrl: string
  imageUrl: string
  role: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as number[] },
  },
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  void index
  return (
    <motion.div
      variants={cardVariants}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true, margin: '-50px' }}
      className="group relative h-full"
    >
      {/* External link button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute z-20 top-3 right-3 bg-neutral-100/70 dark:bg-neutral-900/70 backdrop-blur-sm p-2 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 transition-all hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80"
      >
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
          <SquareArrowOutUpRightIcon className="size-4" />
        </a>
      </motion.div>

      <Link href={`/project/${project.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm transition-all duration-500 hover:border-neutral-300 dark:hover:border-neutral-700 h-full flex flex-col">

          {/* Image Container */}
          <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Flat dark overlay — no gradient */}
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/10 transition-colors duration-500" />
            {/* Solid bottom scrim — no gradient */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-neutral-100 dark:bg-neutral-900 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

            {/* Role Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 sm:gap-2">
              {project.role.map((role) => (
                <span
                  key={role}
                  className={cn(
                    'px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full backdrop-blur-md',
                    role === 'Tech Leader'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  )}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-1">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-100 transition-colors line-clamp-1">
                {project.name}
              </h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack with icons */}
            <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
              {project.techStack.slice(0, 3).map((tech) => {
                const icon = getTechIcon(tech.toLowerCase())
                return (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-200/80 dark:bg-neutral-800/80 rounded-md border border-neutral-300/50 dark:border-neutral-700/50"
                  >
                    {icon && <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full">{icon}</span>}
                    {tech}
                  </span>
                )
              })}
              {project.techStack.length > 3 && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-400 dark:text-neutral-500 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-md">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Hover ring highlight — no gradient */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-neutral-300/60 dark:group-hover:ring-neutral-700/60 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  )
}
