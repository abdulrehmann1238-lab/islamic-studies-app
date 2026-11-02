/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noor: {
          bg: '#F8F7F2',
          card: '#FFFFFF',
          secondary: '#F0EFE8',
          'dark-green': '#284C3D',
          'deep-green': '#1C382D',
          'forest-charcoal': '#14241C',
          'soft-sage': '#DDE8DF',
          'muted-sage': '#A7B9A8',
          'warm-gold': '#C5A66A',
          'soft-gold': '#F4EDDC',
          'gold-light': '#FDF9F0',
          text: '#252C28',
          'muted-text': '#737B74',
          border: '#E7E6DE',
          success: '#648B70',
          error: '#B86D65',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        arabic: ['Amiri', '"Noto Naskh Arabic"', 'serif'],
      },
      borderRadius: {
        'control': '10px',
        'card': '16px',
        'feature': '22px',
        'hero': '24px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(40, 76, 61, 0.06)',
        'elevated': '0 12px 32px -4px rgba(40, 76, 61, 0.1)',
        'gold-glow': '0 0 20px rgba(197, 166, 106, 0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

