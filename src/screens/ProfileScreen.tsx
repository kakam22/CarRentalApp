import React, { useContext } from 'react';
import ProfilePage from '../components/ProfilePage';
import { AuthContext } from '../context/AuthContext';

export interface ProfileScreenProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName: propUserName,
  userEmail: propUserEmail,
  onLogout: propOnLogout,
}) => {
  const auth = useContext(AuthContext);

  const name = propUserName ?? auth?.user?.name ?? 'User Name';
  const email = propUserEmail ?? auth?.user?.email ?? 'user@email.com';
  const handleLogout = propOnLogout ?? auth?.logOut;

  return (
    <ProfilePage
      userName={name}
      userEmail={email}
      onLogout={handleLogout}
    />
  );
};

export default ProfileScreen;
