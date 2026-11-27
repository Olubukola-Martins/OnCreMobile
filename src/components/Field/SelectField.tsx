import React from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { FieldShell } from './FieldShell';

export type SelectFieldProps = {
  label?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  /** Selected value text. When empty the placeholder is shown. */
  value?: string;
  placeholder?: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

/** Select trigger — opens a picker (bottom sheet) handled by the caller. */
export function SelectField({
  label,
  helper,
  error,
  disabled,
  value,
  placeholder = 'Choose one',
  onPress,
  containerStyle,
}: SelectFieldProps) {
  const { colors } = useTheme();
  const hasValue = !!value;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={containerStyle}
    >
      <FieldShell
        label={label}
        helper={helper}
        error={error}
        disabled={disabled}
        trailing={<Icon name="chevron-down" size={20} color={colors.text.secondary} />}
      >
        <Text variant="bodyLarge" color={hasValue ? 'primary' : 'tertiary'}>
          {hasValue ? value : placeholder}
        </Text>
      </FieldShell>
    </Pressable>
  );
}
