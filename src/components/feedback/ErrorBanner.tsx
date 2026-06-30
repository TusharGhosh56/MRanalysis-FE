import { AlertCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface ErrorBannerProps {
  message: string
  hint?: string
}

export function ErrorBanner({ message, hint }: ErrorBannerProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      <div>
        <p className="text-sm font-medium text-red-200">{message}</p>
        {hint && <p className="mt-1 text-xs text-red-300/80">{hint}</p>}
      </div>
    </motion.div>
  )
}
