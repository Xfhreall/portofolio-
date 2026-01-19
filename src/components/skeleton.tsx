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
      {Array.from({ length: 3 }).map((_, i) => (
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

export function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen w-full bg-inherit dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Skeleton className="h-10 w-24 mb-6 sm:mb-8 rounded-lg" />

          {/* Hero Image */}
          <Skeleton className="h-48 sm:h-64 md:h-80 lg:h-[500px] w-full rounded-2xl mb-6 sm:mb-8" />

          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Title */}
            <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4" />

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-4 sm:h-5 w-full" />
              <Skeleton className="h-4 sm:h-5 w-full" />
              <Skeleton className="h-4 sm:h-5 w-5/6" />
              <Skeleton className="h-4 sm:h-5 w-4/5" />
              <Skeleton className="h-4 sm:h-5 w-3/4" />
            </div>

            {/* Tech Stack */}
            <div>
              <Skeleton className="h-4 w-24 mb-4" />
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Skeleton className="h-8 sm:h-10 w-20 rounded-lg" />
                <Skeleton className="h-8 sm:h-10 w-24 rounded-lg" />
                <Skeleton className="h-8 sm:h-10 w-16 rounded-lg" />
                <Skeleton className="h-8 sm:h-10 w-28 rounded-lg" />
                <Skeleton className="h-8 sm:h-10 w-20 rounded-lg" />
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <Skeleton className="h-11 sm:h-12 w-40 rounded-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

