/**
 * AdGurilla Typography Configuration
 * Primary Font Family: Nunito & Nunito Sans (Extracted directly from adgurilla.com CSS)
 * Fallback Font Family: Poppins (Used as documented fallback if custom fonts fail to load)
 */

export const fontFamilies = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
  
  // Fallback definitions
  fallbackRegular: 'Poppins_400Regular',
  fallbackMedium: 'Poppins_500Medium',
  fallbackSemibold: 'Poppins_600SemiBold',
  fallbackBold: 'Poppins_700Bold',
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
};

export const lineHeights = {
  tight: 1.2,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.6,
};
