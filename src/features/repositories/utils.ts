import type { AnalyticsSnapshot } from '@/types/repository'

export function findSnapshot<T>(
  snapshots: AnalyticsSnapshot[],
  key: string,
): T | null {
  const snapshot = snapshots.find((item) => item.metric_key === key)
  return snapshot ? (snapshot.payload as T) : null
}
