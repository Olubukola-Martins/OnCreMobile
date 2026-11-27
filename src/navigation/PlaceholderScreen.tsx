import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/Text';

/** Simple stub for tabs not built yet. */
export function makePlaceholderScreen(title: string, icon: IconName) {
  return function PlaceholderScreen() {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.bg.canvas, paddingTop: insets.top }]}>
        <Icon name={icon} size={32} color={colors.text.tertiary} />
        <Text variant="h3" color="primary" style={styles.title}>
          {title}
        </Text>
        <Text variant="body" color="secondary">
          Coming soon.
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    marginTop: 8,
  },
});
