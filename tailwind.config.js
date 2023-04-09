/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '380px',
      md: '740px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'pink': '#FF2351',
      'dark-grey': '#848484',
      'light-grey': '#DADADA',
      'light-yellow': '#FDC8444D',
      'bg-color': '#FAFAFA',
      'yellow': '#FDC844',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

