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

export interface BookingExtra {
  id: string;
  name: string;
  shortName: string;
  pricePerDay: number;
}

export type TripStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export type TripPeriod = 'upcoming' | 'past';

export interface Trip {
  id: string;
  carName: string;
  dateRange: string;
  location: string;
  status: TripStatus;
  period: TripPeriod;
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
