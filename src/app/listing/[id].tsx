import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Badge } from '@/components/common/Badge';
import { listingsData } from '@/data/listings';
import { formatINRPrice } from '@/utils/formatters';
import { icons } from '@/constants/icons';
import { useApp } from '@/context/AppContext';

export default function ListingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite, addToCart, cart } = useApp();

  const listing = listingsData.find((item) => item.id === id) || listingsData[0];
  const favorited = isFavorite(listing.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [durationWeeks, setDurationWeeks] = useState(listing.minBookingDurationWeeks);

  const HeartIcon = icons.favorite;
  const LocationIcon = icons.location;
  const EyeIcon = icons.eye;
  const ShieldIcon = icons.verified;
  const ClockIcon = icons.clock;
  const BuildingIcon = icons.building;
  const PlusIcon = icons.plus;
  const MinusIcon = icons.minus;
  const ArrowRight = icons.arrowRight;
  const CartIcon = icons.cart;

  const handleAddToCart = () => {
    addToCart(listing, durationWeeks);
    router.push('/cart' as any);
  };

  const calculateTotalPrice = listing.weeklyPrice * durationWeeks;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header showBack title={listing.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Main Banner Image / Gallery */}
        <View className="relative h-72 w-full bg-slate-900">
          {/* TODO: Replace with images.heroBillboard from @/constants/images */}
          <Image
            source={{ uri: listing.galleryImages[selectedImageIndex] || listing.imageUrl }}
            className="w-full h-full"
            contentFit="cover"
            transition={300}
          />

          {/* Floating Action Buttons */}
          <View className="absolute top-3 right-3 flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={() => toggleFavorite(listing.id)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md items-center justify-center border border-white/20"
              accessibilityLabel="Toggle Favorite"
            >
              <HeartIcon
                className={`w-5 h-5 ${favorited ? 'text-primary fill-primary' : 'text-white'}`}
              />
            </TouchableOpacity>
          </View>

          {/* Gallery Thumbnails Overlay */}
          {listing.galleryImages.length > 1 && (
            <View className="absolute bottom-3 left-4 right-4 flex-row justify-center space-x-2">
              {listing.galleryImages.map((img, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === idx ? 'border-primary' : 'border-white/60'
                  }`}
                >
                  <Image source={{ uri: img }} className="w-full h-full" contentFit="cover" />
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Details Content Container */}
        <View className="p-5">
          {/* Category & Title Header */}
          <View className="flex-row items-center justify-between mb-2">
            <Badge variant="category" label={listing.categoryLabel} />
            {listing.isVerified && <Badge variant="verified" label="Verified Space" />}
          </View>

          <Text className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
            {listing.title}
          </Text>

          {/* Location & Dwell Reach Row */}
          <View className="flex-row items-center flex-wrap gap-y-2 gap-x-4 mb-4 pb-4 border-b border-border">
            <View className="flex-row items-center">
              {/* TODO: Replace with icons.location from @/constants/icons */}
              <LocationIcon className="w-4 h-4 text-primary mr-1" />
              <Text className="text-sm font-semibold text-text-secondary">
                {listing.location}, {listing.city}
              </Text>
            </View>

            <View className="flex-row items-center">
              {/* TODO: Replace with icons.eye from @/constants/icons */}
              <EyeIcon className="w-4 h-4 text-primary mr-1" />
              <Text className="text-sm font-semibold text-text-secondary">
                {listing.dailyReach}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-base font-bold text-foreground mb-2">
              Overview & Location Advantage
            </Text>
            <Text className="text-sm text-text-secondary leading-relaxed font-medium">
              {listing.description}
            </Text>
          </View>

          {/* Specifications Table Grid */}
          <View className="bg-surfaceMuted p-4 rounded-2xl border border-border mb-6">
            <Text className="text-sm font-extrabold text-foreground mb-3 uppercase tracking-wider">
              Space Specifications
            </Text>

            <View className="space-y-2.5">
              <View className="flex-row justify-between py-1.5 border-b border-border/60">
                <Text className="text-xs font-semibold text-text-secondary">Dimensions:</Text>
                <Text className="text-xs font-bold text-foreground">{listing.dimensions}</Text>
              </View>

              <View className="flex-row justify-between py-1.5 border-b border-border/60">
                <Text className="text-xs font-semibold text-text-secondary">Est. Daily Reach:</Text>
                <Text className="text-xs font-bold text-foreground">{listing.dailyReach}</Text>
              </View>

              <View className="flex-row justify-between py-1.5 border-b border-border/60">
                <Text className="text-xs font-semibold text-text-secondary">Target Audience:</Text>
                <Text className="text-xs font-bold text-foreground max-w-[200px] text-right">
                  {listing.targetAudience}
                </Text>
              </View>

              <View className="flex-row justify-between py-1.5 border-b border-border/60">
                <Text className="text-xs font-semibold text-text-secondary">Min Booking Duration:</Text>
                <Text className="text-xs font-bold text-foreground">
                  {listing.minBookingDurationWeeks} Weeks
                </Text>
              </View>

              <View className="flex-row justify-between py-1.5">
                <Text className="text-xs font-semibold text-text-secondary">Availability:</Text>
                <Text className="text-xs font-bold text-emerald-600">
                  {listing.availabilityDate}
                </Text>
              </View>
            </View>
          </View>

          {/* Media Owner Information */}
          <View className="bg-white p-4 rounded-2xl border border-border mb-6 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-2">
              <View className="w-10 h-10 rounded-full bg-primary-light border border-primaryBorder items-center justify-center mr-3">
                <BuildingIcon className="w-5 h-5 text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-text-secondary">Verified Media Partner</Text>
                <Text className="text-sm font-bold text-foreground" numberOfLines={1}>
                  {listing.mediaOwnerName}
                </Text>
              </View>
            </View>
            <View className="bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <Text className="text-[11px] font-bold text-emerald-700">
                {listing.mediaOwnerResponseTime}
              </Text>
            </View>
          </View>

          {/* Duration Selector */}
          <View className="bg-white p-4 rounded-2xl border border-border mb-6">
            <Text className="text-sm font-bold text-foreground mb-2">
              Select Campaign Duration (Weeks)
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 bg-muted p-1.5 rounded-xl border border-border">
                <TouchableOpacity
                  onPress={() =>
                    setDurationWeeks((prev) =>
                      Math.max(listing.minBookingDurationWeeks, prev - 1)
                    )
                  }
                  disabled={durationWeeks <= listing.minBookingDurationWeeks}
                  className={`w-9 h-9 rounded-lg items-center justify-center ${
                    durationWeeks <= listing.minBookingDurationWeeks
                      ? 'bg-gray-200'
                      : 'bg-white shadow-2xs'
                  }`}
                >
                  <MinusIcon className="w-4 h-4 text-foreground" />
                </TouchableOpacity>

                <Text className="text-base font-extrabold text-foreground px-3">
                  {durationWeeks} {durationWeeks === 1 ? 'Week' : 'Weeks'}
                </Text>

                <TouchableOpacity
                  onPress={() => setDurationWeeks((prev) => prev + 1)}
                  className="w-9 h-9 rounded-lg bg-white items-center justify-center shadow-2xs"
                >
                  <PlusIcon className="w-4 h-4 text-foreground" />
                </TouchableOpacity>
              </View>

              <View className="items-end">
                <Text className="text-xs font-medium text-text-secondary">Total Estimate</Text>
                <Text className="text-lg font-extrabold text-primary">
                  {formatINRPrice(calculateTotalPrice)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-5 py-3 shadow-2xl flex-row items-center justify-between"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <View>
          <Text className="text-xs font-semibold text-text-secondary">Weekly Rate</Text>
          <Text className="text-xl font-extrabold text-primary">
            {formatINRPrice(listing.weeklyPrice)}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleAddToCart}
          className="bg-primary px-6 py-3.5 rounded-xl flex-row items-center shadow-md active:bg-primaryHover"
          accessibilityLabel="Add to Campaign Cart"
        >
          {/* TODO: Replace with icons.cart from @/constants/icons */}
          <CartIcon className="w-5 h-5 text-white mr-2" />
          <Text className="text-base font-bold text-white">
            Add to Campaign
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
