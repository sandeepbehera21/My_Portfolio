import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import { about, aboutFacts, profile } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

function BentoCell({
  className = '',
  delay = 0,
  children,
}: {
  className?: string
  delay?: number
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={`card card-hover p-6 sm:p-7 relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

function FactIcon({ d, color = 'var(--lime)' }: { d: string; color?: string }) {
  return (
    <span
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-sunken border border-subtle"
      style={{ color }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      </svg>
    </span>
  )
}

export default function About() {
  const { education, currently, focus, location, locationNote } = aboutFacts

  return (
    <Section
      id="about"
      eyebrow="01 // BACKGROUND & PHILOSOPHY"
      title="Who Am I"
      subtitle="Backend-first engineer, currently finishing a CS degree and architecting production-grade systems alongside it."
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">
        {/* Main Narrative Cell (Spans 4 cols on desktop) */}
        <BentoCell className="md:col-span-4 md:row-span-2 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, var(--pink) 0%, transparent 70%)' }} />
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime" />
              <span className="text-xs uppercase tracking-[0.2em] text-lime font-mono">Philosophy &amp; Journey</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-strong mb-4 leading-snug">
              Designing backends that scale cleanly, perform under load, and never fail silently.
            </h3>

            <div className="space-y-4 text-body-c text-sm sm:text-base leading-relaxed">
              {about.map((p, i) => (
                <p key={i}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-subtle flex flex-wrap items-center justify-between gap-3 text-xs text-muted-c font-mono">
            <span>Specialization: Distributed Systems &amp; APIs</span>
            <span className="text-lime">Centurion University B.Tech '26</span>
          </div>
        </BentoCell>

        {/* Education Tile */}
        <BentoCell className="md:col-span-2" delay={0.06}>
          <div className="flex items-center gap-3 mb-3">
            <FactIcon d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l6.16-3.42A12 12 0 0112 20a12 12 0 01-6.16-9.42L12 14z" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c">{education.label}</h4>
          </div>
          <p className="font-display font-semibold text-strong text-base">{education.value}</p>
          <p className="text-xs text-muted-c mt-1">{education.org}</p>
          <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-xs font-medium text-lime border border-lime/30 bg-lime/10">
            {education.detail}
          </span>
        </BentoCell>

        {/* Currently / Programmes Tile */}
        <BentoCell className="md:col-span-2" delay={0.12}>
          <div className="flex items-center gap-3 mb-3">
            <FactIcon d="M13 10V3L4 14h7v7l9-11h-7z" color="var(--pink)" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c">{currently.label}</h4>
          </div>
          <p className="font-display font-semibold text-strong text-base">{currently.value}</p>
          <p className="text-xs text-muted-c mt-1">{currently.org}</p>
          <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-xs font-medium text-pink border border-pink/30 bg-pink/10">
            {currently.detail}
          </span>
        </BentoCell>

        {/* Day-to-Day Focus */}
        <BentoCell className="md:col-span-2" delay={0.18}>
          <div className="flex items-center gap-3 mb-3">
            <FactIcon d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c">Primary Focus</h4>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {focus.map(f => (
              <span key={f} className="tag text-xs font-mono">
                {f}
              </span>
            ))}
          </div>
        </BentoCell>

        {/* Location Tile */}
        <BentoCell className="md:col-span-2" delay={0.24}>
          <div className="flex items-center gap-3 mb-3">
            <FactIcon d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c">Based In</h4>
          </div>
          <p className="font-display font-semibold text-strong text-base">{location}</p>
          <p className="text-xs text-muted-c mt-1">{locationNote}</p>
        </BentoCell>

        {/* Elsewhere / Quick Connect */}
        <BentoCell className="md:col-span-2 flex flex-col justify-between" delay={0.3}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FactIcon d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m4.5-4.5l1.5-1.5a4 4 0 015.656 5.656l-3 3" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c">Quick Links</h4>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="link-pill">
                GitHub ↗
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-pill">
                LinkedIn ↗
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link-pill">
                Résumé ↗
              </a>
            </div>
          </div>
          <span className="text-xs text-faint-c mt-4 font-mono">Status: Ready to deploy</span>
        </BentoCell>
      </div>
    </Section>
  )
}
