import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Copy-to-clipboard with a short confirmation. Falls back silently if the
 * Clipboard API is unavailable or blocked (non-secure context, permissions) —
 * the adjacent link still works, so there is nothing to recover from.
 */
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      /* clipboard unavailable — the link beside this button is the fallback */
    }
  }

  return (
    <button type="button" onClick={copy} className="copy-btn" aria-label={`Copy ${label}`} title={`Copy ${label}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'done' : 'idle'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.16 }}
          className="flex"
        >
          {copied ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
      {/* Announce the result rather than relying on the icon swap */}
      <span className="sr-only" role="status">{copied ? `${label} copied` : ''}</span>
    </button>
  )
}
