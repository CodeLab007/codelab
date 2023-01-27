/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@codelab/tailwind-config/base')],
  content: [
    './src/components/**/*.{tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
