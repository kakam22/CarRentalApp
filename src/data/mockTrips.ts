import { Trip } from '../../../../Downloads/trips-changes/trips-changes/src/types';

// Dummy trips used until the backend exists.
// `period` is set by hand (not computed from the dates) so the mock data
// keeps working whatever day the app is opened.
export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    carName: 'Sedan Model A',
    dateRange: 'Sep 25 – Sep 28, 2025',
    location: 'Airport Terminal 1',
    status: 'Confirmed',
    period: 'upcoming',
  },
  {
    id: 'trip-2',
    carName: 'SUV Model B',
    dateRange: 'Oct 5 – Oct 8, 2025',
    location: 'Downtown Office',
    status: 'Confirmed',
    period: 'upcoming',
  },
  {
    id: 'trip-3',
    carName: 'Compact Model C',
    dateRange: 'Nov 12 – Nov 14, 2025',
    location: 'Train Station',
    status: 'Pending',
    period: 'upcoming',
  },
  {
    id: 'trip-4',
    carName: 'Compact Model C',
    dateRange: 'Aug 2 – Aug 4, 2025',
    location: 'Airport Terminal 1',
    status: 'Completed',
    period: 'past',
  },
  {
    id: 'trip-5',
    carName: 'Sedan Model A',
    dateRange: 'Jul 10 – Jul 12, 2025',
    location: 'Downtown Office',
    status: 'Completed',
    period: 'past',
  },
  {
    id: 'trip-6',
    carName: 'SUV Model B',
    dateRange: 'Jun 1 – Jun 3, 2025',
    location: 'Train Station',
    status: 'Cancelled',
    period: 'past',
  },
];
