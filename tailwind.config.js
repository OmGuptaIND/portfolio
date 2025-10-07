/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
				serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
			},
		},
	},
	plugins: [],
};
