/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#040D18",
        navy: "#071525",
        deep: "#0D2035",
        ocean: "#0F3A5C",
        teal: {
          DEFAULT: "#1B6B7C",
          light: "#22879D",
          dark: "#134F5A",
        },
        saffron: {
          DEFAULT: "#FF6B00",
          light: "#FF8833",
          dark: "#D95700",
          hover: "#FF7A18",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#DFC08A",
          dark: "#A8803E",
        },
        foam: "#C8E4EE",
        cream: "#F4EFE6",
      },
      fontFamily: {
        display: ["Cinzel", "Georgia", "serif"],
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      letterSpacing: {
        eyebrow: "0.22em",
        wide2: "0.14em",
      },
      boxShadow: {
        gold: "0 0 40px rgba(212, 175, 55, 0.2)",
        saffron: "0 0 45px rgba(255, 107, 0, 0.35)",
        card: "0 10px 48px rgba(4, 13, 24, 0.6), 0 2px 8px rgba(4, 13, 24, 0.4)",
        float: "0 24px 80px rgba(4, 13, 24, 0.75)",
        glow: "0 0 30px rgba(255, 107, 0, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "float-container": "floatContainer 6s ease-in-out infinite",
        "pulse-saffron": "pulseSaffron 2.5s ease-in-out infinite",
        "glow-slow": "glowSlow 4s ease-in-out infinite alternate",
        "spin-slow": "spinSlow 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatContainer: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.8deg)" },
        },
        pulseSaffron: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        glowSlow: {
          "0%": { filter: "drop-shadow(0 0 15px rgba(255, 107, 0, 0.2))" },
          "100%": { filter: "drop-shadow(0 0 35px rgba(255, 107, 0, 0.45))" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "animate-spin-slow",
    "orb",
    "orb-teal",
    "orb-gold",
    "orb-ocean",
    "word-reveal-wrap",
    "word-reveal-inner",
    "tracking-eyebrow",
  ],
};
