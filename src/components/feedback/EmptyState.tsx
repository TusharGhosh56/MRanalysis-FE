import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="glass-card flex flex-col items-center rounded-xl px-6 py-12 text-center"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-github-border/40 text-github-muted">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-base font-medium text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-github-muted">{description}</p>
    </motion.div>
  )
}
