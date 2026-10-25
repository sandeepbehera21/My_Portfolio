import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function Section({
  id,
  title,
  eyebrow,
  children,
  subtitle,
}: {
  id: string
  title: string
  eyebrow?: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="container-pro py-16 sm:py-24 scroll-mt-20" aria-labelledby={`${id}-title`}>
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 sm:mb-12"
      >
        {eyebrow && (
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-lime">
              // {eyebrow}
            </span>
          </div>
        )}
        <h2 id={`${id}-title`} className="section-title">{title}</h2>
        {subtitle && <p className="section-sub mt-3">{subtitle}</p>}
      </motion.header>
      {children}
    </section>
  )
}
