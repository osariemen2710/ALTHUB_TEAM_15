/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // scan all source files
  ],
  theme: {
    extend: {
      colors: {
        'binit-green': '#228B22',
      },
    },
  },
  plugins: [],
}