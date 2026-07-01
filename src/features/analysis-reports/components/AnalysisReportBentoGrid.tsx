import { CommitsPerWeekChart } from '@/features/repositories/components/CommitsPerWeekChart'
import { TopContributorsList } from '@/features/repositories/components/TopContributorsList'
import { ActivityPatternsPanel } from '@/features/analysis-reports/components/dashboard/ActivityPatternsPanel'
import { BusFactorPanel } from '@/features/analysis-reports/components/dashboard/BusFactorPanel'
import { CodeOwnershipPanel } from '@/features/analysis-reports/components/dashboard/CodeOwnershipPanel'
import { CommitMessagePatternsChart } from '@/features/analysis-reports/components/dashboard/CommitMessagePatternsChart'
import { CommitsByHourChart } from '@/features/analysis-reports/components/dashboard/CommitsByHourChart'
import { CommitsByWeekdayChart } from '@/features/analysis-reports/components/dashboard/CommitsByWeekdayChart'
import { ContributorTimelinePanel } from '@/features/analysis-reports/components/dashboard/ContributorTimelinePanel'
import {
  DASHBOARD_GRID_CLASS,
  DASHBOARD_SPAN_1,
  DASHBOARD_SPAN_2,
} from '@/features/analysis-reports/components/dashboard/dashboard-layout'
import { FileTypeBreakdownChart } from '@/features/analysis-reports/components/dashboard/FileTypeBreakdownChart'
import { FolderGrowthPanel } from '@/features/analysis-reports/components/dashboard/FolderGrowthPanel'
import { InactiveContributorsPanel } from '@/features/analysis-reports/components/dashboard/InactiveContributorsPanel'
import { LargestCommitsPanel } from '@/features/analysis-reports/components/dashboard/LargestCommitsPanel'
import { MergeVsRegularPanel } from '@/features/analysis-reports/components/dashboard/MergeVsRegularPanel'
import { SummaryCard } from '@/features/analysis-reports/components/dashboard/SummaryCard'
import { TopModifiedFilesPanel } from '@/features/analysis-reports/components/dashboard/TopModifiedFilesPanel'
import type { RepositoryMetrics } from '@/types/repository'

interface AnalysisReportBentoGridProps {
  metrics: RepositoryMetrics
}

export function AnalysisReportBentoGrid({ metrics }: AnalysisReportBentoGridProps) {
  const { summary } = metrics

  return (
    <div className={DASHBOARD_GRID_CLASS}>
      <SummaryCard label="Total commits" value={summary.total_commits} />
      <SummaryCard label="Contributors" value={summary.total_contributors} />
      <SummaryCard
        label="Avg commits / day"
        value={summary.avg_commits_per_day.toFixed(2)}
      />
      <SummaryCard label="Bus factor" value={metrics.bus_factor.score} />

      <CommitsPerWeekChart
        data={metrics.commits_per_week}
        className={DASHBOARD_SPAN_2}
      />
      <TopContributorsList
        contributors={metrics.top_contributors}
        className={DASHBOARD_SPAN_2}
      />

      <ActivityPatternsPanel
        data={metrics.activity_patterns}
        className={DASHBOARD_SPAN_1}
      />
      <BusFactorPanel data={metrics.bus_factor} className={DASHBOARD_SPAN_1} />
      <MergeVsRegularPanel
        data={metrics.merge_vs_regular}
        className={DASHBOARD_SPAN_1}
      />
      <FileTypeBreakdownChart
        data={metrics.file_type_breakdown}
        className={DASHBOARD_SPAN_1}
      />

      <TopModifiedFilesPanel
        data={metrics.top_modified_files}
        className={DASHBOARD_SPAN_2}
      />
      <CodeOwnershipPanel
        data={metrics.code_ownership}
        className={DASHBOARD_SPAN_2}
      />

      <LargestCommitsPanel
        data={metrics.largest_commits}
        className={DASHBOARD_SPAN_2}
      />
      <FolderGrowthPanel
        data={metrics.folder_growth}
        className={DASHBOARD_SPAN_2}
      />

      <InactiveContributorsPanel
        data={metrics.inactive_contributors}
        className={DASHBOARD_SPAN_2}
      />

      <CommitsByWeekdayChart
        data={metrics.commits_by_weekday}
        className={DASHBOARD_SPAN_1}
      />
      <CommitsByHourChart
        data={metrics.commits_by_hour}
        className={DASHBOARD_SPAN_1}
      />

      <CommitMessagePatternsChart
        data={metrics.commit_message_patterns}
        className={DASHBOARD_SPAN_2}
      />
      <ContributorTimelinePanel
        data={metrics.contributor_timeline}
        className={DASHBOARD_SPAN_2}
      />
    </div>
  )
}
