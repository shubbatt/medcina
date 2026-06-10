/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Medcina Design Tokens — sage green from logo (#80a080 / #708070)
        primary: {
          50:  '#f3f8f3',
          100: '#e4f0e4',
          200: '#c8e0c8',
          300: '#a0c8a0',
          400: '#80a080',   // logo lighter strand / arch text
          500: '#638f63',
          600: '#527852',
          700: '#436243',   // main interactive — dark sage
          800: '#374f37',
          900: '#2d402d',
          950: '#1a261a',
        },
        sage: {
          50:  '#f4f7f4',
          100: '#e6ede6',
          200: '#cddacd',
          300: '#adbfad',
          400: '#88a088',
          500: '#708070',   // logo darker strand — olive sage
          600: '#5c6b5c',
          700: '#4c594c',
          800: '#3f4a3f',
          900: '#353d35',
          950: '#1c221c',
        },
        medical: {
          white:  '#FFFFFF',
          light:  '#F5F8F5',   // sage-tinted off-white
          border: '#DDE8DD',   // sage-tinted border
          muted:  '#5E7060',   // sage-tinted muted text
          dark:   '#1E2E1E',   // deep forest — replaces navy
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 16px 0 rgba(67,98,67,0.08)',
        hover: '0 8px 32px 0 rgba(67,98,67,0.16)',
        hero:  '0 24px 64px 0 rgba(67,98,67,0.12)',
      },
      borderRadius: {
        card: '1rem',
        xl2: '1.5rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-right':'slideRight 0.6s ease-out forwards',
        'float':      'float 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
