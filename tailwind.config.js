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
        abyss: "#0A2852",
        navy: "#0D356A",
        deep: "#114484",
        ocean: "#1756A4",
        emerald: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        teal: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        gold: {
          DEFAULT: "#E50914",
          light: "#FF2A36",
          dark: "#B8000B",
        },
        saffron: {
          DEFAULT: "#E50914",
          light: "#FF2A36",
          dark: "#B8000B",
          hover: "#FF1E27",
        },
        crimson: {
          DEFAULT: "#E50914",
          light: "#FF2A36",
          dark: "#B8000B",
          hover: "#FF1E27",
        },
        azure: {
          DEFAULT: "#0284C7",
          light: "#38BDF8",
          dark: "#0369A1",
        },
        foam: "#E2E8F0",
        cream: "#FFFFFF",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        heading: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
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
        gold: "0 0 40px rgba(229, 9, 20, 0.4)",
        saffron: "0 0 35px rgba(229, 9, 20, 0.4)",
        crimson: "0 0 35px rgba(229, 9, 20, 0.4)",
        card: "0 16px 48px rgba(4, 8, 16, 0.7), 0 2px 8px rgba(4, 8, 16, 0.5)",
        float: "0 24px 80px rgba(4, 8, 16, 0.85)",
        glow: "0 0 30px rgba(229, 9, 20, 0.35)",
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
          "0%": { filter: "drop-shadow(0 0 15px rgba(229, 9, 20, 0.25))" },
          "100%": { filter: "drop-shadow(0 0 35px rgba(229, 9, 20, 0.5))" },
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
    "floating-particle",
    "floating-diamond",
  ],
};
