/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arimo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
