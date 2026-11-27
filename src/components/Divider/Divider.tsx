import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

export type DividerProps = {
  /** Inset from both ends (e.g. to clear a list row's leading icon). */
  inset?: number;
  style?: StyleProp<ViewStyle>;
};

/** Hairline separator between list rows. */
export function Divider({ inset = 0, style }: DividerProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.border.default,
          marginLeft: inset,
        },
        style,
      ]}
    />
  );
}
