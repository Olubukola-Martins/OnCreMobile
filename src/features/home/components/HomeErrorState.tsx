import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type HomeErrorStateProps = {
  onRetry: () => void;
  retrying?: boolean;
};

/** First load failed and there is no saved balance (design 4.7). */
export function HomeErrorState({ onRetry, retrying = false }: HomeErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.bg.secondary }]}>
        <Icon name="alert-circle" size={28} color={colors.text.secondary} />
      </View>
      <Text variant="h3" color="primary" align="center" style={styles.title}>
        We couldn't load your home
      </Text>
      <Text variant="body" color="secondary" align="center" style={styles.body}>
        Check your connection and try again. Your money is safe.
      </Text>
      <Button label="Retry" onPress={onRetry} loading={retrying} fullWidth={false} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
  },
  body: {
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 48,
  },
});
