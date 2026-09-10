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
      className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0b0e14]/95 p-4 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
          <span>
            Mining Git Revisions
            {repositoryLabel && (
              <span className="ml-1.5 font-mono text-emerald-300 font-normal">
                [{repositoryLabel}]
              </span>
            )}
          </span>
        </div>

        {job.stage && (
          <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-300">
            {job.stage}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(0,245,160,0.5)] transition-all duration-300 ease-out"
          style={{ width: `${progress || 10}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-slate-400">
        <span>
          {progress > 0 ? `${progress}% computed` : 'Allocating worker sandbox...'}
        </span>
      </div>
    </motion.div>
  )
}
