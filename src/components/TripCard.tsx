import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { Trip } from '../../../../Downloads/trips-changes/trips-changes/src/types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { StatusBadge } from './StatusBadge';

export interface TripCardProps {
  trip: Trip;
  onPress?: (tripId: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress, style }) => {
  return (
    <Pressable
      disabled={!onPress}
      onPress={() => onPress?.(trip.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      <ImagePlaceholder
        width={spacing.tripImageSize}
        height={spacing.tripImageSize}
        borderRadius={radii.lg}
        backgroundColor={colors.surface}
      />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text numberOfLines={1} style={styles.carName}>
            {trip.carName}
          </Text>
          <StatusBadge status={trip.status} />
        </View>
        <Text style={styles.detail}>{trip.dateRange}</Text>
        <Text style={styles.detail}>{trip.location}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    marginLeft: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  carName: {
    flex: 1,
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  detail: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  pressed: {
    opacity: 0.85,
    backgroundColor: colors.surfaceLight,
  },
});
