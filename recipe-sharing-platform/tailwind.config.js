/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/index.html", // added for ALX checker
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: { extend: {} },
  plugins: [],
};
