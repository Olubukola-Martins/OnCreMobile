import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { fontFamily as defaultFontFamily, useTheme } from '@/theme';
import type { TypographyVariant } from '@/theme';
import type { ThemeColors } from '@/theme';

type TextColorToken = keyof ThemeColors['text'];

export type TextProps = RNTextProps & {
  /** Role from the type scale (display, h1, amountLarge, body, caption …). */
  variant?: TypographyVariant;
  /** Semantic text role; adapts to light/dark. Defaults to `primary`. */
  color?: TextColorToken;
  /** Shorthand overrides. */
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontFamily?: string;
};

/**
 * The single text primitive. Pulls size/weight from the theme type scale and
 * colour from the semantic text roles, so no screen hard-codes font values.
 */
export function Text({
  variant = 'body',
  color = 'primary',
  align,
  fontFamily = defaultFontFamily,
  style,
  ...rest
}: TextProps) {
  const { typography, colors } = useTheme();

  return (
    <RNText
      style={[
        typography[variant],
        { color: colors.text[color], fontFamily },
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    />
  );
}
