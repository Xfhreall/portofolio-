'use client'

import useSWR from 'swr'

export interface Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string | null
  description: string | null
  order: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useExperience() {
  const { data, error, isLoading, mutate } = useSWR<Experience[]>(
    '/api/experience',
    fetcher,
    { revalidateOnFocus: false }
  )

  return {
    experiences: Array.isArray(data) ? data : [],
    isLoading,
    error,
    mutate,
  }
}
