import { useEffect, useMemo, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/interactions'

/**
 * Splits a display value like "40%" or "<40ms" into the parts around its
 * number, so only the digits animate and the units stay put.
 */
function parse(value: string) {
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return null
  const [, prefix, digits, suffix] = m
  return {
    prefix,
    suffix,
    target: parseFloat(digits),
    decimals: (digits.split('.')[1] ?? '').length,
  }
}

/**
 * Counts up to a numeric value the first time it scrolls into view.
 * Renders the literal string for assistive tech and for anything non-numeric,
 * and skips the animation entirely under reduced-motion.
 */
export default function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const parsed = useMemo(() => parse(value), [value])
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(0)

  const animatable = Boolean(parsed) && !reduced

  useEffect(() => {
    if (!parsed || reduced) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          // easeOutCubic — quick off the mark, settles gently on the figure
          setCurrent(parsed.target * (1 - Math.pow(1 - p, 3)))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [parsed, reduced, duration])

  if (!animatable || !parsed) {
    return <span ref={ref}>{value}</span>
  }

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {parsed.prefix}
        {current.toFixed(parsed.decimals)}
        {parsed.suffix}
      </span>
      {/* Screen readers get the settled value, never a mid-animation number */}
      <span className="sr-only">{value}</span>
    </span>
  )
}
