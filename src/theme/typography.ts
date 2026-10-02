import { Platform, TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const typography = {
  fontFamily,
  
  // Font Sizes
  sizes: {
    xs: 12,
    sm: 13,
    md: 14,
    lg: 15,
    xl: 16,
    xxl: 18,
    title: 22,
    heroTitle: 24,
  },
  
  // Font Weights
  weights: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
} as const;

export type Typography = typeof typography;
