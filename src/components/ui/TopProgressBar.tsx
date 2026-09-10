import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigation } from 'react-router-dom'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { progressManager } from '@/lib/progress'

/**
 * TopProgressBar: "Git Laser Beam & Telemetry HUD"
 * 
 * Specifically designed for MRanalysis's dark obsidian (#07090e), emerald (#00f5a0)
 * and cyan (#00d2ff) aesthetic.
 * 
 * Features:
 * 1. Razor-sharp 2px laser beam with emerald-to-cyan gradient
 * 2. Ultra-bright comet head with pulsing bloom
 * 3. Minimal floating telemetry pill in the top-right corner with a pulsing radar dot and live status
 */
export function TopProgressBar() {
  const location = useLocation()
  const navigation = useNavigation()
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const [isApiActive, setIsApiActive] = useState(progressManager.isActive())

  useEffect(() => {
    return progressManager.subscribe(setIsApiActive)
  }, [])

  // Listen to router transitions
  const [isNavigating, setIsNavigating] = useState(false)
  const prevPathRef = useRef(location.pathname + location.search)

  useEffect(() => {
    const currentPath = location.pathname + location.search
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath
      setIsNavigating(true)
      const timer = setTimeout(() => {
        setIsNavigating(false)
      }, 450)
      return () => clearTimeout(timer)
    }
  }, [location.pathname, location.search])

  const isRoutePending = navigation?.state === 'loading' || navigation?.state === 'submitting'
  const shouldShow = isNavigating || isRoutePending || isFetching > 0 || isMutating > 0 || isApiActive

  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (shouldShow) {
      setVisible(true)
      setProgress((prev) => (prev === 0 ? 18 : prev))

      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev < 35) return prev + Math.random() * 14 + 8
          if (prev < 68) return prev + Math.random() * 7 + 3
          if (prev < 86) return prev + Math.random() * 2.5 + 0.8
          if (prev < 94) return prev + 0.4
          return prev
        })
      }, 180)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)

      if (visible) {
        setProgress(100)
        const timeout = setTimeout(() => {
          setVisible(false)
          setProgress(0)
        }, 320)
        return () => clearTimeout(timeout)
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [shouldShow, visible])

  if (!visible && progress === 0) return null

  return (
    <>
      {/* 1. Precision Emerald-Cyan Laser Beam running across the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px] w-full overflow-visible"
      >
        <div
          className="relative h-full bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-[#00f5a0] transition-all ease-out"
          style={{
            width: `${progress}%`,
            opacity: visible ? 1 : 0,
            transitionProperty: 'width, opacity',
            transitionDuration: progress === 100 ? '180ms' : '280ms',
            boxShadow:
              '0 0 16px rgba(0, 245, 160, 0.7), 0 0 4px rgba(0, 210, 255, 0.9), 0 1px 3px rgba(0, 245, 160, 0.5)',
          }}
        >
          {/* Laser Comet Head Particle */}
          <div className="absolute -right-1.5 -top-[3px] h-2 w-3 rounded-full bg-white shadow-[0_0_12px_#00f5a0,0_0_20px_#00d2ff,0_0_4px_#ffffff]" />

          {/* Forward light wash gradient */}
          <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-r from-transparent via-white/40 to-white" />
        </div>
      </div>

      {/* 2. Top-Right Ambient Telemetry Badge */}
      {/* Discreet, ultra-clean floating status indicator in the top right corner */}
      <div
        className={`pointer-events-none fixed top-3 right-4 z-[9999] flex items-center gap-2 rounded-full border border-emerald-500/20 bg-[#0b0e14]/90 px-2.5 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,245,160,0.1)] backdrop-blur-md transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`}
      >
        {/* Pulsing Radar Beacon Dot */}
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>

        {/* Monospace Telemetry Label */}
        <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-300/90 select-none">
          SYNCING
        </span>
        <span className="font-mono text-[10px] tabular-nums text-slate-400">
          {Math.round(progress)}%
        </span>
      </div>
    </>
  )
}
