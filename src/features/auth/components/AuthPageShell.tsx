import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface AuthPageShellProps {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

export function AuthPageShell({
  title,
  description,
  children,
  footer,
}: AuthPageShellProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
    >
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-github-muted">{description}</p>
      <div className="mt-8">{children}</div>
      <p className="mt-6 text-center text-sm text-github-muted">{footer}</p>
    </motion.div>
  )
}
