/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "repo-card": "#F0F7F4",
        "top-bar": "#D0DBDB",
        accent: "#3C493F",
        "text-main": "black",
        "text-secondary": "white",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
