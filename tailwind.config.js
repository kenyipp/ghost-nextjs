const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./modals/**/*.{js,jsx,ts,tsx}"
	],
	important: "#__webpage",
	theme: {
		extend: {},
	},
	plugins: [],
};
