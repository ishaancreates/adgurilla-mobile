export type CategoryId = 
  | 'all'
  | 'billboard'
  | 'mall_screen'
  | 'transit'
  | 'bus_shelter'
  | 'airport'
  | 'retail'
  | 'digital_screen';

export interface AdCategory {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
}

export interface CityLocation {
  id: string;
  name: string;
  state: string;
  popularSpots: string[];
  imageUrl: string;
  isPopular?: boolean;
}

export interface AdSpaceListing {
  id: string;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  location: string;
  city: string;
  dailyReach: string;
  weeklyPrice: number;
  currency: string;
  imageUrl: string;
  galleryImages: string[];
  isVerified: boolean;
  isFavorite?: boolean;
  rating: number;
  reviewCount: number;
  dimensions: string;
  minBookingDurationWeeks: number;
  description: string;
  features: string[];
  targetAudience: string;
  mediaOwnerName: string;
  mediaOwnerResponseTime: string;
  availabilityDate: string;
  impressionsPerDay: number;
}

export interface SearchParams {
  keyword: string;
  location: string;
  category: CategoryId;
}

export interface CartItem {
  listing: AdSpaceListing;
  durationWeeks: number;
  startDate: string;
  totalPrice: number;
}
