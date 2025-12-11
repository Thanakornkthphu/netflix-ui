// Layout Constants
export const NAVBAR_HEIGHT = 70
export const EDGE_MARGIN = 50
export const MINI_PLAYER_WIDTH = 370

// Spacing
export const SPACING = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px",
  xxl: "60px",
}

// Colors
export const COLORS = {
  primary: "#E50914",
  primaryHover: "#F40612",
  background: "#141414",
  backgroundDark: "#000000",
  backgroundCard: "#181818",
  text: "#FFFFFF",
  textSecondary: "#a3a3a3",
  textMuted: "#808080",
  success: "#46d369",
  border: "rgba(255, 255, 255, 0.1)",
  overlay: "rgba(0, 0, 0, 0.85)",
}

// Common Styles
export const AUTH_PAGE_STYLES = {
  width: "100vw",
  height: "100vh",
  backgroundSize: "cover",
  position: "relative",
  backdropFilter: "blur(10px)",
  backgroundPosition: "center",
}

export const CONTENT_PADDING = {
  padding: `${SPACING.lg} ${SPACING.xxl}`,
}

// Animation
export const TRANSITIONS = {
  fast: "0.2s ease",
  normal: "0.3s ease",
  slow: "0.4s ease",
}

// Z-Index
export const Z_INDEX = {
  navbar: 1000,
  modal: 1300,
  miniPlayer: 999,
  dropdown: 100,
}

// Breakpoints (matching MUI defaults)
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

// TMDB Image URLs
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p"
export const TMDB_POSTER_SIZES = {
  small: "/w300",
  medium: "/w500",
  large: "/w780",
  original: "/original",
}

export const getPosterUrl = (path, size = "medium") => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}${TMDB_POSTER_SIZES[size]}${path}`
}
