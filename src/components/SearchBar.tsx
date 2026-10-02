import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

export interface SearchBarProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  onFilterPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  title = 'Search for destinations?',
  subtitle = 'Anywhere • Anytime',
  onPress,
  onFilterPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.leftIconContainer}>
        <Ionicons name="search" size={24} color={colors.textPrimary} />
      </View>

      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>

      <Pressable
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        onPress={onFilterPress ?? onPress}
        style={styles.filterButton}
      >
        <Ionicons name="options-outline" size={24} color={colors.textPrimary} />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.lg,
    // Soft shadow for iOS
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  leftIconContainer: {
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  filterButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
