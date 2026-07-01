import { apiRequest } from '@/api/client'
import type { RepositoryReportResponse } from '@/types/report'

export async function getRepositoryReport(
  id: string,
): Promise<RepositoryReportResponse> {
  return apiRequest<RepositoryReportResponse>(`/repositories/${id}/report`)
}
