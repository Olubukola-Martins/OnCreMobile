import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/components/Text';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'error';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
};

/** Small status pill. Status colour lives only in badges and inline alerts. */
export function Badge({ label, tone = 'neutral', style }: BadgeProps) {
  const { colors, radius } = useTheme();

  const palette: Record<BadgeTone, { bg: string; fg: string }> = {
    neutral: { bg: colors.bg.secondary, fg: colors.text.secondary },
    brand: { bg: colors.brand.subtle, fg: colors.brand.strong },
    success: { bg: colors.status.success.bg, fg: colors.status.success.fg },
    warning: { bg: colors.status.warning.bg, fg: colors.status.warning.fg },
    error: { bg: colors.status.error.bg, fg: colors.status.error.fg },
  };
  const { bg, fg } = palette[tone];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, borderRadius: radius.full },
        style,
      ]}
    >
      <Text variant="labelSmall" style={{ color: fg }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
