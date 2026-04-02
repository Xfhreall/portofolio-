'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Loader2Icon,
  LogOutIcon,
  ExternalLinkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CalendarIcon,
  ArrowUpDownIcon,
} from 'lucide-react'

interface Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string | null
  description: string | null
  order: number
}

export default function CMSExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    try {
      const res = await fetch('/api/experience?admin=true', { cache: 'no-store' })
      const data = await res.json()
      setExperiences(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch experiences:', error)
      setExperiences([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this experience entry?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' })
      if (res.ok) setExperiences(experiences.filter((e) => e.id !== id))
    } catch (error) {
      console.error('Failed to delete experience:', error)
    } finally {
      setDeleting(null)
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const currentIndex = experiences.findIndex((e) => e.id === id)
    if (currentIndex === -1) return
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= experiences.length) return

    const updated = [...experiences]
    const [moved] = updated.splice(currentIndex, 1)
    updated.splice(newIndex, 0, moved)
    const withOrder = updated.map((e, i) => ({ ...e, order: i }))
    setExperiences(withOrder)

    try {
      await fetch('/api/experience/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experiences: withOrder.map((e) => ({ id: e.id, order: e.order })) }),
      })
    } catch {
      fetchExperiences()
    }
  }

  async function handleSortByDate() {
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    function parseDateVal(dateStr: string): number {
      const parts = dateStr.trim().split(' ')
      const month = MONTHS.indexOf(parts[0])
      const year = parseInt(parts[1] ?? '0')
      return year * 12 + (month === -1 ? 0 : month)
    }

    const sorted = [...experiences].sort((a, b) => parseDateVal(b.startDate) - parseDateVal(a.startDate))
    const withOrder = sorted.map((e, i) => ({ ...e, order: i }))
    setExperiences(withOrder)

    try {
      await fetch('/api/experience/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experiences: withOrder.map((e) => ({ id: e.id, order: e.order })) }),
      })
    } catch {
      fetchExperiences()
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
          <div className="flex items-center gap-4">
            <Link href="/cms" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Projects
            </Link>
            <span className="text-neutral-700">/</span>
            <span className="text-white font-semibold text-sm">Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/experience" target="_blank">
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-neutral-400 hover:text-white"
            >
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
            <h2 className="text-2xl font-bold text-white">Work Experience</h2>
            <p className="text-neutral-400 text-sm mt-1">
              {loading
                ? 'Loading...'
                : `${experiences.length} entr${experiences.length !== 1 ? 'ies' : 'y'}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSortByDate}
              disabled={loading || experiences.length < 2}
              className="border-neutral-700 bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800"
            >
              <ArrowUpDownIcon className="w-4 h-4 mr-2" />
              Sort by Date
            </Button>
            <Link href="/cms/experience/new">
              <Button className="bg-white hover:bg-neutral-100 text-neutral-900">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2Icon className="w-6 h-6 text-neutral-400 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && experiences.length === 0 && (
          <div className="text-center py-20 bg-neutral-900/30 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 mb-4">No experience entries yet</p>
            <Link href="/cms/experience/new">
              <Button className="bg-white hover:bg-neutral-100 text-neutral-900">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add First Entry
              </Button>
            </Link>
          </div>
        )}

        {/* Experience List */}
        {!loading && experiences.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-colors"
              >
                {/* Order Controls */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleReorder(exp.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUpIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReorder(exp.id, 'down')}
                    disabled={index === experiences.length - 1}
                    className="p-1 text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{exp.role}</h3>
                  <p className="text-neutral-400 text-sm">{exp.company}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CalendarIcon className="w-3 h-3 text-neutral-500" />
                    <span className="text-xs text-neutral-500 font-mono">
                      {exp.startDate} — {exp.endDate ?? 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-neutral-500 text-xs mt-1 line-clamp-1">{exp.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/cms/experience/${exp.id}/edit`}>
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(exp.id)}
                    disabled={deleting === exp.id}
                    className="text-neutral-400 hover:text-red-400"
                  >
                    {deleting === exp.id ? (
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
