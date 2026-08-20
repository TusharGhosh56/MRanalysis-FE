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
      className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-slate-950/90 p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(245,158,11,0.2)] backdrop-blur-2xl"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-2 text-sm font-semibold text-white">
        <div className="flex items-center gap-2.5">
          <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
          <span>
            Mining Git Objects
            {repositoryLabel && (
              <span className="ml-1 font-mono text-xs text-amber-300 font-normal">
                [{repositoryLabel}]
              </span>
            )}
          </span>
        </div>

        {job.stage && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-300">
            {job.stage}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.8)] transition-all duration-500 ease-out"
          style={{ width: `${progress || 12}%` }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>
          {progress > 0 ? `${progress}% computed` : 'Queueing worker thread...'}
        </span>
        <span className="text-amber-300/80">Live SSE Telemetry</span>
      </div>
    </motion.div>
  )
}
