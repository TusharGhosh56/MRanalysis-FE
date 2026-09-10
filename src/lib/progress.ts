type ProgressListener = (active: boolean) => void

let activeRequests = 0
const listeners = new Set<ProgressListener>()

function notify() {
  const isActive = activeRequests > 0
  listeners.forEach((listener) => listener(isActive))
}

export const progressManager = {
  start() {
    activeRequests += 1
    notify()
  },
  done() {
    activeRequests = Math.max(0, activeRequests - 1)
    notify()
  },
  subscribe(listener: ProgressListener) {
    listeners.add(listener)
    listener(activeRequests > 0)
    return () => {
      listeners.delete(listener)
    }
  },
  isActive() {
    return activeRequests > 0
  },
}
