import { router } from 'expo-router';
import { TripsScreen } from '../../screens';

export default function TripsRoute() {
  return <TripsScreen onBrowseCars={() => router.navigate('/search')} />;
}
