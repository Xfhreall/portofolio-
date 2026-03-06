'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 10 }, (_, i) => String(currentYear - i))

function DatePicker({
  label,
  value,
  onChange,
  optional,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  optional?: boolean
}) {
  const [month, setMonth] = useState(() => value ? value.split(' ')[0] : '')
  const [year, setYear] = useState(() => value ? value.split(' ')[1] ?? '' : '')

  useEffect(() => {
    if (value) {
      const parts = value.split(' ')
      setMonth(parts[0] ?? '')
      setYear(parts[1] ?? '')
    } else {
      setMonth('')
      setYear('')
    }
  }, [value])

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth)
    if (newMonth && year) onChange(`${newMonth} ${year}`)
  }

  const handleYearChange = (newYear: string) => {
    setYear(newYear)
    if (month && newYear) onChange(`${month} ${newYear}`)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-2">
        {label}
        {optional && <span className="ml-1 text-neutral-500">(optional)</span>}
      </label>
      <div className="grid grid-cols-2 gap-2">
        <select
          value={month}
          onChange={(e) => handleMonthChange(e.target.value)}
          className="px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 text-sm"
        >
          <option value="">Month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          className="px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 text-sm"
        >
          <option value="">Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default function EditExperiencePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    endDateType: 'custom' as 'custom' | 'now' | 'recent',
  })

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await fetch(`/api/experience/${params.id}`)
        if (!res.ok) {
          router.push('/cms/experience')
          return
        }
        const data = await res.json()
        const ed: string | null = data.endDate
        const endDateType =
          !ed || ed === 'Now' ? 'now' : ed === 'Recent' ? 'recent' : 'custom'
        setForm({
          role: data.role || '',
          company: data.company || '',
          startDate: data.startDate || '',
          endDate: endDateType === 'custom' ? (ed ?? '') : '',
          description: data.description || '',
          endDateType,
        })
      } catch {
        router.push('/cms/experience')
      } finally {
        setFetching(false)
      }
    }
    fetchExperience()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const resolvedEndDate =
      form.endDateType === 'now'
        ? 'Now'
        : form.endDateType === 'recent'
        ? 'Recent'
        : form.endDate || null

    try {
      const res = await fetch(`/api/experience/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: form.role,
          company: form.company,
          startDate: form.startDate,
          endDate: resolvedEndDate,
          description: form.description || null,
        }),
      })

      if (res.ok) {
        router.push('/cms/experience')
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to update experience:', error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2Icon className="w-6 h-6 text-neutral-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/cms/experience">
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Edit Experience</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Role / Job Title
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
              required
            />
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              value={form.startDate}
              onChange={(v) => setForm({ ...form, startDate: v })}
            />
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">End Date</label>
              <div className="flex gap-2 mb-2">
                {(['custom', 'now', 'recent'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, endDateType: type, endDate: '' })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors capitalize ${
                      form.endDateType === type
                        ? 'bg-white border-white text-neutral-900'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    {type === 'custom' ? 'Date' : type}
                  </button>
                ))}
              </div>
              {form.endDateType === 'custom' && (
                <DatePicker
                  label=""
                  value={form.endDate}
                  onChange={(v) => setForm({ ...form, endDate: v })}
                  optional
                />
              )}
              {form.endDateType !== 'custom' && (
                <div
                  className="px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-sm capitalize"
                  style={{ color: form.endDateType === 'now' ? '#34d399' : '#fbbf24' }}
                >
                  {form.endDateType === 'now' ? 'Now' : 'Recent'}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Description <span className="text-neutral-500">(optional)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading || !form.role || !form.company || !form.startDate}
              className="w-full bg-white hover:bg-neutral-100 text-neutral-900 py-6 disabled:opacity-40"
            >
              {loading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}
