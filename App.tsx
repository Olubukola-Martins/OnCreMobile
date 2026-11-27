/**
 * OnCre Mobile — app root.
 * Providers: SafeArea → React Query → Theme → Navigation.
 *
 * @format
 */
import React from 'react';
import { DefaultTheme, NavigationContainer, type Theme as NavTheme } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@/theme';
import { queryClient } from '@/lib/queryClient';
import { RootNavigator } from '@/navigation/RootNavigator';

/** Bridge our theme's canvas colour into React Navigation (avoids white flashes). */
function NavThemeContainer({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  const navTheme: NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.bg.canvas,
      card: colors.bg.surface,
      text: colors.text.primary,
      border: colors.border.default,
      primary: colors.brand.primary,
    },
  };
  return <NavigationContainer theme={navTheme}>{children}</NavigationContainer>;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider initialMode="light">
          <NavThemeContainer>
            <RootNavigator />
          </NavThemeContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
