import { profile } from '../data/portfolio'

const FOOTER_LINKS = [
  { label: 'Home', href: '#landing-hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-subtle bg-sunken/40 mt-16 sm:mt-24">
      <div className="container-pro py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-subtle">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#landing-hero"
                className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-strong mb-3 group"
              >
                <span className="w-8 h-8 rounded-lg bg-lime/10 border border-lime/30 text-lime flex items-center justify-center text-xs font-mono font-bold group-hover:scale-105 transition-transform">
                  SB
                </span>
                <span>
                  {profile.name}
                  <span className="text-lime">.dev</span>
                </span>
              </a>
              <p className="text-sm text-body-c leading-relaxed max-w-sm">
                Designing backend architectures that scale, perform, and stay reliable — from microservices to full-stack solutions.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-mono text-muted-c">Open to backend &amp; full-stack roles</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c mb-4">// Navigation</h4>
            <ul className="space-y-2.5 text-sm font-mono">
              {FOOTER_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-c hover:text-lime transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Resume */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c mb-4">// Direct Channels</h4>
            <div className="space-y-2.5 text-sm">
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-body-c hover:text-lime transition-colors break-all font-mono text-xs sm:text-sm"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-pill"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-pill"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={profile.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-pill"
                >
                  X (Twitter) ↗
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-pill text-lime border-lime/30"
                >
                  Résumé (PDF) ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Quote, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono text-muted-c">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-faint-c">•</span>
            <p className="text-faint-c">React + Tailwind + Framer Motion</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-body-c hover:text-lime transition-colors group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
