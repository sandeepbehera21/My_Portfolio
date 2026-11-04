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

let activeScrollRaf = 0

/**
 * High-frame-rate custom eased scroll to a target Y position or element ID.
 * Uses a silky cubic ease-out curve and cancels immediately if the user
 * interacts with the wheel or touch screen mid-flight.
 */
export function smoothScrollTo(targetOrY: string | HTMLElement | number, duration = 600) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let targetY = 0
  if (typeof targetOrY === 'number') {
    targetY = targetOrY
  } else {
    const el =
      typeof targetOrY === 'string'
        ? document.getElementById(targetOrY.replace(/^#/, ''))
        : targetOrY
    if (!el) return

    const id = el.id
    const navOffset = id === 'landing-hero' ? 0 : 64
    const rect = el.getBoundingClientRect()
    targetY = Math.max(0, rect.top + window.scrollY - navOffset)
  }

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const finalY = Math.min(maxScroll, Math.max(0, targetY))

  if (reduced) {
    window.scrollTo({ top: finalY, behavior: 'auto' })
    return
  }

  if (activeScrollRaf) {
    cancelAnimationFrame(activeScrollRaf)
    activeScrollRaf = 0
  }

  const startY = window.scrollY
  const delta = finalY - startY
  if (Math.abs(delta) < 2) return

  const startTime = performance.now()
  const root = document.documentElement
  root.style.scrollBehavior = 'auto'

  const cleanup = () => {
    root.style.scrollBehavior = ''
    window.removeEventListener('wheel', cancel)
    window.removeEventListener('touchstart', cancel)
    window.removeEventListener('keydown', cancel)
  }

  const cancel = () => {
    if (activeScrollRaf) {
      cancelAnimationFrame(activeScrollRaf)
      activeScrollRaf = 0
    }
    cleanup()
  }

  window.addEventListener('wheel', cancel, { passive: true, once: true })
  window.addEventListener('touchstart', cancel, { passive: true, once: true })
  window.addEventListener('keydown', cancel, { passive: true, once: true })

  const step = (now: number) => {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    // Cubic ease-out: fast start, smooth landing, zero tail drag
    const eased = 1 - Math.pow(1 - t, 3)

    window.scrollTo(0, Math.round(startY + delta * eased))

    if (t < 1) {
      activeScrollRaf = requestAnimationFrame(step)
    } else {
      activeScrollRaf = 0
      cleanup()
    }
  }

  activeScrollRaf = requestAnimationFrame(step)
}

/**
 * Global smooth-scroll enhancer for in-page `#anchor` clicks.
 * Leaves wheel and touch events 100% on the browser's GPU compositor thread
 * so scrolling never lags or blocks on the main JS thread.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const target = e.target as Element | null
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const id = href.slice(1)
      const dest = document.getElementById(id)
      if (!dest) return

      e.preventDefault()
      smoothScrollTo(dest)
    }

    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])
}
