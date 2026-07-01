import { JobProgressPanel } from '@/features/repositories/components/JobProgressPanel'
import { AnalysisCompleteCard } from '@/features/analysis-reports/components/AnalysisCompleteCard'
import { AnalysisStatusCard } from '@/features/analysis-reports/components/AnalysisStatusCard'
import { useLandingJob } from '@/features/analysis-reports/hooks/useLandingJob'
import { LandingFeatureBento } from '@/features/landing/components/LandingFeatureBento'
import { LandingHero } from '@/features/landing/components/LandingHero'
import { LandingHowItWorks } from '@/features/landing/components/LandingHowItWorks'
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
    <div className="pb-8">
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

      <div className="mx-auto max-w-6xl space-y-20 py-16">
        <LandingHowItWorks />
        <LandingFeatureBento />
      </div>

      <LandingReportsCta />
    </div>
  )
}
