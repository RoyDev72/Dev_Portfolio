/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"InterVariable"','Inter','ui-sans-serif','system-ui']
      },
      colors: {
        base: '#111111',
        elev: '#181818',
        elev2: '#1d1d1d',
        subtle: '#1f1f1f',
  accent: '#ffdb70'
      },
      boxShadow: {
        'card': '0 8px 32px -12px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}