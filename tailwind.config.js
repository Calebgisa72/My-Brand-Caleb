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
        card: "#f0f1f5",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        bounceLong: 'bounce 3s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(-25%)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-10%)' },
        },
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
