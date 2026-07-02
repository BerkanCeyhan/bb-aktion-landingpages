import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/quiz-eaa/',
  build: {
    outDir: '../dist/quiz-eaa',
    emptyOutDir: true,
  },
  plugins: [react()],
})
