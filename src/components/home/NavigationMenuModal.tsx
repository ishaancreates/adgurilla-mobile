import { AdGurillaLogo } from "@/components/common/AdGurillaLogo";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface NavigationMenuModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NavigationMenuModal: React.FC<NavigationMenuModalProps> = ({
  visible,
  onClose,
}) => {
  const router = useRouter();
  const CloseIcon = icons.close;
  const ArrowRight = icons.arrowRight;

  const navigateTo = (path: string) => {
    onClose();
    if (path === "/") {
      router.push("/(tabs)");
    } else if (path === "/explore") {
      router.push("/(tabs)/explore");
    } else if (path === "/for-brand") {
      router.push("/for-brand" as any);
    } else if (path === "/for-media-owner") {
      router.push("/for-media-owner" as any);
    } else if (path === "/for-ad-agency") {
      router.push("/for-ad-agency" as any);
    } else if (path === "/cart") {
      router.push("/cart" as any);
    } else {
      router.push("/(tabs)/profile" as any);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/60 justify-start" onPress={onClose}>
        <Pressable
          className="bg-white w-[85%] h-full p-5 shadow-2xl justify-between"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Top Row: Logo & Close */}
          <View>
            <View className="flex-row items-center justify-between pb-4 border-b border-border mb-4">
              <AdGurillaLogo size="sm" />
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-full bg-muted"
                accessibilityLabel="Close Menu"
              >
                <CloseIcon className="w-5 h-5 text-text-secondary" />
              </TouchableOpacity>
            </View>

            {/* Navigation Links */}
            <View className="space-y-1">
              <TouchableOpacity
                onPress={() => navigateTo("/")}
                className="py-3 px-3 rounded-lg bg-primary-light border border-primaryBorder"
              >
                <Text className="text-base font-bold text-primary">Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateTo("/for-brand")}
                className="py-3 px-3 rounded-lg hover:bg-muted"
              >
                <Text className="text-base font-semibold text-foreground">
                  For Brand
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateTo("/for-media-owner")}
                className="py-3 px-3 rounded-lg hover:bg-muted"
              >
                <Text className="text-base font-semibold text-foreground">
                  For Media Owner
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateTo("/for-ad-agency")}
                className="py-3 px-3 rounded-lg hover:bg-muted"
              >
                <Text className="text-base font-semibold text-foreground">
                  For Ad Agency
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateTo("/explore")}
                className="py-3 px-3 rounded-lg hover:bg-muted"
              >
                <Text className="text-base font-semibold text-foreground">
                  Packages & Pricing
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Call to Action */}
          <View className="pt-4 border-t border-border mb-6">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigateTo("/explore")}
              className="bg-primary py-3.5 px-4 rounded-xl flex-row items-center justify-center shadow-sm"
            >
              <Text className="text-sm font-bold text-white mr-2">
                Launch Campaign
              </Text>
              <ArrowRight className="w-4 h-4 text-white" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
