import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { locationsData } from '@/data/locations';
import { icons } from '@/constants/icons';
import { useApp } from '@/context/AppContext';

export const PopularLocationsSection: React.FC = () => {
  const router = useRouter();
  const { searchParams, updateSearch } = useApp();
  const ChevronRight = icons.chevronRight;
  const BuildingIcon = icons.building;

  const handleLocationSelect = (cityName: string) => {
    updateSearch({ location: cityName });
    router.push({
      pathname: '/(tabs)/explore',
      params: { location: cityName },
    });
  };

  return (
    <View className="py-6 px-4 bg-white border-t border-border">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-extrabold text-foreground tracking-tight">
          Popular locations
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/explore')}
          className="flex-row items-center p-1"
          accessibilityLabel="View all locations"
        >
          <Text className="text-sm font-bold text-primary mr-0.5">
            View all
          </Text>
          {/* TODO: Replace with icons.chevronRight from @/constants/icons */}
          <ChevronRight className="w-4 h-4 text-primary" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll of Location Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {locationsData.map((loc, index) => {
          const isSelected = searchParams.location === loc.name || (index === 0 && !searchParams.location);
          return (
            <TouchableOpacity
              key={loc.id}
              activeOpacity={0.7}
              onPress={() => handleLocationSelect(loc.name)}
              className={`flex-row items-center px-4 py-2.5 rounded-2xl mr-3 border ${
                isSelected
                  ? 'bg-primary-light border-primary/40'
                  : 'bg-muted border-border hover:bg-slate-100'
              }`}
              accessibilityLabel={`Select location ${loc.name}`}
            >
              <Image
                source={{ uri: loc.imageUrl }}
                style={{ width: 16, height: 16, borderRadius: 8, marginRight: 8 }}
                contentFit="cover"
              />
              <Text
                className={`text-sm font-bold ${
                  isSelected ? 'text-primary' : 'text-foreground'
                }`}
              >
                {loc.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
