import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Header } from '@/components/common/Header';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/common/Badge';
import { NavigationMenuModal } from '@/components/home/NavigationMenuModal';
import { icons } from '@/constants/icons';
import { formatINRPrice } from '@/utils/formatters';

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'enquiries'>('active');
  const [menuVisible, setMenuVisible] = useState(false);

  const CalendarIcon = icons.booking;
  const LocationIcon = icons.location;
  const ClockIcon = icons.clock;
  const ChevronRight = icons.chevronRight;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      {/* Page Header */}
      <View className="px-4 pt-5 pb-3 border-b border-border bg-white">
        <Text className="text-2xl font-extrabold text-foreground tracking-tight mb-1">
          My Campaign Bookings
        </Text>
        <Text className="text-xs font-medium text-text-secondary">
          Track and manage your offline advertising inventory bookings
        </Text>

        {/* Tab Switcher */}
        <View className="flex-row bg-muted p-1 rounded-xl mt-4 border border-border">
          <TouchableOpacity
            onPress={() => setActiveTab('active')}
            className={`flex-1 py-2 rounded-lg items-center ${
              activeTab === 'active' ? 'bg-white shadow-2xs' : ''
            }`}
          >
            <Text
              className={`text-xs ${
                activeTab === 'active'
                  ? 'font-extrabold text-primary'
                  : 'font-semibold text-text-secondary'
              }`}
            >
              Active (1)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('past')}
            className={`flex-1 py-2 rounded-lg items-center ${
              activeTab === 'past' ? 'bg-white shadow-2xs' : ''
            }`}
          >
            <Text
              className={`text-xs ${
                activeTab === 'past'
                  ? 'font-extrabold text-primary'
                  : 'font-semibold text-text-secondary'
              }`}
            >
              Past (0)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('enquiries')}
            className={`flex-1 py-2 rounded-lg items-center ${
              activeTab === 'enquiries' ? 'bg-white shadow-2xs' : ''
            }`}
          >
            <Text
              className={`text-xs ${
                activeTab === 'enquiries'
                  ? 'font-extrabold text-primary'
                  : 'font-semibold text-text-secondary'
              }`}
            >
              Enquiries (0)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {activeTab === 'active' ? (
          <View className="space-y-4">
            {/* Active Booking Card Demo */}
            <View className="bg-white rounded-2xl border border-border p-4 shadow-sm">
              <View className="flex-row items-center justify-between pb-3 border-b border-border">
                <View className="flex-row items-center">
                  {/* TODO: Replace with icons.booking from @/constants/icons */}
                  <CalendarIcon className="w-4 h-4 text-primary mr-2" />
                  <Text className="text-xs font-bold text-text-secondary">
                    BOOKING ID: #ADG-84920
                  </Text>
                </View>
                <Badge variant="amber" label="Campaign Live" />
              </View>

              <View className="py-3">
                <Text className="text-lg font-extrabold text-foreground mb-1">
                  Sector 18 Noida Expressway Billboard
                </Text>
                <View className="flex-row items-center mb-2">
                  <LocationIcon className="w-3.5 h-3.5 text-text-secondary mr-1" />
                  <Text className="text-xs font-semibold text-text-secondary">
                    Sector 18, Noida • 20ft x 10ft Frontlit
                  </Text>
                </View>

                <View className="bg-primary-light/60 p-3 rounded-xl flex-row items-center justify-between mt-1 border border-primaryBorder/50">
                  <View className="flex-row items-center">
                    <ClockIcon className="w-4 h-4 text-primary mr-2" />
                    <View>
                      <Text className="text-xs font-bold text-foreground">
                        Duration: 4 Weeks
                      </Text>
                      <Text className="text-[11px] font-medium text-text-secondary">
                        Oct 01, 2026 – Oct 28, 2026
                      </Text>
                    </View>
                  </View>
                  <Text className="text-sm font-extrabold text-primary">
                    {formatINRPrice(100000)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/listing/listing-1')}
                className="pt-3 border-t border-border flex-row items-center justify-between"
              >
                <Text className="text-xs font-bold text-primary">View Campaign Details</Text>
                <ChevronRight className="w-4 h-4 text-primary" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <EmptyState
            iconName="booking"
            title={activeTab === 'past' ? 'No Past Bookings' : 'No Active Enquiries'}
            description="You don't have any past advertising space bookings yet. Explore our verified listings and launch your campaign."
            actionLabel="Explore Ad Spaces"
            onAction={() => router.push('/(tabs)/explore')}
          />
        )}
      </ScrollView>

      <NavigationMenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}
