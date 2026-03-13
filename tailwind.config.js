/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#34d399',
          600: '#10b981'
        }
      }
    }
  },
  plugins: [],
};
