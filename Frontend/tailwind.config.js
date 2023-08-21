/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { primary: ["Lato, sans-serif"] },
      colors: {
        primary: {
          50: "#F6F0FA",
          100: "#f6faf0",
          200: "#ead9f7",
          300: "#d5b4f0",
          400: "#c08ee8",
          500: "#ab69e0",
          600: "#9743d8",
          700: "#8029c6",
          800: "#45166b",
          900: "#230b35",
        },
      },
      animation: {
        slideupanime: "slideup .700s ease-in-out",
      },
      keyframes: {
        slideup: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "80%": { transform: "translateY(-10%)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
};
