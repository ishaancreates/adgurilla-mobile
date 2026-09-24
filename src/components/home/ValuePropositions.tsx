import React from 'react';
import { View, Text } from 'react-native';
import { icons } from '@/constants/icons';

interface ValuePropItem {
  id: string;
  title: string;
  iconName: keyof typeof icons;
}

const valueProps: ValuePropItem[] = [
  {
    id: 'verified',
    title: 'Verified\nSpaces',
    iconName: 'verified',
  },
  {
    id: 'targeting',
    title: 'Smart\nTargeting',
    iconName: 'target',
  },
  {
    id: 'pricing',
    title: 'Transparent\nPricing',
    iconName: 'pricing',
  },
  {
    id: 'booking',
    title: 'Easy\nBooking',
    iconName: 'booking',
  },
];

export const ValuePropositions: React.FC = () => {
  return (
    <View className="py-6 px-4 bg-surfaceMuted border-b border-border">
      <View className="flex-row items-start justify-between">
        {valueProps.map((item) => {
          const IconComponent = icons[item.iconName] || icons.verified;
          return (
            <View key={item.id} className="flex-1 items-center px-1">
              {/* Icon Container with subtle light red background */}
              {/* TODO: Replace icon from @/constants/icons */}
              <View className="w-14 h-14 rounded-full bg-primary-light border border-primaryBorder items-center justify-center mb-2.5 shadow-2xs">
                <IconComponent className="w-6 h-6 text-primary" strokeWidth={2.2} />
              </View>
              <Text className="text-xs font-bold text-foreground text-center leading-tight">
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
