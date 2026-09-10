import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { GitBranch, ShieldAlert, Users, Zap, Terminal } from 'lucide-react'
import {
  GSAP_DEFAULT_DURATION,
  GSAP_DEFAULT_EASE,
  GSAP_STAGGER,
  prefersReducedMotion,
} from '@/lib/motion'

gsap.registerPlugin(useGSAP)

const features = [
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
        .from(
          '.auth-hero-terminal',
          { opacity: 0, y: 10, duration: GSAP_DEFAULT_DURATION * 0.8 },
          '-=0.3',
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
      className="relative flex h-full min-h-[300px] flex-col justify-center overflow-hidden border-b border-white/[0.08] bg-[#07090e]/95 px-6 py-12 sm:px-10 lg:min-h-svh lg:border-b-0 lg:border-r backdrop-blur-2xl"
    >
      {/* Ambient Orb Glows (Signature Emerald & Cyan) */}
      <div
        className="auth-hero-orb auth-hero-orb-1 pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="auth-hero-orb auth-hero-orb-2 pointer-events-none absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-emerald-500/15 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 max-w-md">


        {/* Display Title with Signature Gradient */}
        <h1 className="auth-hero-title text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          Understand your codebases with{' '}
          <span className="gradient-text">
            surgical clarity.
          </span>
        </h1>

        <p className="auth-hero-subtitle mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          Sign in to access your audit archives, queue background Git mining jobs, and share deep intelligence reports with your team.
        </p>

        {/* Feature List */}
        <ul className="mt-8 space-y-3.5">
          {features.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="auth-hero-feature flex items-start gap-3.5 text-xs sm:text-sm text-slate-300"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-3px_rgba(0,245,160,0.2)]">
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
