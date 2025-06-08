/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Your custom colors
        hintPrimary: "hsl(var(--primary))",
        hintPrimaryForeground: "hsl(var(--primary-foreground))",
        hintSecondary: "hsl(var(--secondary))",
        hintSecondaryForeground: "hsl(var(--secondary-foreground))",
        headingLanding: "hsl(var(--heading-landing-color))",
        subHeadingLanding: "hsl(var(--subHeading-landing-color))",
      },
      fontFamily: {
        tartuffo: ["Tartuffo", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        // shadcn animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 150ms ease",
        "fade-out": "fadeOut 150ms ease",
        "slide-in-from-top": "slideInFromTop 0.2s ease-out",
        "slide-in-from-bottom": "slideInFromBottom 0.2s ease-out",
        "slide-in-from-left": "slideInFromLeft 0.2s ease-out",
        "slide-in-from-right": "slideInFromRight 0.2s ease-out",
        "zoom-in": "zoomIn 0.2s ease-out",
        "zoom-out": "zoomOut 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideInFromTop: {
          from: { transform: "translateY(-10px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        slideInFromBottom: {
          from: { transform: "translateY(10px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        slideInFromLeft: {
          from: { transform: "translateX(-10px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        slideInFromRight: {
          from: { transform: "translateX(10px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        zoomIn: {
          from: { transform: "scale(0.95)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        zoomOut: {
          from: { transform: "scale(1)", opacity: 1 },
          to: { transform: "scale(0.95)", opacity: 0 },
        },
      },
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
};
