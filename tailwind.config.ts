import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem"
    },
    extend: {
      colors: {
        primary: "#7c0f1c",
        "primary-dark": "#4a0a12",
        gold: "#d7a86e",
        cream: "#fdf4ea",
        "cream-light": "#fff8f1",
        ink: "#1f130c",
        glass: "rgba(255, 255, 255, 0.65)",
        overlay: "rgba(31, 19, 12, 0.6)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(124, 15, 28, 0.15)",
        card: "0 10px 40px rgba(31, 19, 12, 0.08)",
        glass: "0 10px 30px rgba(0, 0, 0, 0.08)"
      },
      backgroundImage: {
        "radial-cream": "radial-gradient(circle at 20% 20%, rgba(215,168,110,0.25), transparent 35%), radial-gradient(circle at 80% 0%, rgba(124,15,28,0.12), transparent 32%)"
      },
      borderRadius: {
        pill: "9999px"
      }
    }
  },
  plugins: []
};

export default config;
