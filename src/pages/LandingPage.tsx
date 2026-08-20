import { JobProgressPanel } from '@/features/repositories/components/JobProgressPanel'
import { AnalysisCompleteCard } from '@/features/analysis-reports/components/AnalysisCompleteCard'
import { AnalysisStatusCard } from '@/features/analysis-reports/components/AnalysisStatusCard'
import { useLandingJob } from '@/features/analysis-reports/hooks/useLandingJob'
import { LandingFeatureBento } from '@/features/landing/components/LandingFeatureBento'
import { LandingHero } from '@/features/landing/components/LandingHero'
import { LandingHowItWorks } from '@/features/landing/components/LandingHowItWorks'
import { LandingManifesto } from '@/features/landing/components/LandingManifesto'
import { LandingMarquee } from '@/features/landing/components/LandingMarquee'
import { LandingReportsCta } from '@/features/landing/components/LandingReportsCta'
import { LandingStatsCounter } from '@/features/landing/components/LandingStatsCounter'

export function LandingPage() {
  const {
    createMutation,
    repositoryId,
    resetJob,
    isJobPolling,
    job,
    isCompleted,
    isFailed,
    isTimedOut,
    errorMessage,
  } = useLandingJob()

  const repositoryLabel =
    job?.result?.repository != null
      ? `${job.result.repository.owner}/${job.result.repository.name}`
      : createMutation.data != null
        ? `${createMutation.data.owner}/${createMutation.data.name}`
        : undefined

  return (
    <div className="space-y-4">
      {/* 1. DayNight Studio Hero */}
      <LandingHero createMutation={createMutation} isJobPolling={isJobPolling}>
        {isJobPolling && job && (
          <JobProgressPanel job={job} repositoryLabel={repositoryLabel} />
        )}

        {isCompleted && repositoryId && (
          <AnalysisCompleteCard
            repositoryId={repositoryId}
            repositoryLabel={repositoryLabel}
            onDismiss={resetJob}
          />
        )}

        {isTimedOut && repositoryId && errorMessage && (
          <AnalysisStatusCard
            repositoryId={repositoryId}
            message={errorMessage}
            repositoryLabel={repositoryLabel}
            onDismiss={resetJob}
          />
        )}

        {isFailed && !isTimedOut && repositoryId && errorMessage && (
          <AnalysisStatusCard
            repositoryId={repositoryId}
            message={errorMessage}
            repositoryLabel={repositoryLabel}
            onDismiss={resetJob}
          />
        )}
      </LandingHero>

      {/* 2. Marquee Ticker */}
      <LandingMarquee />

      {/* 3. Position Manifesto */}
      <LandingManifesto />

      {/* 4. Statistics Showcase (4 Columns) */}
      <LandingStatsCounter />

      {/* 5. Bento Grid Capabilities */}
      <LandingFeatureBento />

      {/* 6. Processing Pipeline (How It Works) */}
      <LandingHowItWorks />

      {/* 7. Call To Action */}
      <LandingReportsCta />
    </div>
  )
}
