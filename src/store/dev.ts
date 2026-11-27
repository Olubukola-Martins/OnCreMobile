import { create } from 'zustand';

import type { HomeScenario } from '@/features/home/api';

/**
 * Dev-only scenario switch so every Home variant from the design is reachable
 * without a backend. Gate the <DevScenarioBar> behind __DEV__.
 */
type DevState = {
  scenario: HomeScenario;
  setScenario: (scenario: HomeScenario) => void;
};

export const useDevStore = create<DevState>(set => ({
  scenario: 'main',
  setScenario: scenario => set({ scenario }),
}));
