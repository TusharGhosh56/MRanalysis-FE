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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 shadow-[0_0_15px_-3px_rgba(0,245,160,0.3)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {badge}
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {subtitle}
        </p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </motion.header>
  )
}
