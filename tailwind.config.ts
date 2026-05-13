import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: "#f7f7f5",
          100: "#ececea",
          500: "#72736e",
          700: "#3d403d",
          900: "#171a18"
        },
        mint: {
          50: "#effaf5",
          100: "#d9f2e7",
          300: "#91d8b8",
          500: "#39a777",
          700: "#1d7654"
        },
        sand: {
          50: "#fbf7ef",
          100: "#f4ead8",
          200: "#ead7b9"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 26, 24, 0.08)",
        card: "0 12px 36px rgba(23, 26, 24, 0.06)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
