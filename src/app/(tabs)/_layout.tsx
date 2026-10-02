import React from 'react';
import { Tabs } from 'expo-router';
import { ColorValue, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

// Bottom tab bar from the wireframe (Search / Trips / Profile).
// Active: dark filled square (#333). Inactive: light gray filled square (#CCCCCC).
function TabIcon({ color }: { color: ColorValue }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: radii.sm,
        backgroundColor: color,
      }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.tabBorder,
          height: 60,
          paddingTop: spacing.xs,
          paddingBottom: spacing.xs,
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.xs,
          fontWeight: typography.weights.medium,
          marginTop: spacing.xxs,
        },
        tabBarIcon: ({ color }) => <TabIcon color={color} />,
      }}
    >
      <Tabs.Screen name="search" options={{ title: 'Search', headerShown: false }} />
      <Tabs.Screen name="trips" options={{ title: 'Trips', headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />
    </Tabs>
  );
}
