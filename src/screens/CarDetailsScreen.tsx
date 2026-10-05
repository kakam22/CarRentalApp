import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Divider,
  FeatureRow,
  Header,
  ImagePlaceholder,
  InfoRow,
  PrimaryButton,
  SectionTitle,
  SpecItem,
} from '../components';
import { computePriceBreakdown, dummyBooking, getCarById, mockCars } from '../data/mockCars';
import { colors, radii, spacing, typography } from '../theme';
import { BookingDetails } from '../types';

export interface CarDetailsScreenProps {
  carId?: string;
  booking?: BookingDetails;
  onBookPress?: () => void;
  onBackPress?: () => void;
}

export const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({
  carId: propCarId,
  booking = dummyBooking,
  onBookPress,
  onBackPress,
}) => {
  const searchParams = useLocalSearchParams<{ carId?: string }>();
  const insets = useSafeAreaInsets();

  // Get car by ID from prop or route params, fallback to first mock car
  const activeCarId = propCarId ?? searchParams.carId ?? mockCars[0].id;
  const car = getCarById(activeCarId);

  // Compute pricing dynamically based on daily rate and booking parameters
  const breakdown = computePriceBreakdown(car.pricePerDay, booking);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const handleBookNow = () => {
    if (onBookPress) {
      onBookPress();
      return;
    }
   router.push({ pathname: '/trip-details', params: { carId: car.id } });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header with back arrow */}
      <Header
        leftIcon={<Ionicons name="arrow-back" size={24} color={colors.textPrimary} />}
        onLeftPress={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: spacing.buttonHeight + insets.bottom + spacing.xxxl },
        ]}
      >
        {/* Large Rounded Image Placeholder */}
        <View style={styles.imageContainer}>
          <ImagePlaceholder
            height={spacing.detailsImageHeight}
            borderRadius={radii.card}
            backgroundColor={colors.surface}
            text="IMG"
            textColor={colors.textSecondary}
          />
        </View>

        {/* Title & Reviews Row */}
        <View style={styles.titleSection}>
          <View style={styles.titleLeft}>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carType}>{car.type}</Text>
          </View>
          <View style={styles.ratingRight}>
            <Text style={styles.reviewsText}>
              ★ {car.rating.toFixed(1)} ({car.reviewCount} reviews)
            </Text>
          </View>
        </View>

        <Divider marginVertical={spacing.lg} />

        {/* Specs Row: 4 evenly spaced items */}
        <View style={styles.specsRow}>
          <SpecItem
            icon={<Ionicons name="grid-outline" size={20} color={colors.textPrimary} />}
            label={`${car.seats} seats`}
          />
          <SpecItem
            icon={<Ionicons name="settings-sharp" size={20} color={colors.textSecondary} />}
            label={car.transmission}
          />
          <SpecItem
            icon={<MaterialCommunityIcons name="gas-station" size={22} color={colors.gasIcon} />}
            label={car.fuel}
          />
          <SpecItem
            icon={<Feather name="square" size={20} color={colors.textSecondary} />}
            label={`${car.bags} bags`}
          />
        </View>

        <Divider marginVertical={spacing.lg} />

        {/* Pickup / Return (Two columns) */}
        <View style={styles.rentalInfoRow}>
          <View style={styles.rentalColumn}>
            <Text style={styles.rentalLabel}>Pickup</Text>
            <Text style={styles.rentalLocation}>{booking.pickupLocation}</Text>
            <Text style={styles.rentalDateTime}>
              {booking.pickupDate}, {booking.pickupTime}
            </Text>
          </View>

          <View style={styles.rentalColumn}>
            <Text style={styles.rentalLabel}>Return</Text>
            <Text style={styles.rentalLocation}>{booking.returnLocation}</Text>
            <Text style={styles.rentalDateTime}>
              {booking.returnDate}, {booking.returnTime}
            </Text>
          </View>
        </View>

        <Divider marginVertical={spacing.lg} />

        {/* Price Breakdown */}
        <View style={styles.priceBreakdownSection}>
          <SectionTitle title="Price Breakdown" />
          <InfoRow
            label="Daily rate"
            value={`$${breakdown.dailyRate.toFixed(2)}`}
          />
          <InfoRow
            label={`${breakdown.days} days subtotal`}
            value={`$${breakdown.subtotal.toFixed(2)}`}
          />
          <InfoRow
            label="Taxes & fees"
            value={`$${breakdown.taxesAndFees.toFixed(2)}`}
          />

          <Divider marginVertical={spacing.md} />

          <InfoRow
            label="Total"
            value={`$${breakdown.total.toFixed(2)}`}
            isBold
            style={styles.totalRow}
          />
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <SectionTitle title="Features" />
          {car.features.map((feature, index) => (
            <FeatureRow key={`${feature}-${index}`} text={feature} />
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View
        style={[
          styles.stickyBottomBar,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <PrimaryButton title="Book Now" onPress={handleBookNow} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  imageContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleLeft: {
    flex: 1,
  },
  carName: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  carType: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  ratingRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  reviewsText: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  rentalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rentalColumn: {
    flex: 1,
  },
  rentalLabel: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  rentalLocation: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  rentalDateTime: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  priceBreakdownSection: {
    marginBottom: spacing.md,
  },
  totalRow: {
    paddingTop: spacing.xs,
  },
  featuresSection: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  stickyBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.tabBorder,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});

export default CarDetailsScreen;
