/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        lightGray: "#F4F6FA",
        darkGray: "#333333",
        softBlue: "#0497F3",
      },
    },
  },
  plugins: [],
};
