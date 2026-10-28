import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../lib/interactions'
import ThemeToggle from '../ThemeToggle'

const NAV_LINKS = [
  { label: 'HOME', href: '#home', active: true },
  { label: 'WORK', href: '#experience', active: false },
  { label: 'PROJECTS', href: '#projects', active: false },
  { label: 'ABOUT', href: '#about', active: false },
  { label: 'CONTACT', href: '#contact', active: false },
] as const

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('HOME')
  const reducedMotion = usePrefersReducedMotion()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    setActiveTab(label)
    const id = href.slice(1)
    const target = document.getElementById(id)
    if (target) {
      e.preventDefault()
      setMenuOpen(false)
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <header className="hero-navbar-wrap">
      <nav className="hero-navbar" aria-label="Hero navigation">
        {/* Left: Editorial 3-line mark + SB monogram (S in white, B in electric cyan) */}
        <a
          href="#landing-hero"
          className="hero-logo group"
          aria-label={`${profile.name} — Home`}
        >
          <span className="hero-logo-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="hero-logo-text">
            <span className="hero-logo-s">S</span>
            <span className="hero-logo-b">B</span>
          </span>
        </a>

        {/* Right: Spaced uppercase links + resume quick-action + theme toggle + LET'S START pill */}
        <div className="hero-nav-right">
          <ul className="hero-nav-links">
            {NAV_LINKS.map(link => {
              const isActive = activeTab === link.label
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.label, link.href)}
                    className={`hero-nav-link${isActive ? ' is-active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Minimal search/resume icon link (mirrors the magnifying glass icon placement in reference) */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-nav-icon-btn"
            aria-label="Open Resume PDF"
            title="View Resume"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.9} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </a>

          <ThemeToggle className="hero-theme-toggle" />

          <a
            href="#contact"
            onClick={e => handleNavClick(e, 'CONTACT', '#contact')}
            className="hero-cta-pill"
          >
            LET&rsquo;S START
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="hero-mobile-toggle"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="hero-mobile-drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile navigation dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="hero-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="hero-mobile-menu"
          >
            <ul className="hero-mobile-list">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.label, link.href)}
                    className={`hero-mobile-link${activeTab === link.label ? ' is-active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-mobile-link hero-mobile-resume"
                >
                  RESUME ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
