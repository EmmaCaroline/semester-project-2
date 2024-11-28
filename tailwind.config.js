/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Host Grotesk", "sans-serif"],
        body: ["Roboto", "serif"],
        special: ["Dancing Script", "cursive"],
      },
      colors: {
        customPink: "#CD9691",
        customBlue: "#92A6B4",
        customBeige: "#D0C7C5",
        customGray: "#575760",
      },
    },
  },
  plugins: [],
};
