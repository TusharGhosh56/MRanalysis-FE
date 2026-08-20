interface SummaryCardProps {
  label: string
  value: string | number
  className?: string
  trend?: string
  icon?: React.ReactNode
}

export function SummaryCard({ label, value, className = '', trend, icon }: SummaryCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_-5px_rgba(245,158,11,0.15)] ${className}`}>
      {/* Top rim highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />

      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        {icon && <span className="text-amber-400/80">{icon}</span>}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {value}
        </p>
        {trend && (
          <span className="font-mono text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}
