import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Header } from '@/components/common/Header';
import { AdSpaceCard } from '@/components/home/AdSpaceCard';
import { EmptyState } from '@/components/common/EmptyState';
import { ListingFilterSheet } from '@/components/listings/ListingFilterSheet';
import { NavigationMenuModal } from '@/components/home/NavigationMenuModal';
import { listingsData } from '@/data/listings';
import { categoriesData } from '@/data/categories';
import { icons } from '@/constants/icons';
import { CategoryId } from '@/types';
import { useApp } from '@/context/AppContext';

export default function ExploreScreen() {
  const localParams = useLocalSearchParams<{
    keyword?: string;
    location?: string;
    category?: string;
  }>();

  const { searchParams, updateSearch, resetSearch } = useApp();

  const [menuVisible, setMenuVisible] = useState(false);
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);

  // Filter state initialized from params or global context
  const [filters, setFilters] = useState({
    category: (localParams.category as CategoryId) || searchParams.category || 'all',
    location: localParams.location || searchParams.location || '',
    keyword: localParams.keyword || searchParams.keyword || '',
    verifiedOnly: false,
    sortBy: 'recommended' as 'recommended' | 'price_asc' | 'price_desc' | 'reach_desc',
  });

  const SearchIcon = icons.search;
  const FilterIcon = icons.filter;
  const XIcon = icons.close;

  // Filtered and sorted listings memoization
  const filteredListings = useMemo(() => {
    return listingsData
      .filter((item) => {
        // Keyword filter
        if (filters.keyword) {
          const query = filters.keyword.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchLoc = item.location.toLowerCase().includes(query);
          const matchCat = item.categoryLabel.toLowerCase().includes(query);
          if (!matchTitle && !matchLoc && !matchCat) return false;
        }

        // Location filter
        if (filters.location) {
          const locQuery = filters.location.toLowerCase();
          const matchLoc = item.location.toLowerCase().includes(locQuery);
          const matchCity = item.city.toLowerCase().includes(locQuery);
          if (!matchLoc && !matchCity) return false;
        }

        // Category filter
        if (filters.category !== 'all') {
          if (item.category !== filters.category) return false;
        }

        // Verified filter
        if (filters.verifiedOnly && !item.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_asc') return a.weeklyPrice - b.weeklyPrice;
        if (filters.sortBy === 'price_desc') return b.weeklyPrice - a.weeklyPrice;
        if (filters.sortBy === 'reach_desc') return b.impressionsPerDay - a.impressionsPerDay;
        return 0;
      });
  }, [filters]);

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.sortBy !== 'recommended' ? 1 : 0);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      {/* Top Search Bar & Filter Button */}
      <View className="p-4 bg-white border-b border-border">
        <View className="flex-row items-center space-x-2">
          {/* Search Input */}
          <View className="flex-1 flex-row items-center bg-muted border border-border rounded-xl px-3.5 py-2.5">
            {/* TODO: Replace with icons.search from @/constants/icons */}
            <SearchIcon className="w-5 h-5 text-primary mr-2.5" />
            <TextInput
              value={filters.keyword}
              onChangeText={(text) => setFilters((prev) => ({ ...prev, keyword: text }))}
              placeholder="Search by title, location, category..."
              placeholderTextColor="#94A3B8"
              className="flex-1 text-sm font-medium text-foreground p-0"
              accessibilityLabel="Explore search text input"
            />
            {filters.keyword ? (
              <TouchableOpacity
                onPress={() => setFilters((prev) => ({ ...prev, keyword: '' }))}
                className="p-1"
              >
                <XIcon className="w-4 h-4 text-text-secondary" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Filter Trigger Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterSheetVisible(true)}
            className={`p-3 rounded-xl border flex-row items-center ${
              activeFilterCount > 0
                ? 'bg-primary-light border-primary/40'
                : 'bg-muted border-border'
            }`}
            accessibilityLabel="Open filter sheet"
          >
            {/* TODO: Replace with icons.filter from @/constants/icons */}
            <FilterIcon
              className={`w-5 h-5 ${activeFilterCount > 0 ? 'text-primary' : 'text-foreground'}`}
            />
            {activeFilterCount > 0 && (
              <View className="ml-1.5 bg-primary px-1.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-white leading-none">
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Horizontal Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ paddingRight: 16 }}
        >
          {categoriesData.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setFilters((prev) => ({ ...prev, category: cat.id }))}
                className={`px-3.5 py-1.5 rounded-full border mr-2 ${
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-muted border-border'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isSelected ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Active Filter Pills Indicator */}
        {(filters.location || filters.category !== 'all' || filters.keyword) ? (
          <View className="flex-row items-center flex-wrap gap-2 mt-2 pt-2 border-t border-border/50">
            <Text className="text-xs font-bold text-text-secondary">Active:</Text>
            {filters.category !== 'all' && (
              <View className="flex-row items-center bg-primary-light border border-primaryBorder px-2.5 py-0.5 rounded-md">
                <Text className="text-xs font-semibold text-primary">
                  {categoriesData.find((c) => c.id === filters.category)?.name}
                </Text>
              </View>
            )}
            {filters.location ? (
              <View className="flex-row items-center bg-primary-light border border-primaryBorder px-2.5 py-0.5 rounded-md">
                <Text className="text-xs font-semibold text-primary">
                  {filters.location}
                </Text>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setFilters({
                  category: 'all',
                  location: '',
                  keyword: '',
                  verifiedOnly: false,
                  sortBy: 'recommended',
                });
                resetSearch();
              }}
              className="ml-auto"
            >
              <Text className="text-xs font-bold text-primary underline">Clear all</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* Main Listings Grid / List */}
      <FlatList
        data={filteredListings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-bold text-text-secondary">
              Showing {filteredListings.length} ad spaces
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-4">
            <AdSpaceCard listing={item} width="100%" />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            iconName="search"
            title="No ad spaces found"
            description="We couldn't find any ad spaces matching your search filters. Try adjusting your category or location parameters."
            actionLabel="Reset Search Filters"
            onAction={() => {
              setFilters({
                category: 'all',
                location: '',
                keyword: '',
                verifiedOnly: false,
                sortBy: 'recommended',
              });
              resetSearch();
            }}
          />
        }
      />

      {/* Filter Bottom Sheet */}
      <ListingFilterSheet
        visible={filterSheetVisible}
        filters={filters}
        onApply={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
        onReset={() =>
          setFilters({
            category: 'all',
            location: '',
            keyword: '',
            verifiedOnly: false,
            sortBy: 'recommended',
          })
        }
        onClose={() => setFilterSheetVisible(false)}
      />

      {/* Navigation Drawer */}
      <NavigationMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </SafeAreaView>
  );
}
