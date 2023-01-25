/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@codelab/tailwind-config/base.js')
  ],
  // Customizations specific to this project would go here
  theme: {
    extend: {
      minHeight: {
        48: '12rem',
      }
    }
  },
}