import React from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radii, typography } from '../theme';

export interface ImagePlaceholderProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  backgroundColor?: string;
  text?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = '100%',
  height = 100,
  borderRadius = radii.lg,
  backgroundColor = colors.surface,
  text = 'IMG',
  textColor = colors.textSecondary,
  style,
  textStyle,
  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      {text ? (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    letterSpacing: 1.5,
  },
});
