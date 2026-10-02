import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

export interface InfoRowProps {
  label: string;
  value: string;
  isBold?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  isBold = false,
  style,
  labelStyle,
  valueStyle,
}) => {
  return (
    <View style={[styles.row, style]}>
      <Text
        style={[
          styles.label,
          isBold && styles.boldText,
          labelStyle,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          isBold && styles.boldText,
          valueStyle,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
  },
  boldText: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
});
