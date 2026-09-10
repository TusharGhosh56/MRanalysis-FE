import { useState } from 'react'
import { CommitsPerWeekChart } from '@/features/repositories/components/CommitsPerWeekChart'
import { TopContributorsList } from '@/features/repositories/components/TopContributorsList'
import { ActivityPatternsPanel } from '@/features/analysis-reports/components/dashboard/ActivityPatternsPanel'
import { BusFactorPanel } from '@/features/analysis-reports/components/dashboard/BusFactorPanel'
import { CodeOwnershipPanel } from '@/features/analysis-reports/components/dashboard/CodeOwnershipPanel'
import { CommitMessagePatternsChart } from '@/features/analysis-reports/components/dashboard/CommitMessagePatternsChart'
import { CommitsByHourChart } from '@/features/analysis-reports/components/dashboard/CommitsByHourChart'
import { CommitsByWeekdayChart } from '@/features/analysis-reports/components/dashboard/CommitsByWeekdayChart'
import { ContributorTimelinePanel } from '@/features/analysis-reports/components/dashboard/ContributorTimelinePanel'
import { FileTypeBreakdownChart } from '@/features/analysis-reports/components/dashboard/FileTypeBreakdownChart'
import { FolderGrowthPanel } from '@/features/analysis-reports/components/dashboard/FolderGrowthPanel'
import { InactiveContributorsPanel } from '@/features/analysis-reports/components/dashboard/InactiveContributorsPanel'
import { LargestCommitsPanel } from '@/features/analysis-reports/components/dashboard/LargestCommitsPanel'
import { MergeVsRegularPanel } from '@/features/analysis-reports/components/dashboard/MergeVsRegularPanel'
import { SummaryCard } from '@/features/analysis-reports/components/dashboard/SummaryCard'
import { TopModifiedFilesPanel } from '@/features/analysis-reports/components/dashboard/TopModifiedFilesPanel'
import { formatNumber } from '@/features/analysis-reports/utils/format-metrics'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  FileCode2,
  GitCommit,
  Layers,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import type { RepositoryMetrics } from '@/types/repository'

interface AnalysisReportBentoGridProps {
  metrics: RepositoryMetrics
}

type TabType = 'overview' | 'velocity' | 'risk' | 'hotspots' | 'all'

const TABS: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: Sparkles },
  { id: 'velocity', label: 'Commit Activity', icon: BarChart3 },
  { id: 'risk', label: 'Team & Risk', icon: ShieldAlert },
  { id: 'hotspots', label: 'Files & Code', icon: FileCode2 },
  { id: 'all', label: 'All Details', icon: Layers },
]

