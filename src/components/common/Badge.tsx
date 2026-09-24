import React from 'react';
import { View, Text } from 'react-native';
import { icons } from '@/constants/icons';

interface BadgeProps {
  variant?: 'verified' | 'category' | 'reach' | 'amber';
  label: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'verified', label, size = 'sm' }) => {
  const CheckIcon = icons.checkCircle;
  const LocationIcon = icons.location;
  const SparklesIcon = icons.sparkles;

  if (variant === 'verified') {
    return (
      <View className="flex-row items-center bg-white px-2 py-1 rounded-full border border-emerald-200 shadow-xs self-start">
        <CheckIcon className="w-3.5 h-3.5 text-emerald-600 mr-1" />
        <Text className="text-[11px] font-bold text-emerald-700">
          {label}
        </Text>
      </View>
    );
  }

  if (variant === 'amber') {
    return (
      <View className="flex-row items-center bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 self-start">
        <SparklesIcon className="w-3.5 h-3.5 text-amber-600 mr-1" />
        <Text className="text-[11px] font-semibold text-amber-800">
          {label}
        </Text>
      </View>
    );
  }

  if (variant === 'reach') {
    return (
      <View className="flex-row items-center bg-muted px-2 py-0.5 rounded-md self-start">
        <Text className="text-xs font-medium text-text-secondary">
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-primary-light px-2.5 py-1 rounded-full border border-primaryBorder self-start">
      <Text className="text-xs font-semibold text-primary">
        {label}
      </Text>
    </View>
  );
};
