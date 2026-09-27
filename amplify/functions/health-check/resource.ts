// Declares the health check Lambda so it can be referenced by the data schema.
import { defineFunction } from '@aws-amplify/backend';

/** Lightweight Lambda that reports the backend is reachable. */
export const healthCheck = defineFunction({
  name: 'health-check',
  entry: './handler.ts',
});
