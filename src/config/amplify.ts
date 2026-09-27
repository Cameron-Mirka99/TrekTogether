// One-time Amplify setup shared by every platform (iOS, Android, web).
// amplify_outputs.json is generated per environment and is not committed:
// locally by `npm run sandbox`, in CI by `ampx pipeline-deploy` (see amplify.yml).
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

/** Points the Amplify libraries at the deployed backend. Call once, before any Amplify API. */
export function configureAmplify(): void {
  Amplify.configure(outputs);
}
