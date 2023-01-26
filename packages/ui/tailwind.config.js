/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@codelab/tailwind-config/base.js')
  ],
  // Customizations specific to this project would go here
  theme: {

    //CodeLab main colors
    colors: {
      //Light theme
      'primary': '#3b50df',
      'secondary': '#7286d3',
      'success': '#19d16f',
      'info': '#7e33e0',
      'danger': '#fb2448',
      'light': '#f9f8f9',
      'warning': '#FDB400',

      //Dark theme
      'primary-dark': '#3b50df',
      'secondary-dark': '#7286d3',
      'success-dark': '#19d16f',
      'info-dark': '#7e33e0',
      'danger-dark': '#fb2448',
      'light-dark': '#f9f8f9',
      'warning-dark': '#FDB400',

    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      sans: ['Graphik', 'sans-serif'],
    },
    extend: {
      screens: {
        'xs': '320px',
        // => @media (min-width: 320px) { ... }
      },
      minHeight: {
        48: '12rem',
      }
    }
  },
}