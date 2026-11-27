import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  /** Optional leading icon. */
  icon?: IconName;
  /** Full width by default (primary screen action). */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Pill button, 56px tall for shop-floor tapping. Blue is reserved for the one
 * primary action on a screen; secondary is quiet grey; ghost is a text link.
 */
export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  style,
  ...rest
}: ButtonProps) {
  const { colors, radius, sizing } = useTheme();
  const isDisabled = disabled || loading;

  const bg: Record<ButtonVariant, string> = {
    primary: colors.brand.primary,
    secondary: colors.bg.secondary,
    ghost: 'transparent',
  };
  const fg: Record<ButtonVariant, string> = {
    primary: colors.brand.onPrimary,
    secondary: colors.text.primary,
    ghost: colors.text.brand,
  };
  const disabledBg: Record<ButtonVariant, string> = {
    primary: colors.brand.disabledBg,
    secondary: colors.bg.secondary,
    ghost: 'transparent',
  };
  const disabledFg = colors.text.disabled;

  const backgroundColor = isDisabled ? disabledBg[variant] : bg[variant];
  const foregroundColor = isDisabled ? disabledFg : fg[variant];
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height: isGhost ? undefined : sizing.buttonHeight,
          borderRadius: radius.full,
          backgroundColor,
          paddingHorizontal: isGhost ? 8 : 24,
          opacity: pressed ? 0.85 : 1,
        },
        fullWidth && !isGhost ? styles.fullWidth : null,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={foregroundColor} />
      ) : (
        <View style={styles.content}>
          {icon ? (
            <Icon name={icon} size={20} color={foregroundColor} style={styles.icon} />
          ) : null}
          <Text variant="button" style={{ color: foregroundColor }}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});
