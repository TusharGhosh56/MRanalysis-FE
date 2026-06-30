interface LoadingSpinnerProps {
  label?: string
}

export function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3" role="status" aria-label={label ?? 'Loading'}>
      <div className="relative h-9 w-9">
        <div className="absolute inset-0 rounded-full border-2 border-github-border/60" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent-teal" />
      </div>
      {label && <p className="text-sm text-github-muted">{label}</p>}
    </div>
  )
}
