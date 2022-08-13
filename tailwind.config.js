/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),require("flowbite/plugin")],
  daisyui: {
    themes: [{
      myTheme:{
        "primary": "#5b21b6",
        "secondary": "#b20ed3",
        "accent": "#4338ca",
        "neutral": "#1f2937",
        "base-100": "#F3F3F6",
        "info": "#8FBAE6",
        "success": "#16a34a",
        "warning": "#fbbf24",
        "error": "#b91c1c",
      }
    }],
  },
}
