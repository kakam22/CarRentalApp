import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Divider, Header, InfoRow, PrimaryButton, SectionTitle, StepIndicator } from '../components';
import { computePriceBreakdown, dummyBooking, getCarById, mockCars } from '../data/mockCars';
import { bookingExtras, computeExtrasCost } from '../data/extras';
import { colors, spacing, typography } from '../theme';
import { BookingDetails } from '../types';

export const BOOKING_STEPS = ['Details', 'Payment', 'Confirm'];

export interface TripDetailsScreenProps {
  carId?: string;
  booking?: BookingDetails;
  onBackPress?: () => void;
}

// Step 1 of the booking flow (wireframe page 4): trip summary + optional extras.
export const TripDetailsScreen: React.FC<TripDetailsScreenProps> = ({
  carId,
  booking = dummyBooking,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const car = getCarById(carId ?? mockCars[0].id);
  const breakdown = computePriceBreakdown(car.pricePerDay, booking);
  const extrasCost = computeExtrasCost(selectedExtras, breakdown.days);
  const total = breakdown.total + extrasCost;

  const toggleExtra = (id: string, enabled: boolean) => {
    setSelectedExtras((current) =>
      enabled ? [...current, id] : current.filter((extraId) => extraId !== id)
    );
  };

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const handleContinue = () => {
    router.push({
      pathname: '/payment',
      params: {
        carId: car.id,
        extras: selectedExtras.join(','),
        total: total.toFixed(2),
      },
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header
        leftIcon={<Ionicons name="arrow-back" size={24} color={colors.textPrimary} />}
        onLeftPress={handleBack}
      />
      <StepIndicator steps={BOOKING_STEPS} currentStep={0} style={styles.steps} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: spacing.buttonHeight + insets.bottom + spacing.xxxl * 2 },
        ]}
      >
        <SectionTitle title="Trip Details" containerStyle={styles.sectionTitle} />

        <View style={styles.tripBlock}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.location}>{booking.pickupLocation}</Text>
          <Text style={styles.dateTime}>
            {booking.pickupDate} · {booking.pickupTime}
          </Text>
        </View>

        <View style={styles.tripBlock}>
          <Text style={styles.label}>Return</Text>
          <Text style={styles.location}>{booking.returnLocation}</Text>
          <Text style={styles.dateTime}>
            {booking.returnDate} · {booking.returnTime}
          </Text>
        </View>

        <Divider marginVertical={spacing.md} />

        <SectionTitle title="Add Extras" containerStyle={styles.sectionTitle} />

        {bookingExtras.map((extra) => (
          <View key={extra.id} style={styles.extraRow}>
            <Text style={styles.extraName}>{extra.name}</Text>
            <Switch
              value={selectedExtras.includes(extra.id)}
              onValueChange={(enabled) => toggleExtra(extra.id, enabled)}
              trackColor={{ false: colors.surface, true: colors.primary }}
              thumbColor={colors.background}
              ios_backgroundColor={colors.surface}
              accessibilityLabel={`Add ${extra.name}`}
            />
          </View>
        ))}

        <View style={styles.priceList}>
          {bookingExtras.map((extra) => (
            <Text key={extra.id} style={styles.priceText}>
              {extra.shortName}: +${extra.pricePerDay}/day
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <InfoRow
          label={`Total (${breakdown.days} days${selectedExtras.length ? ' + extras' : ''})`}
          value={`$${total.toFixed(2)}`}
          style={styles.totalRow}
          valueStyle={styles.totalValue}
        />
        <PrimaryButton title="Continue to Payment" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  steps: {
    marginTop: -spacing.xl,
    marginBottom: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  tripBlock: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  location: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xl,
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  dateTime: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  extraName: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xl,
    color: colors.textPrimary,
  },
  priceList: {
    marginTop: spacing.lg,
    gap: spacing.xxs,
  },
  priceText: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.tabBorder,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  totalRow: {
    marginBottom: spacing.sm,
  },
  totalValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
});

export default TripDetailsScreen;
