import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  StyleSheet,
  useColorScheme,
  type ColorSchemeName,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { radius, sizing, spacing, typography } from './tokens';
import { themes, type Theme } from './themes';

export type ThemeMode = 'light' | 'dark' | 'system';

/** Everything a component needs: active colours + shared tokens. */
export type ThemeContextValue = {
  theme: Theme;
  colors: Theme['colors'];
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  sizing: typeof sizing;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveTheme(mode: ThemeMode, system: ColorSchemeName | null): Theme {
  const scheme = mode === 'system' ? system ?? 'light' : mode;
  return scheme === 'dark' ? themes.dark : themes.light;
}

export function ThemeProvider({
  children,
  initialMode = 'light', // dark palette is still a placeholder — stay light for now
}: PropsWithChildren<{ initialMode?: ThemeMode }>) {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const value = useMemo<ThemeContextValue>(() => {
    const theme = resolveTheme(mode, system);
    return {
      theme,
      colors: theme.colors,
      spacing,
      radius,
      typography,
      sizing,
      mode,
      setMode,
      isDark: theme.name === 'dark',
    };
  }, [mode, system]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}

/**
 * Define themed styles once at module scope and get a hook that rebuilds them
 * only when the theme changes. Keeps components DRY and avoids re-running
 * StyleSheet.create on every render:
 *
 *   const useStyles = makeStyles(t => ({
 *     card: { backgroundColor: t.colors.bg.surface, padding: t.spacing.md },
 *   }));
 *
 *   function Card() {
 *     const styles = useStyles();
 *     ...
 *   }
 */
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function makeStyles<T extends NamedStyles<T>>(
  factory: (theme: ThemeContextValue) => T,
): () => T {
  const cache = new WeakMap<Theme, T>();
  return function useStyles(): T {
    const theme = useTheme();
    return useMemo(() => {
      const cached = cache.get(theme.theme);
      if (cached) {
        return cached;
      }
      const created = StyleSheet.create(factory(theme));
      cache.set(theme.theme, created);
      return created;
    }, [theme]);
  };
}
