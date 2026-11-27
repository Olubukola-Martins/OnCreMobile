import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

export type RadioProps = {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  size?: number;
  accessibilityLabel?: string;
};

/** Radio — ring with a navy centre dot when selected. */
export function Radio({ selected, onSelect, disabled, size = 24, accessibilityLabel }: RadioProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onSelect}
      hitSlop={10}
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.75,
          borderColor: selected ? colors.control.checkOn : colors.border.strong,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {selected ? (
        <View
          style={{
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: size * 0.25,
            backgroundColor: colors.control.checkOn,
          }}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
