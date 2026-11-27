import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/Text';

export type HomeAction = {
  key: string;
  label: string;
  icon: IconName;
  /** The one emphasised (white) tile. */
  primary?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export const DEFAULT_ACTIONS: Omit<HomeAction, 'onPress'>[] = [
  { key: 'add-debt', label: 'Add debt', icon: 'plus', primary: true },
  { key: 'give-credit', label: 'Give credit', icon: 'store' },
  { key: 'fund', label: 'Fund', icon: 'wallet' },
  { key: 'send', label: 'Send', icon: 'arrow-left-right' },
];

function ActionTile({ label, icon, primary, disabled, onPress }: Omit<HomeAction, 'key'>) {
  const { colors } = useTheme();
  const bg = primary ? colors.bg.surface : 'rgba(255,255,255,0.14)';
  const fg = primary ? colors.brand.strong : colors.text.onBrand;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 }]}
    >
      <View style={[styles.circle, { backgroundColor: bg }]}>
        <Icon name={icon} size={24} color={fg} />
      </View>
      <Text variant="labelSmall" color="onBrand">
        {label}
      </Text>
    </Pressable>
  );
}

export type ActionTilesProps = {
  actions: HomeAction[];
};

/** Row of primary wallet actions on the navy hero. */
export function ActionTiles({ actions }: ActionTilesProps) {
  return (
    <View style={styles.row}>
      {actions.map(({ key, ...rest }) => (
        <ActionTile key={key} {...rest} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tile: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
