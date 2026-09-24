import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdSpaceListing, CategoryId, CartItem, SearchParams } from '@/types';
import { listingsData } from '@/data/listings';

interface AppContextType {
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  
  cart: CartItem[];
  addToCart: (listing: AdSpaceListing, durationWeeks?: number) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  cartTotal: number;

  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  updateSearch: (params: Partial<SearchParams>) => void;
  resetSearch: () => void;
}

const initialSearchParams: SearchParams = {
  keyword: '',
  location: '',
  category: 'all',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Favorites state (initially pre-populated with listing-1 & listing-2 for demonstration)
  const [favorites, setFavorites] = useState<string[]>(['listing-1']);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Search parameters state
  const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCart = (listing: AdSpaceListing, durationWeeks: number = 2) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.listing.id === listing.id);
      if (existing) {
        return prev.map((item) =>
          item.listing.id === listing.id
            ? {
                ...item,
                durationWeeks: item.durationWeeks + durationWeeks,
                totalPrice: (item.durationWeeks + durationWeeks) * listing.weeklyPrice,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          listing,
          durationWeeks,
          startDate: '2026-10-01',
          totalPrice: durationWeeks * listing.weeklyPrice,
        },
      ];
    });
  };

  const removeFromCart = (listingId: string) => {
    setCart((prev) => prev.filter((item) => item.listing.id !== listingId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const updateSearch = (params: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  const resetSearch = () => setSearchParams(initialSearchParams);

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        searchParams,
        setSearchParams,
        updateSearch,
        resetSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
