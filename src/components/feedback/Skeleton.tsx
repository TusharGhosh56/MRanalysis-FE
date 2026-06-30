interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`shimmer rounded-lg bg-github-border/30 ${className}`}
      aria-hidden
    />
  )
}

export function RepositoryListSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading repositories">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-[72px] w-full" />
      ))}
    </div>
  )
}
