import { CityLocation } from '@/types';
import { images } from '@/constants/images';

export const locationsData: CityLocation[] = [
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi',
    popularSpots: ['Sector 18 Noida', 'Connaught Place', 'Cyber Hub Gurugram'],
    imageUrl: images.delhiNCR,
    isPopular: true,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    popularSpots: ['Bandra West', 'Lower Parel', 'Andheri East'],
    imageUrl: images.mumbai,
    isPopular: true,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    popularSpots: ['Indiranagar', 'MG Road', 'Koramangala'],
    imageUrl: images.bengaluru,
    isPopular: true,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    popularSpots: ['HITECH City', 'Banjara Hills', 'Gachibowli'],
    imageUrl: images.hyderabad,
    isPopular: true,
  },
];
