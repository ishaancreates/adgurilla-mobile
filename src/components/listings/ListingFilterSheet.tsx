import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { CategoryId } from '@/types';
import { categoriesData } from '@/data/categories';
import { locationsData } from '@/data/locations';
import { icons } from '@/constants/icons';

interface FilterState {
  category: CategoryId;
  location: string;
  verifiedOnly: boolean;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'reach_desc';
}

interface ListingFilterSheetProps {
  visible: boolean;
  filters: FilterState;
  onApply: (newFilters: FilterState) => void;
  onReset: () => void;
  onClose: () => void;
}

export const ListingFilterSheet: React.FC<ListingFilterSheetProps> = ({
  visible,
  filters,
  onApply,
  onReset,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters, visible]);

  const CloseIcon = icons.close;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <Pressable
          className="bg-white rounded-t-3xl max-h-[85%] px-5 pt-4 pb-6 border-t border-border shadow-2xl"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Sheet Handle */}
          <View className="items-center mb-3">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </View>

          {/* Sheet Header */}
          <View className="flex-row items-center justify-between pb-3 border-b border-border mb-4">
            <Text className="text-lg font-extrabold text-foreground">
              Filter Ad Spaces
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2 rounded-full bg-muted">
              <CloseIcon className="w-5 h-5 text-text-secondary" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
            {/* Category Section */}
            <View>
              <Text className="text-sm font-extrabold text-foreground mb-3 uppercase tracking-wider">
                Category
              </Text>
              <View className="flex-row flex-wrap">
                {categoriesData.map((cat) => {
                  const isSelected = localFilters.category === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      activeOpacity={0.7}
                      onPress={() =>
                        setLocalFilters((prev) => ({ ...prev, category: cat.id }))
                      }
                      className={`px-3.5 py-2 rounded-xl border mr-2 mb-2 ${
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
              </View>
            </View>

            {/* Location Section */}
            <View className="mt-4">
              <Text className="text-sm font-extrabold text-foreground mb-3 uppercase tracking-wider">
                Location / City
              </Text>
              <View className="flex-row flex-wrap">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setLocalFilters((prev) => ({ ...prev, location: '' }))
                  }
                  className={`px-3.5 py-2 rounded-xl border mr-2 mb-2 ${
                    !localFilters.location
                      ? 'bg-primary border-primary'
                      : 'bg-muted border-border'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      !localFilters.location ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    All Locations
                  </Text>
                </TouchableOpacity>

                {locationsData.map((loc) => {
                  const isSelected = localFilters.location === loc.name;
                  return (
                    <TouchableOpacity
                      key={loc.id}
                      activeOpacity={0.7}
                      onPress={() =>
                        setLocalFilters((prev) => ({ ...prev, location: loc.name }))
                      }
                      className={`px-3.5 py-2 rounded-xl border mr-2 mb-2 ${
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
                        {loc.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Verified Switch */}
            <View className="mt-4 flex-row items-center justify-between py-3 border-y border-border">
              <View>
                <Text className="text-base font-bold text-foreground">
                  Verified Spaces Only
                </Text>
                <Text className="text-xs text-text-secondary">
                  Show only pre-inspected & validated ad spaces
                </Text>
              </View>
              <Switch
                value={localFilters.verifiedOnly}
                onValueChange={(val) =>
                  setLocalFilters((prev) => ({ ...prev, verifiedOnly: val }))
                }
                trackColor={{ false: '#E4E7EC', true: '#EF4444' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Sort By Section */}
            <View className="mt-4">
              <Text className="text-sm font-extrabold text-foreground mb-3 uppercase tracking-wider">
                Sort By
              </Text>
              <View className="space-y-2">
                {[
                  { id: 'recommended', label: 'Recommended' },
                  { id: 'price_asc', label: 'Price: Low to High' },
                  { id: 'price_desc', label: 'Price: High to Low' },
                  { id: 'reach_desc', label: 'Daily Reach: Highest First' },
                ].map((sortOption) => {
                  const isSelected = localFilters.sortBy === sortOption.id;
                  return (
                    <TouchableOpacity
                      key={sortOption.id}
                      onPress={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          sortBy: sortOption.id as any,
                        }))
                      }
                      className={`py-3 px-4 rounded-xl border flex-row items-center justify-between ${
                        isSelected
                          ? 'bg-primary-light border-primary/40'
                          : 'bg-white border-border'
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isSelected
                            ? 'font-bold text-primary'
                            : 'font-semibold text-foreground'
                        }`}
                      >
                        {sortOption.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Action Footer */}
          <View className="flex-row items-center space-x-3 pt-4 border-t border-border mt-4">
            <TouchableOpacity
              onPress={() => {
                onReset();
                onClose();
              }}
              className="flex-1 py-3.5 border border-border rounded-xl items-center bg-muted"
            >
              <Text className="text-sm font-bold text-text-secondary">Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onApply(localFilters);
                onClose();
              }}
              className="flex-1 py-3.5 bg-primary rounded-xl items-center shadow-xs"
            >
              <Text className="text-sm font-bold text-white">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
