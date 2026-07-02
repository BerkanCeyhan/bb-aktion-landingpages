import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/quiz-mystery-box/',
  build: {
    outDir: '../dist/quiz-mystery-box',
    emptyOutDir: true,
  },
  plugins: [react()],
})
