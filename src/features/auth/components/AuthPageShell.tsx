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
      className="w-full"
    >
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
      <div className="mt-6 text-center text-xs text-slate-400">{footer}</div>
    </motion.div>
  )
}
