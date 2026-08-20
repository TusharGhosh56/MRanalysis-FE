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
      className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(245,158,11,0.2)] backdrop-blur-2xl"
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-white text-base">Analysis Status Update</p>
            {repositoryLabel && (
              <p className="mt-1 font-mono text-xs text-slate-300">
                {repositoryLabel}
              </p>
            )}
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{message}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to={`/reports/${repositoryId}`}>
                <Button variant="secondary" size="sm" className="rounded-xl px-4 py-2 text-xs">
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
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
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
