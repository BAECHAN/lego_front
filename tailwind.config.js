/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      mobile: '320px',
      // => @media (min-width: 320px) { ... }

      desktop: '720px',
      // => @media (min-width: 720px) { ... }
    },
  },
  plugins: [],
}
