import React, { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type FieldShellProps = {
  label?: string;
  helper?: string;
  /** When set, the field renders in its error state (red border + helper). */
  error?: string;
  focused?: boolean;
  disabled?: boolean;
  /** Content inside the box (TextInput, value text, picker trigger …). */
  children: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Shared frame for all inputs: label inside a 56px box, helper or error beneath.
 * Focus uses a navy border; errors keep what was typed and say what to fix.
 */
export function FieldShell({
  label,
  helper,
  error,
  focused = false,
  disabled = false,
  children,
  leading,
  trailing,
  style,
}: FieldShellProps) {
  const { colors, radius, sizing } = useTheme();
  const hasError = !!error;

  const borderColor = hasError
    ? colors.status.error.fg
    : focused
      ? colors.border.focus
      : colors.border.default;

  const labelColor = hasError ? 'secondary' : focused ? 'brand' : 'secondary';

  return (
    <View style={style}>
      <View
        style={[
          styles.box,
          {
            minHeight: sizing.inputHeight,
            borderRadius: radius.md,
            borderColor,
            borderWidth: focused || hasError ? 1.75 : 1,
            backgroundColor: disabled ? colors.bg.secondary : colors.bg.surface,
          },
        ]}
      >
        {leading ? <View style={styles.leading}>{leading}</View> : null}
        <View style={styles.content}>
          {label ? (
            <Text variant="labelSmall" color={labelColor}>
              {label}
            </Text>
          ) : null}
          {children}
        </View>
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>

      {hasError ? (
        <View style={styles.helperRow}>
          <Icon name="alert-circle" size={14} color={colors.status.error.fg} />
          <Text variant="caption" style={{ color: colors.status.error.fg }}>
            {error}
          </Text>
        </View>
      ) : helper ? (
        <Text variant="caption" color="tertiary" style={styles.helper}>
          {helper}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  leading: {
    justifyContent: 'center',
  },
  trailing: {
    justifyContent: 'center',
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  helper: {
    marginTop: 6,
  },
});
