import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/** Reads the theme the inline boot script in index.html already applied, defaulting to dark mode. */
function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage can throw in private mode */
  }
  return 'dark'
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('light', theme === 'light')
  root.style.colorScheme = theme
}

let currentTheme: Theme = getInitialTheme()
const listeners = new Set<(theme: Theme) => void>()

function updateTheme(next: Theme, persist = true) {
  currentTheme = next
  applyThemeToDOM(next)
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }
  listeners.forEach(listener => listener(next))
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => currentTheme)

  useEffect(() => {
    applyThemeToDOM(currentTheme)
    const onThemeChange = (next: Theme) => setThemeState(next)
    listeners.add(onThemeChange)
    return () => {
      listeners.delete(onThemeChange)
    }
  }, [])

  // Follow the OS only while the user hasn't made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let hasChoice = false
      try {
        hasChoice = Boolean(localStorage.getItem(STORAGE_KEY))
      } catch {
        /* ignore */
      }
      if (!hasChoice) updateTheme(e.matches ? 'dark' : 'light', false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = (next: Theme) => updateTheme(next, true)
  const toggle = () => updateTheme(currentTheme === 'dark' ? 'light' : 'dark', true)

  return { theme, setTheme, toggle }
}
