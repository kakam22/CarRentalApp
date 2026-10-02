import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  CarCard,
  FilterChip,
  Header,
  ImagePlaceholder,
  SearchBar,
} from '../components';
import { mockCars } from '../data/mockCars';
import { colors, radii, spacing, typography } from '../theme';
import { Car } from '../types';

export interface SearchScreenProps {
  userName?: string;
  onSelectCar?: (carId: string) => void;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
  onMenuPress?: () => void;
  onHeaderRightPress?: () => void;
}

const FILTER_OPTIONS = ['Price', 'Car Type', 'Transmission', 'Seats'];

export const SearchScreen: React.FC<SearchScreenProps> = ({
  userName = 'User Name',
  onSelectCar,
  onSearchPress,
  onFilterPress,
  onMenuPress,
  onHeaderRightPress,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleCarPress = (carId: string) => {
    if (onSelectCar) {
      onSelectCar(carId);
      return;
    }
    router.push({ pathname: '/car-details', params: { carId } });
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter));
  };

  // Header, Hero, Floating Search Bar, and Filter Chips inside ListHeaderComponent
  // so the whole page scrolls smoothly as one single page.
  const renderListHeader = () => (
    <View style={styles.listHeaderContainer}>
      {/* Hero Section */}
      <View style={styles.heroWrapper}>
        <ImagePlaceholder
          height={spacing.heroHeight}
          borderRadius={radii.none}
          backgroundColor={colors.heroSurface}
          text="IMG"
          textColor={colors.textSecondary}
        />

        {/* Hero Text Overlay */}
        <View style={styles.heroTextOverlay}>
          <Text style={styles.heroGreeting}>Hello, {userName}</Text>
          <Text style={styles.heroSubtitle}>{"What's your next destination?"}</Text>
        </View>
      </View>

      {/* Floating Search Bar */}
      <View style={styles.searchBarWrapper}>
        <SearchBar
          title="Search for destinations?"
          subtitle="Anywhere • Anytime"
          onPress={onSearchPress ?? (() => console.log('Search pressed'))}
          onFilterPress={onFilterPress ?? (() => console.log('Filter pressed'))}
        />
      </View>

      {/* Filter Chips Horizontal Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipsScroll}
        style={styles.filterChipsContainer}
      >
        {FILTER_OPTIONS.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <FilterChip
              key={filter}
              label={filter}
              selected={isSelected}
              onPress={() => handleFilterToggle(filter)}
              style={styles.chipItem}
            />
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Screen Header */}
      <Header
        title="CarRental"
        leftIcon={<Ionicons name="menu-outline" size={26} color={colors.textPrimary} />}
        onLeftPress={onMenuPress ?? (() => console.log('Menu opened'))}
        rightIcon={
          <Ionicons name="add-circle-outline" size={26} color={colors.textPrimary} />
        }
        onRightPress={onHeaderRightPress ?? (() => console.log('Header action pressed'))}
      />

      {/* Main Single-Scrollable List */}
      <FlatList
        data={mockCars}
        keyExtractor={(item: Car) => item.id}
        renderItem={({ item }: { item: Car }) => (
          <CarCard car={item} onPress={handleCarPress} />
        )}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listHeaderContainer: {
    marginBottom: spacing.md,
  },
  heroWrapper: {
    position: 'relative',
    width: '100%',
    height: spacing.heroHeight,
    overflow: 'hidden',
  },
  heroTextOverlay: {
    position: 'absolute',
    bottom: 44,
    left: spacing.lg,
    right: spacing.lg,
  },
  heroGreeting: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.heroTitle,
    fontWeight: typography.weights.bold,
    color: colors.textLight,
    marginBottom: spacing.xxs,
  },
  heroSubtitle: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textLight,
    opacity: 0.85,
  },
  searchBarWrapper: {
    marginTop: -28,
    zIndex: 10,
  },
  filterChipsContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  filterChipsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chipItem: {
    marginRight: spacing.xs,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
});

export default SearchScreen;
