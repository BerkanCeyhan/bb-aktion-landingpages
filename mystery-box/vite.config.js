import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mystery-box-1/',
  build: {
    outDir: '../dist/mystery-box-1',
    emptyOutDir: true,
  },
  plugins: [react()],
})
