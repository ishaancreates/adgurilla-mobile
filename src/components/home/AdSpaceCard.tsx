import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AdSpaceListing } from '@/types';
import { icons } from '@/constants/icons';
import { Badge } from '@/components/common/Badge';
import { formatINRPrice } from '@/utils/formatters';
import { useApp } from '@/context/AppContext';

interface AdSpaceCardProps {
  listing: AdSpaceListing;
  width?: number | string;
}

export const AdSpaceCard: React.FC<AdSpaceCardProps> = ({ listing, width = 240 }) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();

  const LocationIcon = icons.location;
  const EyeIcon = icons.eye;
  const HeartIcon = icons.favorite;

  const favorited = isFavorite(listing.id);

  const handleCardPress = () => {
    router.push(`/listing/${listing.id}` as any);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  return (
    <Pressable
      onPress={handleCardPress}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mr-4 my-1 active:scale-[0.98] transition-transform"
      style={{ width: typeof width === 'number' ? width : undefined }}
    >
      {/* Image Container */}
      <View className="relative h-44 w-full bg-muted">
        {/* TODO: Replace with images.heroBillboard from @/constants/images */}
        <Image
          source={{ uri: listing.imageUrl }}
          className="w-full h-full"
          contentFit="cover"
          transition={250}
          accessibilityLabel={listing.title}
        />

        {/* Verified Badge Top Left */}
        {listing.isVerified && (
          <View className="absolute top-2.5 left-2.5 z-10">
            <Badge variant="verified" label="Verified" />
          </View>
        )}

        {/* Favorite Button Top Right */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleFavoritePress}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md items-center justify-center border border-white/20"
          accessibilityLabel={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {/* TODO: Replace with icons.favorite from @/constants/icons */}
          <HeartIcon
            className={`w-4 h-4 ${favorited ? 'text-primary fill-primary' : 'text-white'}`}
          />
        </TouchableOpacity>
      </View>

      {/* Card Content Body */}
      <View className="p-3.5 flex-col justify-between flex-1">
        {/* Title / Category */}
        <View className="mb-2">
          <Text className="text-base font-extrabold text-foreground truncate" numberOfLines={1}>
            {listing.title}
          </Text>

          {/* Location */}
          <View className="flex-row items-center mt-1">
            {/* TODO: Replace with icons.location from @/constants/icons */}
            <LocationIcon className="w-3.5 h-3.5 text-text-secondary mr-1 shrink-0" />
            <Text className="text-xs font-semibold text-text-secondary truncate flex-1" numberOfLines={1}>
              {listing.location}
            </Text>
          </View>
        </View>

        {/* Daily Reach */}
        <View className="flex-row items-center mb-3">
          {/* TODO: Replace with icons.eye from @/constants/icons */}
          <EyeIcon className="w-3.5 h-3.5 text-text-secondary mr-1 shrink-0" />
          <Text className="text-xs font-medium text-text-secondary truncate flex-1" numberOfLines={1}>
            {listing.dailyReach}
          </Text>
        </View>

        {/* Pricing Footer */}
        <View className="pt-2 border-t border-border/60 flex-row items-baseline">
          <Text className="text-base font-extrabold text-primary">
            {formatINRPrice(listing.weeklyPrice)}
          </Text>
          <Text className="text-xs font-medium text-text-secondary ml-1">
            / week
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
