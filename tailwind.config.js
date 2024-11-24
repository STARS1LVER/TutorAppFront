/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // añade esta línea
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // añade esta línea
  ],
}