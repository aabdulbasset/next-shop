/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#0A18C5",
          secondary: "#7706AD",
          dark: "#1F1320",
          light: "#CA868A",
          neutral: "#D9D3CF",
          "base-100": "#F3F3F6",
          info: "#8FBAE6",
          success: "#16a34a",
          warning: "#fbbf24",
          error: "#b91c1c",
        },
      },
    ],
  },
};
