import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { SearchPanel } from '@/components/home/SearchPanel';
import { ValuePropositions } from '@/components/home/ValuePropositions';
import { ExploreNearbySection } from '@/components/home/ExploreNearbySection';
import { PopularLocationsSection } from '@/components/home/PopularLocationsSection';
import { AmplifyBanner } from '@/components/home/AmplifyBanner';
import { NavigationMenuModal } from '@/components/home/NavigationMenuModal';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* 1. Header */}
      <Header onOpenMenu={() => setMenuVisible(true)} />

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Overlapping Search Panel */}
        <SearchPanel />

        {/* 4. Value Propositions */}
        <ValuePropositions />

        {/* 5. Explore Nearby Ad Spaces Carousel */}
        <ExploreNearbySection />

        {/* 6. Popular Locations Chips */}
        <PopularLocationsSection />

        {/* 7. Amplify CTA Banner */}
        <AmplifyBanner />
      </ScrollView>

      {/* Navigation Drawer Modal */}
      <NavigationMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </SafeAreaView>
  );
}
