/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terracloud-orange': '#cc5200', // Darker orange for better contrast (was #ff6900)
        'terracloud-orange-light': '#ff6900', // Keep original for backgrounds where contrast is good
        'terracloud-blue': '#0570b8', // Darker blue for better contrast (was #0693e3)
        'terracloud-blue-light': '#0693e3', // Keep original for backgrounds
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
