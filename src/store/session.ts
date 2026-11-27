import { create } from 'zustand';

import { BUSINESSES, type Business } from '@/features/home/api';

/**
 * Session state: which business is active and per-device UI prefs.
 *
 * NOTE: balanceVisible is kept in memory for now. "Remembered on this phone"
 * (design 4.6) needs persistence — wire MMKV/AsyncStorage here later. Anything
 * secret (tokens, PIN) must go through react-native-keychain, never this store.
 */
type SessionState = {
  businesses: Business[];
  activeBusinessId: string;
  balanceVisible: boolean;
  switchBusiness: (id: string) => void;
  toggleBalanceVisible: () => void;
};

export const useSessionStore = create<SessionState>(set => ({
  businesses: BUSINESSES,
  activeBusinessId: BUSINESSES[0]!.id,
  balanceVisible: true,
  switchBusiness: id => set({ activeBusinessId: id }),
  toggleBalanceVisible: () => set(state => ({ balanceVisible: !state.balanceVisible })),
}));

/** Selector helper for the active business object. */
export function useActiveBusiness(): Business {
  return useSessionStore(state => {
    const found = state.businesses.find(b => b.id === state.activeBusinessId);
    return found ?? state.businesses[0]!;
  });
}
