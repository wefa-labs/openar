/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#C0000D",
          secondary: "#765652",
          accent: "#715B2E",
          neutral: "#000",
          "base-100": "#FFFBFF",
          error: "#B00020",
        },
        dark: {
          primary: "#FFB5AA",
          secondary: "#E7BDB7",
          accent: "#DEC38C",
          neutral: "#FFF",
          "base-100": "#292929",
          info: "#1E1E1E",
          error: "#FFB5AB",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
