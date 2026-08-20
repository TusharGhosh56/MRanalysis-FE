import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Activity, GitBranch, ShieldAlert, Users, Zap } from 'lucide-react'
import {
  GSAP_DEFAULT_DURATION,
  GSAP_DEFAULT_EASE,
  GSAP_STAGGER,
  prefersReducedMotion,
} from '@/lib/motion'

gsap.registerPlugin(useGSAP)

const features = [
  { icon: GitBranch, text: 'Commit velocity curves and weekly peak cadences' },
  { icon: ShieldAlert, text: 'Bus factor vulnerability and maintainer concentration' },
  { icon: Users, text: 'Contributor lifecycles, active vs inactive timelines' },
  { icon: Zap, text: 'High-throughput async mining with real-time telemetry' },
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
        x: 25,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.auth-hero-orb-2', {
        x: -20,
        y: 25,
        duration: 9,
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
      className="relative flex h-full min-h-[300px] flex-col justify-center overflow-hidden border-b border-white/10 bg-slate-950/80 px-6 py-12 sm:px-10 lg:min-h-svh lg:border-b-0 lg:border-r backdrop-blur-2xl"
    >
      {/* Ambient Orb Glows (DayNight celestial reference) */}
      <div
        className="auth-hero-orb auth-hero-orb-1 pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="auth-hero-orb auth-hero-orb-2 pointer-events-none absolute -right-16 bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 max-w-md">
        <div className="auth-hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
          <Activity className="h-3.5 w-3.5" />
          MRanalysis Studio
        </div>

        <h1 className="auth-hero-title text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Understand your codebases with{' '}
          <span className="font-serif italic font-normal text-amber-300">
            surgical clarity.
          </span>
        </h1>

        <p className="auth-hero-subtitle mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          Sign in to access your audit archives, queue background Git mining jobs, and share deep intelligence reports with your team.
        </p>

        <ul className="mt-8 space-y-4">
          {features.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="auth-hero-feature flex items-start gap-3.5 text-xs sm:text-sm text-slate-300"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-300 shadow-inner">
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-snug pt-1">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
