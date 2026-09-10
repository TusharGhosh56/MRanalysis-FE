import type { ReactNode } from 'react'

interface SummaryCardProps {
  label: string
  value: string | number
  className?: string
  trend?: string
  subtext?: string
  icon?: ReactNode
}

export function SummaryCard({
  label,
  value,
  className = '',
  trend,
  subtext,
  icon,
}: SummaryCardProps) {
  const trendBadgeStyles = (() => {
    if (!trend) return ''
    const lower = trend.toLowerCase()
    if (lower.includes('critical') || lower.includes('fail') || lower.includes('high')) {
      return 'border-rose-500/30 bg-rose-500/10 text-rose-300'
    }
    if (lower.includes('moderate') || lower.includes('warn') || lower.includes('medium')) {
      return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
    }
    return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
  })()

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0e14]/90 p-5 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:border-white/15 ${className}`}
    >
      {/* Top rim highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        {icon && <span className="text-emerald-400/80">{icon}</span>}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {value}
        </span>
        {trend && (
          <span className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium ${trendBadgeStyles}`}>
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 font-mono text-[11px] text-slate-500">
          {subtext}
        </p>
      )}
    </div>
  )
}
