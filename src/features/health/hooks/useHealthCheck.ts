// React hook that runs the backend health check and tracks its result.
import { useCallback, useEffect, useState } from 'react';
import { fetchHealthStatus } from '../services/healthService';
import type { HealthCheckState } from '../types';

/**
 * Runs the health check on mount and exposes a way to re-run it.
 * @returns The current check state and a `refresh` function.
 */
export function useHealthCheck() {
  const [state, setState] = useState<HealthCheckState>({ kind: 'loading' });

  const refresh = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const status = await fetchHealthStatus();
      setState({ kind: 'healthy', status });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState({ kind: 'error', message });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { state, refresh };
}
