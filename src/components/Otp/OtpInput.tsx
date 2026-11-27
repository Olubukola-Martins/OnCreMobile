import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/components/Text';

export type OtpInputProps = {
  value: string;
  onChange: (code: string) => void;
  length?: number;
  error?: boolean;
  autoFocus?: boolean;
  onComplete?: (code: string) => void;
  style?: StyleProp<ViewStyle>;
};

/** Code cells for the 6-digit SMS code. A hidden input drives real keyboard entry. */
export function OtpInput({
  value,
  onChange,
  length = 6,
  error = false,
  autoFocus = false,
  onComplete,
  style,
}: OtpInputProps) {
  const { colors, radius } = useTheme();
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const [focused, setFocused] = useState(false);

  const cells = Array.from({ length });
  const activeIndex = Math.min(value.length, length - 1);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, length);
    onChange(digits);
    if (digits.length === length) {
      onComplete?.(digits);
    }
  };

  return (
    <Pressable style={[styles.row, style]} onPress={() => inputRef.current?.focus()}>
      {cells.map((_, i) => {
        const char = value[i];
        const isActive = focused && i === activeIndex;
        const borderColor = error
          ? colors.status.error.fg
          : isActive
            ? colors.border.focus
            : colors.border.default;
        return (
          <View
            key={i}
            style={[
              styles.cell,
              {
                borderRadius: radius.sm,
                borderColor,
                borderWidth: isActive || error ? 1.75 : 1,
                backgroundColor: colors.bg.surface,
              },
            ]}
          >
            <Text variant="h3" color="primary">
              {char ?? ''}
            </Text>
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.hiddenInput}
        caretHidden
      />
    </Pressable>
  );
}

const CELL = 48;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    width: CELL,
    height: CELL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
