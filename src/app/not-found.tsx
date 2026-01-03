'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-inherit dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 404 Number */}
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          {/* Message */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3">
            Page Not Found
          </h2>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto border-neutral-700 hover:bg-neutral-800 h-11 px-6"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
