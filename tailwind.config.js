/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#6356E5",
      black: "#000318",
      faded: "#F3F6F6",
      background: "#F7F7F9",
      grey: "#B3ABABC",
      stroke: "#9696A0",
      secondary: "#48466D",
      white: "#FFFFFF",
    },

    extend: {
      fontFamily: {
        body: ["var(--font-space-grotest)", "system-ui"],
        headline: ["var(--font-space-mono)", "system-ui"],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      boxShadow: {
        boxShadow_1: "0px 5px 0px rgba(1, 14, 30, 0.9)",
        boxShadow_2: "0px 4px 0px #191A23",
      },

      fontSize: {
        headline_1: "32px",
        headline_2: "24px",
        headline_3: "18px",
        title_1: "18px",
        title_2: "16px",
        title_3: "14px",
        body_1: "16px",
        body_2: "14px",
        body_3: "12px",
        label: "12px",
        special: "12px",
        button_label: "12px",
      },

      lineHeight: {
        headline_1: "47.39px",
        headline_2: "35.54px",
        headline_3: "26.66px",
        title_1: "27px",
        title_2: "22px",
        title_3: "21px",
        body_1: "23px",
        body_2: "23px",
        body_3: "15.31px",
        label: "15.31px",
        special: "15.31px",
        button_label: "22.97px",
      },
    },
  },
  plugins: [],
};
