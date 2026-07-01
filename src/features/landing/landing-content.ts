import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Clock,
  FileCode2,
  LineChart,
  Shield,
  Users,
} from 'lucide-react'

export interface LandingFeature {
  icon: LucideIcon
  title: string
  description: string
  size?: 'default' | 'large'
  span?: 1 | 2
}

export interface LandingStep {
  step: number
  title: string
  description: string
}

export const LANDING_HIGHLIGHTS = [
  'Commit history & trends',
  'Contributor & bus factor',
  'File churn & ownership',
] as const

export const LANDING_FEATURES: LandingFeature[] = [
  {
    icon: LineChart,
    title: 'Commit activity over time',
    description:
      'Weekly trends, weekday and hourly patterns, and busiest periods in your project history.',
    size: 'large',
    span: 2,
  },
  {
    icon: Users,
    title: 'Contributor intelligence',
    description:
      'Top contributors, inactive authors, timelines, and bus-factor risk for knowledge concentration.',
    span: 1,
  },
  {
    icon: FileCode2,
    title: 'Code churn & ownership',
    description:
      'Most modified files, largest commits, per-file ownership, and folder growth rates.',
    span: 1,
  },
  {
    icon: BarChart3,
    title: 'Rich interactive reports',
    description:
      'Full dashboards with charts and tables—open any analysis from the Reports page.',
    span: 2,
  },
  {
    icon: Clock,
    title: 'Background processing',
    description:
      'Analysis runs in the background. Track progress live, then view the report when it completes.',
    span: 1,
  },
  {
    icon: Shield,
    title: 'Your data, your repos',
    description:
      'Only repositories you submit are analyzed. Reports stay tied to your account.',
    span: 1,
  },
]

export const LANDING_STEPS: LandingStep[] = [
  {
    step: 1,
    title: 'Paste a GitHub URL',
    description:
      'Enter any public repository URL. We validate the link and queue a full history analysis.',
  },
  {
    step: 2,
    title: 'We analyze in the background',
    description:
      'Clone, parse commits, and compute metrics. Progress updates while you stay on this page.',
  },
  {
    step: 3,
    title: 'Open your report',
    description:
      'When analysis finishes, open the full dashboard from Analysis Reports or the completion link.',
  },
]
