'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800/50',
        className
      )}
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="h-48 md:h-56 w-full rounded-none" />
      
      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Tech Stack */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-14 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function ProjectGridSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProjectCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  )
}

export function CMSProjectSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
      {/* Thumbnail */}
      <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
      
      {/* Content */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-5 w-14 rounded" />
          <Skeleton className="h-5 w-10 rounded" />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}

export function CMSGridSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <CMSProjectSkeleton />
        </motion.div>
      ))}
    </motion.div>
  )
}
