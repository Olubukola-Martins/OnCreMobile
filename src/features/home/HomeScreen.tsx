import React, { useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useTheme } from '@/theme';
import type { RootTabParamList } from '@/navigation/RootNavigator';
import { InlineAlert } from '@/components/InlineAlert';
import { useSessionStore } from '@/store/session';
import { DEFAULT_ACTIONS, type HomeAction } from './components/ActionTiles';
import { ActionNeededList } from './components/ActionNeededList';
import { BalanceHero } from './components/BalanceHero';
import { DevScenarioBar } from './components/DevScenarioBar';
import { GetStartedList, type GetStartedItem } from './components/GetStartedList';
import { HomeErrorState } from './components/HomeErrorState';
import { HomeHeader } from './components/HomeHeader';
import { HomeSkeleton } from './components/HomeSkeleton';
import { StatCards } from './components/StatCards';
import { SwitchBusinessSheet } from './components/SwitchBusinessSheet';
import { useHome } from './useHome';
import type { HomeData } from './api';

/** Format an ISO timestamp as "Today, 10:42" (falls back to a date). */
function lastUpdatedLabel(iso: string): string {
  const date = new Date(iso);
  const time = date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: false });
  const isToday = new Date().toDateString() === date.toDateString();
  return isToday ? `Last updated Today, ${time}` : `Last updated ${date.toLocaleDateString('en-NG')}, ${time}`;
}

export function HomeScreen() {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const businessName = useSessionStore(s => {
    const found = s.businesses.find(b => b.id === s.activeBusinessId);
    return found?.name ?? s.businesses[0]!.name;
  });
  const balanceVisible = useSessionStore(s => s.balanceVisible);
  const toggleBalanceVisible = useSessionStore(s => s.toggleBalanceVisible);

  const { view, refetch, isRefetching } = useHome();
  const [switchOpen, setSwitchOpen] = useState(false);
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const goToRecovery = () => navigation.navigate('Recovery');

  // --- Loading: full skeleton (design 4.3) -------------------------------
  if (view.kind === 'loading') {
    return (
      <View style={styles.flex}>
        <StatusBar barStyle="light-content" />
        <HomeSkeleton />
        <DevFooter insetBottom={insets.bottom} />
      </View>
    );
  }

  const heroTop = insets.top + spacing.xs;

  // --- Error with no cached balance (design 4.7) -------------------------
  if (view.kind === 'error') {
    return (
      <View style={[styles.flex, { backgroundColor: colors.bg.canvas }]}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.hero, { backgroundColor: colors.bg.inverse, paddingTop: heroTop }]}>
          <HomeHeader businessName={businessName} onPressBusiness={() => setSwitchOpen(true)} />
          <View style={{ marginTop: spacing.md }}>
            <BalanceHero
              display="none"
              subtitle="Couldn't load your balance"
              showEye
              balanceVisible={balanceVisible}
              onToggleVisible={toggleBalanceVisible}
              actions={buildActions(true)}
            />
          </View>
        </View>
        <HomeErrorState onRetry={refetch} retrying={isRefetching} />
        <SwitchBusinessSheet visible={switchOpen} onClose={() => setSwitchOpen(false)} />
        <DevFooter insetBottom={insets.bottom} />
      </View>
    );
  }

  // --- Ready / stale -----------------------------------------------------
  const data: HomeData = view.data;
  const isStale = view.kind === 'stale';
  const isPending = data.walletStatus === 'pending';
  const isEmpty = !data.hasActivity;

  const heroDisplay = isPending || isEmpty ? 'zero' : balanceVisible ? 'amount' : 'hidden';

  const subtitle = isPending
    ? 'Hope Bank is setting up your wallet'
    : isEmpty
      ? 'Fund your wallet to start'
      : !balanceVisible
        ? 'Tap the eye to show'
        : isStale
          ? lastUpdatedLabel(data.balanceAsOf)
          : `+₦45,000 in Today`;

  return (
    <View style={[styles.flex, { backgroundColor: colors.bg.canvas }]}>
      <StatusBar barStyle="light-content" />

      {/* Fixed balance hero — stays pinned while the content below scrolls. */}
      <View style={[styles.hero, { backgroundColor: colors.bg.inverse, paddingTop: heroTop }]}>
        <HomeHeader businessName={businessName} onPressBusiness={() => setSwitchOpen(true)} />
        <View style={{ marginTop: spacing.md }}>
          <BalanceHero
            display={heroDisplay}
            kobo={data.balanceKobo}
            subtitle={subtitle}
            showEye={!isPending}
            pending={isPending}
            balanceVisible={balanceVisible}
            onToggleVisible={toggleBalanceVisible}
            walletIdMasked={isPending ? undefined : data.walletIdMasked}
            onCopyWalletId={() => Clipboard.setString(data.walletId)}
            actions={buildActions(isPending)}
          />
        </View>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.text.secondary} />
        }
      >
        {isStale ? (
          <InlineAlert
            tone="warning"
            message="We couldn't refresh your balance. Pull down to try again."
          />
        ) : null}

        {isPending ? (
          <>
            <InlineAlert
              tone="info"
              message="You can add debts now. Payments start once the wallet is ready."
            />
            <GetStartedList items={pendingGetStarted} />
          </>
        ) : isEmpty ? (
          <GetStartedList items={emptyGetStarted} />
        ) : (
          <>
            <StatCards stats={data.stats} hidden={!balanceVisible} />
            <ActionNeededList
              cases={data.cases}
              hidden={!balanceVisible}
              onPressSeeAll={goToRecovery}
            />
          </>
        )}
      </ScrollView>

      <SwitchBusinessSheet visible={switchOpen} onClose={() => setSwitchOpen(false)} />
      <DevFooter insetBottom={insets.bottom} />
    </View>
  );
}

/** Wallet actions; when pending only "Add debt" is live (design 4.5). */
function buildActions(pending: boolean): HomeAction[] {
  return DEFAULT_ACTIONS.map(action => ({
    ...action,
    disabled: pending ? action.key !== 'add-debt' : false,
    onPress: () => {},
  }));
}

const emptyGetStarted: GetStartedItem[] = [
  { key: 'add-debt', title: 'Add a debt', description: 'Tell us what a customer owes you', icon: 'plus' },
  { key: 'give-credit', title: 'Give or get credit', description: 'Sell to retailers on credit, or buy from a supplier', icon: 'store' },
  { key: 'fund', title: 'Fund your wallet', description: 'Add money to send or pay', icon: 'wallet' },
];

const pendingGetStarted: GetStartedItem[] = [
  { key: 'add-debt', title: 'Add a debt', description: 'Tell us what a customer owes you', icon: 'plus' },
  { key: 'give-credit', title: 'Give or get credit', description: 'Available once your wallet is ready', icon: 'store', disabled: true },
];

function DevFooter({ insetBottom }: { insetBottom: number }) {
  if (!__DEV__) {
    return null;
  }
  return (
    <View style={{ paddingBottom: insetBottom }}>
      <DevScenarioBar />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 20,
  },
});
