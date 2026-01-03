'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Project {
  id: number
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

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative h-full"
    >
      <Link href={`/project/${project.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900/50 border border-neutral-800/50 backdrop-blur-sm transition-all duration-500 hover:border-neutral-700/50 hover:bg-neutral-900/80 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Role Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 sm:gap-2">
              {project.role.map((role) => (
                <span
                  key={role}
                  className={cn(
                    "px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full backdrop-blur-md",
                    role === "Tech Leader" 
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
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
              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-neutral-100 transition-colors line-clamp-1">
                {project.name}
              </h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-300 bg-neutral-800/80 rounded-md border border-neutral-700/50"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-500 bg-neutral-800/50 rounded-md">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
