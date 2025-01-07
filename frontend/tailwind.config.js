import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "flow-right-left": {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
		'top-to-bottom': {
			'0%': { backgroundPosition: '0% 0%' },
			'100%': { backgroundPosition: '0% 100%' },
		  },
      },
      animation: {
        "flow-right-left": "flow-right-left 1s linear infinite",
		'top-to-bottom': 'top-to-bottom 1s ease-in-out infinite',
      },
    },
  },
  plugins: [daisyui],

  // daisyui: {
  // 	themes: [
  // 		"light",
  // 		{
  // 			black: {
  // 				...daisyUIThemes["black"],
  // 				primary: "rgb(29, 155, 240)",
  // 				secondary: "rgb(24, 24, 24)",
  // 			},
  // 		},
  // 	],
  // },
  daisyui: {
    themes: ["synthwave"], // Enable the "cupcake" theme
  },
  handwritten: ['"Dancing Script"', "cursive"],
};
