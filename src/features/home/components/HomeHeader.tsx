import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type HomeHeaderProps = {
  businessName: string;
  onPressBusiness: () => void;
  onPressSupport?: () => void;
  onPressNotifications?: () => void;
  hasNotifications?: boolean;
};

/** Navy top row: business switcher on the left, support + notifications right. */
export function HomeHeader({
  businessName,
  onPressBusiness,
  onPressSupport,
  onPressNotifications,
  hasNotifications = true,
}: HomeHeaderProps) {
  const { colors, radius } = useTheme();
  const onInverse = colors.text.onBrand;

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Switch business. Current: ${businessName}`}
        onPress={onPressBusiness}
        style={({ pressed }) => [styles.business, { opacity: pressed ? 0.7 : 1 }]}
      >
        <View style={[styles.tile, { borderRadius: radius.sm }]}>
          <Icon name="store" size={18} color={onInverse} />
        </View>
        <Text variant="h4" color="onBrand" numberOfLines={1} style={styles.name}>
          {businessName}
        </Text>
        <Icon name="chevron-down" size={20} color={onInverse} />
      </Pressable>

      <View style={styles.actions}>
        <Pressable accessibilityRole="button" accessibilityLabel="Support" hitSlop={8} onPress={onPressSupport}>
          <Icon name="headphones" size={24} color={onInverse} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" hitSlop={8} onPress={onPressNotifications}>
          <View>
            <Icon name="bell" size={24} color={onInverse} />
            {hasNotifications ? <View style={styles.dot} /> : null}
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  business: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  tile: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  name: {
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E0501E',
  },
});
