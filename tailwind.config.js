/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#040407",
          light: "#09090d",
          dark: "#000000",
        },
        secondary: {
          default: "#d90429",
          light: "#dd1d3e",
          dark: "#c30425",
        },
      },
    },
  },
  plugins: [],
};
