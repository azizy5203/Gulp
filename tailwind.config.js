// const options = require("./config"); //options from config.js

// const allPlugins = {
//   typography: require("@tailwindcss/typography"),
//   forms: require("@tailwindcss/forms"),
//   containerQueries: require("@tailwindcss/container-queries"),
// };

// const plugins = Object.keys(allPlugins)
//   .filter((k) => options.plugins[k])
//   .map((k) => {
//     if (k in options.plugins && options.plugins[k]) {
//       return allPlugins[k];
//     }
//   });

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,php,pug}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      xs: "430px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
    },
    colors: {
      primary: "#16707A",
    },
    boxShadow: {
      mainShadow: "0px 4px 25px 0px #0000001A",
      greyShadow: " 0px 4px 64px 0px #00000026",
    },
  },
  // plugins: plugins,
};
