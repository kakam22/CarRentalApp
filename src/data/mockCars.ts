import { BookingDetails, Car } from '../types';

export const mockCars: Car[] = [
  {
    id: 'sedan-model-a',
    name: 'Sedan Model A',
    type: 'Mid-size Sedan',
    pricePerDay: 45,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 2,
    rating: 4.5,
    reviewCount: 128,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'Cruise control',
      'Backup camera',
    ],
  },
  {
    id: 'suv-model-b',
    name: 'SUV Model B',
    type: 'Compact SUV',
    pricePerDay: 65,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 3,
    rating: 4.5,
    reviewCount: 94,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'All-wheel drive',
      'Heated seats',
    ],
  },
  {
    id: 'compact-model-c',
    name: 'Compact Model C',
    type: 'Economy Hatchback',
    pricePerDay: 35,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 1,
    rating: 4.5,
    reviewCount: 86,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'Apple CarPlay',
    ],
  },
  {
    id: 'compact-model-d',
    name: 'Compact Model C',
    type: 'Economy Hatchback',
    pricePerDay: 35,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 1,
    rating: 4.5,
    reviewCount: 86,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'Apple CarPlay',
    ],
  },
  {
    id: 'compact-model-e',
    name: 'Compact Model C',
    type: 'Economy Hatchback',
    pricePerDay: 35,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 1,
    rating: 4.5,
    reviewCount: 86,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'Apple CarPlay',
    ],
  },
  {
    id: 'compact-model-f',
    name: 'Compact Model C',
    type: 'Economy Hatchback',
    pricePerDay: 35,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 1,
    rating: 4.5,
    reviewCount: 86,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'Apple CarPlay',
    ],
  },
  {
    id: 'compact-model-g',
    name: 'Compact Model C',
    type: 'Economy Hatchback',
    pricePerDay: 35,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Gas',
    bags: 1,
    rating: 4.5,
    reviewCount: 86,
    imageUrl: null,
    features: [
      'Air conditioning',
      'Bluetooth',
      'USB charging',
      'Apple CarPlay',
    ],
  },
];

export const dummyBooking: BookingDetails = {
  pickupLocation: 'Airport Terminal 1',
  pickupDate: 'Sep 25',
  pickupTime: '10:00 AM',
  returnLocation: 'Airport Terminal 1',
  returnDate: 'Sep 28',
  returnTime: '10:00 AM',
  taxesAndFees: 18.50,
  // Difference between Sep 28 and Sep 25 is 3 days
  days: 3,
};

export interface PriceBreakdown {
  dailyRate: number;
  days: number;
  subtotal: number;
  taxesAndFees: number;
  total: number;
}

export function computePriceBreakdown(pricePerDay: number, booking: BookingDetails = dummyBooking): PriceBreakdown {
  const dailyRate = pricePerDay;
  const days = booking.days;
  const subtotal = dailyRate * days;
  const taxesAndFees = booking.taxesAndFees;
  const total = subtotal + taxesAndFees;

  return {
    dailyRate,
    days,
    subtotal,
    taxesAndFees,
    total,
  };
}

export function getCarById(id: string): Car {
  const found = mockCars.find((car) => car.id === id);
  return found ?? mockCars[0];
}
