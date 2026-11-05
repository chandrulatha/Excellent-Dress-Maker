/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D19',
          900: '#0B1528',
          800: '#112240',
          700: '#1C325B',
          600: '#264478',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F3E5C8',
          300: '#EBD1A0',
          400: '#DFB86C',
          500: '#C89D42', // Champagne Gold primary
          600: '#AC8030',
          700: '#876022',
        },
        ivory: {
          50: '#FCFAF7',
          100: '#F7F4EE',
          200: '#EFE9DE',
          300: '#E4DCcb',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
