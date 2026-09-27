// Shared, type-safe AppSync client. Every feature's services use this instead of
// creating their own client, so the whole app has one configured instance.
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

type DataClient = ReturnType<typeof generateClient<Schema>>;

let client: DataClient | undefined;

/**
 * Returns the app-wide data client, creating it on first use. It's created lazily
 * because `generateClient` must run after `configureAmplify()`.
 */
export function getDataClient(): DataClient {
  client ??= generateClient<Schema>();
  return client;
}
