/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #EF4444)",
          hover: "var(--color-primary-hover, #DC2626)",
          light: "var(--color-primary-light, #FEF2F2)",
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        background: "var(--color-background, #FFFFFF)",
        surface: "var(--color-surface, #FFFFFF)",
        card: "var(--color-card, #FFFFFF)",
        foreground: "var(--color-text, #17191F)",
        text: {
          DEFAULT: "var(--color-text, #17191F)",
          secondary: "var(--color-text-secondary, #667085)",
          muted: "var(--color-muted-foreground, #64748B)",
        },
        border: "var(--color-border, #E4E7EC)",
        muted: {
          DEFAULT: "var(--color-muted, #F7F8FA)",
          foreground: "var(--color-muted-foreground, #64748B)",
        },
        success: "var(--color-success, #16A34A)",
        accent: {
          amber: "#F59E0B",
          emerald: "#10B981",
        }
      },
      fontFamily: {
        sans: ["Nunito_400Regular", "System", "sans-serif"],
        medium: ["Nunito_500Medium", "System", "sans-serif"],
        semibold: ["Nunito_600SemiBold", "System", "sans-serif"],
        bold: ["Nunito_700Bold", "System", "sans-serif"],
        extrabold: ["Nunito_800ExtraBold", "System", "sans-serif"],
      },
      borderRadius: {
        'card': '16px',
        'badge': '20px',
      }
    },
  },
  plugins: [],
};
