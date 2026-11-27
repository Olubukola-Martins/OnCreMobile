import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Radio } from '@/components/Radio';
import { Text } from '@/components/Text';

export type ChoiceCardProps = {
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  /** Optional leading icon in a subtle tile. */
  leadingIcon?: IconName;
  leading?: ReactNode;
  disabled?: boolean;
};

/** Choice card for picking one option (BVN or NIN, full or part payment …). */
export function ChoiceCard({
  title,
  description,
  selected,
  onSelect,
  leadingIcon,
  leading,
  disabled,
}: ChoiceCardProps) {
  const { colors, radius } = useTheme();

  const leadingNode =
    leading ??
    (leadingIcon ? (
      <View style={[styles.tile, { borderRadius: radius.sm, backgroundColor: colors.bg.subtle }]}>
        <Icon name={leadingIcon} size={20} color={colors.text.primary} />
      </View>
    ) : null);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        {
          borderRadius: radius.md,
          backgroundColor: colors.bg.surface,
          borderColor: selected ? colors.border.brand : colors.border.default,
          borderWidth: selected ? 1.75 : 1,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
    >
      {leadingNode}
      <View style={styles.body}>
        <Text variant="bodyStrong" color="primary">
          {title}
        </Text>
        {description ? (
          <Text variant="body" color="secondary">
            {description}
          </Text>
        ) : null}
      </View>
      <Radio selected={selected} onSelect={onSelect} disabled={disabled} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  tile: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
