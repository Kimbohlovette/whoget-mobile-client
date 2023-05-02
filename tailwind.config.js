/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          950: '#03030b',
          900: '#070716',
          800: '#0e0e2c',
          700: '#151442',
          600: '#1c1b58',
          500: '#23226e',
          400: '#39387d',
          300: '#65649a',
          200: '#9191b7',
          100: '#bdbdd4',
          50: '#e9e9f1',
        },
        secondary: {
          950: '#180b02',
          900: '#301704',
          800: '#602e08',
          700: '#8f440d',
          600: '#bf5b11',
          500: '#ef7215',
          400: '#f28e44',
          300: '#f5aa73',
          200: '#f9c7a1',
          100: '#fce3d0',
          50: '#fdf1e8',
        },
        tetiary: '#00ffef',
      },
    },
  },
  plugins: [],
};
