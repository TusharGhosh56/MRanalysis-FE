import { Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import type { JobResponse } from '@/types/job'

interface JobProgressPanelProps {
  job: JobResponse
  repositoryLabel?: string
}

export function JobProgressPanel({ job, repositoryLabel }: JobProgressPanelProps) {
  const shouldReduceMotion = useReducedMotion()
  const progress = Math.min(100, Math.max(0, job.progress_pct))

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="glass-card rounded-xl border-blue-500/30 p-5"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
        <Loader2 className="h-4 w-4 animate-spin" />
        Analyzing{repositoryLabel ? ` ${repositoryLabel}` : ' repository'}
        {job.stage ? ` — ${job.stage}` : ''}
        {job.status !== 'pending' && (
          <span className="text-blue-300/70">({job.status})</span>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-500/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-accent-teal transition-all duration-500 ease-out"
          style={{ width: `${progress || 8}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-blue-300/70">
        {progress > 0 ? `${progress}% complete — ` : ''}
        Polling every few seconds. Results will appear below when ready.
      </p>
    </motion.div>
  )
}
