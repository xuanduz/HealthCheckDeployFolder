/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    boxShadow: {
      ["sm-full"]: "8px 15px 40px -8px rgba(0, 0, 0, 0.1)",
    },
    colors: {
      lightPrimary: "#F4F7FE",
    },
  },
  plugins: [],
});
