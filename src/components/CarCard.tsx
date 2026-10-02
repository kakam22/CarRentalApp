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
import { Car } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

export interface CarCardProps {
  car: Car;
  onPress?: (carId: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onPress, style }) => {
  return (
    <Pressable
      onPress={() => onPress?.(car.id)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
    >
      <ImagePlaceholder
        width={spacing.cardImageSize}
        height={spacing.cardImageSize}
        borderRadius={radii.lg}
        backgroundColor={colors.surface}
      />

      <View style={styles.content}>
        <View style={styles.topInfo}>
          <Text numberOfLines={1} style={styles.carName}>
            {car.name}
          </Text>
          <Text style={styles.price}>
            ${car.pricePerDay}/day
          </Text>
        </View>

        <View style={styles.metaRow}>
          {/* Seats with small gray square icon */}
          <View style={styles.metaItem}>
            <View style={styles.smallSquareIcon} />
            <Text style={styles.metaText}>{car.seats}</Text>
          </View>

          {/* Transmission with small gray square icon */}
          <View style={styles.metaItem}>
            <View style={styles.smallSquareIcon} />
            <Text style={styles.metaText}>{car.transmission}</Text>
          </View>

          {/* Rating with star pushed to the right */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={13} color={colors.textSecondary} style={styles.starIcon} />
            <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
          </View>
        </View>
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
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    marginLeft: spacing.lg,
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  topInfo: {
    gap: spacing.xs,
  },
  carName: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  price: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  smallSquareIcon: {
    width: 14,
    height: 14,
    borderRadius: radii.xs,
    backgroundColor: colors.border,
    marginRight: spacing.xs,
  },
  metaText: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  starIcon: {
    marginRight: spacing.xs,
  },
  ratingText: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  pressed: {
    opacity: 0.85,
    backgroundColor: colors.surfaceLight,
  },
});
