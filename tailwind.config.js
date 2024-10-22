/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00b4d8',
        cta: '#3FA9F5',
        secondary: '#90e0ef',
        tertiary: '#caf0f8',
        font: '#03045e',
        custom: '#187bcd',
      },
    },
  },
  plugins: [],
}