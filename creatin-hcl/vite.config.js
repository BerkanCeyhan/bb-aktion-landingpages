import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/creatin-hcl-1/',
  build: {
    outDir: '../dist/creatin-hcl-1',
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss(),
    react()
  ]
})
