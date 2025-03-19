/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px',
        'custom-1200': '1200px',
        'custom-900': '900px',
      },
      colors: {
        'primary': '#fd7e14',
        'primary-dark': '#e97415',
        'primary-light': '#f7f8fc',
        'text-dark': '#0f172a',
        'text-light': '#64748b',
      },
    },
  },
  plugins: [],
}
