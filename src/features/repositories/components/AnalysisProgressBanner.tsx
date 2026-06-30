import { Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import type { AnalysisStatus } from '@/types/repository'

interface AnalysisProgressBannerProps {
  status: AnalysisStatus
}

export function AnalysisProgressBanner({ status }: AnalysisProgressBannerProps) {
  const shouldReduceMotion = useReducedMotion()
  const progress = Math.min(100, Math.max(0, status.progress_pct))

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="glass-card rounded-xl border-blue-500/30 p-5"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
        <Loader2 className="h-4 w-4 animate-spin" />
        Analysis in progress
        {status.stage ? ` — ${status.stage}` : ''}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-500/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-accent-teal transition-all duration-500 ease-out"
          style={{ width: `${progress || 8}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-blue-300/70">
        {progress > 0
          ? `${progress}% complete — `
          : ''}
        This page refreshes automatically every few seconds.
      </p>
    </motion.div>
  )
}
