/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c', // deep rich black
        surface: '#121216', // slightly lighter for cards
        primary: '#c19b76', // elegant gold/bronze
        primaryHover: '#d5ac83',
        textMain: '#ffffff',
        textMuted: '#9ca3af',
        accent: '#2c2c31', // subtle borders/accents
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional geometric sans
        display: ['Unbounded', 'sans-serif'], // Wide modern font for headings
      },
      animation: {
        blob: "blob 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(50px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-40px, 40px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        }
      }
    },
  },
  plugins: [],
}
