import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className = '',
  hover = false,
  glow = false,
  onClick,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion()

  const Component = hover && !shouldReduceMotion ? motion.div : 'div'
  const motionProps =
    hover && !shouldReduceMotion
      ? {
          whileHover: { y: -3 },
        }
      : {}

  return (
    <Component
      onClick={onClick}
      className={`glass-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'glass-card-hover cursor-pointer' : ''
      } ${
        glow ? 'border-emerald-500/30 shadow-[0_0_40px_-10px_rgba(0,245,160,0.15)]' : ''
      } ${className}`}
      {...motionProps}
    >
      {/* Top rim highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />
      {children}
    </Component>
  )
}
