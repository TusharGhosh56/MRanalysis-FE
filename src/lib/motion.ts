import type { Variants } from 'framer-motion'

export const GSAP_DEFAULT_DURATION = 0.45
export const GSAP_DEFAULT_EASE = 'power3.out'
export const GSAP_STAGGER = 0.06

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2 },
  },
}

export function getReducedMotionMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined') return null
  return window.matchMedia('(prefers-reduced-motion: reduce)')
}

export function prefersReducedMotion(): boolean {
  return getReducedMotionMediaQuery()?.matches ?? false
}
