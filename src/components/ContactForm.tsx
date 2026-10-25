import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

/**
 * EmailJS config comes from environment variables (see .env.example).
 * Never hardcode credentials here — this code ships to the browser.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL ?? 'beherasandeepkumar21@gmail.com'

const isConfigured = Boolean(
  SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY && !SERVICE_ID.includes('xxxx'),
)

const fields = [
  { id: 'name', type: 'text', placeholder: 'Your name', label: 'Your name', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'email', type: 'email', placeholder: 'your.email@example.com', label: 'Your email', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'subject', type: 'text', placeholder: 'Subject', label: 'Subject', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
] as const

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (!isConfigured) {
        throw new Error('EmailJS is not configured — set VITE_EMAILJS_* variables in .env')
      }

      const result = await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: TO_EMAIL,
        },
        PUBLIC_KEY!,
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Email submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-6 sm:p-7">
      <div className="mb-6">
        <h3 className="font-display text-strong mb-1.5" style={{ fontSize: 'var(--text-h3)' }}>
          Send Message
        </h3>
        <p className="text-sm text-muted-c">Let&rsquo;s discuss your next project</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(f => (
          <div key={f.id} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-[18px] w-[18px] text-faint-c" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
              </svg>
            </div>
            <label htmlFor={f.id} className="sr-only">{f.label}</label>
            <input
              type={f.type}
              id={f.id}
              name={f.id}
              value={formData[f.id]}
              onChange={handleChange}
              required
              autoComplete={f.id === 'name' ? 'name' : f.id === 'email' ? 'email' : 'off'}
              className="field"
              placeholder={f.placeholder}
            />
          </div>
        ))}

        <div className="relative">
          <div className="absolute top-3.5 left-3 pointer-events-none">
            <svg className="h-[18px] w-[18px] text-faint-c" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="field resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="alert alert-ok" role="status">
            Message sent successfully! I&rsquo;ll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-err" role="alert">
            Couldn&rsquo;t send right now — please email me directly at{' '}
            <a href={`mailto:${TO_EMAIL}`} className="underline font-medium">{TO_EMAIL}</a>
          </div>
        )}
      </form>
    </div>
  )
}
