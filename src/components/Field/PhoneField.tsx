import React, { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { fontFamily, useTheme } from '@/theme';
import { Text } from '@/components/Text';
import { FieldShell } from './FieldShell';

export type PhoneFieldProps = Omit<TextInputProps, 'style' | 'keyboardType'> & {
  label?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  /** Dialling code shown in the prefix. */
  dialCode?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

/** Minimal Nigeria flag drawn with views (green | white | green). */
function NigeriaFlag() {
  return (
    <View style={styles.flag}>
      <View style={[styles.stripe, { backgroundColor: '#008751' }]} />
      <View style={[styles.stripe, { backgroundColor: '#FFFFFF' }]} />
      <View style={[styles.stripe, { backgroundColor: '#008751' }]} />
    </View>
  );
}

/** Phone number field with a country prefix. */
export const PhoneField = forwardRef<React.ComponentRef<typeof TextInput>, PhoneFieldProps>(function PhoneField(
  {
    label = 'Phone number',
    helper,
    error,
    disabled,
    dialCode = '+234',
    containerStyle,
    onFocus,
    onBlur,
    editable,
    placeholder = '801 234 5678',
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
      style={containerStyle}
      leading={
        <View style={styles.prefix}>
          <NigeriaFlag />
          <Text variant="bodyStrong" color="primary">
            {dialCode}
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.border.default }]} />
        </View>
      }
    >
      <TextInput
        ref={ref}
        editable={editable ?? !disabled}
        keyboardType="phone-pad"
        placeholder={placeholder}
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
  prefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    width: 20,
    height: 14,
    flexDirection: 'row',
    borderRadius: 2,
    overflow: 'hidden',
  },
  stripe: {
    flex: 1,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginLeft: 2,
  },
});
