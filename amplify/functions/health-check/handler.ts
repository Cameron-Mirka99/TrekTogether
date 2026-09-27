// Lambda handler for the `healthCheck` query. Serves as the reference example for
// how custom business logic plugs into the AppSync API.
import type { Schema } from '../../data/resource';

/**
 * Returns a status payload so clients can confirm the full request path works.
 * @returns The current status, the AWS region the function runs in, and a timestamp.
 */
export const handler: Schema['healthCheck']['functionHandler'] = async () => {
  return {
    status: 'ok',
    // AWS_REGION is always set by the Lambda runtime.
    region: process.env.AWS_REGION ?? 'unknown',
    timestamp: new Date().toISOString(),
  };
};
