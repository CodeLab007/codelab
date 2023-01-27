/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Customizations specific to this project would go here
  theme: {
    //Main colors
    colors: {
      //Light theme
      primary: '#3b50df',
      secondary: '#7286d3',
      success: '#19d16f',
      info: '#7e33e0',
      danger: '#fb2448',
      light: '#f9f8f9',
      warning: '#FDB400',

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
    },
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      xs: '320px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
};
