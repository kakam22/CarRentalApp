import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Divider, Header, InfoRow, PrimaryButton, SectionTitle, StepIndicator } from '../components';
import { computePriceBreakdown, dummyBooking, getCarById, mockCars } from '../data/mockCars';
import { BOOKING_STEPS } from '../screens/TripDetailsScreen';
import { colors, spacing, typography } from '../theme';

// Step 2 of the booking flow (wireframe page 5).
export default function PaymentScreen() {
  const insets = useSafeAreaInsets();
  const { carId, total } = useLocalSearchParams<{ carId?: string; extras?: string; total?: string }>();

  const car = getCarById(carId ?? mockCars[0].id);
  const breakdown = computePriceBreakdown(car.pricePerDay, dummyBooking);
  const totalAmount = total ?? breakdown.total.toFixed(2);
  const extrasCost = Number(totalAmount) - breakdown.total;

  const handleBack = () => {
    if (router.canGoBack()) router.back();
  };

  const handlePay = () => {
    router.replace({
      pathname: '/BookingConfirmation',
      params: { vehicle: car.name, totalPaid: `$${totalAmount}` },
    });
  };

  const field = (placeholder: string, extra?: object) => (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      style={[styles.input, extra]}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header
        leftIcon={<Ionicons name="arrow-back" size={24} color={colors.textPrimary} />}
        onLeftPress={handleBack}
      />
      <StepIndicator steps={BOOKING_STEPS} currentStep={1} style={styles.steps} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionTitle title="Payment Method" />
        {field('Card number')}
        {field('Cardholder name')}
        <View style={styles.row}>
          {field('MM / YY', styles.half)}
          {field('CVV', styles.half)}
        </View>

        <Divider marginVertical={spacing.md} />

        <SectionTitle title="Billing Address" />
        {field('Street address')}
        <View style={styles.row}>
          {field('City', styles.half)}
          {field('ZIP code', styles.half)}
        </View>

        <Divider marginVertical={spacing.md} />

        <SectionTitle title="Promo Code" />
        <View style={styles.row}>
          {field('Enter code', styles.promoInput)}
          <Pressable style={styles.applyButton} onPress={() => {}}>
            <Text style={styles.applyText}>Apply</Text>
          </Pressable>
        </View>

        <Divider marginVertical={spacing.md} />

        <SectionTitle title="Order Summary" />
        <InfoRow
          label={`${car.name} × ${breakdown.days} days`}
          value={`$${breakdown.subtotal.toFixed(2)}`}
        />
        {extrasCost > 0.005 && <InfoRow label="Extras" value={`$${extrasCost.toFixed(2)}`} />}
        <InfoRow label="Taxes & fees" value={`$${breakdown.taxesAndFees.toFixed(2)}`} />
        <Divider marginVertical={spacing.sm} />
        <InfoRow label="Total" value={`$${totalAmount}`} isBold />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <PrimaryButton title={`Pay $${totalAmount}`} onPress={handlePay} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  steps: { marginTop: -spacing.xl, marginBottom: spacing.sm },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
  },
  promoInput: { flex: 1 },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    justifyContent: 'center',
  },
  applyText: {
    color: colors.background,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
  bottomBar: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.tabBorder,
  },
});