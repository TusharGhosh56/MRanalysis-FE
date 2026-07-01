import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'

interface AnalysisCompleteCardProps {
  repositoryId: string
  repositoryLabel?: string
  onDismiss?: () => void
}

export function AnalysisCompleteCard({
  repositoryId,
  repositoryLabel,
  onDismiss,
}: AnalysisCompleteCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="glass-card rounded-xl border-green-500/30 p-5"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
        <div className="flex-1">
          <p className="font-medium text-white">Analysis complete</p>
          {repositoryLabel && (
            <p className="mt-1 font-mono text-sm text-github-muted">
              {repositoryLabel}
            </p>
          )}
          <p className="mt-2 text-sm text-github-muted">
            Your report is ready. View the full dashboard on the Analysis
            Reports page.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={`/reports/${repositoryId}`}>
              <Button className="gap-2">
                View report
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {onDismiss && (
              <Button variant="ghost" onClick={onDismiss}>
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
