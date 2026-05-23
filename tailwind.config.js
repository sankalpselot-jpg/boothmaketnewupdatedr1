/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          light:   '#1A2D42',
          dark:    '#08111A',
        },
        gold: {
          DEFAULT: '#C9882A',
          light:   '#F0A93A',
          dark:    '#9E6A1A',
        },
        cream: {
          DEFAULT: '#F9F6F0',
          dark:    '#EDE8DF',
        },
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        display: ['var(--font-syne)', 'Syne', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
      },
    },
  },
  plugins: [],
}

module.exports = config
