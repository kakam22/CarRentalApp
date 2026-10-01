import { Tabs } from 'expo-router';
import { ColorValue, View } from 'react-native';

// Bottom tab bar from the wireframe (Search / Trips / Profile).
// Icons are grey squares like in the lo-fi design; swap for real icons later.
function TabIcon({ color }: { color: ColorValue }) {
  return <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: color }} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color }) => <TabIcon color={color} />,
      }}
    >
      <Tabs.Screen name="search" options={{ title: 'Search', headerTitle: 'CarRental' }} />
      <Tabs.Screen name="trips" options={{ title: 'Trips', headerTitle: 'My Trips' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
