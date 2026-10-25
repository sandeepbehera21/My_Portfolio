import { useEffect, useState } from 'react'

/**
 * Tracks the OS reduced-motion setting and keeps following it if the user
 * flips it mid-session. Starts `false` so the first paint matches the CSS
 * default; the effect corrects it before anything animates.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** Pointer-driven effects are pointless without a hoverable, precise pointer. */
export function hasFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
