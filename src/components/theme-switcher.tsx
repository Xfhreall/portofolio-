'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

function ThemeTransitionOverlay({ 
  isVisible, 
  theme, 
}: { 
  isVisible: boolean
  theme: 'light' | 'dark' | null
}) {
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) return null

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="theme-overlay"
          initial={{ 
            opacity: 0.2 
          }}
          animate={{ 
            opacity: 0.98 
          }}
          exit={{ 
            opacity: 0 
          }}
          transition={{ 
            opacity: { duration: 0.3 }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            pointerEvents: 'none',
            backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff'
          }}
        />
      )}
    </AnimatePresence>,
    document.body
  )
}

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [transitionTheme, setTransitionTheme] = React.useState<'light' | 'dark' | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    if (isTransitioning) return

    const newTheme = isDark ? 'light' : 'dark'
    setTransitionTheme(newTheme)
    setIsTransitioning(true)

    setTimeout(() => {
      setTheme(newTheme)
    }, 250)

    setTimeout(() => {
      setIsTransitioning(false)
      setTransitionTheme(null)
    }, 500)
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-11 h-11 rounded-full">
        <div className="w-[18px] h-[18px] rounded-full bg-neutral-600 animate-pulse" />
      </div>
    )
  }

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300',
          'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer'
        )}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute"
            >
              <Moon className="h-[18px] w-[18px]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute"
            >
              <Sun className="h-[18px] w-[18px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Portal overlay for theme transition */}
      <ThemeTransitionOverlay 
        isVisible={isTransitioning} 
        theme={transitionTheme} 
      />
    </>
  )
}
