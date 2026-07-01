interface SummaryCardProps {
  label: string
  value: string | number
  className?: string
}

export function SummaryCard({ label, value, className = '' }: SummaryCardProps) {
  return (
    <div className={`glass-card h-full rounded-xl p-6 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-github-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
