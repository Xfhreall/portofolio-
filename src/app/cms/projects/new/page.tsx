'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, Loader2Icon, PlusIcon, XIcon } from 'lucide-react'

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false)
  const [techInput, setTechInput] = useState('')
  const [form, setForm] = useState({
    name: '',
    description: '',
    longDescription: '',
    techStack: [] as string[],
    url: '',
    repoUrl: '',
    imageUrl: '',
    role: [] as string[],
  })
  const router = useRouter()

  const addTech = () => {
    if (techInput.trim() && !form.techStack.includes(techInput.trim())) {
      setForm({ ...form, techStack: [...form.techStack, techInput.trim()] })
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setForm({ ...form, techStack: form.techStack.filter(t => t !== tech) })
  }

  const toggleRole = (role: string) => {
    if (form.role.includes(role)) {
      setForm({ ...form, role: form.role.filter(r => r !== role) })
    } else {
      setForm({ ...form, role: [...form.role, role] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        router.push('/cms')
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/cms">
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">New Project</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Project Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Short Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              required
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Long Description (optional)</label>
            <textarea
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Image URL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="https://..."
              required
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Live URL</label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Repository URL</label>
              <input
                type="url"
                value={form.repoUrl}
                onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="https://github.com/..."
                required
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="React, Next.js, etc."
              />
              <Button type="button" onClick={addTech} variant="outline" className="border-neutral-700">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>
                    <XIcon className="w-3 h-3 text-neutral-500 hover:text-white" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Your Role</label>
            <div className="flex gap-3">
              {['Tech Leader', 'Front End'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    form.role.includes(role)
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 py-6"
            >
              {loading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : 'Create Project'}
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}
