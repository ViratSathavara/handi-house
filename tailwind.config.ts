import type { Config } from "tailwindcss";

// Preflight is off on purpose: the site already has its own reset in app/globals.css.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: { ink: "#09090b", gold: "#d4af37", cream: "#f3ead7" },
      fontFamily: { display: ["var(--display)"], serif: ["var(--serif)"], mono: ["var(--mono)"] },
    },
  },
  plugins: [],
};
export default config;
