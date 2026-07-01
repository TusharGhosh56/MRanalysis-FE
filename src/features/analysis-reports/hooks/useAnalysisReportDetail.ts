import { useQuery } from '@tanstack/react-query'
import { getRepositoryReport } from '@/api/reports'
import {
  isReportTerminal,
  REPORT_DETAIL_POLL_MS,
} from '@/features/repositories/constants'
import { queryKeys } from '@/lib/query-keys'
import { toRepository } from '@/types/report'

export function useAnalysisReportDetail(repositoryId: string | undefined) {
  const isEnabled = Boolean(repositoryId)

  const reportQuery = useQuery({
    queryKey: queryKeys.reports.detail(repositoryId!),
    queryFn: () => getRepositoryReport(repositoryId!),
    enabled: isEnabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (status && isReportTerminal(status)) return false
      return REPORT_DETAIL_POLL_MS
    },
  })

  const report = reportQuery.data ?? null
  const repository = report ? toRepository(report) : null
  const metrics = report?.metrics ?? null
  const isInProgress = report ? !isReportTerminal(report.status) : false
  const isCompleted = report?.status === 'completed'
  const isFailed = report?.status === 'failed'

  return {
    reportQuery,
    report,
    repository,
    metrics,
    isInProgress,
    isCompleted,
    isFailed,
    errorMessage: report?.error_message ?? null,
    progressStatus: report
      ? {
          status: report.status,
          stage: report.stage,
          progress_pct: report.progress_pct,
          error: report.error_message,
        }
      : null,
  }
}
