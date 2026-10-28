import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import ContactForm from '../components/ContactForm'
import CopyButton from '../components/CopyButton'
import { profile } from '../data/portfolio'

function ContactRow({
  icon,
  label,
  children,
  accent = 'var(--lime)',
}: {
  icon: ReactNode
  label: string
  children: ReactNode
  accent?: string
}) {
  return (
    <li className="flex items-start gap-3.5 group">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-sunken border border-subtle transition-all duration-200 group-hover:scale-105 group-hover:border-lime/50"
        style={{
          color: accent,
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-c block mb-0.5">// {label}</span>
        {children}
      </div>
    </li>
  )
}

const linkClass = 'text-body-c hover:text-lime transition-colors break-all text-sm font-medium inline-flex items-center min-h-6'

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="06 // REACH OUT"
      title="Let's Build Something Great"
      subtitle="Have an engineering role, collaboration opportunity, or high-scale backend challenge? Let’s connect."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Contact Channels & Live Availability */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 card p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-15"
            style={{ background: 'radial-gradient(circle, var(--lime) 0%, transparent 70%)' }}
          />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-lime font-semibold">Available for Work</span>
            </div>

            <h3 className="font-display font-bold text-strong text-xl sm:text-2xl mb-2 tracking-tight">
              Get in Touch Directly
            </h3>
            <p className="text-sm text-muted-c mb-6 leading-relaxed">
              I respond promptly to opportunities, engineering discussions, and project inquiries.
            </p>

            <ul className="space-y-5">
              <ContactRow
                label="Email Address"
                accent="var(--lime)"
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
              >
                <div className="flex items-center gap-2">
                  <a className={linkClass} href={`mailto:${profile.email}`}>{profile.email}</a>
                  <CopyButton value={profile.email} label="email address" />
                </div>
              </ContactRow>

              <ContactRow
                label="LinkedIn Profile"
                accent="#38BDF8"
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />}
              >
                <a className={linkClass} href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/sandeep2333 ↗
                </a>
              </ContactRow>

              <ContactRow
                label="GitHub Repositories"
                accent="var(--pink)"
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 4.44-2 4.44-5.14a4 4 0 00-1.1-2.76 3.7 3.7 0 00-.1-2.77s-1.2-.35-3.9 1.48a9.3 9.3 0 00-5 0C6.7 3.7 5.5 4.05 5.5 4.05a3.7 3.7 0 00-.1 2.77A4 4 0 004.3 9.6c0 3.13 1.3 4.78 4.44 5.13A3.37 3.37 0 007.8 17.3V21" />}
              >
                <a className={linkClass} href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                  github.com/sandeepbehera21 ↗
                </a>
              </ContactRow>

              <ContactRow
                label="X (Twitter)"
                accent="#A855F7"
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />}
              >
                <a className={linkClass} href={profile.socials.x} target="_blank" rel="noopener noreferrer">
                  x.com/Sandeepkumar99B ↗
                </a>
              </ContactRow>

              <ContactRow
                label="Direct Phone"
                accent="var(--lime)"
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
              >
                <a className={linkClass} href={profile.phoneHref}>{profile.phone}</a>
              </ContactRow>
            </ul>
          </div>

          <div className="mt-8 pt-5 border-t border-subtle flex items-center justify-between text-xs font-mono text-muted-c">
            <span>Location: Bhubaneswar, India</span>
            <span className="text-lime">GMT +5:30</span>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  )
}
