/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0e0e10',
          light: '#f5f5f7',
          gray: '#1c1c1f',
          muted: '#86868b',
          border: '#e5e5e7',
          accent: '#111111',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Cinzel', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
      },
      letterSpacing: {
        superwide: '0.25em',
        ultrawide: '0.35em',
      },
      fontSize: {
        '10xl': '12rem',
        '11xl': '15rem',
        '12xl': '18rem',
      },
    },
  },
  plugins: [],
};
