import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

export type ProgressBarProps = {
  /** 0–1. Clamped. */
  value: number;
  /** Track/fill colours. On navy surfaces pass lighter colours via props. */
  trackColor?: string;
  fillColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/** Thin progress track used on the stat cards (% back / % repaid). */
export function ProgressBar({
  value,
  trackColor,
  fillColor,
  height = 6,
  style,
}: ProgressBarProps) {
  const { colors, radius } = useTheme();
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ now: Math.round(clamped * 100), min: 0, max: 100 }}
      style={[
        styles.track,
        {
          height,
          borderRadius: radius.full,
          backgroundColor: trackColor ?? colors.bg.secondary,
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          borderRadius: radius.full,
          backgroundColor: fillColor ?? colors.brand.strong,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});
