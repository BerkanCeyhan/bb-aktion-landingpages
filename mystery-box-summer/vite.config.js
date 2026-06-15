import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mystery-box-summer/',
  build: {
    outDir: '../dist/mystery-box-summer',
    emptyOutDir: true,
  },
  plugins: [react()],
})
