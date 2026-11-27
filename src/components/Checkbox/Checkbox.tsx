import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: number;
  accessibilityLabel?: string;
};

/** Checkbox — navy filled circle with a white check when on. */
export function Checkbox({
  checked,
  onChange,
  disabled,
  size = 24,
  accessibilityLabel,
}: CheckboxProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      hitSlop={10}
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: checked ? colors.control.checkOn : 'transparent',
          borderWidth: checked ? 0 : 1.75,
          borderColor: colors.border.strong,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {checked ? <Icon name="check" size={size * 0.62} color={colors.text.onBrand} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
