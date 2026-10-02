import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

export interface FeatureRowProps {
  text: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const FeatureRow: React.FC<FeatureRowProps> = ({
  text,
  icon,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.iconContainer}>
        {icon ?? (
          <Ionicons
            name="checkbox"
            size={20}
            color={colors.primary}
          />
        )}
      </View>
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
});
