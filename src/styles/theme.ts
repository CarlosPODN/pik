export const theme = {
  colors: {
    background: "#ffffff",
    foreground: "#171717",
    primary: "#4f46e5",
    muted: "#6b7280",
    border: "#e5e7eb",
  },
  fonts: {
    sans: "var(--font-geist-sans), system-ui, sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  radii: {
    sm: "6px",
    md: "12px",
  },
} as const;

export type AppTheme = typeof theme;
