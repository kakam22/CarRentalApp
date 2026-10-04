import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, SegmentedControl, TripCard } from '../components';
import { mockTrips } from '../data/mockTrips';
import { colors, spacing, typography } from '../theme';
import { Trip, TripPeriod } from '../../../../Downloads/trips-changes/trips-changes/src/types';

export interface TripsScreenProps {
  trips?: Trip[];
  onSelectTrip?: (tripId: string) => void;
  onBrowseCars?: () => void;
}

const PERIOD_OPTIONS: { value: TripPeriod; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

export const TripsScreen: React.FC<TripsScreenProps> = ({
  trips = mockTrips,
  onSelectTrip,
  onBrowseCars,
}) => {
  const [period, setPeriod] = useState<TripPeriod>('upcoming');

  const visibleTrips = trips.filter((trip) => trip.period === period);

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.title}>My Trips</Text>
      <SegmentedControl options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>
        {period === 'upcoming' ? 'No upcoming trips' : 'No past trips'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {period === 'upcoming'
          ? 'Your booked rentals will appear here.'
          : 'Completed and cancelled rentals will appear here.'}
      </Text>
      {period === 'upcoming' && onBrowseCars ? (
        <PrimaryButton title="Browse cars" onPress={onBrowseCars} style={styles.emptyButton} />
      ) : null}
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        data={visibleTrips}
        keyExtractor={(item: Trip) => item.id}
        renderItem={({ item }: { item: Trip }) => (
          <TripCard trip={item} onPress={onSelectTrip} />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  listHeader: {
    paddingTop: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
  },
  emptyTitle: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyButton: {
    width: undefined,
    alignSelf: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xxxl,
  },
});

export default TripsScreen;
