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
    onPrimaryMuted: "rgba(255, 255, 255, 0.85)", // secondary text on primary surfaces
    onPrimarySubtle: "rgba(255, 255, 255, 0.16)", // chips and dividers on primary surfaces
    success: palette.mint,
    onSuccess: palette.carbon, // white on mint fails contrast
    attention: palette.flama,
    onAttention: palette.black, // white on flama is ~3.2:1, too low for body text
    info: palette.sky,
    danger: "#C62828", // validation errors; flama is too light for small text on white
    highlight: palette.bloom,
    background: palette.white,
    surface: "#F6F5FF",
    primarySoft: "#ECE8FF", // nova tint for selected/hovered navigation
    overlay: "rgba(45, 45, 45, 0.6)", // carbon at 60%, behind the mobile drawer
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
  space: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
  },
  shadows: {
    navItem: "0 1px 0 0 rgba(45, 45, 45, 0.08), 0 0 0 1px rgba(45, 45, 45, 0.03)",
    focusRing: `0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.nova}`,
  },
  layout: {
    topBarHeight: "56px",
    sidebarWidth: "264px",
    drawerWidth: "min(320px, 85vw)",
    // Gap between the main sections of the home page (landing and dashboards).
    sectionGap: "18px",
    // Padding around each page's content, per breakpoint.
    pagePadding: {
      base: "20px 16px 40px",
      md: "24px",
      lg: "28px 40px",
    },
  },
  // Mobile-first: base styles target phones; these add wider layouts.
  media: {
    md: "@media (min-width: 768px)",
    lg: "@media (min-width: 1024px)",
  },
} as const;

export type AppTheme = typeof theme;
