import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/Text';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

export type InlineAlertProps = {
  message: string;
  tone?: AlertTone;
  style?: StyleProp<ViewStyle>;
};

const toneIcon: Record<AlertTone, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error: 'alert-circle',
};

/** Inline alert — the other place status colour is allowed to live. */
export function InlineAlert({ message, tone = 'info', style }: InlineAlertProps) {
  const { colors, radius } = useTheme();
  const roleColor =
    tone === 'info' ? colors.status.info : colors.status[tone];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: roleColor.bg, borderRadius: radius.md },
        style,
      ]}
    >
      <Icon name={toneIcon[tone]} size={20} color={roleColor.fg} style={styles.icon} />
      <Text variant="body" style={[styles.message, { color: roleColor.fg }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    gap: 8,
  },
  icon: {
    marginTop: 1,
  },
  message: {
    flex: 1,
  },
});
