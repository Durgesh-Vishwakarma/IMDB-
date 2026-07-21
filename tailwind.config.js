/** @type {import('tailwindcss').Config} */

// Colours are declared as space-separated RGB channels in globals.css so that
// Tailwind's opacity modifiers (bg-surface/60) keep working. Every colour in
// the UI resolves through a token — there are no raw hex values in components,
// which is what keeps the light and dark themes in sync.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        elevated: token("elevated"),
        line: token("line"),
        ink: token("ink"),
        muted: token("muted"),
        subtle: token("subtle"),
        gold: {
          DEFAULT: token("gold"),
          soft: token("gold-soft"),
          ink: token("gold-ink"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        // Fluid display sizes so headings scale without breakpoint jumps.
        "display-lg": [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(2rem, 4.5vw, 3.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        "display-sm": [
          "clamp(1.5rem, 3vw, 2.125rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
      },
      borderRadius: {
        card: "0.875rem",
        panel: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.18)",
        lift: "0 12px 40px -12px rgb(0 0 0 / 0.35)",
        glow: "0 0 0 1px rgb(var(--gold) / 0.35), 0 8px 32px -8px rgb(var(--gold) / 0.35)",
      },
      maxWidth: {
        shell: "84rem",
        readable: "68ch",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out both",
        rise: "rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.6s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
