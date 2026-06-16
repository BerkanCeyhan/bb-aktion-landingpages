import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/creatin-hcl-pro/',
  build: {
    outDir: '../dist/creatin-hcl-pro',
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss(),
    react()
  ]
})
