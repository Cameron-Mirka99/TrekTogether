// Data access for the health feature: calls the `healthCheck` AppSync query.
import { getDataClient } from '@/config/dataClient';
import type { HealthReport } from '../types';

/**
 * Calls the health check Lambda through AppSync.
 * Uses guest IAM credentials so it works before anyone signs in.
 * @returns The backend's status payload.
 * @throws Error if AppSync returns errors or an empty response.
 */
export async function fetchHealthStatus(): Promise<HealthReport> {
  const { data, errors } = await getDataClient().queries.healthCheck({
    authMode: 'identityPool',
  });
  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join('; '));
  }
  if (!data) {
    throw new Error('Health check returned no data');
  }
  return data;
}
