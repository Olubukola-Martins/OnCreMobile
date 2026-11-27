import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client. Conservative retries so a flaky connection shows
 * the error/stale states quickly rather than hanging.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});
