import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 48px rgba(15, 23, 42, 0.08)",
      },
      colors: {
        ink: "#172033",
        mist: "#eef3f8",
        steel: "#607089",
        accent: "#2366d1",
        emerald: "#1f9d78",
        amber: "#d99022",
      },
    },
  },
  plugins: [],
};

export default config;
