'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ExternalLinkIcon, Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project {
  id: number
  name: string
  description: string
  longDescription?: string
  techStack: string[]
  url: string
  repoUrl: string
  imageUrl: string
  role: string[]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        if (!res.ok) {
          router.push('/project')
          return
        }
        const data = await res.json()
        setProject(data)
      } catch (error) {
        console.error('Failed to fetch project:', error)
        router.push('/project')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2Icon className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen w-full bg-inherit dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-20">

        <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 sm:mb-8 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-48 sm:h-64 md:h-80 lg:h-[500px] rounded-2xl overflow-hidden mb-6 sm:mb-8"
          >
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
   
            
            {/* Role Badges */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2">
              {project.role.map((role) => (
                <span
                  key={role}
                  className={cn(
                    "px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full backdrop-blur-md",
                    role === "Tech Leader" 
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  )}
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              {project.name}
            </h1>

            {/* Description */}
            <div 
              className="prose prose-sm sm:prose-base md:prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:text-neutral-900 dark:prose-headings:text-white prose-p:text-neutral-600 dark:prose-p:text-neutral-300 prose-a:text-purple-500 hover:prose-a:text-purple-400 prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200 prose-code:bg-neutral-200 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-200 dark:prose-pre:bg-neutral-800 prose-blockquote:border-purple-500"
              dangerouslySetInnerHTML={{ 
                __html: project.longDescription || `<p>${project.description}</p>` 
              }}
            />

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 sm:mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-200/80 dark:bg-neutral-800/80 rounded-lg border border-neutral-300/50 dark:border-neutral-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto  hover:brightness-75 h-11 sm:h-12 px-6 sm:px-8 transition-all duration-300">
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
