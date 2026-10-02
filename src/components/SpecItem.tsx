import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

export interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const SpecItem: React.FC<SpecItemProps> = ({
  icon,
  label,
  style,
  boxStyle,
  labelStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.box, boxStyle]}>
        {icon}
      </View>
      <Text numberOfLines={1} style={[styles.label, labelStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
  },
  box: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    backgroundColor: colors.specBoxBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
