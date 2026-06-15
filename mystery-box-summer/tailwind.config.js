/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sunset Citrus — light, warm, joyful. Token names kept from the dark
        // variant on purpose so component markup stays portable; the values
        // are now warm-tinted light surfaces.
        dark: {
          bg: '#FBF1DD',       // cream canvas (warm-tinted, never pure white)
          surface: '#FFFBF2',  // warm white card
          surface2: '#F2E2C4', // sun-baked sand: borders + secondary surface
          text: '#2A1A0B',     // espresso ink (warm-tinted, never pure black)
          muted: '#7A5C32',    // warm taupe for supporting copy
        },
        brand: {
          volt: '#FF2E7E',     // watermelon — primary energy / CTA / big display
          orange: '#FF6B2C',   // tangerine — secondary warm
          teal: '#0E8C7A',     // teal — readable accent + trust (small text safe)
          yellow: '#FFB22E',   // sun — highlights, stars (fills only)
          red: '#E5394A',      // urgency
        },
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        drama: ['Fredoka', 'system-ui', 'sans-serif'],
        sans: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
