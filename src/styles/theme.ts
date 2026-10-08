// PIK brand palette (Visual Core, "Paleta de color").
const palette = {
  bloom: "#FF7FEC",
  nova: "#6849FE",
  sky: "#3994E3",
  carbon: "#2D2D2D",
  flama: "#FF5500",
  mint: "#41DF82",
  black: "#000000",
  white: "#FFFFFF",
} as const;

export const theme = {
  palette,
  colors: {
    // Violet, green and orange carry the brand; blue and dark tones are the structural base.
    primary: palette.nova,
    onPrimary: palette.white,
    success: palette.mint,
    onSuccess: palette.carbon, // white on mint fails contrast
    attention: palette.flama,
    onAttention: palette.black, // white on flama is ~3.2:1, too low for body text
    info: palette.sky,
    highlight: palette.bloom,
    background: palette.white,
    surface: "#F6F5FF",
    foreground: palette.carbon,
    muted: "#6B6B6B",
    border: "#E4E2F0",
  },
  fonts: {
    sans: "var(--font-geist-sans), system-ui, sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  radii: {
    sm: "6px",
    md: "12px",
    pill: "999px",
  },
} as const;

export type AppTheme = typeof theme;
