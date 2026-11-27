/**
 * Raw colour scales — the single source of truth, straight from the OnCRE
 * Foundations board (brand, neutral, status).
 *
 * Screens must NEVER reference these directly. They consume *semantic roles*
 * from the active theme (see themes.ts), so dark mode is a drop-in later.
 */

export const brand = {
  navy: '#001D57',
  blue: '#1A44CA',
  lightBlue: '#C9D8EC',
  offWhite: '#F2F5FB',
} as const;

export const base = {
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const neutral = {
  50: '#F7F8FA',
  100: '#EEF0F4',
  200: '#DDE1E8',
  300: '#C3C9D4',
  400: '#9AA3B2',
  500: '#6E788A',
  600: '#515B6D',
  700: '#3A4354',
  800: '#252D3C',
  900: '#141A26',
} as const;

export const status = {
  green50: '#EAF6EC',
  green600: '#2E7D3A',
  amber50: '#FFF6E6',
  amber600: '#A85A00',
  red50: '#FDEEE6',
  red600: '#B4441A',
} as const;

export const palette = { brand, base, neutral, status } as const;
