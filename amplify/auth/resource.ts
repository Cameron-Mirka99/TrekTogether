// Cognito user pool + identity pool for TrekTogether.
// The identity pool also issues guest (unauthenticated) IAM credentials, which
// lets signed-out visitors call the small set of endpoints marked `allow.guest()`.
import { defineAuth } from '@aws-amplify/backend';

/** Email/password sign-in. Social providers (Apple, Google) can be added here later. */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
