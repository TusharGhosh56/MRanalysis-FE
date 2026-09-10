import {
  ShieldAlert,
  LineChart,
  Flame,
  UserX,
  Clock,
  GitPullRequest,
  FileCode2,
  FolderTree,
} from 'lucide-react'

const CAPABILITIES = [
  {
    icon: ShieldAlert,
    title: 'Bus Factor Modeling',
    tone: 'text-amber-400',
  },
  {
    icon: LineChart,
    title: 'Commit Cadence Curves',
    tone: 'text-emerald-400',
  },
  {
    icon: Flame,
    title: 'Code Churn & Hotspots',
    tone: 'text-cyan-400',
  },
  {
    icon: UserX,
    title: 'Dormant Maintainer Detection',
    tone: 'text-amber-400',
  },
  {
    icon: Clock,
    title: '24h × 7d Temporal Punchcard',
    tone: 'text-emerald-400',
  },
  {
    icon: FileCode2,
    title: 'Code Ownership Concentration',
    tone: 'text-cyan-400',
  },
  {
    icon: GitPullRequest,
    title: 'Merge Architecture & Squash Ratios',
    tone: 'text-emerald-400',
  },
  {
    icon: FolderTree,
    title: 'Folder Growth Vectors',
    tone: 'text-cyan-400',
  },
]

export function LandingTelemetryTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#07090e]/40 py-3.5 backdrop-blur-md">
      {/* Left/Right Smooth Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-36 bg-gradient-to-r from-[#07090e] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-36 bg-gradient-to-l from-[#07090e] to-transparent" />

      {/* Marquee Track: Clean, borderless typographical stream */}
      <div className="animate-marquee items-center gap-10">
        {/* Set 1 */}
        <div className="flex shrink-0 items-center gap-10">
          {CAPABILITIES.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`cap-1-${idx}`}
                className="flex items-center gap-2.5 font-display text-xs sm:text-sm font-medium tracking-tight text-slate-300 hover:text-white transition cursor-default select-none"
              >
                <span className={item.tone}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{item.title}</span>
                <span className="text-slate-700 pl-6 font-mono font-light select-none">/</span>
              </div>
            )
          })}
        </div>

        {/* Set 2 (Duplicate for infinite seamless loop) */}
        <div className="flex shrink-0 items-center gap-10" aria-hidden="true">
          {CAPABILITIES.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`cap-2-${idx}`}
                className="flex items-center gap-2.5 font-display text-xs sm:text-sm font-medium tracking-tight text-slate-300 hover:text-white transition cursor-default select-none"
              >
                <span className={item.tone}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{item.title}</span>
                <span className="text-slate-700 pl-6 font-mono font-light select-none">/</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
