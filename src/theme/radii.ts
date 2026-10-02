export const radii = {
  none: 0,
  xs: 3,
  sm: 4,
  md: 8,
  lg: 12,
  card: 16,
  xl: 20,
  pill: 9999,
} as const;

export type Radii = typeof radii;
