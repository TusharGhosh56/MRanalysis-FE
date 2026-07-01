import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface LandingSectionProps {
  title: string
  subtitle?: string
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function LandingSection({
  title,
  subtitle,
  eyebrow,
  children,
  className = '',
}: LandingSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const Section = shouldReduceMotion ? 'section' : motion.section

  return (
    <Section
      className={`scroll-mt-20 py-4 ${className}`}
      {...(shouldReduceMotion
        ? {}
        : { variants: fadeUp, initial: 'hidden', animate: 'visible' })}
    >
      <div className="mb-8">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-teal">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-github-muted">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </Section>
  )
}
