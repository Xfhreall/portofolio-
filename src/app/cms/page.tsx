'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PlusIcon, PencilIcon, TrashIcon, Loader2Icon, LogOutIcon, ExternalLinkIcon } from 'lucide-react'
import { CMSGridSkeleton } from '@/components/skeleton'

interface Project {
  id: number
  name: string
  description: string
  techStack: string[]
  imageUrl: string
}

export default function CMSPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    setDeleting(id)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    } finally {
      setDeleting(null)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/cms/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Project CMS</h1>
          <div className="flex items-center gap-3">
            <Link href="/project" target="_blank">
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-neutral-400 hover:text-white">
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Projects</h2>
            <p className="text-neutral-400 text-sm mt-1">
              {loading ? 'Loading...' : `${projects.length} project${projects.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <Link href="/cms/projects/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && <CMSGridSkeleton />}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 bg-neutral-900/30 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 mb-4">No projects yet</p>
            <Link href="/cms/projects/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </Link>
          </div>
        )}

        {/* Projects List */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0">
                  {project.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{project.name}</h3>
                  <p className="text-neutral-400 text-sm truncate">{project.description}</p>
                  <div className="flex gap-1 mt-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-xs bg-neutral-800 text-neutral-400 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/cms/projects/${project.id}/edit`}>
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project.id)}
                    disabled={deleting === project.id}
                    className="text-neutral-400 hover:text-red-400"
                  >
                    {deleting === project.id ? (
                      <Loader2Icon className="w-4 h-4 animate-spin" />
                    ) : (
                      <TrashIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
