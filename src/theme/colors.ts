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

  // Trip status badges (background / text pairs)
  statusConfirmedBg: '#E3F4E6',
  statusConfirmedText: '#2E7D32',
  statusPendingBg: '#FBF1D9',
  statusPendingText: '#8A6A1F',
  statusCompletedBg: '#EFEFEF',
  statusCompletedText: '#666666',
  statusCancelledBg: '#F7E3E3',
  statusCancelledText: '#8B3A3A',

  // Status & shadows
  shadow: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
