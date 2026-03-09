/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          surface: '#F9FAFB', // Near white
          surface2: '#F3F4F6', // Light gray
          text: '#000000', // Black
          muted: '#6B7280', // Gray
          volt: '#000000', // Black replacing accents
          orange: '#000000', // Black replacing accents
          red: '#000000'
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
