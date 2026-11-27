import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type TopBarProps = {
  /** Leading affordance. */
  leading?: 'back' | 'close' | 'none';
  onLeadingPress?: () => void;
  title?: string;
  /** Right-aligned actions (icon buttons etc.). */
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Top bar — 56px tall with a 44px tap target. */
export function TopBar({ leading = 'back', onLeadingPress, title, right, style }: TopBarProps) {
  const { colors, sizing } = useTheme();

  return (
    <View style={[styles.bar, { height: sizing.topBarHeight }, style]}>
      <View style={styles.side}>
        {leading !== 'none' ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={leading === 'back' ? 'Go back' : 'Close'}
            onPress={onLeadingPress}
            hitSlop={8}
            style={({ pressed }) => [
              styles.tapTarget,
              { width: sizing.minTapTarget, height: sizing.minTapTarget, opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Icon name={leading === 'back' ? 'arrow-left' : 'x'} size={24} color={colors.text.primary} />
          </Pressable>
        ) : null}
      </View>

      {title ? (
        <Text variant="h4" color="primary" numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      ) : (
        <View style={styles.title} />
      )}

      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  side: {
    minWidth: 44,
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  tapTarget: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
