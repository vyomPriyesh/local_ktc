/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0073c2',
      },
      boxShadow: {
        'primary': '0px 0px 5px 0px #0073c2', // Custom shadow with primary color
      },
    },
  },
  plugins: [],
}