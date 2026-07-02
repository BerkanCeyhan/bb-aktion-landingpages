import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/quiz-creatin-hcl/',
  build: {
    outDir: '../dist/quiz-creatin-hcl',
    emptyOutDir: true,
  },
  plugins: [react()],
})
