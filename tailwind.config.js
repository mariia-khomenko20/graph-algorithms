/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#33008a",
          light: "#390099",
          dark: "#2e007a",
        },
      },
    },
  },
  plugins: [],
};
