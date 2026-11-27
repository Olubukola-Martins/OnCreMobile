import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/components/Text';

export type StepProgressProps = {
  current: number; // 1-based
  total: number;
  /** Show the "Step x of n" caption. */
  showLabel?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Segmented progress for multi-step flows (e.g. sign up: 5 steps). */
export function StepProgress({ current, total, showLabel = true, style }: StepProgressProps) {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.segments}>
        {Array.from({ length: total }).map((_, i) => {
          const done = i < current;
          return (
            <View
              key={i}
              style={[
                styles.segment,
                {
                  borderRadius: radius.full,
                  backgroundColor: done ? colors.brand.strong : colors.bg.secondary,
                },
              ]}
            />
          );
        })}
      </View>
      {showLabel ? (
        <Text variant="caption" color="secondary">
          Step {current} of {total}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  segments: {
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 4,
  },
});
