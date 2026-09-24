import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';

export const AmplifyBanner: React.FC = () => {
  const router = useRouter();
  const ArrowRight = icons.arrowRight;
  const PhoneIcon = icons.phone;

  return (
    <View className="my-6 mx-4 p-6 rounded-2xl bg-gradient-to-r from-red-600 via-primary to-red-700 shadow-md">
      <View className="mb-4">
        <Text className="text-xl font-extrabold text-white mb-1.5 leading-tight">
          Ready to Amplify Your Brand Offline?
        </Text>
        <Text className="text-sm font-medium text-white/90 leading-relaxed">
          Join 500+ brands growing with AdGurilla's transparent marketplace.
        </Text>
      </View>

      <View className="space-y-2.5">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/explore')}
          className="bg-white py-3 px-5 rounded-xl flex-row items-center justify-center shadow-xs active:bg-slate-100"
        >
          <Text className="text-sm font-bold text-primary mr-2">
            Start Your Campaign
          </Text>
          {/* TODO: Replace with icons.arrowRight from @/constants/icons */}
          <ArrowRight className="w-4 h-4 text-primary" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/profile' as any)}
          className="bg-black/20 border border-white/30 py-3 px-5 rounded-xl flex-row items-center justify-center active:bg-black/30 mt-2"
        >
          {/* TODO: Replace with icons.phone from @/constants/icons */}
          <PhoneIcon className="w-4 h-4 text-white mr-2" />
          <Text className="text-sm font-bold text-white">
            Talk to an Expert
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
