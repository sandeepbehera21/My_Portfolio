import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

/** Module-level so the observer effect below has a stable dependency. */
const sectionIds = links.map(l => l.href.slice(1))

/**
 * Tracks which section owns the middle band of the viewport. The generous
 * negative rootMargin means a section only counts as active once it is
 * genuinely centred, not the moment its top edge appears.
 */
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const winner = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (winner) setActive(winner.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    const observed = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    observed.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <header className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="container-pro flex items-center justify-between py-3">
        <a href="#landing-hero" className="font-display text-lg font-semibold tracking-tight text-strong flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-lime/10 border border-lime/30 text-lime flex items-center justify-center text-xs font-mono font-bold group-hover:scale-105 transition-transform">
            SB
          </span>
          <span>
            Sandeep<span className="text-lime">.dev</span>
          </span>
        </a>

        <ul className="hidden lg:flex gap-6 text-sm">
          {links.map(l => {
            const isActive = active === l.href.slice(1)
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative inline-block py-1 transition-colors ${
                    isActive ? 'text-strong' : 'text-muted-c hover:text-strong'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="nav-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="hidden sm:inline-flex btn-primary text-sm !px-4 !py-2">
            Let&rsquo;s talk
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border text-body-c transition-colors hover:text-strong hover:bg-surface-sunken"
            style={{ borderColor: 'var(--border-default)' }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Reading-progress rail, pinned to the bottom edge of the bar */}
      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <div className="container-pro py-4 space-y-1">
              {links.map(l => {
                const isActive = active === l.href.slice(1)
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block py-3 px-3.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-brand bg-brand-soft' : 'text-body-c hover:text-strong hover:bg-surface-sunken'
                    }`}
                  >
                    {l.label}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary text-sm !px-4 !py-2.5 mt-3 w-full sm:hidden"
              >
                Let&rsquo;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
