/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',], // Adjust this based on your project structure
    theme: {
      extend: {
        fontFamily:{
            nav_link_font:["Urbanist","sans-serif"]
        }
      },
    },
    plugins: [],
  };
  