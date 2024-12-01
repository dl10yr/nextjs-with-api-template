import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.mts'],
    alias: {
      '@/components': '/components',
      '@/lib': '/lib',
      '@/pages': '/pages',
    },
  },
})
