import { useEffect } from 'react'
import { hasFinePointer } from '../lib/interactions'

/**
 * Cursor-following glow on whichever `.card` is under the pointer.
 *
 * One delegated listener on the document rather than a hook per card: every
 * card on the page gets the effect for the cost of a single rAF-throttled
 * handler, and new cards need no wiring.
 */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!hasFinePointer()) return

    let raf = 0
    let active: HTMLElement | null = null

    const clear = (el: HTMLElement | null) => el?.style.removeProperty('--spot')

    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const target = e.target as Element | null
        const card = target?.closest?.('.card') as HTMLElement | null

        if (card !== active) {
          clear(active)
          active = card
        }
        if (!card) return

        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
        card.style.setProperty('--spot', '1')
      })
    }

    const onLeave = () => {
      clear(active)
      active = null
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      clear(active)
    }
  }, [])

  return null
}
