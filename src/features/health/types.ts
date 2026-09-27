// Types owned by the health feature.
import type { Schema } from '../../../amplify/data/resource';

/** Status payload returned by the backend health check, derived from the schema. */
export type HealthReport = Schema['HealthStatus']['type'];

/** Every state the health check UI can be in. */
export type HealthCheckState =
  | { kind: 'loading' }
  | { kind: 'healthy'; status: HealthReport }
  | { kind: 'error'; message: string };
