import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
  badge?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, badge, action }: PageHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.header
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
    >
      <div>
        {badge && (
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 font-mono text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span>{badge}</span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
          {subtitle}
        </p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </motion.header>
  )
}
