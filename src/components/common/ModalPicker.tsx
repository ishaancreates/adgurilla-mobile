import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { icons } from '@/constants/icons';

export interface PickerOption {
  id: string;
  label: string;
  sublabel?: string;
}

interface ModalPickerProps {
  visible: boolean;
  title: string;
  options: PickerOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const ModalPicker: React.FC<ModalPickerProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const CloseIcon = icons.close;
  const CheckIcon = icons.check;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-t-3xl max-h-[80%] px-5 pt-4 pb-8 border-t border-border shadow-2xl"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Sheet Handle */}
          <View className="items-center mb-3">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </View>

          {/* Sheet Header */}
          <View className="flex-row items-center justify-between pb-3 border-b border-border mb-3">
            <Text className="text-lg font-extrabold text-foreground">
              {title}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-muted"
            >
              <CloseIcon className="w-5 h-5 text-text-secondary" />
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedValue === item.id || selectedValue === item.label;
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                  className={`flex-row items-center justify-between py-3.5 px-4 rounded-xl mb-2 border ${
                    isSelected
                      ? 'bg-primary-light border-primary/40'
                      : 'bg-white border-border hover:bg-muted'
                  }`}
                >
                  <View className="flex-1 pr-3">
                    <Text
                      className={`text-base ${
                        isSelected ? 'font-bold text-primary' : 'font-semibold text-foreground'
                      }`}
                    >
                      {item.label}
                    </Text>
                    {item.sublabel ? (
                      <Text className="text-xs text-text-secondary mt-0.5">
                        {item.sublabel}
                      </Text>
                    ) : null}
                  </View>
                  {isSelected && (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
