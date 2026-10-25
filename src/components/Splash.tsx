import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Splash() {
  const [show, setShow] = useState<boolean>(() => !sessionStorage.getItem('seenSplash'))

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => dismiss(), 1250)
    return () => clearTimeout(t)
  }, [show])

  const dismiss = () => {
    sessionStorage.setItem('seenSplash', '1')
    setShow(false)
  }

  if (!show) return null
  const particles = Array.from({ length: 18 }).map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{ left: `${(i * 5.3) % 100}vw`, top: `${(i * 7.1) % 100}vh`,
        ['--x' as any]: `${(i % 2 === 0 ? -1 : 1) * (5 + (i % 7))}vw`,
        ['--dur' as any]: `${5 + (i % 6)}s` }}
    />
  ))
  return (
    <motion.div
      className="splash-overlay splash-grain"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={dismiss}
    >
      <div className="splash-grid" />
      {particles}
      <div className="relative text-center px-6">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 100 110" className="mx-auto mb-5 splash-hex" aria-hidden="true">
            <polygon className="core" points="50,5 93,28 93,82 50,105 7,82 7,28" />
            <polygon className="line" points="50,5 93,28 93,82 50,105 7,82 7,28 50,5" />
            <polyline className="line" points="20,55 50,35 80,55 50,75 20,55" />
          </svg>
          <div className="splash-title" data-text="Sandeep.dev">Sandeep<span className="text-teal-500">.dev</span></div>
          <div className="splash-sub">Backend Developer</div>
        </motion.div>
        <div className="splash-scan" />
      </div>
    </motion.div>
  )
}
