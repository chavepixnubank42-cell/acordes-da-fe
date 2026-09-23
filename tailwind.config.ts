import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "blue-light": "#DCEEFF",
        "blue-deep": "#315A7D",
        gold: "#D6B56D",
        green: "#A8C8B0",
        "green-text": "#3F6B4C",
        ink: "#344454",
        "ink-soft": "#6B7A8A",
        "ink-muted": "#A2B0BD",
        "border-soft": "#CFE2F2",
        "card-alt": "#EEF6FF",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
