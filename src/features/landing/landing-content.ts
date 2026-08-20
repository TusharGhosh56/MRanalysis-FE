import type { LucideIcon } from 'lucide-react'
import {
  FileCode2,
  GitMerge,
  LineChart,
  ShieldAlert,
  Users,
  Zap,
} from 'lucide-react'

export interface LandingFeature {
  number: string
  icon: LucideIcon
  title: string
  description: string
  highlight?: string
  tag?: string
  size?: 'default' | 'large'
  span?: 1 | 2
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

export const LANDING_HIGHLIGHTS = [
  'Commit Velocity & Patterns',
  'Bus Factor Vulnerability',
  'Code Ownership Heatmaps',
  'File Churn Intelligence',
] as const

export const MARQUEE_ITEMS = [
  'Commit Velocity',
  'Bus Factor Risk Modeling',
  'Code Ownership Heatmaps',
  'File Churn Intelligence',
  'Contributor Retention & Activity',
  'Hourly & Weekday Patterns',
  'Merge vs Regular Dynamics',
  'Async Git Mining Pipeline',
] as const

export const LANDING_FEATURES: LandingFeature[] = [
  {
    number: '01',
    icon: LineChart,
    title: 'Commit Velocity & Temporal Patterns',
    description:
      'Granular weekly velocity curves, weekday vs. weekend distribution, and hourly commit heatmaps to understand when your engineering team is most active and where velocity peaks.',
    highlight: 'Weekly Trends & Heatmaps',
    tag: 'VELOCITY',
    size: 'large',
    span: 2,
  },
  {
    number: '02',
    icon: ShieldAlert,
    title: 'Bus Factor & Knowledge Concentration',
    description:
      'Algorithmic bus-factor scoring that flags mission-critical components maintained by a single engineer, preventing single-point-of-failure risks before key departures.',
    highlight: 'Zero Single-Points-of-Failure',
    tag: 'RISK CONTROL',
    span: 1,
  },
  {
    number: '03',
    icon: FileCode2,
    title: 'Code Churn & Hotspot Analysis',
    description:
      'Identify fragile files modified in hundreds of pull requests, high-churn modules prone to regressions, and multi-author merge conflicts.',
    highlight: 'Hotspot Detection',
    tag: 'CODE HEALTH',
    span: 1,
  },
  {
    number: '04',
    icon: Users,
    title: 'Contributor Intelligence & Lifecycles',
    description:
      'Deep author lifecycles, active vs. inactive contributor timelines, and contribution share matrices across all historical branches.',
    highlight: 'Contributor Retention',
    tag: 'PEOPLE',
    span: 1,
  },
  {
    number: '05',
    icon: GitMerge,
    title: 'Merge Dynamics & PR Flow',
    description:
      'Compare direct commits vs merge commits, track pull request cadence, and diagnose branch health across release cycles.',
    highlight: 'Branch Flow Metrics',
    tag: 'PIPELINE',
    span: 1,
  },
  {
    number: '06',
    icon: Zap,
    title: 'High-Throughput Async Engine',
    description:
      'Full asynchronous Celery task pipeline with real-time SSE progress telemetry and zero permanent storage of raw proprietary code.',
    highlight: 'Real-Time Telemetry',
    tag: 'ENGINEERING',
    size: 'large',
    span: 2,
  },
]

export const LANDING_STEPS: LandingStep[] = [
  {
    step: '01',
    title: 'Input Repository URL',
    description:
      'Paste any public GitHub repository link or click a featured preset to queue an immediate audit.',
    details: 'Supports public Git repos of any size with instant validation.',
  },
  {
    step: '02',
    title: 'Async Deep Mining Engine',
    description:
      'Our backend worker clones, unpacks raw commit trees, parses AST changes, and aggregates 15+ statistical dimensions.',
    details: 'Live SSE telemetry progress updates streamed in real time.',
  },
  {
    step: '03',
    title: 'Interactive Intelligence Report',
    description:
      'Explore the multi-dimensional dashboard with zoomable charts, contributor tables, and risk breakdown matrices.',
    details: 'Persisted to your account for team sharing and historical comparison.',
  },
]
