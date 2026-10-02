import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import { colors, spacing, typography } from '../theme';

export const TripsScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header title="My Trips" />
      <View style={styles.content}>
        <Text style={styles.title}>No active trips</Text>
        <Text style={styles.subtitle}>Your booked rentals will appear here.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default TripsScreen;
