# OnCre Mobile

React Native (bare CLI, TypeScript) app for OnCRE — credit, wallet and recovery
for small businesses.

## Stack

| Concern         | Choice                                    |
| --------------- | ----------------------------------------- |
| Framework       | React Native 0.88 (bare CLI) + TypeScript |
| Navigation      | React Navigation (bottom tabs)            |
| Server state    | TanStack Query                            |
| App/UI state    | Zustand                                   |
| Icons           | SVG → React components (theme-recolorable) |
| Secure storage  | react-native-keychain (for secrets)       |
| Package manager | yarn (berry, node-modules linker)         |

> Navigation note: the brief called for `expo-router`, but RN 0.88 is ahead of
> what the Expo SDK supports, so we use React Navigation to stay fully native and
> compatible. Screens are plain components, so switching routers later is cheap.

## Getting started

```bash
yarn install
cd ios && pod install && cd ..   # iOS only
yarn ios        # or: yarn android
yarn start      # Metro, if not started automatically
```

Useful scripts:

```bash
yarn tsc --noEmit         # typecheck
node scripts/gen-icons.js # regenerate the icon registry after adding SVGs
```

## Project structure

```
src/
  theme/            Design tokens + semantic themes (light now, dark-ready)
    palette.ts      Raw colour scales (brand / neutral / status) — never used directly
    tokens.ts       Spacing, radius, typography, sizing (theme-agnostic)
    themes.ts       Semantic roles → light & dark. Dark is a placeholder to fill in.
    ThemeProvider.tsx  useTheme(), makeStyles()
  components/        Reusable UI library (Button, Text, Field, BottomSheet, …)
    Icon/            <Icon name> — recolours any SVG via `currentColor`
  features/
    home/            Home screen + all states (main/empty/loading/stale/pending/
                     hidden/error/switch-business), mock API, query hook
    components/      Living component gallery (the "More" tab for now)
  navigation/        Tab navigator + custom TabBar
  store/             Zustand stores (session, dev scenario switch)
  lib/               currency, query client
  assets/icons|logo  SVGs
```

## Theming & dark mode

Screens only read **semantic roles** (`colors.text.primary`, `colors.bg.canvas`,
`colors.status.error.fg`, …) — never raw palette values. To add dark mode, fill
in the real colours in `darkTheme` (src/theme/themes.ts); its shape is identical
to light by contract, so TypeScript guarantees nothing is missed. No screen
changes required.

Icons are theme-adaptable: every SVG uses `currentColor`, and `<Icon>` defaults
to the active theme's text colour (override with `color={...}`).

## Previewing Home states

In dev builds a **scenario bar** at the bottom of Home flips between Main, Empty,
Stale, Pending and Error, plus a balance hide/show toggle — so every design
variant is reachable without a backend. It is gated behind `__DEV__`.
# OnCreMobile
