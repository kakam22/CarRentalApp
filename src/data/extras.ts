import { BookingExtra } from '../types';

// Optional add-ons offered on the Trip Details step (wireframe page 4).
export const bookingExtras: BookingExtra[] = [
  { id: 'insurance', name: 'Insurance coverage', shortName: 'Insurance', pricePerDay: 12 },
  { id: 'gps', name: 'GPS navigation', shortName: 'GPS', pricePerDay: 8 },
  { id: 'child-seat', name: 'Child seat', shortName: 'Child seat', pricePerDay: 5 },
];

// Total cost of the selected extras for the whole rental period.
export function computeExtrasCost(selectedIds: string[], days: number): number {
  return bookingExtras
    .filter((extra) => selectedIds.includes(extra.id))
    .reduce((sum, extra) => sum + extra.pricePerDay * days, 0);
}
