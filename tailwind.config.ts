import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#20201f",
        muted: "#767571",
        line: "#e8e7e3",
        canvas: "#fbfbfa",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 15, 15, 0.04), 0 5px 18px rgba(15, 15, 15, 0.035)",
      },
    },
  },
  plugins: [],
} satisfies Config;
