export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  seats: number;
  transmission: 'Auto' | 'Manual';
  fuel: string;
  bags: number;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  features: string[];
}

export interface BookingDetails {
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnLocation: string;
  returnDate: string;
  returnTime: string;
  taxesAndFees: number;
  days: number;
}

export type RootStackParamList = {
  Tabs: undefined;
  CarDetails: { carId: string };
};

export type TabParamList = {
  Search: undefined;
  Trips: undefined;
  Profile: undefined;
};
