/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0C0C0C',
          surface: '#1A1A1A',
          surface2: '#242424',
          text: '#EFEFEF',
          muted: '#9CA3AF',
        },
        brand: {
          volt: '#C8FF00',
          orange: '#FF7528',
          red: '#E53935'
        }
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'sans-serif'],
        drama: ['Archivo Black', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
