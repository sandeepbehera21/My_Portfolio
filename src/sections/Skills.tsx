import { motion } from 'framer-motion'
import Section from '../components/Section'
import SkillIcon from '../components/SkillIcon'
import { skillCategories, type SkillCategory } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

const spanClass: Record<SkillCategory['size'], string> = {
  hero: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  wide: 'sm:col-span-2 lg:col-span-2',
  std: 'col-span-1',
}

const categoryAccent: Record<string, { border: string; badge: string; glow: string }> = {
  'Core Backend': {
    border: 'border-cyan-500/25 dark:border-cyan-400/30 hover:border-cyan-500',
    badge: 'text-lime bg-lime/10 border-lime/30',
    glow: 'from-cyan-400/10 to-transparent',
  },
  'Database & Caching': {
    border: 'border-emerald-500/25 dark:border-emerald-400/30 hover:border-emerald-500',
    badge: 'dark:text-emerald-400 text-emerald-800 dark:bg-emerald-400/10 bg-emerald-500/15 border-emerald-500/30',
    glow: 'from-emerald-400/10 to-transparent',
  },
  'Security & Auth': {
    border: 'border-sky-500/25 dark:border-sky-400/30 hover:border-sky-500',
    badge: 'text-pink bg-pink/10 border-pink/30',
    glow: 'from-sky-400/10 to-transparent',
  },
  'DevOps & Cloud': {
    border: 'border-cyan-500/25 dark:border-cyan-400/30 hover:border-cyan-500',
    badge: 'dark:text-cyan-300 text-cyan-800 dark:bg-cyan-400/10 bg-cyan-500/15 border-cyan-500/30',
    glow: 'from-cyan-400/10 to-transparent',
  },
  'Frontend & PWA': {
    border: 'border-indigo-500/25 dark:border-indigo-400/30 hover:border-indigo-500',
    badge: 'dark:text-indigo-300 text-indigo-800 dark:bg-indigo-400/10 bg-indigo-500/15 border-indigo-500/30',
    glow: 'from-indigo-400/10 to-transparent',
  },
  'AI & Developer Tools': {
    border: 'border-amber-500/25 dark:border-amber-400/30 hover:border-amber-500',
    badge: 'dark:text-amber-400 text-amber-800 dark:bg-amber-400/10 bg-amber-500/15 border-amber-500/30',
    glow: 'from-amber-400/10 to-transparent',
  },
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 // TECHNICAL CAPABILITIES"
      title="Skills & Tech Stack"
      subtitle="Production-tested technologies across backend architecture, databases, cloud infrastructure, and security."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {skillCategories.map((cat, i) => {
          const accent = categoryAccent[cat.title] ?? {
            border: 'border-subtle hover:border-lime',
            badge: 'text-lime bg-lime/10 border-lime/30',
            glow: 'from-lime/10 to-transparent',
          }

          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              className={spanClass[cat.size]}
            >
              <div
                className={`card card-hover p-6 h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${accent.border}`}
              >
                {/* Subtle top-right ambient glow */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none bg-gradient-to-br ${accent.glow} blur-xl`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${accent.badge}`}>
                      {cat.badge ?? (cat.size === 'hero' ? 'Core Focus' : 'Stack')}
                    </span>
                    <span className="text-xs font-mono text-muted-c font-semibold">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-strong text-lg tracking-tight group-hover:text-lime transition-colors">
                    {cat.title}
                  </h3>

                  {cat.subtitle && (
                    <p className="text-xs text-muted-c font-medium mt-1 mb-4 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 content-start mt-2">
                    {cat.items.map(item => (
                      <span key={item.name} className="chip group cursor-default">
                        <span className="text-base group-hover:scale-110 transition-transform">
                          <SkillIcon name={item.icon} />
                        </span>
                        <span className="font-medium text-xs sm:text-sm">{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between text-xs text-muted-c font-mono">
                  <span>{cat.items.length} Technologies</span>
                  <span className="text-lime flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
