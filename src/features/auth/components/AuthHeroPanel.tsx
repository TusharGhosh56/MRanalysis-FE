import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { BarChart3, GitBranch, Users, Zap } from 'lucide-react'
import {
  GSAP_DEFAULT_DURATION,
  GSAP_DEFAULT_EASE,
  GSAP_STAGGER,
  prefersReducedMotion,
} from '@/lib/motion'

gsap.registerPlugin(useGSAP)

const features = [
  { icon: GitBranch, text: 'Commit trends and file churn over time' },
  { icon: Users, text: 'Contributor activity and bus factor insights' },
  { icon: Zap, text: 'Background analysis — refresh when ready' },
]

export function AuthHeroPanel() {
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({ defaults: { ease: GSAP_DEFAULT_EASE } })
      tl.from('.auth-hero-badge', {
        opacity: 0,
        y: 12,
        duration: GSAP_DEFAULT_DURATION,
      })
        .from(
          '.auth-hero-title',
          { opacity: 0, y: 20, duration: GSAP_DEFAULT_DURATION },
          '-=0.25',
        )
        .from(
          '.auth-hero-subtitle',
          { opacity: 0, y: 16, duration: GSAP_DEFAULT_DURATION * 0.9 },
          '-=0.3',
        )
        .from(
          '.auth-hero-feature',
          {
            opacity: 0,
            x: -16,
            duration: GSAP_DEFAULT_DURATION * 0.85,
            stagger: GSAP_STAGGER,
          },
          '-=0.2',
        )
        .from(
          '.auth-hero-orb',
          { opacity: 0, scale: 0.8, duration: GSAP_DEFAULT_DURATION },
          '-=0.4',
        )

      gsap.to('.auth-hero-orb-1', {
        x: 20,
        y: -15,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.auth-hero-orb-2', {
        x: -15,
        y: 20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: panelRef },
  )

  return (
    <div
      ref={panelRef}
      className="relative flex h-full min-h-[280px] flex-col justify-center overflow-hidden border-b border-github-border/40 bg-surface-elevated/50 px-6 py-12 sm:px-10 lg:min-h-svh lg:border-b-0 lg:border-r"
    >
      <div
        className="auth-hero-orb auth-hero-orb-1 pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-github-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="auth-hero-orb auth-hero-orb-2 pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-accent-teal/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 max-w-md">
        <div className="auth-hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-github-accent/30 bg-github-accent/10 px-3 py-1 text-xs font-medium text-accent-teal">
          <BarChart3 className="h-3.5 w-3.5" />
          MRanalysis
        </div>

        <h1 className="auth-hero-title text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Understand your repos{' '}
          <span className="gradient-text">like never before</span>
        </h1>

        <p className="auth-hero-subtitle mt-4 text-base leading-relaxed text-github-muted">
          Paste a public GitHub URL. We clone, parse the full history, and surface
          contributor insights, churn, and trends.
        </p>

        <ul className="mt-8 space-y-4">
          {features.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="auth-hero-feature flex items-start gap-3 text-sm text-gray-300"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-github-accent/15 text-accent-teal">
                <Icon className="h-4 w-4" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
