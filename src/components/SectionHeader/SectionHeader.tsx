import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type SectionHeaderProps = {
  title: string;
  /** Optional count pill (e.g. Action needed · 3). */
  count?: number;
  /** When set, shows a > affordance and makes the header tappable. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Section header with an optional count badge and "see all" chevron. */
export function SectionHeader({ title, count, onPress, style }: SectionHeaderProps) {
  const { colors, radius } = useTheme();

  const content = (
    <>
      <View style={styles.left}>
        <Text variant="h4" color="primary">
          {title}
        </Text>
        {count !== undefined ? (
          <View style={[styles.count, { backgroundColor: colors.status.warning.fg, borderRadius: radius.full }]}>
            <Text variant="labelSmall" style={{ color: colors.text.onBrand }}>
              {count}
            </Text>
          </View>
        ) : null}
      </View>
      {onPress ? <Icon name="chevron-right" size={20} color={colors.text.tertiary} /> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.row, { opacity: pressed ? 0.6 : 1 }, style]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.row, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  count: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
