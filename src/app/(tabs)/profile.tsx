import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Header } from '@/components/common/Header';
import { NavigationMenuModal } from '@/components/home/NavigationMenuModal';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { useApp } from '@/context/AppContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { favorites, cart } = useApp();
  const [menuVisible, setMenuVisible] = useState(false);

  const UserIcon = icons.profile;
  const HeartIcon = icons.favorite;
  const CartIcon = icons.cart;
  const BuildingIcon = icons.building;
  const SupportIcon = icons.support;
  const LockIcon = icons.lock;
  const ChevronRight = icons.chevronRight;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Guest User Header Card */}
        <View className="bg-surfaceMuted p-5 rounded-2xl border border-border mb-6 flex-row items-center">
          {/* Avatar */}
          <View className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mr-4 border border-border">
            {/* TODO: Replace with images.defaultAvatar from @/constants/images */}
            <Image
              source={{ uri: images.defaultAvatar }}
              className="w-full h-full"
              contentFit="cover"
            />
          </View>

          {/* Guest Greeting & Login CTA */}
          <View className="flex-1">
            <Text className="text-xl font-extrabold text-foreground mb-1">
              Welcome to AdGurilla
            </Text>
            <Text className="text-xs text-text-secondary mb-3">
              Sign in to manage campaigns and bookings
            </Text>

            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => alert('Login functionality will connect to auth backend.')}
                className="bg-primary px-4 py-2 rounded-xl active:bg-primaryHover"
              >
                <Text className="text-xs font-bold text-white">Sign In / Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* User Stats Quick Bar */}
        <View className="flex-row items-center bg-white p-4 rounded-2xl border border-border mb-6 shadow-2xs">
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/explore')}
            className="flex-1 items-center border-r border-border"
          >
            {/* TODO: Replace with icons.favorite from @/constants/icons */}
            <HeartIcon className="w-5 h-5 text-primary mb-1" />
            <Text className="text-base font-extrabold text-foreground">
              {favorites.length}
            </Text>
            <Text className="text-[11px] font-semibold text-text-secondary">
              Saved Spaces
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/cart' as any)}
            className="flex-1 items-center"
          >
            {/* TODO: Replace with icons.cart from @/constants/icons */}
            <CartIcon className="w-5 h-5 text-primary mb-1" />
            <Text className="text-base font-extrabold text-foreground">
              {cart.length}
            </Text>
            <Text className="text-[11px] font-semibold text-text-secondary">
              Cart Items
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options Group */}
        <View className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
          <Text className="text-xs font-extrabold text-text-secondary uppercase tracking-wider px-4 pt-4 pb-2">
            Account & Preferences
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/(tabs)/explore')}
            className="flex-row items-center justify-between px-4 py-3.5 border-b border-border hover:bg-muted"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-lg bg-primary-light items-center justify-center mr-3">
                <BuildingIcon className="w-4 h-4 text-primary" />
              </View>
              <Text className="text-sm font-bold text-foreground">For Media Owners (List Space)</Text>
            </View>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => alert('Support line: support@adgurilla.com')}
            className="flex-row items-center justify-between px-4 py-3.5 border-b border-border hover:bg-muted"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-lg bg-primary-light items-center justify-center mr-3">
                <SupportIcon className="w-4 h-4 text-primary" />
              </View>
              <Text className="text-sm font-bold text-foreground">Help & Expert Support</Text>
            </View>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => alert('AdGurilla Terms & Privacy Policy')}
            className="flex-row items-center justify-between px-4 py-3.5 hover:bg-muted"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-lg bg-primary-light items-center justify-center mr-3">
                <LockIcon className="w-4 h-4 text-primary" />
              </View>
              <Text className="text-sm font-bold text-foreground">Privacy & Security</Text>
            </View>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </TouchableOpacity>
        </View>

        {/* Platform Version Footer */}
        <View className="items-center py-4">
          <Text className="text-xs font-bold text-text-secondary">
            AdGurilla Mobile App v1.0.0
          </Text>
          <Text className="text-[11px] font-medium text-text-secondary/70 mt-0.5">
            The Offline Advertising Marketplace
          </Text>
        </View>
      </ScrollView>

      <NavigationMenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}
