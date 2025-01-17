import type { Config } from "tailwindcss";
/**
TODO: paragraph등 semantic token 해체
*/
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        monospace: ["var(--font-monospace-neon)"],
      },
      screens: {
        tablet: "601px",
        desktop: "1023px",
      },
      colors: {
        base: "var(--my-colors-base)",
        fg: "var(--my-colors-fg)",
        primary: {
          DEFAULT: "var(--my-colors-primary)",
          50: "var(--my-colors-primary-50)", // Lightest green
          100: "var(--my-colors-primary-100)", // Very light green
          200: "var(--my-colors-primary-200)", // Light green
          300: "var(--my-colors-primary-300)", // Lighter green
          400: "var(--my-colors-primary-400)", // Light-medium green
          500: "var(--my-colors-primary-500)", // Base green
          600: "var(--my-colors-primary-600)", // Medium green
          700: "var(--my-colors-primary-700)", // Darker green
          800: "var(--my-colors-primary-800)", // Dark green
          900: "var(--my-colors-primary-900)", // Darkest green
        },
        muted: "rgb(212 212 212)",
      },
      lineHeight: {
        normal: "1.7",
        6: "1.5rem",
        8: "2rem",
      },
      fontSize: {
        paragraph: [
          "17px",
          {
            lineHeight: "1.7",
            fontWeight: "400",
          },
        ],
        heading1: [
          "40px",
          {
            lineHeight: "1.3",
            fontWeight: "800",
          },
        ],
        heading2: [
          "28px",
          {
            lineHeight: "1.3",
            fontWeight: "700",
          },
        ],
        heading3: [
          "24px",
          {
            lineHeight: "1.5",
            fontWeight: "700",
          },
        ],
        heading4: [
          "18px",
          {
            lineHeight: "1.5",
            fontWeight: "600",
          },
        ],
        heading5: [
          "16px",
          {
            lineHeight: "1.5",
            fontWeight: "600",
          },
        ],
        heading6: [
          "14px",
          {
            lineHeight: "1.5",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
