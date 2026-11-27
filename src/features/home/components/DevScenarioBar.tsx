import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/components/Text';
import { useDevStore } from '@/store/dev';
import { useSessionStore } from '@/store/session';
import type { HomeScenario } from '../api';

const SCENARIOS: { value: HomeScenario; label: string }[] = [
  { value: 'main', label: 'Main' },
  { value: 'empty', label: 'Empty' },
  { value: 'stale', label: 'Stale' },
  { value: 'pending', label: 'Pending' },
  { value: 'error', label: 'Error' },
];

/** DEV-ONLY: flip Home between the design's states. Gate behind __DEV__. */
export function DevScenarioBar() {
  const { colors, radius } = useTheme();
  const scenario = useDevStore(s => s.scenario);
  const setScenario = useDevStore(s => s.setScenario);
  const balanceVisible = useSessionStore(s => s.balanceVisible);
  const toggleBalanceVisible = useSessionStore(s => s.toggleBalanceVisible);

  const Pill = ({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        { borderRadius: radius.full, backgroundColor: active ? colors.brand.strong : colors.bg.secondary },
      ]}
    >
      <Text variant="labelSmall" style={{ color: active ? colors.text.onBrand : colors.text.secondary }}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View style={[styles.bar, { backgroundColor: colors.bg.surface, borderTopColor: colors.border.default }]}>
      <Text variant="caption" color="tertiary" style={styles.tag}>
        DEV
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
        {SCENARIOS.map(s => (
          <Pill key={s.value} active={scenario === s.value} label={s.label} onPress={() => setScenario(s.value)} />
        ))}
        <Pill active={!balanceVisible} label={balanceVisible ? 'Hide ₦' : 'Shown ✕'} onPress={toggleBalanceVisible} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tag: {
    fontWeight: '700',
  },
  pills: {
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
