import PlaceholderScreen from '../../components/PlaceholderScreen';
import { useAuth } from '../../context/AuthContext';

export default function SearchScreen() {
  const { user } = useAuth();
  return <PlaceholderScreen title={`Hello, ${user?.name ?? 'User'}`} subtitle="Search page coming soon" />;
}
