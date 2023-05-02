/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#23226e',
        secondary: '#ef7215',
        tetiary: '#00ffef',
      },
    },
  },
  plugins: [],
};
