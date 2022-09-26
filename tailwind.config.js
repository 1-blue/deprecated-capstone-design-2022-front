module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Noto Serif": ["Nanum Gothic", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0.01 },
          "100%": { opacity: 1 },
        },
        "spin-y": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100vh)" },
          "100%": { transform: "translateY(0px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "heart-beat": {
          "25%": { transform: "scale(1.4, 1.4)" },
          "50%": { transform: "scale(1, 1)" },
          "75%": { transform: "scale(1.4, 1.4)" },
          "100%": { transform: "scale(1, 1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s linear",
        "spin-y": "spin-y 2s ease-in-out infinite",
        "slide-up": "slide-up 0.4s linear",
        spin: "spin 1s linear infinite",
        "heart-beat": "heart-beat 1s linear",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
