import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, X } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'

interface AnalysisStatusCardProps {
  repositoryId: string
  message: string
  repositoryLabel?: string
  onDismiss?: () => void
}

export function AnalysisStatusCard({
  repositoryId,
  message,
  repositoryLabel,
  onDismiss,
}: AnalysisStatusCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-[#0b0e14]/95 p-4 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Analysis Notification</p>
            {repositoryLabel && (
              <p className="mt-0.5 font-mono text-xs text-slate-300">
                {repositoryLabel}
              </p>
            )}
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{message}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link to={`/reports/${repositoryId}`}>
                <Button variant="secondary" size="sm" className="rounded-lg px-3 py-1.5 text-xs">
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
              {onDismiss && (
                <Button variant="ghost" size="sm" onClick={onDismiss} className="text-xs">
                  Dismiss
                </Button>
              )}
            </div>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-slate-500 hover:text-slate-300 p-1 transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
