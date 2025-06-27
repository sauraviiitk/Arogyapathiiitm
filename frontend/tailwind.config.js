/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          fontFamily: {
    tangerine: ['"Tangerine"', 'cursive'],
    lora: ['"Lora"', 'serif'],
    cormorant: ['"Cormorant Garamond"', 'serif'],
  },
    },
  },
  plugins: [],
}