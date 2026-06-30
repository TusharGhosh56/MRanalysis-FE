import { AlertTriangle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface AnalysisFailedBannerProps {
  error: string | null
}

export function AnalysisFailedBanner({ error }: AnalysisFailedBannerProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
      role="alert"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      <p className="text-sm text-red-200">
        {error ?? 'Analysis failed. Try re-analyzing from the dashboard.'}
      </p>
    </motion.div>
  )
}
