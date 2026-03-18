/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000', // deep rich black
        surface: '#111111', // slightly lighter for cards
        primary: '#FACC15', // elegant gold/bronze
        primaryHover: '#FDE047',
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
