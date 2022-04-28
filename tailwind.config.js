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
      },
    },
    animation: {
      "fade-in": "fade-in 0.4s linear",
      "spin-y": "spin-y 2s ease-in-out infinite",
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
