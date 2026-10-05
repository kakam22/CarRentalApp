import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { TripStatus } from '../types';

export interface StatusBadgeProps {
  status: TripStatus;
  style?: StyleProp<ViewStyle>;
}

const STATUS_COLORS: Record<TripStatus, { background: string; text: string }> = {
  Confirmed: { background: colors.statusConfirmedBg, text: colors.statusConfirmedText },
  Pending: { background: colors.statusPendingBg, text: colors.statusPendingText },
  Completed: { background: colors.statusCompletedBg, text: colors.statusCompletedText },
  Cancelled: { background: colors.statusCancelledBg, text: colors.statusCancelledText },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const { background, text } = STATUS_COLORS[status];

  return (
    <View style={[styles.badge, { backgroundColor: background }, style]}>
      <Text style={[styles.label, { color: text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
});
