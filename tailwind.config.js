/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  // to support dark mode
  darkMode: "class",

  // to support is selected mode
  selected: "class",

  theme: {
    extend: {
      fontFamily: {
        ravi: ["var(--font-rav)", ...fontFamily.sans]
      },

      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem"
        }
      },

      // extend: {
      //   fontFamily: {
      //     ravi: ["var(--font-rav)", ...fontFamily.sans]
      //   },
      colors: {
        dark: "#141516",
        light: "#f5f5f5",
        primary: "#B63E96",
        primaryDark: "#58E6D9",
        muted: "#9D9D9D",
        mutedDark: "#858585",
        gold: "#CEA16A",
        lightMenu: "#FAFAFA",
        graySubmit: "#e3e3e3",
        darkGray: "#c5c8da",

        // empty square page view
        squareGray: "#d0d2e2"
      },
      animation: {
        "spin-slow": "spin 8s linear infinite"
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px, #f5f5f5 5px, #f5f5f5 100px)"
      },
      boxShadow: {
        customMenuShadow: "-1px -69px 278px 18px rgba(0, 0, 0, 0.19)", // Add your custom shadow here
        customInset: "inset 0px 0px 32px -15px rgba(0,0,0,0.75)"
      }
    },
    screens: {
      "3xl": { max: "1795px" },
      //  => @media (max-width: 1800px) { ... }

      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" }
      // => @media (max-width: 479px) { ... }
    }
  },
  plugins: [],
  corePlugins: {
    // Disable the pre-built scrollbar styles
    scrollbar: false
  }
};
