import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { AnalyzeRepositoryForm } from '@/features/repositories/components/AnalyzeRepositoryForm'
import { LandingProductPreview } from '@/features/landing/components/LandingProductPreview'
import { POPULAR_REPOSITORIES } from '@/features/landing/landing-content'
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
  const [selectedRepoUrl, setSelectedRepoUrl] = useState<string>('')

  const handleSelectPreset = (url: string) => {
    setSelectedRepoUrl(url)
    createMutation.mutate(url)
  }

  return (
    <Container
      className="relative -mx-4 px-4 pt-8 pb-16 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-hidden"
      {...(shouldReduceMotion
        ? {}
        : { variants: fadeUp, initial: 'hidden', animate: 'visible' })}
    >
      {/* Ambient background glow & radial mesh */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,160,0.08),transparent_60%)]"
        aria-hidden
      />

<<<<<<< Updated upstream
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-github-accent/30 bg-github-accent/10 px-3 py-1 text-xs font-medium text-accent-teal">
              <BarChart3 className="h-3.5 w-3.5" />
              Git history analytics
            </span>
=======
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* DayNight Eyebrow Capsule */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>REPOSITORIES</span>
              <span className="text-slate-600">·</span>
              <span>GIT INTELLIGENCE</span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-amber-300 text-[11px]">v2.4 ENGINE</span>
            </div>
>>>>>>> Stashed changes

            {/* Massive Display Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Understand your codebases with{' '}
              <span className="font-serif italic font-normal text-amber-300 drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                surgical intelligence.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Paste any public GitHub repository to calculate commit velocity, author ownership concentration, file churn, and bus-factor vulnerabilities in seconds.
            </p>

            {/* Embedded URL Input Form */}
            <div className="pt-2">
              <AnalyzeRepositoryForm
                createMutation={createMutation}
                isJobPolling={isJobPolling}
                variant="embedded"
                selectedUrl={selectedRepoUrl}
              />
            </div>

            {/* Quick-try presets chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Quick audit:
              </span>
              {POPULAR_REPOSITORIES.map((repo) => (
                <button
                  key={repo.label}
                  type="button"
                  onClick={() => handleSelectPreset(repo.url)}
                  disabled={isJobPolling || createMutation.isPending}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-slate-300 transition hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-200 active:scale-95 disabled:opacity-50"
                >
                  {repo.label}
                </button>
              ))}
            </div>

            {/* Active Job Progress / Status Feedback */}
            {children && (
              <div className="pt-4 space-y-4">{children}</div>
            )}

            {/* Bottom Metadata Stats Bar (DayNight style) */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  PLATFORM
                </p>
                <p className="mt-1 text-sm font-bold text-slate-200">
                  Async Git Miner
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  AVG. ANALYSIS
                </p>
                <p className="mt-1 text-sm font-bold text-amber-300 font-mono">
                  &lt; 30 seconds
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  BUS FACTOR
                </p>
                <p className="mt-1 text-sm font-bold text-emerald-400">
                  Algorithmic Score
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  SECURITY
                </p>
                <p className="mt-1 text-sm font-bold text-slate-200 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Zero Storage
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Celestial Orb & Interactive Product Preview */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              <LandingProductPreview />
            </div>
          </div>

        </div>
      </div>
    </Container>
  )
}
