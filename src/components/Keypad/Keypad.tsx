import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type KeypadProps = {
  onPressKey: (digit: string) => void;
  onDelete: () => void;
  /** Shows a biometric key in the bottom-left (e.g. Face ID). */
  onBiometric?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

type Key = { type: 'digit'; value: string } | { type: 'bio' } | { type: 'delete' } | { type: 'empty' };

/** One custom keypad for PIN and amounts. Keys are 64px tall with no fill. */
export function Keypad({ onPressKey, onDelete, onBiometric, disabled, style }: KeypadProps) {
  const { colors, sizing } = useTheme();

  const keys: Key[] = [
    ...['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
      (value): Key => ({ type: 'digit', value }),
    ),
    onBiometric ? { type: 'bio' } : { type: 'empty' },
    { type: 'digit', value: '0' },
    { type: 'delete' },
  ];

  const handlePress = (key: Key) => {
    if (disabled) return;
    if (key.type === 'digit') onPressKey(key.value);
    else if (key.type === 'delete') onDelete();
    else if (key.type === 'bio') onBiometric?.();
  };

  return (
    <View style={[styles.grid, style]}>
      {keys.map((key, i) => {
        const pressable = key.type !== 'empty';
        return (
          <Pressable
            key={i}
            disabled={!pressable || disabled}
            onPress={() => handlePress(key)}
            accessibilityRole={pressable ? 'button' : undefined}
            accessibilityLabel={
              key.type === 'digit'
                ? key.value
                : key.type === 'delete'
                  ? 'Delete'
                  : key.type === 'bio'
                    ? 'Use biometrics'
                    : undefined
            }
            style={({ pressed }) => [
              styles.key,
              { height: sizing.keypadKeyHeight, opacity: pressed ? 0.5 : 1 },
            ]}
          >
            {key.type === 'digit' ? (
              <Text variant="h2" color="primary">
                {key.value}
              </Text>
            ) : key.type === 'delete' ? (
              <Icon name="delete" size={24} color={colors.text.primary} />
            ) : key.type === 'bio' ? (
              <Icon name="scan-face" size={24} color={colors.text.primary} />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  key: {
    width: '33.333%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
