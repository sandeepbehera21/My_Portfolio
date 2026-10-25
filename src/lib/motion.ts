import type { Variants } from 'framer-motion'

/** Shared fade-in-on-scroll animation used across sections. */
export const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
} as const

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
