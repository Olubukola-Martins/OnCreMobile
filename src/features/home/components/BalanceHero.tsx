import React, { useRef, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Badge } from '@/components/Badge';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { nairaParts } from '@/lib/currency';
import { ActionTiles, type HomeAction } from './ActionTiles';

export type BalanceHeroProps = {
  display: 'amount' | 'zero' | 'hidden' | 'none';
  kobo?: number;
  /** Line under the amount (delta, last-updated, "Fund your wallet to start" …). */
  subtitle: ReactNode;
  /** Show the eye toggle (hidden when the wallet is pending). */
  showEye?: boolean;
  balanceVisible?: boolean;
  onToggleVisible?: () => void;
  pending?: boolean;
  walletIdMasked?: string;
  onCopyWalletId?: () => void;
  actions: HomeAction[];
};

export function BalanceHero({
  display,
  kobo = 0,
  subtitle,
  showEye = true,
  balanceVisible = true,
  onToggleVisible,
  pending = false,
  walletIdMasked,
  onCopyWalletId,
  actions,
}: BalanceHeroProps) {
  const { colors } = useTheme();
  const onInverse = colors.text.onBrand;

  const parts = nairaParts(display === 'zero' ? 0 : kobo);

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    onCopyWalletId?.();
    setCopied(true);
    if (copyTimer.current) {
      clearTimeout(copyTimer.current);
    }
    copyTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text variant="body" color="onBrandMuted">
          Wallet balance
        </Text>
        {pending ? (
          <Badge label="Pending" tone="warning" />
        ) : showEye ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={balanceVisible ? 'Hide balance' : 'Show balance'}
            hitSlop={8}
            onPress={onToggleVisible}
          >
            <Icon name={balanceVisible ? 'eye' : 'eye-off'} size={18} color={colors.text.onBrandMuted} />
          </Pressable>
        ) : null}
      </View>

      {display === 'none' ? null : (
      <View style={styles.amountRow}>
        <Text variant="amountLarge" color="onBrand">
          {parts.symbol}
        </Text>
        {display === 'hidden' ? (
          <Text variant="amountLarge" color="onBrand" style={styles.dots}>
            {'• • • • • •'}
          </Text>
        ) : (
          <>
            <Text variant="amountLarge" color="onBrand">
              {parts.main}
            </Text>
            <Text variant="amountMedium" color="onBrandMuted" style={styles.decimals}>
              {parts.decimals}
            </Text>
          </>
        )}
      </View>
      )}

      <View style={styles.subtitle}>
        {typeof subtitle === 'string' ? (
          <Text variant="body" color="onBrandMuted">
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </View>

      {walletIdMasked ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Copy Wallet ID"
          onPress={handleCopy}
          hitSlop={8}
          style={({ pressed }) => [styles.walletChip, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text variant="labelSmall" color="onBrandMuted">
            {copied ? 'Wallet ID copied' : `Wallet ID ${walletIdMasked}`}
          </Text>
          <Icon name={copied ? 'check' : 'copy'} size={14} color={colors.text.onBrandMuted} />
        </Pressable>
      ) : null}

      <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.12)' }]} />

      <ActionTiles actions={actions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dots: {
    marginLeft: 6,
  },
  decimals: {
    marginLeft: 2,
  },
  subtitle: {
    marginTop: -4,
  },
  walletChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
});
