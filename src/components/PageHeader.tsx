import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface PageHeaderProps {
  title: string
  subtitle: string
  badge?: string
}

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.header
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="mb-2"
    >
      {badge && (
        <span className="mb-2 inline-block rounded-full border border-github-accent/30 bg-github-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-teal">
          {badge}
        </span>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-github-muted sm:text-base">
        {subtitle}
      </p>
    </motion.header>
  )
}
