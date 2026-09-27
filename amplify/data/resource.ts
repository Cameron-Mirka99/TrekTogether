// AppSync GraphQL schema for TrekTogether. Models declared with `a.model()` get
// DynamoDB tables and CRUD resolvers for free; custom logic goes behind
// `a.query()` / `a.mutation()` backed by Lambda functions.
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { healthCheck } from '../functions/health-check/resource';

const schema = a.schema({
  /** Payload returned by the health check Lambda. */
  HealthStatus: a.customType({
    status: a.string().required(),
    region: a.string().required(),
    timestamp: a.datetime().required(),
  }),

  /**
   * Round-trip check (client -> AppSync -> Lambda) used by the landing screen to
   * prove the deployed stack is wired up. Guests may call it so it works signed out.
   */
  healthCheck: a
    .query()
    .returns(a.ref('HealthStatus'))
    .handler(a.handler.function(healthCheck))
    .authorization((allow) => [allow.guest(), allow.authenticated()]),
});

/** Type-safe schema shared by the frontend data client and Lambda handlers. */
export type Schema = ClientSchema<typeof schema>;

/**
 * Signed-in users are the default. Guest access goes through the identity pool
 * (IAM) instead of an API key, so there's no key that expires and has to be rotated.
 */
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
