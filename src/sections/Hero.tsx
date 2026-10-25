import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'
import { profile, heroStats } from '../data/portfolio'

/** `as const` keeps this a 4-tuple; a plain array widens to number[] and Framer rejects it. */
const EASE = [0.22, 1, 0.36, 1] as const

/** Children reveal in sequence rather than all at once. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function Hero() {
  return (
    <section id="home" className="container-pro pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 scroll-mt-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center"
      >
        {/* Left Column: Intro, Titles, CTAs & Metrics */}
        <div className="lg:col-span-7 xl:col-span-7 text-left">
          <motion.div variants={item} className="flex justify-start">
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Open to backend &amp; full-stack roles
            </span>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-2 mt-5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-lime">
              // 00 // EXECUTIVE OVERVIEW
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-semibold text-strong leading-[1.06]"
            style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.03em' }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-base sm:text-lg lg:text-xl text-body-c font-normal leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 text-sm sm:text-base text-muted-c max-w-2xl leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-3.5 justify-start items-center"
          >
            <a href="#projects" className="btn-primary">
              <span>View Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Fluid Metrics Grid — stretches comfortably across the column */}
          <motion.dl
            variants={item}
            className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full"
          >
            {heroStats.map(s => (
              <div key={s.label} className="hero-stat-card">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="stat-value"><CountUp value={s.value} /></span>
                  <span className="stat-label" aria-hidden="true">{s.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right Column: Balanced Cards (Quote + Engineering Focus) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5 w-full justify-center">
          {/* Card 1: Signature Philosophy & Quote */}
          <motion.div variants={item}>
            <blockquote className="card card-hover p-6 sm:p-7 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, var(--brand), transparent 70%)' }}
              />
              <div className="flex items-center justify-between mb-3.5">
                <svg
                  className="w-7 h-7 opacity-35"
                  style={{ color: 'var(--brand)' }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.5 4C6.5 4 4 6.5 4 9.5c0 2.6 1.9 4.8 4.4 5.4-.2 2-1.5 3.4-3.4 4.1l.7 1c3.4-1 5.8-3.8 5.8-8V9.5C11.5 6.5 9.5 4 9.5 4zm9 0c-3 0-5.5 2.5-5.5 5.5 0 2.6 1.9 4.8 4.4 5.4-.2 2-1.5 3.4-3.4 4.1l.7 1c3.4-1 5.8-3.8 5.8-8V9.5C20.5 6.5 18.5 4 18.5 4z" />
                </svg>
                <span className="text-xs uppercase tracking-wider text-brand font-medium">Philosophy</span>
              </div>
              <p className="text-base sm:text-lg text-body-c leading-relaxed italic">
                &ldquo;{profile.quote}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-subtle flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm flex-shrink-0"
                    style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                  >
                    {profile.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-strong truncate">{profile.name}</p>
                    <p className="text-xs text-muted-c truncate">{profile.role}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-sunken text-faint-c border border-subtle hidden sm:inline-block">
                  Design Principle
                </span>
              </div>
            </blockquote>
          </motion.div>

          {/* Card 2: Core Architecture Focus & Highlights */}
          <motion.div variants={item}>
            <div className="card card-hover p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs uppercase tracking-wider text-brand font-semibold flex items-center gap-2">
                  <span className="status-dot !w-2 !h-2" aria-hidden="true" />
                  Core Architecture Focus
                </h3>
                <span className="text-xs text-faint-c">Production Stack</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-sunken border border-subtle">
                  <span className="font-medium text-strong block">High-Throughput APIs</span>
                  <span className="text-xs text-muted-c">Spring Boot &amp; Node.js</span>
                </div>
                <div className="p-3 rounded-lg bg-sunken border border-subtle">
                  <span className="font-medium text-strong block">Microservices</span>
                  <span className="text-xs text-muted-c">Decoupled &amp; Scalable</span>
                </div>
                <div className="p-3 rounded-lg bg-sunken border border-subtle">
                  <span className="font-medium text-strong block">Database Systems</span>
                  <span className="text-xs text-muted-c">MySQL &amp; MongoDB</span>
                </div>
                <div className="p-3 rounded-lg bg-sunken border border-subtle">
                  <span className="font-medium text-strong block">Cloud &amp; DevOps</span>
                  <span className="text-xs text-muted-c">Docker &amp; Google Cloud</span>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-subtle flex items-center justify-between text-xs text-muted-c">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Bhubaneswar, India
                </span>
                <span className="text-brand font-medium">Remote &amp; On-Site Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
