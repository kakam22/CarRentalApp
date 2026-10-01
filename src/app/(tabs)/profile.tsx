import { router } from 'expo-router';
import ProfilePage from '../../components/ProfilePage';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    router.replace('/');
  };

  return (
    <ProfilePage
      userName={user?.name}
      userEmail={user?.isGuest ? 'Browsing as guest' : user?.email}
      onLogout={handleLogOut}
    />
  );
}
