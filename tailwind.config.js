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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          muted: "hsl(var(--secondary-muted))",
        },
        destructive: "hsl(var(--destructive))",
        muted: "hsl(var(--black-white))",
        description: "hsl(var(--description))",
        card: "hsl(var(--sub-background))",
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
        xsm: "450px",
        sm: "610px",
        xmd: "700px",
        xlg: "1210px",
      },
    },
  },
  plugins: [],
};
