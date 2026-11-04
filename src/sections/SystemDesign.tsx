import { motion } from 'framer-motion'
import Section from '../components/Section'

const architectureBlocks = [
  {
    title: 'Enterprise Java Spring Boot',
    subtitle: 'Layered, Decoupled & Audited',
    accent: 'border-lime/30 hover:border-lime',
    pill: 'text-lime bg-lime/10 border-lime/30',
    dot: 'bg-lime',
    flow: ['Client', 'Controller', 'Service', 'Repository', 'MySQL + Redis'],
    highlights: [
      'Clean Controller → Service → Repository separation of concerns.',
      'Stateless JWT & OAuth2 filters via Spring Security 6.',
      'Redis read-through caching for sub-100ms query responses.',
    ],
  },
  {
    title: 'Cloud-Native MERN Stack',
    subtitle: 'Stateless APIs & Horizontal Scale',
    accent: 'border-pink/30 hover:border-pink',
    pill: 'text-pink bg-pink/10 border-pink/30',
    dot: 'bg-pink',
    flow: ['React UI', 'Express API', 'JWT Guard', 'Service', 'MongoDB Atlas'],
    highlights: [
      'Stateless Express REST layer deployed on Google Cloud.',
      'Compound MongoDB indexing for sub-50ms query latency.',
      'Gemini AI & webhook integrations with signature verification.',
    ],
  },
  {
    title: 'Reliability & Security',
    subtitle: 'Production Defense-in-Depth',
    accent: 'border-cyan-500/25 dark:border-cyan-400/30 hover:border-cyan-500',
    pill: 'dark:text-cyan-300 text-cyan-800 bg-cyan-500/10 border-cyan-500/30',
    dot: 'bg-lime',
    flow: ['Validation', 'Rate Limit', 'Auth RBAC', 'Audit Log', 'Health Check'],
    highlights: [
      'Graceful fallbacks when external APIs or caches time out.',
      'Connection pooling and query tuning to eliminate N+1 bottlenecks.',
      'Strict environment isolation and OpenAPI contract testing.',
    ],
  },
]

export default function SystemDesign() {
  return (
    <Section
      id="system-design"
      eyebrow="05 // ARCHITECTURE BLUEPRINTS"
      title="System Design &amp; Architecture"
      subtitle="How I architect maintainable, secure backends from request ingestion to persistence."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {architectureBlocks.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`card card-hover p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 ${d.accent}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${d.pill}`}>
                  Architecture Pattern
                </span>
                <span className="text-xs font-mono text-muted-c">0{i + 1}</span>
              </div>

              <h3 className="font-display font-bold text-strong text-lg sm:text-xl mb-1 tracking-tight">
                {d.title}
              </h3>
              <p className="text-xs font-mono text-muted-c mb-5">{d.subtitle}</p>

              {/* Data Flow Pipeline */}
              <div className="mb-5 p-3 rounded-lg bg-sunken border border-subtle">
                <span className="text-[10px] font-mono uppercase tracking-wider text-faint-c block mb-2">
                  // Request Flow Pipeline
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {d.flow.map((step, idx) => (
                    <span key={step} className="flex items-center gap-1.5 text-body-c">
                      <span className="px-1.5 py-0.5 rounded bg-surface border border-subtle text-[11px] font-medium">
                        {step}
                      </span>
                      {idx < d.flow.length - 1 && <span className="text-lime text-[11px]">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architectural Highlights */}
              <ul className="space-y-2">
                {d.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-body-c leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${d.dot}`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
