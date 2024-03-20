/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      "principal-blue": "#11AEBF",
      "principal-green": "#79F241",
    },
    extend: {
      screens: {
        custom: "500px",
      },
    },
  },
  plugins: [],
};
