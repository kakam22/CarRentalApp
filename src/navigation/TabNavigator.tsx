import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen, TripsScreen, ProfileScreen } from '../screens';
import { colors, radii, spacing, typography } from '../theme';
import { TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();

interface TabIconProps {
  focused: boolean;
  color: string;
}

const WireframeTabIcon: React.FC<TabIconProps> = ({ focused }) => {
  return (
    <View
      style={[
        styles.tabIconSquare,
        {
          backgroundColor: focused ? colors.tabActive : colors.tabInactive,
        },
      ]}
    />
  );
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <WireframeTabIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ focused, color }) => (
            <WireframeTabIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <WireframeTabIcon focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.tabBorder,
    height: 60,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  tabBarLabel: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xxs,
  },
  tabIconSquare: {
    width: 22,
    height: 22,
    borderRadius: radii.sm,
  },
});

export default TabNavigator;
