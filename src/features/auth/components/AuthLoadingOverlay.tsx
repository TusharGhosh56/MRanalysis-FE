import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch } from 'lucide-react'

interface AuthLoadingOverlayProps {
  isVisible: boolean
  title?: string
  subtitle?: string
}

export function AuthLoadingOverlay({
  isVisible,
  title = 'Authenticating with Google…',
  subtitle = 'Verifying credentials and generating secure session token',
}: AuthLoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-[#0b0e14]/90 p-6 backdrop-blur-xl"
        >
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl animate-pulse"
            aria-hidden="true"
          />

          {/* High-Tech Orbital Spinner */}
          <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
            {/* Outer Spinning Orbit */}
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400 border-r-cyan-400 [animation-duration:1s]" />
            {/* Reverse Inner Pulse */}
            <div className="absolute inset-2 animate-spin rounded-full border border-transparent border-b-emerald-500/60 [animation-direction:reverse] [animation-duration:1.5s]" />
            {/* Center Brand Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(0,245,160,0.3)]">
              <GitBranch className="h-4 w-4 animate-pulse" />
            </div>
          </div>

          {/* Text Indicators */}
          <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
            {title}
          </h3>
          <p className="mt-1.5 max-w-xs text-center font-mono text-[11px] text-slate-400">
            {subtitle}
          </p>

          {/* Live Progress Telemetry Bar */}
          <div className="mt-5 w-48 overflow-hidden rounded-full bg-white/[0.06] p-0.5">
            <motion.div
              className="h-1 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
