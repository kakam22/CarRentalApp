import { router, useLocalSearchParams } from 'expo-router';
import BookingConfirmationPage from '../components/BookingConfirmationPage';

// Query params arrive as string | string[]; take the first value or a fallback.
const first = (value: string | string[] | undefined, fallback: string) =>
  (Array.isArray(value) ? value[0] : value) ?? fallback;

export default function BookingConfirmationScreen() {
  const params = useLocalSearchParams();

  // Fallbacks match the wireframe so the page can be previewed by visiting
  // /booking-confirmation directly. Replace with real booking data later.
  return (
    <BookingConfirmationPage
      vehicle={first(params.vehicle, 'Sedan Model A')}
      pickupDate={first(params.pickupDate, 'Sep 25, 10:00 AM')}
      pickupLocation={first(params.pickupLocation, 'Airport Terminal 1')}
      returnDate={first(params.returnDate, 'Sep 28, 10:00 AM')}
      returnLocation={first(params.returnLocation, 'Airport Terminal 1')}
      totalPaid={first(params.totalPaid, '$153.50')}
      bookingId={first(params.bookingId, 'ABC-12345')}
      onViewTrip={() => router.replace('/trips')}
      onDone={() => router.replace('/search')}
    />
  );
}
