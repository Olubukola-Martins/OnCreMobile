import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/Text';

/** Icon per route — five tabs with one-word labels. */
export const TAB_ICONS: Record<string, IconName> = {
  Home: 'home',
  Wallet: 'wallet',
  Recovery: 'loader',
  Credit: 'store',
  More: 'layout-grid',
};

/** Custom bottom tab bar: active tab is navy, inactive is muted grey. */
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.bg.surface,
          borderTopColor: colors.border.default,
          paddingBottom: Math.max(insets.bottom, spacing.xs),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key]!;
        const label = (options.title ?? route.name) as string;
        const color = focused ? colors.text.primary : colors.text.tertiary;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={styles.tab}
          >
            <Icon name={TAB_ICONS[route.name] ?? 'home'} size={24} color={color} />
            <Text variant="labelSmall" style={{ color }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
});
