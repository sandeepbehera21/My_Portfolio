import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import CountUp from '../components/CountUp'
import { projects, type Project } from '../data/portfolio'

const projectIcons: Record<Project['icon'], ReactElement> = {
  leaf: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 21C7.5 21 3.5 17 3.5 11.5 3.5 6 7 2.5 13.5 2.5c3.5 0 7 2 7 7 0 6.5-4.5 11.5-8.5 11.5zM12 21v-7m0 0a4 4 0 014-4" />
  ),
  brain: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.5 4a3.5 3.5 0 00-3.5 3.5c0 .36.06.7.16 1.02A3.5 3.5 0 004 12a3.5 3.5 0 002.16 3.48A3.5 3.5 0 009.5 20c.4 0 .78-.07 1.14-.2a4.5 4.5 0 002.72 0c.36.13.74.2 1.14.2a3.5 3.5 0 003.34-4.52A3.5 3.5 0 0020 12a3.5 3.5 0 00-2.16-3.48A3.5 3.5 0 0014.5 4c-.4 0-.78.07-1.14.2a4.5 4.5 0 00-2.72 0A3.48 3.48 0 009.5 4z M12 4v16" />
  ),
  cube: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l6-3m0 0l6 3" />
  ),
  cart: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 8l4-4m0 0l4 4m-4-4v12" />
  ),
  book: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  ),
  chat: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
}

const iconTint: Record<Project['icon'], string> = {
  leaf: 'var(--brand)',
  brain: '#0EA5E9',
  cube: 'var(--brand)',
  cart: '#0284C7',
  book: 'var(--brand)',
  chat: '#0891B2',
}

function CaseBlock({
  label,
  children,
  badgeClass = 'text-muted-c',
}: {
  label: string
  children: ReactElement
  badgeClass?: string
}) {
  return (
    <div className="flex flex-col">
      <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold mb-2.5 ${badgeClass}`}>
        // {label}
      </span>
      {children}
    </div>
  )
}

function bullets(lines: string[]) {
  return (
    <ul className="space-y-2">
      {lines.map(line => (
        <li key={line} className="case-bullet flex items-start gap-2 text-xs sm:text-sm text-body-c leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-lime mt-1.5 flex-shrink-0" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 // PRODUCTION CODE"
      title="Featured Case Studies"
      subtitle="Production systems architected for scalability, fault tolerance, and real-world business impact."
    >
      <div className="space-y-8 sm:space-y-10">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: Math.min(i, 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card-glow group"
          >
            <div className="card card-hover p-6 sm:p-8 lg:p-9 relative overflow-hidden">
              {/* Top ambient glow */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
                style={{
                  background: `radial-gradient(circle, ${iconTint[p.icon]} 0%, transparent 70%)`,
                }}
              />

              {/* Header: Project Index, Icon, Name, Tagline & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-subtle">
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl flex-shrink-0 bg-sunken border border-subtle"
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: iconTint[p.icon] }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {projectIcons[p.icon]}
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-lime">
                        0{i + 1} // CASE STUDY
                      </span>
                    </div>
                    <h3
                      className="font-display font-bold text-strong text-xl sm:text-2xl lg:text-3xl tracking-tight group-hover:text-lime transition-colors"
                    >
                      {p.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-c mt-1 font-medium">{p.tagline}</p>
                  </div>
                </div>

                {/* Primary Action Links (GitHub & Live Demo) */}
                <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0 self-start mt-2 sm:mt-0">
                  {p.links.map(l => {
                    const isLive = l.label.toLowerCase().includes('live')
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isLive ? 'btn-primary text-xs !py-2 !px-4' : 'btn-ghost text-xs !py-2 !px-4'}
                      >
                        {isLive ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-0.5" />
                            <span>Live Demo</span>
                            <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span>GitHub Code</span>
                          </>
                        )}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Optional Highlight Metrics */}
              {p.metrics && p.metrics.length > 0 && (
                <dl className="mt-5 py-3 px-4 rounded-xl bg-sunken border border-subtle flex flex-wrap gap-x-8 gap-y-3">
                  {p.metrics.map(m => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="stat-value text-xl font-bold text-lime font-display"><CountUp value={m.value} /></span>
                        <span className="stat-label text-xs uppercase tracking-wider text-muted-c" aria-hidden="true">{m.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* The Case-Study Spine (Problem, Approach, Impact) */}
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                <div className="p-4 rounded-xl bg-sunken border border-subtle">
                  <CaseBlock label="Problem &amp; Challenge" badgeClass="text-pink">
                    <p className="text-xs sm:text-sm text-body-c leading-relaxed">{p.problem}</p>
                  </CaseBlock>
                </div>

                <div className="p-4 rounded-xl bg-sunken border border-subtle">
                  <CaseBlock label="Engineering Approach" badgeClass="text-pink">
                    {bullets(p.approach)}
                  </CaseBlock>
                </div>

                <div className="p-4 rounded-xl bg-sunken border border-subtle">
                  <CaseBlock label="Measurable Outcome" badgeClass="text-lime">
                    {bullets(p.impact)}
                  </CaseBlock>
                </div>
              </div>

              {/* Tech Stack Chips Strip */}
              <div className="mt-6 pt-4 border-t border-subtle flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] font-mono uppercase text-muted-c mr-1.5 hidden sm:inline">Stack:</span>
                  {p.stack.map(tech => (
                    <span key={tech} className="tag text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-faint-c">Production Architecture</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
