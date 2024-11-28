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
    },
  },
  plugins: [],
};
