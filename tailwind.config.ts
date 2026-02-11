import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0e14",
        mist: "#f2f0ea",
        tide: "#2b3a3f",
        moss: "#a6b39f",
        blush: "#f4d7c9",
        sun: "#f8b86b",
        sea: "#5f8f99",
        clay: "#c8a58a"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        ui: ["var(--font-ui)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(10,16,20,0.35)",
        card: "0 18px 45px rgba(15, 20, 24, 0.25)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(1200px 600px at 10% -10%, rgba(248,184,107,0.45), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(95,143,153,0.45), transparent 60%), linear-gradient(180deg, #0b0e14 0%, #0f151d 35%, #0b0e14 100%)",
        haze:
          "radial-gradient(500px 280px at 20% 20%, rgba(244,215,201,0.35), transparent 60%), radial-gradient(480px 260px at 80% 30%, rgba(166,179,159,0.35), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;
