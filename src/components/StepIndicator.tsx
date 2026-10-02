import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

export interface StepIndicatorProps {
  steps: string[];
  // Zero-based index of the step the user is on.
  currentStep: number;
  style?: StyleProp<ViewStyle>;
}

// Numbered progress bar for the booking flow (Details → Payment → Confirm).
export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* One line runs behind all circles, from the first center to the last. */}
      <View style={styles.connector} />
      {steps.map((label, index) => {
        const isActive = index <= currentStep;
        return (
          <View key={label} style={styles.step}>
            <View style={[styles.circle, isActive && styles.circleActive]}>
              <Text style={[styles.number, isActive && styles.numberActive]}>{index + 1}</Text>
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
};

const CIRCLE_SIZE = 28;
const STEP_WIDTH = 52;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  step: {
    width: STEP_WIDTH,
    alignItems: 'center',
  },
  connector: {
    position: 'absolute',
    top: CIRCLE_SIZE / 2 - 1,
    left: STEP_WIDTH / 2,
    right: STEP_WIDTH / 2,
    height: 2,
    backgroundColor: colors.borderLight,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  number: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  numberActive: {
    color: colors.textLight,
  },
  label: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs - 2,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
