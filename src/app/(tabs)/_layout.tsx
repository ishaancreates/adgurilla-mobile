import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { icons } from '@/constants/icons';

export default function TabLayout() {
  const HomeIcon = icons.home;
  const ExploreIcon = icons.explore;
  const BookingsIcon = icons.bookings;
  const ProfileIcon = icons.profile;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#EF4444",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E4E7EC",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 88,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            /* TODO: Replace with icons.home from @/constants/icons */
            <HomeIcon color={color} size={size || 22} strokeWidth={2.2} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            /* TODO: Replace with icons.explore from @/constants/icons */
            <ExploreIcon color={color} size={size || 22} strokeWidth={2.2} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => (
            /* TODO: Replace with icons.bookings from @/constants/icons */
            <BookingsIcon color={color} size={size || 22} strokeWidth={2.2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            /* TODO: Replace with icons.profile from @/constants/icons */
            <ProfileIcon color={color} size={size || 22} strokeWidth={2.2} />
          ),
        }}
      />
    </Tabs>
  );
}
