import { Platform, type TextStyle } from 'react-native';

/**
 * Non-colour design tokens from the Foundations board. These are theme-agnostic
 * (identical in light and dark), so they live outside the Theme object.
 */

/** 4-point spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;
export type SpacingKey = keyof typeof spacing;

/** Corner radii: sm 8, md 12, lg 16, xl 24, full 999. */
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;
export type RadiusKey = keyof typeof radius;

/**
 * Typeface. Guidelines call for Helvetica Neue (available natively on iOS).
 * Android has no Helvetica Neue, so it falls back to the system font. Bundle
 * Helvetica Neue / Inter later and this is the only line that changes.
 */
export const fontFamily = Platform.select({
  ios: 'Helvetica Neue',
  default: undefined, // system (Roboto) on Android
});

const weight = {
  regular: '400',
  medium: '500',
  bold: '700',
} satisfies Record<string, TextStyle['fontWeight']>;

/**
 * Text styles from the board's type scale. Named by role so screens say
 * `variant="amountLarge"` rather than hard-coding sizes.
 */
export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: weight.bold },
  h1: { fontSize: 28, lineHeight: 36, fontWeight: weight.bold },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: weight.bold },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: weight.medium },
  h4: { fontSize: 17, lineHeight: 24, fontWeight: weight.medium },
  amountLarge: { fontSize: 32, lineHeight: 40, fontWeight: weight.bold },
  amountMedium: { fontSize: 20, lineHeight: 28, fontWeight: weight.bold },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: weight.regular },
  body: { fontSize: 14, lineHeight: 20, fontWeight: weight.regular },
  bodyStrong: { fontSize: 14, lineHeight: 20, fontWeight: weight.medium },
  button: { fontSize: 16, lineHeight: 24, fontWeight: weight.medium },
  labelSmall: { fontSize: 12, lineHeight: 16, fontWeight: weight.medium },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: weight.regular },
} as const satisfies Record<string, TextStyle>;
export type TypographyVariant = keyof typeof typography;

/** Shared control sizing called out on the board. */
export const sizing = {
  buttonHeight: 56, // pill buttons, 56px for shop-floor tapping
  inputHeight: 56, // 56px input box
  keypadKeyHeight: 64, // custom keypad keys
  topBarHeight: 56, // top bar
  minTapTarget: 44, // 44px tap target
  iconDefault: 24, // 24px icon grid
  iconStroke: 1.75, // 1.75 stroke
} as const;
