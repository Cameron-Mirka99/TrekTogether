// Entry point for the Amplify Gen 2 backend. Every resource defined here is
// deployed by `ampx sandbox` locally and by `ampx pipeline-deploy` in Amplify Hosting.
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { healthCheck } from './functions/health-check/resource';

/** The full TrekTogether backend: Cognito auth, AppSync data API, and Lambda functions. */
defineBackend({
  auth,
  data,
  healthCheck,
});
