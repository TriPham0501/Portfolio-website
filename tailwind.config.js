const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0b1326", //dark blue
        primary2: "#111925", //dark blue
        secondary: "#ED6368",
        webtheme: "#37ff8b",
        green: colors.emerald,
        success: "#10b981",
        yellow: colors.amber,
        purple: colors.blue,
        hover: "#64748b", //slate-500
        focus: "#0284c7", //sky-600
        pipe: "#0284c7", //sky-600
        light: "#f8fafc", //slate-50
        blueLight1: "#60a5fa",
        blueLight2: "#bfdbfe",
        normal: "#3C4856",
        banner: "#0f0f0f",
        background: "#1d1836",
        golden: "#ffae42",
        violet: "#1d1836",
        lightviolet: "#312a55",
        buttongreen: "#90ee90",
        linkedIn: "#0072b1",
        instagram: "#E1306C",
        tiktok: "#ff0050",
        facebook: "#4267b2",
      },
      backgroundImage: {
        "night-street": "url('/assets/images/dark-theme.jpg')",
        "snow-falling": "url('/assets/FluidCheapGibbon.gif')",
      },
      margin: {
        "15%": "15%",
        "20%": "20%",
        "20vw": "20w",
      },
      scale: {
        110: "1.1",
      },

      padding: {
        "5%": "5%",
        "8%": "8%",
        "5vh": "5vh",
      },
      left: {
        "15%": "15%",
      },
      boxShadow: {
        glowing: "0 0 50px rgba(240, 240, 240, 0)",
      },
      screens: {
        fullscreen: "1450px",
        // => @media (min-width: 99vw)
      },
      minWidth: {
        "1250px": "1250px",
      },
    },
  },
  plugins: [],
};
