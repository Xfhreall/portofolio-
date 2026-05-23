'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransitionNavigate } from './transition-context'

export function PageTransition() {
  const { isTransitioning } = useTransitionNavigate()
  const columns = [0, 1, 2, 3, 4] // 5 vertical columns

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none w-screen h-screen overflow-hidden flex">
          {columns.map((idx) => (
            <motion.div
              key={`wipe-col-${idx}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.76, 0, 0.24, 1], // Expo-like smooth easing
                delay: idx * 0.05,
              }}
              style={{
                width: '20vw',
                height: '100%',
                originY: isTransitioning ? 0 : 1, // Expand from top when entering, shrink to bottom when exiting
              }}
              className="bg-neutral-950 dark:bg-neutral-100 border-r border-neutral-900/10 dark:border-neutral-200/10"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
