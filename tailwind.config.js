/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#100227",
          light: "#1e0444",
          dark: "#1e0444",
        },
        secondary: {
          default: "#00B495",
          light: "#46EDCB",
          dark: "#007E63",
        },
      },
    },
  },
  plugins: [],
};
