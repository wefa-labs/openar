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
          primary: "#006A6A",
          secondary: "#4A6363",
          accent: "#4B607C",
          neutral: "#000", // Font color
          "base-100": "#F7FAF9", // Surface
          info: "#1E1E1E",
          success: "007A7A",
          error: "#BA1A1A",
        },
        dark: {
          secondary: "#4CDADA",
          primary: "#B0CCCB",
          accent: "#B3C8E9",
          neutral: "#C4C7C6",
          "base-100": "#101414",
          info: "#1E1E1E",
          success: "007A7A",
          error: "#FFB4AB",
        },
        water: {
          primary: "#006A6A",
          secondary: "#4A6363",
          accent: "#4B607C",
          neutral: "#000", // Font Color
          "base-100": "#F7FAF9", // Surface
          info: "#1E1E1E",
          success: "007A7A",
          error: "#BA1A1A",
        },
        earth: {
          primary: "#006A6A",
          secondary: "#4A6363",
          accent: "#4B607C",
          neutral: "#000", // Font Color
          "base-100": "#F7FAF9", // Surface
          info: "#1E1E1E",
          success: "007A7A",
          error: "#BA1A1A",
        },
        fire: {
          primary: "#006A6A",
          secondary: "#4A6363",
          accent: "#4B607C",
          neutral: "#000", // Font Color
          "base-100": "#F7FAF9", // Surface
          info: "#1E1E1E",
          success: "007A7A",
          error: "#BA1A1A",
        },
        air: {
          primary: "#006A6A",
          secondary: "#4A6363",
          accent: "#4B607C",
          neutral: "#000", // Font Color
          "base-100": "#F7FAF9", // Surface
          info: "#1E1E1E",
          success: "007A7A",
          error: "#BA1A1A",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
