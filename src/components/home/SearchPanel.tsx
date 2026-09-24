import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
import { ModalPicker, PickerOption } from '@/components/common/ModalPicker';
import { categoriesData } from '@/data/categories';
import { useApp } from '@/context/AppContext';
import { CategoryId } from '@/types';

export const SearchPanel: React.FC = () => {
  const router = useRouter();
  const { searchParams, setSearchParams } = useApp();

  const [keyword, setKeyword] = useState(searchParams.keyword);
  const [place, setPlace] = useState(searchParams.location);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(searchParams.category);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const SearchIcon = icons.search;
  const LocationIcon = icons.location;
  const LayersIcon = icons.category;
  const ChevronDownIcon = icons.chevronDown;

  const categoryOptions: PickerOption[] = categoriesData.map((cat) => ({
    id: cat.id,
    label: cat.name,
    sublabel: cat.description,
  }));

  const selectedCategoryObj = categoriesData.find((c) => c.id === selectedCategory);

  const handleSearch = () => {
    setSearchParams({
      keyword: keyword.trim(),
      location: place.trim(),
      category: selectedCategory,
    });
    router.push({
      pathname: '/(tabs)/explore',
      params: {
        keyword: keyword.trim(),
        location: place.trim(),
        category: selectedCategory,
      },
    });
  };

  return (
    <View className="-mt-12 mx-4 bg-white rounded-2xl p-4 border border-border shadow-lg z-20">
      {/* Field 1: Search by Ad Space */}
      <View className="flex-row items-center border border-border rounded-xl px-3.5 py-3 mb-3 bg-white focus:border-primary">
        {/* TODO: Replace with icons.search from @/constants/icons */}
        <SearchIcon className="w-5 h-5 text-primary mr-3" />
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Search by Ad Space"
          placeholderTextColor="#94A3B8"
          className="flex-1 text-base font-medium text-foreground p-0"
          returnKeyType="next"
          accessibilityLabel="Search by Ad Space"
        />
      </View>

      {/* Field 2: Place */}
      <View className="flex-row items-center border border-border rounded-xl px-3.5 py-3 mb-3 bg-white focus:border-primary">
        {/* TODO: Replace with icons.location from @/constants/icons */}
        <LocationIcon className="w-5 h-5 text-primary mr-3" />
        <TextInput
          value={place}
          onChangeText={setPlace}
          placeholder="Place (e.g. Noida, Bandra)"
          placeholderTextColor="#94A3B8"
          className="flex-1 text-base font-medium text-foreground p-0"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          accessibilityLabel="Location search place"
        />
      </View>

      {/* Field 3: Category Selector Dropdown */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setCategoryModalVisible(true)}
        className="flex-row items-center justify-between border border-border rounded-xl px-3.5 py-3 mb-4 bg-white active:bg-muted"
        accessibilityLabel="Select Ad Space Category"
      >
        <View className="flex-row items-center flex-1 mr-2">
          {/* TODO: Replace with icons.category from @/constants/icons */}
          <LayersIcon className="w-5 h-5 text-primary mr-3" />
          <Text className="text-base font-medium text-foreground truncate">
            {selectedCategoryObj ? selectedCategoryObj.name : 'All Categories'}
          </Text>
        </View>
        {/* TODO: Replace with icons.chevronDown from @/constants/icons */}
        <ChevronDownIcon className="w-5 h-5 text-text-secondary" />
      </TouchableOpacity>

      {/* Primary Red Search Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleSearch}
        className="bg-primary flex-row items-center justify-center py-3.5 px-6 rounded-xl shadow-md active:bg-primaryHover"
        accessibilityLabel="Perform Search"
      >
        {/* TODO: Replace with icons.search from @/constants/icons */}
        <SearchIcon className="w-5 h-5 text-white mr-2" />
        <Text className="text-base font-bold text-white text-center tracking-wide">
          Search
        </Text>
      </TouchableOpacity>

      {/* Category Modal Picker */}
      <ModalPicker
        visible={categoryModalVisible}
        title="Select Category"
        options={categoryOptions}
        selectedValue={selectedCategory}
        onSelect={(val) => setSelectedCategory(val as CategoryId)}
        onClose={() => setCategoryModalVisible(false)}
      />
    </View>
  );
};
