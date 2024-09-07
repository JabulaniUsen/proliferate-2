/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        vsm: "500px",
        xmd: "850px",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        DMsans: ["DM Sans", "sans-serif"],
        Opensans: ["Open Sans", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        blue: "#186BAD",
      },
      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        custom2: "0px 20px 34px 5px rgba(0, 0, 0, 0.1);",
      },
    },
  },
  plugins: [],
};
