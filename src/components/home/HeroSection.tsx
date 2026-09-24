import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/constants/images';

/**
 * AdGurilla Hero Section
 * Features full-width outdoor advertising background photograph with dark contrast overlay
 */
export const HeroSection: React.FC = () => {
  return (
    <View className="relative w-full overflow-hidden bg-slate-950 pt-8 pb-20 px-5">
      {/* Background Image with expo-image */}
      <Image
        source={{ uri: images.heroBg }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={300}
        accessibilityLabel="Hero outdoor advertising background photograph"
      />

      {/* Dark Readability Overlay */}
      <View className="absolute inset-0 bg-black/65" />

      {/* Hero Content */}
      <View className="relative z-10 items-center justify-center text-center max-w-xl mx-auto py-4">
        {/* Eyebrow badge */}
        <View className="bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-4 self-center">
          <Text className="text-[11px] font-extrabold text-white uppercase tracking-widest">
            OFFLINE ADVERTISING MARKETPLACE
          </Text>
        </View>

        {/* Main Heading */}
        <Text className="text-3xl sm:text-4xl font-extrabold text-white text-center tracking-tight leading-tight mb-3">
          The Marketplace for Offline Advertising Spaces
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-slate-200 text-center font-medium leading-relaxed px-2 mb-2">
          Discover and book real-world ad spaces all in one platform.
        </Text>
      </View>
    </View>
  );
};
