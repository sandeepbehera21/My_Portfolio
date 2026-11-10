import { useState } from 'react'
import { profile } from '../data/portfolio'
import { smoothScrollTo } from '../lib/interactions'

const FOOTER_LINKS = [
  { num: '01', label: 'Home', href: '#landing-hero' },
  { num: '02', label: 'About', href: '#about' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'Projects', href: '#projects' },
  { num: '05', label: 'Experience', href: '#experience' },
  { num: '06', label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer className="footer-modern relative overflow-hidden mt-16 sm:mt-24">
      {/* Top Glowing Cyan Horizon Line */}
      <div className="footer-glow-line" aria-hidden="true" />

      {/* Subtle Ambient Radial Glow */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="container-pro relative z-10 pt-12 sm:pt-16 pb-8 sm:pb-10">
        {/* Main Bento Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pb-10 sm:pb-12 border-b border-subtle">
          {/* Column 1: Brand Identity + Status + Location (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <a
                href="#landing-hero"
                className="inline-flex items-center gap-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-strong group"
              >
                <span className="footer-logo-badge">
                  <span>S</span>
                  <span className="text-lime">B</span>
                </span>
                <span>
                  Sandeep
                  <span className="text-lime">.dev</span>
                </span>
              </a>

              <p className="mt-3.5 text-sm text-muted-c leading-relaxed max-w-md">
                {profile.summary}
              </p>
            </div>

            {/* Live Status & Location Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="status-pill !py-1.5 !px-3 text-xs font-mono">
                <span className="status-dot" aria-hidden="true" />
                Available for Roles
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-muted-c bg-sunken border border-subtle">
                <svg className="w-3.5 h-3.5 text-lime" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bhubaneswar, IN (IST)
              </span>
            </div>
          </div>

          {/* Column 2: 2-Column Interactive Sitemap Grid (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-lime mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                // Navigation
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono">
                {FOOTER_LINKS.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-nav-item group"
                    >
                      <span className="text-[11px] text-faint-c group-hover:text-lime transition-colors">
                        {link.num}
                      </span>
                      <span className="text-body-c group-hover:text-strong group-hover:translate-x-0.5 transition-all">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Direct Connect Command Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="footer-connect-card">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-lime">
                  // Direct Uplink
                </span>
                <span className="text-[11px] font-mono text-faint-c">24h Response</span>
              </div>

              {/* Interactive Email Bar with Copy + Mailto */}
              <div className="footer-email-box">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs sm:text-sm font-mono text-strong hover:text-lime transition-colors truncate"
                  title={`Email ${profile.email}`}
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="footer-copy-btn"
                  aria-label="Copy email address"
                >
                  {copied ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>

              {/* Social & Resume Action Pills */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="GitHub"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X</span>
                </a>

                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill footer-resume-pill"
                >
                  <span>Resume PDF</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Editorial Watermark Wordmark */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <span className="footer-watermark-text">SANDEEP</span>
        </div>

        {/* Bottom Bar: Copyright, Stack & Smooth Back-to-Top */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono text-muted-c sm:pr-14">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>&copy; {new Date().getFullYear()} {profile.name}.</p>
            <span className="hidden sm:inline text-faint-c">//</span>
            <p className="text-faint-c">Built with React • TypeScript • Tailwind</p>
          </div>

          <button
            type="button"
            onClick={() => smoothScrollTo(0)}
            className="footer-top-btn group self-start sm:self-auto"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <span className="footer-top-icon group-hover:-translate-y-0.5 transition-transform">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