export function AnalysisReportBentoGrid({ metrics }: AnalysisReportBentoGridProps) {
  const { summary, bus_factor, top_contributors } = metrics
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const busFactorHealth =
    bus_factor.score >= 3
      ? 'Healthy'
      : bus_factor.score === 2
        ? 'Moderate'
        : 'Critical'

  const isHighRisk = bus_factor.score <= 1
  const isModerateRisk = bus_factor.score === 2
  const topAuthorName = top_contributors?.[0]?.name || 'Primary author'
  const topAuthorPct = Math.round(bus_factor.top_contributor_pct * 100)

  return (
    <div className="space-y-8">
      {/* 1. Key Metrics at a Glance */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard
          label="Total Commits"
          value={formatNumber(summary.total_commits)}
          icon={<GitCommit className="h-4 w-4" />}
          subtext="Commits in project history"
        />
        <SummaryCard
          label="Contributors"
          value={formatNumber(summary.total_contributors)}
          icon={<Users className="h-4 w-4" />}
          subtext="Unique contributors"
        />
        <SummaryCard
          label="Daily Commits"
          value={`${summary.avg_commits_per_day.toFixed(1)} / day`}
          icon={<Activity className="h-4 w-4" />}
          subtext="Average commits per day"
        />
        <SummaryCard
          label="Bus Factor"
          value={bus_factor.score}
          icon={<ShieldAlert className="h-4 w-4" />}
          trend={isHighRisk ? 'High Risk' : isModerateRisk ? 'Medium Risk' : 'Healthy'}
          subtext={isHighRisk ? '1 person maintains core code' : 'Work is shared across team'}
        />
      </div>

      {/* 2. Section Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#0b0e14] p-1">
          {TABS.map(({ id, label, icon: TabIcon }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <TabIcon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          {activeTab === 'overview' && 'Quick summary and key risks'}
          {activeTab === 'velocity' && 'Weekly trends and active work hours'}
          {activeTab === 'risk' && 'Who writes the code and bus factor'}
          {activeTab === 'hotspots' && 'Most edited files and languages'}
          {activeTab === 'all' && 'Full breakdown of all metrics'}
        </span>
      </div>

      {/* ================================================================ */}
      {/* SECTION 1: OVERVIEW (Default View — Simple & Clear)              */}
      {/* ================================================================ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Verdict Callout */}
          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] ${
              isHighRisk
                ? 'border-rose-500/30 bg-gradient-to-r from-rose-950/20 via-[#0b0e14]/90 to-[#0b0e14]/90'
                : isModerateRisk
                  ? 'border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-[#0b0e14]/90 to-[#0b0e14]/90'
                  : 'border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-[#0b0e14]/90 to-[#0b0e14]/90'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    isHighRisk
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                      : isModerateRisk
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {isHighRisk ? (
                    <ShieldAlert className="h-5 w-5" />
                  ) : isModerateRisk ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <ShieldCheck className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      {isHighRisk
                        ? 'High Risk: 1 Person Holds This Project Together'
                        : isModerateRisk
                          ? 'Medium Risk: 2 Key Maintainers'
                          : 'Healthy Team: Work Is Well Distributed'}
                    </h3>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                        isHighRisk
                          ? 'bg-rose-500/20 text-rose-300'
                          : isModerateRisk
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      Bus Factor {bus_factor.score}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-3xl">
                    {isHighRisk
                      ? `1 contributor (${topAuthorName}) wrote ${topAuthorPct}% of all commits. If this person leaves or gets busy, almost nobody else knows how this code works. Getting more people to review and contribute to core files will make this project safer.`
                      : isModerateRisk
                        ? `Most code is written by just 2 people. Having more team members contribute to key files will help prevent future bottlenecks.`
                        : `Commits are shared nicely across ${summary.total_contributors} contributors. No single person is a bottleneck.`}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-xs text-slate-400 border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-3 sm:pt-0 sm:pl-4 space-y-1">
                <p>
                  Average:{' '}
                  <strong className="font-mono text-white">
                    {summary.avg_commits_per_day.toFixed(1)}
                  </strong>{' '}
                  commits / day
                </p>
                <p>
                  Total History:{' '}
                  <strong className="font-mono text-white">
                    {formatNumber(summary.total_commits)}
                  </strong>{' '}
                  commits
                </p>
              </div>
            </div>
          </div>

          {/* Primary High-Impact Cards (Spacious 2-Column Grid) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CommitsPerWeekChart
              data={metrics.commits_per_week}
              className="flex flex-col justify-between"
            />
            <BusFactorPanel
              data={metrics.bus_factor}
              className="flex flex-col justify-between"
            />
          </div>

          {/* Secondary Highlights (Spacious 2-Column Grid) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopContributorsList
              contributors={metrics.top_contributors}
              limit={5}
            />
            <TopModifiedFilesPanel
              data={metrics.top_modified_files}
              limit={5}
            />
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 2: COMMIT ACTIVITY                                       */}
      {/* ================================================================ */}
      {activeTab === 'velocity' && (
        <div className="space-y-6">
          {/* Section Insight Banner */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
              <Activity className="h-4 w-4" />
              <span>How and when code gets committed</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              See weekly commit output over time, the times of day developers are most active, and whether changes are reviewed in Pull Requests or pushed straight to main.
            </p>
          </div>

          {/* Row 1: Weekly Commits + Busiest Periods */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CommitsPerWeekChart data={metrics.commits_per_week} />
            <ActivityPatternsPanel data={metrics.activity_patterns} />
          </div>

          {/* Row 2: Active Hours + Active Days + PR Ratio */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <CommitsByHourChart data={metrics.commits_by_hour} />
            <CommitsByWeekdayChart data={metrics.commits_by_weekday} />
            <MergeVsRegularPanel data={metrics.merge_vs_regular} />
          </div>

          {/* Row 3: Largest Commits */}
          {metrics.largest_commits && metrics.largest_commits.length > 0 && (
            <LargestCommitsPanel data={metrics.largest_commits} limit={8} />
          )}
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 3: TEAM & RISK                                           */}
      {/* ================================================================ */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          {/* Section Insight Banner */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-4 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1">
              <ShieldAlert className="h-4 w-4" />
              <span>Team structure and key person risk</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Shows who wrote which parts of the codebase, who the primary maintainers are, and what happens if someone leaves.
            </p>
          </div>

          {/* Row 1: Bus Factor + Top Contributors */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BusFactorPanel data={metrics.bus_factor} />
            <TopContributorsList contributors={metrics.top_contributors} limit={8} />
          </div>

          {/* Row 2: Who Owns What Code + Inactive Contributors */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CodeOwnershipPanel data={metrics.code_ownership} limit={8} />
            <InactiveContributorsPanel data={metrics.inactive_contributors} limit={8} />
          </div>

          {/* Row 3: Full Contributor Timelines */}
          <ContributorTimelinePanel data={metrics.contributor_timeline} limit={15} />
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 4: FILES & CODE                                          */}
      {/* ================================================================ */}
      {activeTab === 'hotspots' && (
        <div className="space-y-6">
          {/* Section Insight Banner */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <FileCode2 className="h-4 w-4" />
              <span>Most edited files and codebase changes</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Find out which files change most frequently (and are most likely to introduce bugs), which languages are used, and which folders are growing fastest.
            </p>
          </div>

          {/* Row 1: Most Edited Files + Languages */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopModifiedFilesPanel data={metrics.top_modified_files} limit={8} />
            <FileTypeBreakdownChart data={metrics.file_type_breakdown} />
          </div>

          {/* Row 2: Fastest Growing Folders + Commit Message Types */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FolderGrowthPanel data={metrics.folder_growth} limit={8} />
            <CommitMessagePatternsChart data={metrics.commit_message_patterns} />
          </div>

          {/* Row 3: Largest Commits */}
          {metrics.largest_commits && metrics.largest_commits.length > 0 && (
            <LargestCommitsPanel data={metrics.largest_commits} limit={8} />
          )}
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 5: ALL DETAILS (Sequential View)                          */}
      {/* ================================================================ */}
      {activeTab === 'all' && (
        <div className="space-y-12">
          {/* Section 1: Commit Activity */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-semibold tracking-tight text-sm text-white">
                  Commit Activity & Work Habits
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Section 01 // 5 Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CommitsPerWeekChart data={metrics.commits_per_week} />
              <ActivityPatternsPanel data={metrics.activity_patterns} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <CommitsByHourChart data={metrics.commits_by_hour} />
              <CommitsByWeekdayChart data={metrics.commits_by_weekday} />
              <MergeVsRegularPanel data={metrics.merge_vs_regular} />
            </div>
          </section>

          {/* Section 2: Team & Risk */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="font-semibold tracking-tight text-sm text-white">
                  Team & Key Person Risk
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Section 02 // 5 Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <BusFactorPanel data={metrics.bus_factor} />
              <TopContributorsList contributors={metrics.top_contributors} limit={8} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CodeOwnershipPanel data={metrics.code_ownership} limit={8} />
              <InactiveContributorsPanel data={metrics.inactive_contributors} limit={8} />
            </div>

            <ContributorTimelinePanel data={metrics.contributor_timeline} limit={12} />
          </section>

          {/* Section 3: Files & Code */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="font-semibold tracking-tight text-sm text-white">
                  Files & Code Changes
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Section 03 // 5 Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TopModifiedFilesPanel data={metrics.top_modified_files} limit={8} />
              <FileTypeBreakdownChart data={metrics.file_type_breakdown} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FolderGrowthPanel data={metrics.folder_growth} limit={8} />
              <CommitMessagePatternsChart data={metrics.commit_message_patterns} />
            </div>

            {metrics.largest_commits && metrics.largest_commits.length > 0 && (
              <LargestCommitsPanel data={metrics.largest_commits} limit={8} />
            )}
          </section>
        </div>
      )}
    </div>
  )
}
