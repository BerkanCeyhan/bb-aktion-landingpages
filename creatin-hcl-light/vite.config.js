import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  publicDir: '../creatin-hcl/public',
  build: {
    outDir: '../dist/creatin-hcl-light',
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss(),
    react()
  ]
})
