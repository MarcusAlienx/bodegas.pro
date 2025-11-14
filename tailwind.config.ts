import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#f3801b",
        "background-light": "#f8f7f5",
        "background-dark": "#1A1A1A",
        // Colores para los gradientes personalizados de Stitch
        'gradient-yellow': '#facc15',
        'gradient-orange-start': '#fb923c',
        'gradient-orange-end': '#f97316',
      },
      fontFamily: {
        "sans": ["var(--font-roboto)", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;

