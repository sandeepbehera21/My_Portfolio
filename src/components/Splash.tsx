import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/interactions'

const CIPHER_CHARS = '01アイウエオカキクケコサシスセソ∑∆ΩΨΞ<>[]'

const EASE_CYBER = [0.76, 0, 0.24, 1] as const
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

function scrambleWord(target: string, progress: number, seedOffset = 0): string {
  const revealRatio = Math.min(1, Math.max(0, (progress - 8) / 70))
  const revealedCount = Math.floor(target.length * revealRatio)
  let out = ''
  for (let i = 0; i < target.length; i++) {
    if (target[i] === ' ') {
      out += ' '
    } else if (i < revealedCount || progress >= 82) {
      out += target[i]
    } else {
      const idx = (i * 7 + Math.floor(progress * 1.3) + seedOffset) % CIPHER_CHARS.length
      out += CIPHER_CHARS[idx]
    }
  }
  return out
}

export default function Splash() {
  const reducedMotion = usePrefersReducedMotion()
  const [show, setShow] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (!show) return

    if (reducedMotion) {
      setProgress(100)
      const quickTimer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(quickTimer)
    }

    const duration = 1850
    const start = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = t < 0.85 ? (t / 0.85) * 0.92 : 0.92 + ((t - 0.85) / 0.15) * 0.08
      setProgress(Math.min(100, Math.round(eased * 100)))

      if (t < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setShow(false), 220)
      }
    }

    rafId = requestAnimationFrame(tick)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        setShow(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [show, reducedMotion])

  const firstName = useMemo(() => scrambleWord('SANDEEP', progress, 3), [progress])
  const lastName = useMemo(() => scrambleWord('BEHERA', progress, 11), [progress])

  const totalCells = 16
  const activeCells = Math.round((progress / 100) * totalCells)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cyberpunk-splash"
          className="cyber-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 1,
            transition: { duration: 0.6, ease: EASE_CYBER },
          }}
          onClick={() => setShow(false)}
          role="status"
          aria-live="polite"
          aria-label="Initializing Sandeep Behera Portfolio"
        >
          {/* Top & Bottom Armored Blast Shutters */}
          <motion.div
            className="cyber-shutter cyber-shutter-top"
            initial={{ y: '0%' }}
            exit={{ y: '-102%', transition: { duration: 0.6, ease: EASE_CYBER } }}
            aria-hidden="true"
          >
            <div className="cyber-plane-grid cyber-plane-ceiling" />
          </motion.div>

          <motion.div
            className="cyber-shutter cyber-shutter-bottom"
            initial={{ y: '0%' }}
            exit={{ y: '102%', transition: { duration: 0.6, ease: EASE_CYBER } }}
            aria-hidden="true"
          >
            <div className="cyber-plane-grid cyber-plane-floor" />
          </motion.div>

          {/* Horizontal Laser Seam */}
          <motion.div
            className="cyber-laser-seam"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: progress / 100,
              opacity: progress > 85 ? 0.9 : 0.25,
            }}
            exit={{
              scaleX: 1.2,
              scaleY: 2.5,
              opacity: 0,
              transition: { duration: 0.4, ease: EASE_OUT_EXPO },
            }}
            aria-hidden="true"
          />

          {/* Main HUD Stage */}
          <motion.div
            className="cyber-hud-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT_EXPO } }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: 'blur(10px)',
              transition: { duration: 0.35, ease: EASE_OUT_EXPO },
            }}
          >
            <div className="cyber-scanlines" aria-hidden="true" />

            {/* Outer Corner Brackets */}
            <div className="cyber-viewport-frame" aria-hidden="true">
              <span className="cyber-corner cyber-corner-tl" />
              <span className="cyber-corner cyber-corner-tr" />
              <span className="cyber-corner cyber-corner-bl" />
              <span className="cyber-corner cyber-corner-br" />
            </div>

            {/* Clean Center Chamfered Cyberpunk Card */}
            <div className="cyber-core-panel">
              <div className="cyber-panel-body">
                {/* Core Hex Reactor + SB Monogram */}
                <div className="cyber-reactor-col">
                  <div className="cyber-reactor-box">
                    <svg viewBox="0 0 200 200" className="cyber-reactor-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" />
                          <stop offset="100%" stopColor="#FF2A85" />
                        </linearGradient>
                      </defs>

                      <polygon
                        points="100,10 164,36 190,100 164,164 100,190 36,164 10,100 36,36"
                        fill="none"
                        stroke="var(--hero-border, #16323B)"
                        strokeWidth="1.5"
                      />

                      <circle
                        cx="100"
                        cy="100"
                        r="82"
                        fill="none"
                        stroke="var(--hero-cyan, #00D9F5)"
                        strokeWidth="2"
                        strokeDasharray="34 18 8 18 64 24"
                        className="splash-spin-reverse"
                      />

                      <circle
                        cx="100"
                        cy="100"
                        r="68"
                        fill="none"
                        stroke="url(#cyber-grad)"
                        strokeWidth="1.5"
                        strokeDasharray="12 10"
                        className="splash-spin-slow"
                      />

                      <circle
                        cx="100"
                        cy="100"
                        r="54"
                        fill="none"
                        stroke="var(--hero-cyan, #00D9F5)"
                        strokeWidth="3.5"
                        strokeLinecap="square"
                        strokeDasharray={2 * Math.PI * 54}
                        strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
                        transform="rotate(-90 100 100)"
                      />
                    </svg>

                    <div className="cyber-monogram" data-text="SB">
                      <span className="cyber-mono-s">S</span>
                      <span className="cyber-mono-b">B</span>
                    </div>
                  </div>
                </div>

                {/* Glitch Name + Sleek Power Bar */}
                <div className="cyber-info-col">
                  <div className="cyber-glitch-badge">
                    <span className="cyber-badge-dot" />
                    <span>FULL-STACK // AI &amp; CLOUD</span>
                  </div>

                  <h2 className="cyber-title-wrap" aria-label="Sandeep Behera">
                    <span className="cyber-glitch-word cyber-word-white" data-text={firstName}>
                      {firstName}
                    </span>
                    <span className="cyber-glitch-word cyber-word-cyan" data-text={lastName}>
                      {lastName}
                    </span>
                  </h2>

                  <div className="cyber-power-wrap">
                    <div className="cyber-power-meta">
                      <span>{progress < 100 ? 'SYNCING_CORE' : 'READY'}</span>
                      <span className="cyber-power-pct">{String(progress).padStart(3, '0')}%</span>
                    </div>
                    <div className="cyber-cells-grid" aria-hidden="true">
                      {Array.from({ length: totalCells }).map((_, idx) => {
                        const isLit = idx < activeCells
                        const isPeak = idx >= totalCells - 2 && isLit
                        return (
                          <span
                            key={idx}
                            className={`cyber-cell${isLit ? ' is-lit' : ''}${isPeak ? ' is-peak' : ''}`}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Skip Button */}
            <div className="cyber-bottom-bar">
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  setShow(false)
                }}
                className="cyber-skip-btn"
                aria-label="Skip intro"
              >
                <span>SKIP [ESC]</span>
                <span className="cyber-skip-arrow">»</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
