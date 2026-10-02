import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

export interface DividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<DividerProps> = ({
  color = colors.divider,
  thickness = 1,
  marginVertical = spacing.lg,
  style,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
