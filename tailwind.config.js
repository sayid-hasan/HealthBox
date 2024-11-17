/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Nunito: `"Nunito", sans-serif`,
    },
    colors: {
      PrimaryColor: "#DEE9FF",
      SecondaryColor: "#1364FF",

      SubTextColor: "#A6A4A7",
      ErrorColor: "#D32F2F",
      SuccessColor: "#7E57C2",
    },
  },
  plugins: [require("daisyui")],
});
