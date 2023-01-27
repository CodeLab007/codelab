/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  presets: [require('@codelab/tailwind-config/base')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        h1: {
          fontSize: '3.5rem',
          lineHeight: '1.1', // need to redefine line-height for each heading
        },
        h2: {
          fontSize: '2.65rem',
          lineHeight: '1.1',
        },
        h3: {
          fontSize: '2.15rem',
          lineHeight: '1.1',
        },
        h4: {
          fontSize: '1.65',
          lineHeight: '1.1',
        },
        h5: {
          fontSize: '1.125rem',
          lineHeight: '1.1',
        },
        h6: {
          fontSize: '1rem',
          lineHeight: '1.1',
        },
        p: {
          fontSize: '0,75rem',
          lineHeight: '1.1',
        },
      });
    }),
  ],
};
