import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Skeleton } from '@/components/Skeleton';

/** Skeleton shown until the balance and lists return (design 4.3). */
export function HomeSkeleton() {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
      <View style={[styles.hero, { backgroundColor: colors.bg.inverse, paddingTop: insets.top + spacing.xs }]}>
        <View style={styles.heroHeader}>
          <Skeleton onInverse width={180} height={20} radiusValue={6} />
        </View>
        <Skeleton onInverse width={220} height={40} radiusValue={8} style={{ marginTop: 20 }} />
        <Skeleton onInverse width={120} height={16} radiusValue={6} style={{ marginTop: 12 }} />
        <View style={styles.tiles}>
          {[0, 1, 2, 3].map(i => (
            <Skeleton key={i} onInverse width={56} height={56} radiusValue={28} />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statRow}>
          <Skeleton height={92} radiusValue={16} style={{ flex: 1 }} />
          <Skeleton height={92} radiusValue={16} style={{ flex: 1 }} />
        </View>
        <Skeleton width={160} height={20} radiusValue={6} style={{ marginTop: 24 }} />
        <Skeleton height={64} radiusValue={16} style={{ marginTop: 12 }} />
        <Skeleton height={64} radiusValue={16} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroHeader: {
    marginTop: 8,
  },
  tiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
