import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'

interface HeroTextProps {
  reducedMotion: boolean
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export default function HeroText({ reducedMotion }: HeroTextProps) {
  const [firstName = 'SANDEEP', lastName = 'BEHERA'] = profile.name.toUpperCase().split(' ')

  const topInitial = reducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 48 }

  const bottomInitial = reducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 56 }

  return (
    <h1 className="hero-heading" aria-label={profile.name}>
      {/* Upper display line: SANDEEP in solid Neon Pink (#FF1593) */}
      <span className="hero-word-row hero-word-top-row">
        <motion.span
          initial={topInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE_OUT }}
          className="hero-word hero-word-pink"
        >
          {firstName}
        </motion.span>
      </span>

      {/* Lower staggered display line: BEHERA in solid Electric Lime (#D5FF35) */}
      <span className="hero-word-row hero-word-bottom-row">
        <motion.span
          initial={bottomInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.84, delay: 0.18, ease: EASE_OUT }}
          className="hero-word hero-word-chartreuse"
        >
          {lastName}
        </motion.span>
      </span>
    </h1>
  )
}
