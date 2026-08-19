import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white foundation
        canvas: {
          DEFAULT: "#FAFAF8",
          warm: "#F5F4F0",
          hot: "#EEede8",
        },
        // Clean white surfaces
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#FFFFFF",
          sunken: "#F5F4F0",
        },
        // Near-black primary text
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#3D3D3D",
          muted: "#6B7280",
          faint: "#9CA3AF",
        },
        // Subtle warm gray borders
        rule: {
          DEFAULT: "#E5E5E5",
          light: "#F0F0F0",
          dark: "#D1D1D1",
        },
        // One distinctive accent — warm coral/terracotta
        accent: {
          50: "#FFF5F2",
          100: "#FFE8E0",
          200: "#FFD0C0",
          300: "#FFB096",
          400: "#FF8C6B",
          500: "#E07A5F",
          600: "#C4613F",
          700: "#A34D30",
          800: "#7A3A24",
          900: "#522718",
        },
        // Status colors
        success: {
          DEFAULT: "#2D6A4F",
          light: "#40916C",
          bg: "#D8F3DC",
        },
        warning: {
          DEFAULT: "#BC6C25",
          light: "#DDA15E",
          bg: "#FEFAE0",
        },
        danger: {
          DEFAULT: "#AE2012",
          light: "#BB3E03",
          bg: "#FFE5E5",
        },
      },
      fontFamily: {
        // Distinctive display typeface with personality
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        // Clean, readable sans-serif for UI/body
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        // Monospace for technical info only
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Display sizes (marketing headlines)
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        // Body sizes
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body-xs": ["0.75rem", { lineHeight: "1.5" }],
        // Technical sizes
        "mono": ["0.8125rem", { lineHeight: "1.5" }],
        "mono-sm": ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        // Consistent 4px base scale
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
        "50": "12.5rem",
        "54": "13.5rem",
        "58": "14.5rem",
        "62": "15.5rem",
        "66": "16.5rem",
        "70": "17.5rem",
        "74": "18.5rem",
        "78": "19.5rem",
        "82": "20.5rem",
        "86": "21.5rem",
        "90": "22.5rem",
        "94": "23.5rem",
        "98": "24.5rem",
      },
      borderRadius: {
        "sm": "0.25rem",
        "DEFAULT": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        "large": "0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.06)",
        "panel": "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)",
        "panel-hover": "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        // Subtle, purposeful animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
