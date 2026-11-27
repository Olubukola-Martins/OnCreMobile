import React from 'react';
import type { SvgProps } from 'react-native-svg';

import { useTheme } from '@/theme';
import { icons, type IconName } from './registry';

export type IconProps = Omit<SvgProps, 'color' | 'width' | 'height'> & {
  name: IconName;
  /** Defaults to the 24px icon grid. */
  size?: number;
  /** Any colour string. Defaults to the theme's primary text colour, so icons
   *  adapt to light/dark automatically. Pass a semantic role for status icons,
   *  e.g. color={colors.status.error.fg}. */
  color?: string;
};

export function Icon({ name, size, color, ...rest }: IconProps) {
  const { colors, sizing } = useTheme();
  const Svg = icons[name];
  const dimension = size ?? sizing.iconDefault;

  return (
    <Svg
      width={dimension}
      height={dimension}
      color={color ?? colors.text.primary}
      {...rest}
    />
  );
}
