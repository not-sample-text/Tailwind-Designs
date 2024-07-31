/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["{./**/*.css,index.html,./js/**/*.js}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"]
			}
		}
	},
	plugins: []
};
