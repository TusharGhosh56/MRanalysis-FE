import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

interface DashboardPanelProps {
  title: string
  subtitle?: string
  children?: ReactNode
  emptyMessage?: string
  isEmpty?: boolean
  className?: string
}

export function DashboardPanel({
  title,
  subtitle,
  children,
  emptyMessage = 'No data available.',
  isEmpty = false,
  className = '',
}: DashboardPanelProps) {
  return (
    <Card className={className}>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-xs text-github-muted">{subtitle}</p>
      )}
      <div className="mt-3">
        {isEmpty ? (
          <p className="text-sm text-github-muted">{emptyMessage}</p>
        ) : (
          children
        )}
      </div>
    </Card>
  )
}
