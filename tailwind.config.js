/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/js/*.js', './*.html', './styles/*.?css'],
  theme: {
    fontFamily: {
      display: ['Kanit', 'sans-serif'],
      bebas: ['bebas', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    colors: {
      default: {
        // background-colors
        cyan: '#00E0EA',
        lightblue: '#B5F2EE',
        orange: '#FF7930',
        peach: '#F9F1E0',
        gray400: '#494949',
        gray300: '#787878',
        gray200: '#E2E2E2',
        gray100: '#F3F6F6',
      },
    },
    extend: {
      colors: defaultTheme.colors, // Ensures default colors are imported
      keyframes: {
        // custom animation
        pump: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0' },
          '80%': { transform: 'scale(1.2)', opacity: '100' },
        },
      },
      animation: {
        pump: 'pump 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
