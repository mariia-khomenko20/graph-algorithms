/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#170135",
          light: "#1e0444",
          dark: "#1e0444",
        },
        secondary: {
          default: "#8758FF",
          light: "#9060FF",
          dark: "#6a3ddc",
        },
      },
    },
  },
  plugins: [],
};
