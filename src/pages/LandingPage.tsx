import { JobProgressPanel } from '@/features/repositories/components/JobProgressPanel'
import { AnalysisCompleteCard } from '@/features/analysis-reports/components/AnalysisCompleteCard'
import { AnalysisStatusCard } from '@/features/analysis-reports/components/AnalysisStatusCard'
import { useLandingJob } from '@/features/analysis-reports/hooks/useLandingJob'
import { LandingHero } from '@/features/landing/components/LandingHero'
import { LandingInteractivePreview } from '@/features/landing/components/LandingInteractivePreview'
import { LandingTelemetryTicker } from '@/features/landing/components/LandingTelemetryTicker'
import { LandingForensicComparison } from '@/features/landing/components/LandingForensicComparison'
import { LandingFeatureBento } from '@/features/landing/components/LandingFeatureBento'
import { LandingReportsCta } from '@/features/landing/components/LandingReportsCta'

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
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section with Command Bar & Live URL Parser */}
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

      {/* 2. Interactive Telemetry Sandbox / Preview */}
      <div className="px-4 sm:px-6 lg:px-8">
        <LandingInteractivePreview />
      </div>

      {/* 3. Forensic Telemetry Monospace Marquee Ribbon */}
      <LandingTelemetryTicker />

      {/* 4. Value Demonstration: Surface vs Forensics Perspective Switcher */}
      <LandingForensicComparison />

      {/* 5. Core Analytical Bento with Interactive Micro-Charts (Punchcard, Churn Treemap, Bus Factor) */}
      <LandingFeatureBento />

      {/* 6. Understated Exploration Banner */}
      <LandingReportsCta />
    </div>
  )
}
