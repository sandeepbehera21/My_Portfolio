import { motion } from 'framer-motion'
import Section from '../components/Section'
import { experiences } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="04 // TRACK RECORD"
      title="Experience &amp; Track Record"
      subtitle="Industry internships and engineering programmes delivering real-world backend infrastructure."
    >
      <div className="space-y-6 sm:space-y-8 relative">
        {experiences.map((exp, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="card-glow group"
          >
            <div className="card overflow-hidden grid lg:grid-cols-12 border border-subtle">
              {/* Left Rail (Timeline meta info, company, duration, tech) */}
              <div className="lg:col-span-4 p-6 sm:p-7 bg-sunken/60 border-b lg:border-b-0 lg:border-r border-subtle flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-lime">
                      0{i + 1} // EXPERIENCE
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-strong text-xl group-hover:text-lime transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-base font-semibold text-pink mt-1">{exp.company}</p>

                  <div className="mt-4 space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-muted-c">
                      <svg className="w-3.5 h-3.5 text-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-faint-c">
                      <svg className="w-3.5 h-3.5 text-faint-c" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-muted-c mb-2">// Stack Used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span key={t} className="tag text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {exp.certificate && (
                  <div className="mt-6 pt-4 border-t border-subtle">
                    <a
                      href={exp.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-xs !py-2 !px-3.5 w-full flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 text-lime" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Verified Certificate ↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Right Body (Responsibilities & Measurable Wins) */}
              <div className="lg:col-span-8 p-6 sm:p-7 lg:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-c mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink" />
                    Key Responsibilities &amp; Architecture
                  </h4>
                  <ul className="space-y-3">
                    {exp.description.map((d, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-body-c leading-relaxed">
                        <svg
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-lime"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.wins?.length ? (
                    <div className="mt-6 p-4 rounded-xl border border-lime/30 bg-lime/5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-lime font-semibold mb-2 flex items-center gap-2">
                        <span>⚡</span>
                        Measurable Wins &amp; Production Outcomes
                      </h4>
                      <div className="space-y-2">
                        {exp.wins.map((w, k) => (
                          <div key={k} className="flex items-start gap-2 text-xs sm:text-sm text-strong leading-relaxed font-medium">
                            <span className="text-lime font-mono">→</span>
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-xs font-mono text-faint-c italic">// Ongoing programme — milestones actively being shipped.</p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between text-xs font-mono text-muted-c">
                  <span>Role Status: {exp.status || (i < 2 ? 'Completed' : 'Active Programme')}</span>
                  <span className="text-pink">Production Delivery</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
