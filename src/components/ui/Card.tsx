import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const shouldReduceMotion = useReducedMotion()

  const Component = hover && !shouldReduceMotion ? motion.div : 'div'
  const motionProps =
    hover && !shouldReduceMotion
      ? {
          whileHover: { y: -2, transition: { duration: 0.2 } },
        }
      : {}

  return (
    <Component
      className={`glass-card h-full rounded-xl p-6 ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  )
}
