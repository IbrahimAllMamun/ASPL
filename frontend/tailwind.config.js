/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['kanit', 'sans-serif'],
        fredoka: ['fredoka', 'sans-serif'],
      },
      dropShadow: {
        '3xl': '0 60px 50px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};
