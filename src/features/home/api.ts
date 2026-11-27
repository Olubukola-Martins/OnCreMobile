/**
 * Mock Home API. Replace the body of `fetchHome` with a real network call; the
 * shapes and the loading/stale/error semantics are what the screen relies on.
 *
 * The balance is the source of truth on the server (Hope Bank). We never add
 * numbers up on the phone — stat totals come down already computed.
 */

export type BusinessRole = 'Owner' | 'Manager' | 'Viewer';

export type Business = {
  id: string;
  name: string;
  role: BusinessRole;
};

export type WalletStatus = 'ready' | 'pending';

export type CaseItem = {
  id: string;
  /** Counterparty name. */
  name: string;
  /** Short status, e.g. "Disputed · send proof". */
  statusLabel: string;
  amountKobo: number;
  /** e.g. "Due Thu". */
  dueLabel: string;
};

export type HomeData = {
  walletStatus: WalletStatus;
  balanceKobo: number;
  /** ISO timestamp the balance was fetched. */
  balanceAsOf: string;
  deltaKobo: number;
  deltaLabel: string; // e.g. "Today"
  /** Full Wallet ID (copied to clipboard). */
  walletId: string;
  /** Masked form shown on screen. */
  walletIdMasked: string;
  stats: {
    withOncreKobo: number;
    creditOutKobo: number;
    /** Amount already recovered on open cases, with its share of the total. */
    backAmountKobo: number;
    backPct: number; // 0–1
    /** Amount repaid on credit given, with its share of the total. */
    repaidAmountKobo: number;
    repaidPct: number; // 0–1
  };
  cases: CaseItem[];
  /** False for a brand-new account — the screen shows "Get started" instead. */
  hasActivity: boolean;
};

/** Forced states for development / previewing the design's home variants. */
export type HomeScenario = 'main' | 'empty' | 'pending' | 'error' | 'stale';

export const BUSINESSES: Business[] = [
  { id: 'mama-amaka', name: 'Mama Amaka Provisions', role: 'Owner' },
  { id: 'chuks-foods', name: 'Chuks Foods Ltd', role: 'Manager' },
  { id: 'bright-stationers', name: 'Bright Stationers', role: 'Viewer' },
];

const CASES: CaseItem[] = [
  { id: 'c1', name: 'Chidi Stores', statusLabel: 'Disputed · send proof', amountKobo: 4_500_000, dueLabel: 'Due Thu' },
  { id: 'c2', name: 'Bola Foods', statusLabel: 'Check their phone number', amountKobo: 1_850_000, dueLabel: 'Due Fri' },
  { id: 'c3', name: 'Ada Mart', statusLabel: 'Awaiting confirmation', amountKobo: 3_200_000, dueLabel: 'Due Mon' },
];

const BALANCE_BY_BUSINESS: Record<string, number> = {
  'mama-amaka': 128_450_000,
  'chuks-foods': 31_845_000,
  'bright-stationers': 7_500_000,
};

const WALLET_ID_BY_BUSINESS: Record<string, string> = {
  'mama-amaka': 'ONC-4821-7753-0096',
  'chuks-foods': 'ONC-5190-2284-1137',
  'bright-stationers': 'ONC-7042-6619-3350',
};

function mainData(businessId: string): HomeData {
  return {
    walletStatus: 'ready',
    balanceKobo: BALANCE_BY_BUSINESS[businessId] ?? 0,
    balanceAsOf: new Date().toISOString(),
    deltaKobo: 4_500_000,
    deltaLabel: 'Today',
    walletId: WALLET_ID_BY_BUSINESS[businessId] ?? 'ONC-0000-0000-0000',
    walletIdMasked: '•••• ••••',
    stats: {
      withOncreKobo: 124_000_000,
      creditOutKobo: 29_500_000,
      backAmountKobo: 31_000_000,
      backPct: 0.2,
      repaidAmountKobo: 95_500_000,
      repaidPct: 0.76,
    },
    cases: CASES,
    hasActivity: true,
  };
}

function emptyData(businessId: string): HomeData {
  return {
    ...mainData(businessId),
    balanceKobo: 0,
    deltaKobo: 0,
    cases: [],
    hasActivity: false,
  };
}

function pendingData(businessId: string): HomeData {
  return {
    ...emptyData(businessId),
    walletStatus: 'pending',
  };
}

const LATENCY_MS = 900;

/** Simulated network latency + optional forced failure. */
export async function fetchHome(businessId: string, scenario: HomeScenario): Promise<HomeData> {
  await new Promise<void>(resolve => {
    setTimeout(() => resolve(), LATENCY_MS);
  });

  if (scenario === 'error') {
    throw new Error('home_unavailable');
  }
  if (scenario === 'empty') {
    return emptyData(businessId);
  }
  if (scenario === 'pending') {
    return pendingData(businessId);
  }
  if (scenario === 'stale') {
    // In production this state is real cached data whose background refresh
    // failed; here we simulate it with an older timestamp (UC-W1 A1: cache the
    // last balance with the time it was fetched).
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    return { ...mainData(businessId), balanceAsOf: twoHoursAgo };
  }
  return mainData(businessId);
}
