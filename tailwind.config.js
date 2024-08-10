/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#fffdfd",
        foreground: "#0d0d0d",
        primary: "#e17714",
        secondary: {
          DEFAULT: "#ccf8db",
          muted: "#173558",
        },
        destructive: "#f33b3b",
        muted: "#ffffff",
        description: "#434141",
        card: "#b2d2de",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      screens: {
        exs: "250px",
        xsm: "470px",
        smd: "665px",
        xmd: "850px",
        xlg: "1210px",
      },
    },
  },
  plugins: [],
};
