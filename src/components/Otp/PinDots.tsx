import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

export type PinDotsProps = {
  length?: number;
  filled: number;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** PIN progress dots — filled (navy) vs empty (outlined). */
export function PinDots({ length = 6, filled, error = false, style }: PinDotsProps) {
  const { colors } = useTheme();
  const activeColor = error ? colors.status.error.fg : colors.control.checkOn;

  return (
    <View style={[styles.row, style]}>
      {Array.from({ length }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              isFilled
                ? { backgroundColor: activeColor, borderColor: activeColor }
                : { backgroundColor: 'transparent', borderColor: colors.border.strong },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.75,
  },
});
