import React, { type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';
import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/Text';

export type ListRowProps = {
  title: string;
  description?: string;
  /** Convenience leading: an icon inside a subtle rounded tile. */
  leadingIcon?: IconName;
  /** Full control of the leading slot (e.g. an <Avatar>). Wins over leadingIcon. */
  leading?: ReactNode;
  /** Right-aligned primary + secondary text (e.g. amount + due date). */
  trailingText?: { primary: string; secondary?: string };
  /** Full control of the trailing slot (toggle, custom node). Wins over chevron. */
  trailing?: ReactNode;
  /** Show the > affordance (ignored if `trailing` is provided). */
  showChevron?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Leading icon in a subtle rounded tile — reused across rows. */
export function IconTile({ name, size = 40 }: { name: IconName; size?: number }) {
  const { colors, radius } = useTheme();
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: radius.md,
          backgroundColor: colors.bg.subtle,
        },
      ]}
    >
      <Icon name={name} size={20} color={colors.text.primary} />
    </View>
  );
}

export function ListRow({
  title,
  description,
  leadingIcon,
  leading,
  trailingText,
  trailing,
  showChevron = false,
  onPress,
  style,
}: ListRowProps) {
  const { colors } = useTheme();

  const leadingNode =
    leading ?? (leadingIcon ? <IconTile name={leadingIcon} /> : null);

  const trailingNode = trailing ?? (
    <View style={styles.trailing}>
      {trailingText ? (
        <View style={styles.trailingText}>
          <Text variant="bodyStrong" color="primary">
            {trailingText.primary}
          </Text>
          {trailingText.secondary ? (
            <Text variant="caption" color="tertiary">
              {trailingText.secondary}
            </Text>
          ) : null}
        </View>
      ) : null}
      {showChevron ? (
        <Icon name="chevron-right" size={20} color={colors.text.tertiary} />
      ) : null}
    </View>
  );

  const Container = onPress ? Pressable : View;

  return (
    <Container
      {...(onPress
        ? { onPress, accessibilityRole: 'button', style: ({ pressed }: { pressed: boolean }) => [styles.row, { opacity: pressed ? 0.6 : 1 }, style] }
        : { style: [styles.row, style] })}
    >
      {leadingNode ? <View style={styles.leading}>{leadingNode}</View> : null}
      <View style={styles.body}>
        <Text variant="bodyStrong" color="primary" numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text variant="body" color="secondary" numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>
      {trailingNode}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  leading: {},
  body: {
    flex: 1,
    gap: 2,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trailingText: {
    alignItems: 'flex-end',
    gap: 2,
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
