import React, { forwardRef, useState, type ReactNode } from 'react';
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { fontFamily, useTheme } from '@/theme';
import { FieldShell } from './FieldShell';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

/** Standard text input: label above the typed value, helper/error beneath. */
export const TextField = forwardRef<React.ComponentRef<typeof TextInput>, TextFieldProps>(function TextField(
  {
    label,
    helper,
    error,
    disabled,
    leading,
    trailing,
    containerStyle,
    onFocus,
    onBlur,
    editable,
    ...rest
  },
  ref,
) {
  const { colors, typography } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <FieldShell
      label={label}
      helper={helper}
      error={error}
      focused={focused}
      disabled={disabled}
      leading={leading}
      trailing={trailing}
      style={containerStyle}
    >
      <TextInput
        ref={ref}
        editable={editable ?? !disabled}
        placeholderTextColor={colors.text.tertiary}
        style={[
          styles.input,
          typography.bodyLarge,
          { color: disabled ? colors.text.disabled : colors.text.primary, fontFamily },
        ]}
        onFocus={e => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
    </FieldShell>
  );
});

const styles = StyleSheet.create({
  input: {
    padding: 0,
    margin: 0,
  },
});
