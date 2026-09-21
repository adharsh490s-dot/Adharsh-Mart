/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          navy: '#131921',
          lightnavy: '#232f3e',
          yellow: '#febd69',
          amber: '#f3a847',
          orange: '#e47911',
          bg: '#eaeded',
          blue: '#007185',
          link: '#007185',
          card: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}

