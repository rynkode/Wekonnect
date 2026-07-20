import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f0f",
        stone: "#faf9f7",
        clay: {
          DEFAULT: "#c4704a",
          light: "#d4896a",
        },
        sage: "#5c6b5a",
        mist: "#e8e4df",
        muted: "#6b6560",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "sans-serif"],
      },
      keyframes: {
        "hero-fade": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-ken": {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "hero-fade": "hero-fade 0.9s ease-out both",
        "hero-ken": "hero-ken 12s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
