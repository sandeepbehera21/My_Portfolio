import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../lib/interactions'

const INDEX_ITEMS = [
  { num: '01', label: 'Hero', href: '#landing-hero' },
  { num: '02', label: 'Work', href: '#experience' },
  { num: '03', label: 'Projects', href: '#projects' },
  { num: '04', label: 'Contact', href: '#contact' },
] as const

export default function SideIndex() {
  const [active, setActive] = useState('01')
  const reducedMotion = usePrefersReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, num: string, href: string) => {
    setActive(num)
    const target = document.getElementById(href.slice(1))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  const activeIdx = Math.max(
    0,
    INDEX_ITEMS.findIndex(i => i.num === active),
  )

  return (
    <motion.aside
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="hero-side-index"
      aria-label="Section index"
    >
      <div className="hero-side-rail" aria-hidden="true">
        <span
          className="hero-side-rail-active"
          style={{
            transform: `translateY(${activeIdx * 100}%)`,
          }}
        />
      </div>
      <ol className="hero-side-list">
        {INDEX_ITEMS.map(item => {
          const isActive = item.num === active
          return (
            <li key={item.num}>
              <a
                href={item.href}
                onClick={e => handleClick(e, item.num, item.href)}
                aria-label={`Jump to ${item.label} (${item.num})`}
                aria-current={isActive ? 'true' : undefined}
                className={`hero-side-num${isActive ? ' is-active' : ''}`}
              >
                {item.num}
              </a>
            </li>
          )
        })}
      </ol>
    </motion.aside>
  )
}
