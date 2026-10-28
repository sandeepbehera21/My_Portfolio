import { useCallback, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from './hero/Navbar'
import Blobs from './hero/Blobs'
import HeroText from './hero/HeroText'
import SideIndex from './hero/SideIndex'
import { usePrefersReducedMotion } from '../lib/interactions'
import { profile, projects } from '../data/portfolio'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/**
 * Hero editorial copy constants matching the Cosmic Cyan reference poster.
 */
const HERO_COPY = {
  leftStackTop: ['FULL-STACK', 'BACKEND', 'AI & CLOUD', 'SYSTEMS'],
  leftStackBottom: ['EMPOWERING', 'COMPANIES WITH', 'SCALABLE', 'SOLUTIONS.'],
  rightTopStack: ['IDEAS', 'TECHNOLOGY', 'PEOPLE', 'IMPACT'],
  exploreLabel: ['EXPLORE', 'WORK'],
  previewCaption: ['REAL CODE', 'REAL SCALE', '03 SHIPPED'],
} as const

export default function LandingHero() {
  const reducedMotion = usePrefersReducedMotion()

  // Normalized mouse coordinates (-1 to 1) for subtle parallax (zero React re-renders)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 75, damping: 26, mass: 0.6 })
  const smoothY = useSpring(mouseY, { stiffness: 75, damping: 26, mass: 0.6 })

  // Restrained parallax offsets (a few pixels for depth without motion sickness)
  const portraitX = useTransform(smoothX, [-1, 1], [-7, 7])
  const portraitY = useTransform(smoothY, [-1, 1], [-5, 5])

  const blobX = useTransform(smoothX, [-1, 1], [11, -11])
  const blobY = useTransform(smoothY, [-1, 1], [8, -8])
  const blobSlowX = useTransform(smoothX, [-1, 1], [-5, 5])
  const blobSlowY = useTransform(smoothY, [-1, 1], [5, -5])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1
      mouseX.set(nx)
      mouseY.set(ny)
    },
    [mouseX, mouseY, reducedMotion],
  )

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const featuredProject = projects[2] ?? projects[0]

  return (
    <section
      id="landing-hero"
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Introduction"
    >
      {/* Top Navbar with SB logo (cyan B), uppercase links, thin bottom rule, and LET'S START pill */}
      <Navbar />

      {/* Main cosmic editorial poster stage */}
      <div className="hero-stage">
        {/* Multi-plane cosmic planets, orbital arcs, cyan halftone matrix & bottom mountain horizon */}
        <Blobs
          parallaxX={blobX}
          parallaxY={blobY}
          parallaxSlowX={blobSlowX}
          parallaxSlowY={blobSlowY}
          reducedMotion={reducedMotion}
        />

        {/* Upper-right editorial pillar: IDEAS / TECHNOLOGY / PEOPLE / IMPACT + cyan bar */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.24, ease: EASE_OUT }}
          className="hero-top-right-pillars"
          aria-hidden="true"
        >
          <p className="hero-pillars-list">
            {HERO_COPY.rightTopStack.map(word => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </p>
          <span className="hero-pillars-bar" />
        </motion.div>

        {/* Centered static B&W high-contrast portrait layered between cosmic planets and giant typography */}
        <motion.div
          style={{ x: portraitX, y: portraitY }}
          initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE_OUT }}
          className="hero-portrait-wrap"
        >
          <div className="hero-portrait-frame">
            <img
              src={profile.portrait}
              alt={`${profile.name} — ${profile.role} portrait`}
              className="hero-portrait-img"
              width={448}
              height={551}
              fetchPriority="high"
              decoding="async"
            />
            {/* Targeted CSS halftone dot overlay on portrait shadow zones */}
            <div className="hero-portrait-halftone" aria-hidden="true" />
            {/* Smooth bottom & edge vignette so portrait merges naturally into the mountain horizon */}
            <div className="hero-portrait-fade" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Giant overlapping display typography: SANDEEP (White) / BEHERA (Electric Cyan) */}
        <HeroText reducedMotion={reducedMotion} />

        {/* Left side: stacked uppercase editorial taglines with glowing cyan vertical divider */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: EASE_OUT }}
          className="hero-left-rail"
        >
          <p className="hero-tagline-stack">
            {HERO_COPY.leftStackTop.map(line => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <span className="hero-left-divider" aria-hidden="true" />

          <p className="hero-tagline-stack hero-tagline-sub">
            {HERO_COPY.leftStackBottom.map(line => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Right side: vertical section index 01 / 02 / 03 / 04 */}
        <SideIndex />

        {/* Bottom bar: Explore Work button + Social icons (left), Scroll indicator (center), Project preview card (right) */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.34, ease: EASE_OUT }}
          className="hero-bottom-bar"
        >
          {/* Bottom-left: circular cyan-bordered arrow button + EXPLORE WORK + social circles */}
          <div className="hero-bottom-left">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="hero-explore-btn group"
              aria-label="Explore work — scroll to next section"
            >
              <span className="hero-explore-circle">
                <svg
                  className="hero-explore-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </span>
              <span className="hero-explore-text">
                {HERO_COPY.exploreLabel.map(line => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </button>

            {/* Outlined circular social icons */}
            <div className="hero-socials" aria-label="Social profiles">
              <SocialCircle href={profile.socials.github} label="GitHub Profile">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.009 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </SocialCircle>
              <SocialCircle href={profile.socials.linkedin} label="LinkedIn Profile">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </SocialCircle>
              <SocialCircle href={profile.socials.x} label="X (Twitter) Profile">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </SocialCircle>
            </div>
          </div>

          {/* Center scroll-down indicator */}
          <button
            type="button"
            className="hero-scroll-indicator"
            onClick={() => scrollToSection('home')}
            aria-label="Scroll down to content"
          >
            <span className="hero-scroll-dot" />
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Bottom-right: mountain horizon project preview card with 3-line caption */}
          <a
            href="#projects"
            onClick={e => {
              e.preventDefault()
              scrollToSection('projects')
            }}
            className="hero-preview-card group"
            aria-label={`Featured project: ${featuredProject.name} — view all projects`}
          >
            <div className="hero-preview-thumb">
              {/* Atmospheric B&W mountain peak with glowing horizon sunrise matching reference */}
              <svg viewBox="0 0 240 100" className="w-full h-full object-cover" aria-hidden="true">
                <defs>
                  <radialGradient id="preview-horizon-glow" cx="54%" cy="68%" r="58%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                    <stop offset="32%" stopColor="#d4d8dd" stopOpacity="0.68" />
                    <stop offset="68%" stopColor="#272a30" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#06080b" stopOpacity="1" />
                  </radialGradient>
                  <linearGradient id="preview-slope-light" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#475569" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#090b10" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <rect width="240" height="100" fill="#06080b" />
                <rect width="240" height="100" fill="url(#preview-horizon-glow)" />
                {/* Distant misty horizon ridge */}
                <path
                  d="M0 100 V 78 L 42 66 L 88 76 L 146 38 L 198 68 L 240 60 V 100 Z"
                  fill="#0b0e14"
                />
                {/* Sunlit left facet on the main mountain peak */}
                <polygon points="146,38 112,72 138,82" fill="url(#preview-slope-light)" />
                {/* Foreground dark mountain ridge */}
                <path
                  d="M0 100 V 84 L 58 72 L 106 80 L 146 38 L 182 70 L 214 64 L 240 76 V 100 Z"
                  fill="#05070a"
                  opacity="0.92"
                />
                {/* Crisp white project title inside top-left of card */}
                <text
                  x="14"
                  y="24"
                  fill="#f8fafc"
                  fontSize="7.5"
                  fontWeight="800"
                  letterSpacing="1.6"
                  fontFamily="Inter, sans-serif"
                >
                  {featuredProject.name.toUpperCase()}
                </text>
              </svg>
              <span className="hero-preview-live-dot" aria-hidden="true" />
            </div>
            <div className="hero-preview-caption">
              {HERO_COPY.previewCaption.map(line => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function SocialCircle({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hero-social-btn"
      aria-label={label}
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </a>
  )
}
