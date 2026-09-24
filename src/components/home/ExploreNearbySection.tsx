import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { AdSpaceCard } from './AdSpaceCard';
import { listingsData } from '@/data/listings';
import { icons } from '@/constants/icons';

export const ExploreNearbySection: React.FC = () => {
  const router = useRouter();
  const ChevronRight = icons.chevronRight;

  return (
    <View className="py-6 px-4 bg-white">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-extrabold text-foreground tracking-tight">
          Explore nearby ad spaces
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/explore')}
          className="flex-row items-center p-1"
          accessibilityLabel="View all nearby ad spaces"
        >
          <Text className="text-sm font-bold text-primary mr-0.5">
            View all
          </Text>
          {/* TODO: Replace with icons.chevronRight from @/constants/icons */}
          <ChevronRight className="w-4 h-4 text-primary" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Carousel */}
      <FlatList
        data={listingsData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <AdSpaceCard listing={item} width={220} />
        )}
      />
    </View>
  );
};
