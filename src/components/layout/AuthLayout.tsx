import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { GitBranch, ShieldAlert, Users, Zap, Terminal } from 'lucide-react'

const loginFeatures = [
  { icon: GitBranch, text: 'Audit archives and timeline forensics' },
  { icon: ShieldAlert, text: 'Maintainer concentration and bus-factor alerts' },
  { icon: Zap, text: 'Real-time telemetry on active background mining' },
]

const registerFeatures = [
  { icon: Zap, text: 'Instant GitHub repository profiling in 30 seconds' },
  { icon: Users, text: 'Contributor lifecycle maps and commit velocity cadences' },
  { icon: Terminal, text: 'Exportable JSON audit digests & code health scores' },
]

export function AuthLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isRegister = location.pathname.includes('register')

  // Smooth cubic-bezier spring easing
  const transition = {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1], // snappy start with smooth deceleration
  }

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-[#07090e] text-slate-100 flex flex-col justify-center">
      {/* Background Subtle Tech Ambient Grid & Glows */}
      <div
        className="pointer-events-none absolute -left-28 -top-28 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.06] blur-3xl transition-transform duration-700"
        style={{
          transform: isRegister ? 'translateX(70vw)' : 'translateX(0)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 -bottom-28 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-3xl transition-transform duration-700"
        style={{
          transform: isRegister ? 'translateX(-70vw)' : 'translateX(0)',
        }}
        aria-hidden
      />

      {/* Main Dual-Panel Viewport Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative min-h-[640px] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0e14]/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
          
          {/* ============================================================ */}
          {/* DESKTOP (lg+) SLIDING OVERLAY CURTAIN PATTERN (Approach A) */}
          {/* ============================================================ */}
          <div className="hidden lg:flex relative w-full min-h-[640px]">
            
            {/* 1. Left Fixed Slot (Holds Register form; revealed when curtain slides to right) */}
            <div className="w-1/2 p-10 xl:p-14 flex items-center justify-center">
              <div className={`w-full max-w-md transition-opacity duration-300 ${!isRegister ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {isRegister && <RegisterForm onToggleMode={() => navigate('/login')} />}
              </div>
            </div>

            {/* 2. Right Fixed Slot (Holds Login form; revealed when curtain is at left) */}
            <div className="w-1/2 p-10 xl:p-14 flex items-center justify-center">
              <div className={`w-full max-w-md transition-opacity duration-300 ${isRegister ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {!isRegister && <LoginForm onToggleMode={() => navigate('/register')} />}
              </div>
            </div>

            {/* 3. The Sliding Brand Hero Curtain (Slides between Left and Right) */}
            <motion.div
              initial={false}
              animate={{
                x: isRegister ? '100%' : '0%',
              }}
              transition={transition}
              className={`absolute top-0 left-0 h-full w-1/2 bg-[#07090e]/95 p-10 xl:p-14 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl z-20 ${
                isRegister
                  ? 'border-l border-white/[0.08] rounded-r-3xl'
                  : 'border-r border-white/[0.08] rounded-l-3xl'
              }`}
            >
              {/* Inner Curtain Glows */}
              <div
                className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"
                aria-hidden
              />

              {/* Curtain Content Cross-Fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isRegister ? 'register-hero' : 'login-hero'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative z-10 flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Headline */}
                    <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
                      {isRegister ? (
                        <>
                          Zero setup.{' '}
                          <span className="gradient-text">Complete codebase visibility.</span>
                        </>
                      ) : (
                        <>
                          Understand your codebases with{' '}
                          <span className="gradient-text">surgical clarity.</span>
                        </>
                      )}
                    </h1>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                      {isRegister
                        ? 'Join engineering teams uncovering hidden dependencies, maintainer risks, and commit rhythms with asynchronous Git mining.'
                        : 'Sign in to access your audit archives, queue background Git mining jobs, and share deep intelligence reports with your team.'}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="mt-8 space-y-3.5">
                      {(isRegister ? registerFeatures : loginFeatures).map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-start gap-3.5 text-xs text-slate-300">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-3px_rgba(0,245,160,0.2)]">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="leading-snug pt-1">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* MOBILE / TABLET ADAPTIVE LAYOUT (<lg) */}
          {/* ============================================================ */}
          <div className="lg:hidden p-6 sm:p-8 flex flex-col items-center">
            {/* Mode Switch Tabs */}
            <div className="mb-6 flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition ${
                  !isRegister ? 'bg-emerald-500/15 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition ${
                  isRegister ? 'bg-emerald-500/15 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {isRegister ? (
                    <RegisterForm onToggleMode={() => navigate('/login')} />
                  ) : (
                    <LoginForm onToggleMode={() => navigate('/register')} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
