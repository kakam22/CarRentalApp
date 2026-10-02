import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

export interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.leftContainer}>
        {leftIcon ? (
          <Pressable
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={onLeftPress}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            {leftIcon}
          </Pressable>
        ) : null}
      </View>

      <View style={styles.centerContainer}>
        {title ? (
          <Text numberOfLines={1} style={[styles.title, titleStyle]}>
            {title}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {rightIcon ? (
          <Pressable
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={onRightPress}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  iconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
