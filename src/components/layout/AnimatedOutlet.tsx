import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'

export function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={shouldReduceMotion ? false : 'initial'}
        animate="animate"
        exit={shouldReduceMotion ? undefined : 'exit'}
        variants={pageTransition}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
