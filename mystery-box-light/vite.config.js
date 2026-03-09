import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  publicDir: '../mystery-box/public',
  build: {
    outDir: '../dist/mystery-box-light',
    emptyOutDir: true,
  },
  plugins: [react()],
})
