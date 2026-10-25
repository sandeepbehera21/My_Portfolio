import { motion } from 'framer-motion'
import Section from '../components/Section'

const architectureBlocks = [
  {
    title: 'Enterprise Java Spring Boot Architecture',
    subtitle: 'Layered, Decoupled, and Audited',
    accent: 'border-lime/30 hover:border-lime',
    pill: 'text-lime bg-lime/10 border-lime/30',
    dot: 'bg-lime',
    flow: ['Client Request', 'REST Controller', 'Service Layer', 'JPA Repository', 'MySQL & Redis Cache'],
    highlights: [
      'Strict separation of concerns with layered Controller → Service → Repository pattern',
      'Stateless JWT token verification with Spring Security filters',
      'Redis read-through caching on frequently queried catalogue endpoints',
      'Append-only database audit logging for mutation traceability',
    ],
  },
  {
    title: 'Cloud-Native MERN Stack Architecture',
    subtitle: 'Scalable APIs with Horizontal Growth',
    accent: 'border-pink/30 hover:border-pink',
    pill: 'text-pink bg-pink/10 border-pink/30',
    dot: 'bg-pink',
    flow: ['React Client', 'Express Router', 'Auth Middleware', 'Business Logic', 'MongoDB Atlas'],
    highlights: [
      'Stateless Express REST layer designed for autoscaling on Google Cloud',
      'Schema validation and indexing in MongoDB for sub-50ms query latency',
      'Third-party payment webhooks (Razorpay) with cryptographic signature validation',
      'AI integration via Google Gemini API for dynamic storytelling and agent workflows',
    ],
  },
  {
    title: 'Reliability & Fault Tolerance Principles',
    subtitle: 'Production Defense-in-Depth',
    accent: 'border-cyan-400/30 hover:border-cyan-400',
    pill: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    dot: 'bg-cyan-400',
    flow: ['Input Sanitization', 'Rate Limiting', 'Circuit Breakers', 'Structured Logging', 'Health Monitoring'],
    highlights: [
      'Graceful degradation when downstream external APIs or services timeout',
      'Database connection pooling and query optimization to eliminate N+1 bottlenecks',
      'Environment-isolated configurations with zero hardcoded credentials',
      'Comprehensive Postman and OpenAPI documentation contracts',
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
              <ul className="space-y-2.5">
                {d.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-body-c leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${d.dot}`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between text-xs font-mono text-muted-c">
              <span>Standard: Enterprise Grade</span>
              <span className="text-lime">Scalable</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
