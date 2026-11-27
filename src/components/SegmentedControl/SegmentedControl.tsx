import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/components/Text';

export type SegmentedControlProps<T extends string> = {
  options: ReadonlyArray<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};

/** Pill filter/segment control. Selected segment is navy. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps<T>) {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.row, style]}>
      {options.map(option => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              {
                borderRadius: radius.full,
                backgroundColor: selected ? colors.brand.strong : colors.bg.secondary,
              },
            ]}
          >
            <Text variant="bodyStrong" style={{ color: selected ? colors.text.onBrand : colors.text.secondary }}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  segment: {
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
});
