import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AdGurillaLogo } from './AdGurillaLogo';
import { icons } from '@/constants/icons';
import { useApp } from '@/context/AppContext';

interface HeaderProps {
  onOpenMenu?: () => void;
  showBack?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, showBack, title }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cart } = useApp();

  const CartIcon = icons.cart;
  const MenuIcon = icons.menu;
  const ArrowLeft = icons.chevronRight; // will rotate for back or use back icon

  const cartCount = cart.length;

  return (
    <View
      className="bg-white border-b border-border z-30 px-4"
      style={{ paddingTop: Math.max( 4), paddingBottom: 12 }}
    >
      <View className="flex-row items-center justify-between">
        {/* Left Section: Back button or Logo */}
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="flex-row items-center p-2 -ml-2"
            accessibilityLabel="Go back"
          >
            <View className="p-1.5 rounded-full bg-muted mr-2">
              {/* Back chevron */}
              <ArrowLeft className="w-5 h-5 text-foreground rotate-180" />
            </View>
            {title ? (
              <Text className="text-lg font-bold text-foreground truncate max-w-[200px]">
                {title}
              </Text>
            ) : null}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/')}
            accessibilityLabel="AdGurilla Home"
          >
            <AdGurillaLogo size="md" />
          </TouchableOpacity>
        )}

        {/* Right Section: Cart & Menu */}
        <View className="flex-row items-center space-x-2">
          {/* Cart Icon with badge */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/cart' as any)}
            className="relative p-2.5 rounded-full hover:bg-muted active:bg-muted"
            accessibilityLabel={`Shopping cart, ${cartCount} items`}
          >
            <CartIcon className="w-6 h-6 text-primary" />
            {cartCount > 0 && (
              <View className="absolute top-1 right-1 bg-primary px-1.5 py-0.5 rounded-full border-2 border-white min-w-[20px] items-center justify-center">
                <Text className="text-[10px] font-bold text-white leading-none">
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Menu Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onOpenMenu}
            className="p-2.5 rounded-lg bg-muted border border-border items-center justify-center ml-1"
            accessibilityLabel="Open Navigation Menu"
          >
            <MenuIcon className="w-5 h-5 text-foreground" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
