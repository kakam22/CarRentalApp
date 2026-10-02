export const colors = {
  // Primary brand / dark colors
  primary: '#333333',
  primaryDark: '#1E1E1E',
  
  // Backgrounds
  background: '#FFFFFF',
  surface: '#E5E5E5',
  surfaceLight: '#F5F5F5',
  heroSurface: '#C8C8C8',
  specBoxBackground: '#F0F0F0',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#888888',
  textMuted: '#AAAAAA',
  textLight: '#FFFFFF',
  
  // Borders and dividers
  border: '#DDDDDD',
  borderLight: '#EBEBEB',
  divider: '#EFEFEF',
  
  // Accents / Ratings
  ratingStar: '#888888',
  gasIcon: '#D9383A',
  
  // Tabs
  tabActive: '#333333',
  tabInactive: '#CCCCCC',
  tabBorder: '#E5E5E5',
  
  // Status & shadows
  shadow: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
