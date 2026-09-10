import type { LucideIcon } from 'lucide-react'
import {
  FileCode2,
  LineChart,
  ShieldAlert,
} from 'lucide-react'

export interface LandingFeature {
  number: string
  icon: LucideIcon
  title: string
  description: string
  highlight?: string
  tag?: string
}

export interface LandingStep {
  step: string
  title: string
  description: string
  details: string
}

export const POPULAR_REPOSITORIES = [
  { label: 'facebook/react', url: 'https://github.com/facebook/react' },
  { label: 'vercel/next.js', url: 'https://github.com/vercel/next.js' },
  { label: 'tailwindlabs/tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss' },
  { label: 'fastapi/fastapi', url: 'https://github.com/fastapi/fastapi' },
] as const

export const CORE_PILLARS = [
  {
    id: 'bus-factor',
    icon: ShieldAlert,
    tag: 'RISK',
    title: 'Bus factor & knowledge silos',
    description:
      'Spot critical files and modules maintained by only one or two contributors before departures or reassignments create bottlenecks.',
    metrics: [
      { label: 'Risk metric', value: 'File-level concentration' },
      { label: 'Cadence', value: 'Active vs inactive contributors' },
    ],
  },
  {
    id: 'velocity',
    icon: LineChart,
    tag: 'CADENCE',
    title: 'Commit velocity & rhythm',
    description:
      'Track weekly commit volume, development cadence, and sprint rhythms over months or years of repository history.',
    metrics: [
      { label: 'Cadence', value: 'Weekly commit volume' },
      { label: 'Distribution', value: 'Time & weekday breakdown' },
    ],
  },
  {
    id: 'churn',
    icon: FileCode2,
    tag: 'HOTSPOTS',
    title: 'Code churn & hotspot detection',
    description:
      'Pinpoint files that are constantly modified and rewritten across pull requests, highlighting where regressions are most likely to occur.',
    metrics: [
      { label: 'Hotspot metric', value: 'Change frequency & size' },
      { label: 'Codebase growth', value: 'Directory expansion over time' },
    ],
  },
] as const

export const LANDING_STEPS: LandingStep[] = [
  {
    step: '01',
    title: 'URL Ingestion & Validation',
    description:
      'Paste any public GitHub repository link or click a featured preset to queue an immediate audit.',
    details: 'Zero credentials required. Automatic validation of public git trees.',
  },
  {
    step: '02',
    title: 'Bare Git AST Mining',
    description:
      'Our distributed Celery worker fetches bare commits ephemerally, parses tree diffs, and aggregates 15+ analytical dimensions.',
    details: 'Live SSE telemetry streams progress stages directly to your browser.',
  },
  {
    step: '03',
    title: 'Multidimensional Forensic Report',
    description:
      'Explore deep telemetry with interactive velocity charts, ownership matrices, and bus-factor vulnerability alerts.',
    details: 'Persisted to your account for team sharing and historical review.',
  },
]
