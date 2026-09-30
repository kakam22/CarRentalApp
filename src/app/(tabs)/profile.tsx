import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import PlaceholderScreen from '../../components/PlaceholderScreen';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    router.replace('/');
  };

  return (
    <PlaceholderScreen
      title={user?.name ?? 'Profile'}
      subtitle={user?.isGuest ? 'Browsing as guest' : user?.email}
    >
      <Pressable style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>{user?.isGuest ? 'Back to login' : 'Log out'}</Text>
      </Pressable>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    paddingHorizontal: 32,
    height: 44,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#333',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#333',
  },
});
