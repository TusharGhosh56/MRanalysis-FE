import type { ReactNode } from 'react'

interface DashboardPanelProps {
  title: string
  subtitle?: string
  badge?: ReactNode
  action?: ReactNode
  children?: ReactNode
  emptyMessage?: string
  isEmpty?: boolean
  className?: string
}

export function DashboardPanel({
  title,
  subtitle,
  badge,
  action,
  children,
  emptyMessage = 'No data available.',
  isEmpty = false,
  className = '',
}: DashboardPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0e14]/90 p-5 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:border-white/15 ${className}`}
    >
      {/* Top rim highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
              {title}
            </h3>
            {badge}
          </div>
          {subtitle && (
            <p className="mt-0.5 font-mono text-xs text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div>
        {isEmpty ? (
          <p className="py-6 text-center font-mono text-xs text-slate-500">
            {emptyMessage}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
