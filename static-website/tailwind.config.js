/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terracloud-orange': '#ff6900',
        'terracloud-blue': '#0693e3',
        'terracloud-dark': '#1a1a1a',
        'terracloud-gray': '#666666',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
