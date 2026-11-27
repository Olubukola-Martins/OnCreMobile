import React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import type { RadiusKey, SpacingKey } from '@/theme';

export type CardProps = ViewProps & {
  padding?: SpacingKey;
  radiusKey?: RadiusKey;
  /** Hairline border (list/choice cards sit on a bordered white card). */
  bordered?: boolean;
  /** `surface` = white, `subtle` = near-white, `secondary` = grey. */
  surface?: 'surface' | 'subtle' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

/** Grouped white card — the base container for stats, lists and choices. */
export function Card({
  padding = 'md',
  radiusKey = 'lg',
  bordered = false,
  surface = 'surface',
  style,
  children,
  ...rest
}: CardProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg[surface],
          borderRadius: radius[radiusKey],
          padding: spacing[padding],
          borderWidth: bordered ? 1 : 0,
          borderColor: colors.border.default,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
