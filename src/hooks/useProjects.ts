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
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useProjects(options: UseProjectsOptions = {}) {
  const { featured } = options
  const url = featured ? '/api/projects?featured=true' : '/api/projects'

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
