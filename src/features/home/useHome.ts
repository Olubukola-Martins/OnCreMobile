import { useQuery } from '@tanstack/react-query';

import { useDevStore } from '@/store/dev';
import { useSessionStore } from '@/store/session';
import { fetchHome, type HomeData } from './api';

/**
 * UI state for the Home screen. The screen switches on `kind` only — empty,
 * pending and hidden are variations of `ready` (data flags + session), keeping
 * the screen DRY.
 */
export type HomeView =
  | { kind: 'loading' }
  | { kind: 'error'; retry: () => void }
  | { kind: 'stale'; data: HomeData; retry: () => void }
  | { kind: 'ready'; data: HomeData };

export function useHome(): { view: HomeView; refetch: () => void; isRefetching: boolean } {
  const businessId = useSessionStore(s => s.activeBusinessId);
  const scenario = useDevStore(s => s.scenario);

  const query = useQuery({
    queryKey: ['home', businessId, scenario],
    queryFn: () => fetchHome(businessId, scenario),
    retry: 1,
    staleTime: 30_000,
  });

  const refetch = () => void query.refetch();

  let view: HomeView;
  if (query.isPending) {
    view = { kind: 'loading' };
  } else if (query.isError) {
    // First load failed and there is no saved balance (design 4.7).
    view = { kind: 'error', retry: refetch };
  } else if (scenario === 'stale') {
    // Cached balance whose refresh is failing — show it, never a blank card.
    view = { kind: 'stale', data: query.data, retry: refetch };
  } else {
    view = { kind: 'ready', data: query.data };
  }

  return { view, refetch, isRefetching: query.isRefetching };
}
