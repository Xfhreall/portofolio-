'use client'

import useSWR from 'swr'

interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  url: string
  repoUrl: string
  imageUrl: string
  role: string[]
  isFeatured: boolean
  order: number
}

interface UseProjectsOptions {
  featured?: boolean
  limit?: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useProjects(options: UseProjectsOptions = {}) {
  const { featured, limit } = options
  const params = new URLSearchParams()
  if (featured) params.set('featured', 'true')
  if (typeof limit === 'number' && Number.isFinite(limit) && limit > 0) {
    params.set('limit', String(Math.floor(limit)))
  }
  const query = params.toString()
  const url = `/api/projects${query ? `?${query}` : ''}`

  const { data, error, isLoading, mutate } = useSWR<Project[]>(url, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    projects: data || [],
    isLoading,
    error,
    mutate,
  }
}
