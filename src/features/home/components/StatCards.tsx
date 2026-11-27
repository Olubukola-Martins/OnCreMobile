import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Text } from '@/components/Text';
import { formatNairaShort } from '@/lib/currency';
import type { HomeData } from '../api';

export type StatCardsProps = {
  stats: HomeData['stats'];
  /** When balance is hidden, amounts become dots and captions drop the figure. */
  hidden?: boolean;
};

type StatProps = {
  label: string;
  headlineKobo: number;
  captionKobo: number;
  pct: number;
  captionWord: string; // "back" | "repaid"
  hidden: boolean;
};

function Stat({ label, headlineKobo, captionKobo, pct, captionWord, hidden }: StatProps) {
  const { colors } = useTheme();
  const pctText = `${Math.round(pct * 100)}%`;

  return (
    <Card surface="subtle" padding="md" style={styles.card}>
      <Text variant="caption" color="secondary">
        {label}
      </Text>
      <Text variant="amountMedium" color="primary" style={styles.amount}>
        {hidden ? '₦ ••••' : formatNairaShort(headlineKobo)}
      </Text>
      <ProgressBar value={pct} fillColor={colors.brand.strong} style={styles.progress} />
      <Text variant="caption" color="tertiary">
        {hidden ? `${pctText} ${captionWord}` : `${formatNairaShort(captionKobo)} ${captionWord} · ${pctText}`}
      </Text>
    </Card>
  );
}

/** With OnCRE (owed on open cases) and Credit out (owed on credit given). */
export function StatCards({ stats, hidden = false }: StatCardsProps) {
  return (
    <View style={styles.row}>
      <Stat
        label="With OnCRE"
        headlineKobo={stats.withOncreKobo}
        captionKobo={stats.backAmountKobo}
        pct={stats.backPct}
        captionWord="back"
        hidden={hidden}
      />
      <Stat
        label="Credit out"
        headlineKobo={stats.creditOutKobo}
        captionKobo={stats.repaidAmountKobo}
        pct={stats.repaidPct}
        captionWord="repaid"
        hidden={hidden}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    gap: 6,
  },
  amount: {
    marginTop: 2,
  },
  progress: {
    marginTop: 6,
    marginBottom: 2,
  },
});
