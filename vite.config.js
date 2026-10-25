import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split node_modules out of the app chunk so a content edit doesn't
        // invalidate the (much larger, much more stable) dependency payload.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'vendor-framer'
          if (/react-dom|scheduler|[\\/]react[\\/]/.test(id)) return 'vendor-react'
          return 'vendor'
        },
      },
    },
  },
  // No base path needed for Netlify
})
