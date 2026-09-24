import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { icons } from '@/constants/icons';

interface EmptyStateProps {
  iconName?: keyof typeof icons;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'search',
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const IconComponent = icons[iconName] || icons.search;

  return (
    <View className="items-center justify-center p-8 bg-surface rounded-2xl border border-border my-6">
      <View className="w-16 h-16 rounded-full bg-primary-light border border-primaryBorder items-center justify-center mb-4">
        <IconComponent className="w-8 h-8 text-primary" />
      </View>
      <Text className="text-xl font-bold text-foreground text-center mb-2">
        {title}
      </Text>
      <Text className="text-sm font-normal text-text-secondary text-center max-w-[280px] leading-relaxed mb-6">
        {description}
      </Text>
      {actionLabel && onAction ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAction}
          className="bg-primary px-6 py-3 rounded-xl shadow-xs active:bg-primaryHover"
        >
          <Text className="text-sm font-bold text-white text-center">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
