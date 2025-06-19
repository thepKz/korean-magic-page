/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'korean': ['Noto Sans KR', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        korean: {
          red: '#CD2E3A',
          blue: '#0047A0',
          gold: '#FFD700',
          cream: '#FFF8DC',
          sage: '#9CAF88',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(205, 46, 58, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(205, 46, 58, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}