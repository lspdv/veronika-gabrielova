/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        card: "var(--card)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        accent2: "var(--accent-2)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        pixel: ['"Press Start 2P"', "monospace"],
      },
      borderRadius: {
        theme: "var(--radius)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 14, 8, 0.05), 0 12px 40px -16px rgba(20, 14, 8, 0.18)",
      },
    },
  },
  plugins: [],
};
