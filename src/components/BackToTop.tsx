import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { smoothScrollTo } from '../lib/interactions'

/**
 * Back-to-top button that appears once you are well past the fold. The ring
 * around it is the same scroll progress as the nav rail, drawn with pathLength
 * so it fills clockwise from the top.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const next = window.scrollY > 900
        setVisible(prev => (prev === next ? prev : next))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => smoothScrollTo(0)}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="to-top"
          aria-label="Back to top"
          title="Back to top"
        >
          <svg className="to-top-ring" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="20" className="to-top-track" />
            <motion.circle
              cx="22"
              cy="22"
              r="20"
              className="to-top-bar"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <svg className="w-4 h-4 relative" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
