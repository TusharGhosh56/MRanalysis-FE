import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnalyzeRepositoryForm } from '@/features/repositories/components/AnalyzeRepositoryForm'
import { Velaris } from '@/components/ui/velaris'
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
  const Container = shouldReduceMotion ? 'div' : motion.div

  return (
    <section className="relative w-full overflow-hidden -mt-20 sm:-mt-24">
      <Velaris
        bg="#07090e"
        colors={['#00f5a0', '#10b981', '#00d2ff', '#059669']}
        speed={1.4}
        grain={0.18}
        height="auto"
        className="w-full"
      >
        <Container
          className="relative mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32 lg:px-8 text-center"
          {...(shouldReduceMotion
            ? {}
            : { variants: fadeUp, initial: 'hidden', animate: 'visible' })}
        >
          <div className="space-y-6">
            
            {/* Display Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]">
              Git analytics for <br className="hidden sm:inline" />
              <span className="gradient-text">engineering teams.</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Analyze commit velocity, bus factor risk, and contributor ownership across any public GitHub repository.
            </p>

            {/* Command Bar Input Box */}
            <div className="mx-auto max-w-2xl pt-2">
              <AnalyzeRepositoryForm
                createMutation={createMutation}
                isJobPolling={isJobPolling}
                variant="embedded"
              />
            </div>


            {/* Active Job Progress / Feedback */}
            {children && (
              <div className="mx-auto max-w-2xl pt-4 space-y-4 text-left">
                {children}
              </div>
            )}

          </div>
        </Container>
      </Velaris>
    </section>
  )
}
