/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#0A192F',
        'midnight-teal': '#0A3B4D',
        'magnolia-white': '#FAF3E0',
        'rich-gold': '#D4AF37',
        'sage-green': '#A3B18A',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Lora', 'serif'],
        'accent': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
}