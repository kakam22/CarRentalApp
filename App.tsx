import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfilePage from './ProfilePage';

export default function App() {
    return (
        <SafeAreaProvider>
            <ProfilePage />
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}