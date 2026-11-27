import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Text } from '@/components/Text';

export type ScreenTitleProps = {
  title: string;
  /** One or two short sentences that say what this step is for. */
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
};

/** Step/screen title block. */
export function ScreenTitle({ title, subtitle, style }: ScreenTitleProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h2" color="primary">
        {title}
      </Text>
      {subtitle ? (
        <Text variant="bodyLarge" color="secondary" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  subtitle: {
    marginTop: 4,
  },
});
