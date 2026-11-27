import { base, brand, neutral, status } from './palette';

/**
 * Semantic colour roles — the only colours screens and components are allowed
 * to read. Each role maps to a raw scale value (palette.ts). To add dark mode,
 * fill in `darkTheme` below with the corresponding colours; no screen changes.
 *
 * Role groups mirror the Foundations board:
 *   bg      — canvas / surface / subtle / inverse (navy hero)
 *   text    — primary (navy) / secondary / tertiary / brand / on-brand
 *   brand   — primary CTA (blue) / strong (navy) / subtle / disabled
 *   border  — default / strong / brand / focus
 *   status  — success / warning / error / info, each with fg + bg
 */
export type ThemeColors = {
  bg: {
    canvas: string;
    surface: string;
    secondary: string;
    subtle: string;
    inverse: string; // navy hero surface
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    brand: string;
    onBrand: string; // on navy/blue surfaces
    onBrandMuted: string; // secondary text on navy hero
    onBrandDisabled: string;
    disabled: string;
  };
  brand: {
    primary: string; // blue — the one primary action
    onPrimary: string;
    strong: string; // navy — identity / selected
    subtle: string; // light-blue
    disabledBg: string;
    disabledFg: string;
  };
  border: {
    default: string;
    strong: string;
    brand: string;
    focus: string; // input focus = navy
  };
  status: {
    success: { fg: string; bg: string };
    warning: { fg: string; bg: string };
    error: { fg: string; bg: string };
    info: { fg: string; bg: string };
  };
  control: {
    trackOff: string;
    trackOn: string; // navy for on
    thumb: string;
    checkOn: string; // navy for checked
  };
  overlay: {
    scrim: string;
  };
  skeleton: {
    base: string;
    highlight: string;
  };
};

export type Theme = {
  name: 'light' | 'dark';
  colors: ThemeColors;
};

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    bg: {
      canvas: brand.offWhite,
      surface: base.white,
      secondary: neutral[100],
      subtle: neutral[50],
      inverse: brand.navy,
    },
    text: {
      primary: brand.navy,
      secondary: neutral[600],
      tertiary: neutral[400],
      brand: brand.blue,
      onBrand: base.white,
      onBrandMuted: brand.lightBlue,
      onBrandDisabled: 'rgba(255,255,255,0.45)',
      disabled: neutral[400],
    },
    brand: {
      primary: brand.blue,
      onPrimary: base.white,
      strong: brand.navy,
      subtle: brand.lightBlue,
      disabledBg: neutral[100],
      disabledFg: neutral[400],
    },
    border: {
      default: neutral[200],
      strong: neutral[300],
      brand: brand.navy,
      focus: brand.navy,
    },
    status: {
      success: { fg: status.green600, bg: status.green50 },
      warning: { fg: status.amber600, bg: status.amber50 },
      error: { fg: status.red600, bg: status.red50 },
      info: { fg: brand.navy, bg: '#EAF0FB' },
    },
    control: {
      trackOff: neutral[300],
      trackOn: brand.navy,
      thumb: base.white,
      checkOn: brand.navy,
    },
    overlay: {
      scrim: 'rgba(16, 24, 40, 0.45)',
    },
    skeleton: {
      base: neutral[100],
      highlight: neutral[50],
    },
  },
};

/**
 * DARK THEME — placeholder. Values below are provisional so the app never
 * crashes if dark is enabled; replace each with the real dark palette when the
 * design ships. The *shape* is identical to lightTheme by contract (Theme),
 * so TypeScript guarantees nothing is missed.
 */
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bg: {
      canvas: neutral[900],
      surface: neutral[800],
      secondary: neutral[700],
      subtle: neutral[800],
      inverse: brand.navy,
    },
    text: {
      primary: base.white,
      secondary: neutral[300],
      tertiary: neutral[400],
      brand: brand.lightBlue,
      onBrand: base.white,
      onBrandMuted: brand.lightBlue,
      onBrandDisabled: 'rgba(255,255,255,0.45)',
      disabled: neutral[500],
    },
    brand: {
      primary: brand.blue,
      onPrimary: base.white,
      strong: brand.navy,
      subtle: neutral[700],
      disabledBg: neutral[700],
      disabledFg: neutral[500],
    },
    border: {
      default: neutral[700],
      strong: neutral[600],
      brand: brand.lightBlue,
      focus: brand.lightBlue,
    },
    status: {
      success: { fg: status.green600, bg: 'rgba(46,125,58,0.16)' },
      warning: { fg: status.amber600, bg: 'rgba(168,90,0,0.16)' },
      error: { fg: status.red600, bg: 'rgba(180,68,26,0.16)' },
      info: { fg: brand.lightBlue, bg: 'rgba(26,68,202,0.16)' },
    },
    control: {
      trackOff: neutral[600],
      trackOn: brand.blue,
      thumb: base.white,
      checkOn: brand.blue,
    },
    overlay: {
      scrim: 'rgba(0, 0, 0, 0.6)',
    },
    skeleton: {
      base: neutral[700],
      highlight: neutral[600],
    },
  },
};

export const themes = { light: lightTheme, dark: darkTheme } as const;
