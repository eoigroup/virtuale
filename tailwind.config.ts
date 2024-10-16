import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: {
          DEFAULT: "var(--border)",
          outline: "var(--border-outline)",
        },
        "border-divider": "var(--border-divider)",
        input: "var(--input)",
        blue: "var(--blue)",
        scrim: {
          DEFAULT: "var(--scrim)",
          0: "var(--scrim-0)",
          4: "var(--scrim-4)",
          8: "var(--scrim-8)",
          12: "var(--scrim-12)",
        },
        "surface-elevation": {
          "1": "var(--surface-elevation-1)",
          "2": "var(--surface-elevation-2)",
          "3": "var(--surface-elevation-3)",
        },
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        plus: {
          DEFAULT: "var(--plus-gold)",
        },
        "border-outline": "var(--border-outline)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "plus-shadow": "0px 0px 16px 6px rgba(255, 213, 105, .1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
