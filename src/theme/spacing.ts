export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  heroHeight: 360,
  detailsImageHeight: 200,
  cardImageSize: 100,
  tripImageSize: 72,
  buttonHeight: 56,
} as const;

export type Spacing = typeof spacing;
