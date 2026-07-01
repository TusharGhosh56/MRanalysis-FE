import type { ReactNode } from 'react'
import { BarChart3 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnalyzeRepositoryForm } from '@/features/repositories/components/AnalyzeRepositoryForm'
import { LandingProductPreview } from '@/features/landing/components/LandingProductPreview'
import { LANDING_HIGHLIGHTS } from '@/features/landing/landing-content'
import { fadeUp } from '@/lib/motion'
import type { UseMutationResult } from '@tanstack/react-query'
import type { CreateRepositoryResponse } from '@/types/job'

interface LandingHeroProps {
  createMutation: UseMutationResult<CreateRepositoryResponse, Error, string>
  isJobPolling: boolean
  children?: ReactNode
}

export function LandingHero({
  createMutation,
  isJobPolling,
  children,
}: LandingHeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'section' : motion.section

  return (
    <Container
      className="relative -mx-4 px-4 pb-4 pt-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      {...(shouldReduceMotion
        ? {}
        : { variants: fadeUp, initial: 'hidden', animate: 'visible' })}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(35,134,54,0.22),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-github-accent/30 bg-github-accent/10 px-3 py-1 text-xs font-medium text-accent-teal">
              <BarChart3 className="h-3.5 w-3.5" />
              Git history analytics
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Understand your repositories{' '}
              <span className="gradient-text">like never before</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-github-muted sm:text-lg">
              Paste a public GitHub URL to analyze commit history, contributor
              activity, code churn, and ownership—then open the full interactive
              report when processing completes.
            </p>

            <div className="mt-6">
              <AnalyzeRepositoryForm
                createMutation={createMutation}
                isJobPolling={isJobPolling}
                variant="embedded"
              />
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {LANDING_HIGHLIGHTS.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-github-border/50 bg-surface/40 px-3 py-1 text-xs font-medium text-gray-300"
                >
                  {label}
                </li>
              ))}
            </ul>

            {children && (
              <div className="mt-6 space-y-4">{children}</div>
            )}
          </div>

          <div className="lg:pt-8">
            <LandingProductPreview />
          </div>
        </div>
      </div>
    </Container>
  )
}
