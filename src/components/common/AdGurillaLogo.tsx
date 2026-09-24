import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';

/**
 * AdGurilla Brand Logo Component
 * Renders the brand logo with mascot icon & brand text matching adgurilla.com visual identity.
 */
export const AdGurillaLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const height = size === 'sm' ? 28 : size === 'md' ? 36 : 44;
  const width = height * 4;

  return (
    <View className="flex-row items-center justify-center">
      <Image
        source={require('@/assets/Logo.svg')}
        style={{ width, height }}
        contentFit="contain"
      />
    </View>
  );
};
