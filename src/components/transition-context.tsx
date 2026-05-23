'use client'

import React, { createContext, useContext, useState } from 'react'

interface TransitionContextType {
  isTransitioning: boolean
  startTransition: (navigateCallback: () => void) => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = (navigateCallback: () => void) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    // 1. Entrance staggered animation duration: 550ms
    setTimeout(() => {
      // 2. Perform route navigation behind the covered screen
      navigateCallback()
      
      // 3. Exit staggered animation duration: 600ms
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }, 550)
  }

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransitionNavigate() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransitionNavigate must be used within a TransitionProvider')
  }
  return context
}
