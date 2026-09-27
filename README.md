# TrekTogether

A single codebase for iOS, Android, and web, built with **Expo (React Native +
react-native-web)** on top of an **AWS Amplify Gen 2** backend.

Web deploys to `app.cmirka.com` via Amplify Hosting. Each push to a connected branch
deploys that branch's backend and frontend together.

## Stack

| Layer | Tech |
| --- | --- |
| UI (all platforms) | Expo SDK 57, Expo Router, TypeScript |
| Auth | Amazon Cognito (`amplify/auth`) |
| API + data | AWS AppSync + DynamoDB (`amplify/data`) |
| Custom logic | AWS Lambda (`amplify/functions`) |
| Web hosting / CI | Amplify Hosting (`amplify.yml`) |
| Mobile builds (later) | EAS Build |

## Layout

```
amplify/                 Backend (infrastructure as TypeScript)
  auth/resource.ts       Cognito config
  data/resource.ts       GraphQL schema: models + custom queries
  functions/<name>/      One folder per Lambda (resource.ts + handler.ts)
  backend.ts             Wires all backend resources together
src/
  app/                   Expo Router routes only (every file is a screen)
  config/                App-wide setup (Amplify config, shared data client)
  features/<feature>/    One folder per feature: components/, hooks/, services/, utils/, types.ts
  utils/                 Helpers shared by 2+ features
amplify.yml              Amplify Hosting build spec
```

## Local development

Requires Node 24 and AWS credentials for an account you can deploy to
(`aws configure` or `aws sso login`).

```bash
npm install
npm run sandbox      # deploys a personal cloud backend and writes amplify_outputs.json
npm run web          # in a second terminal: run the app in the browser
```

`amplify_outputs.json` is generated and gitignored. The app won't build until a
sandbox (or a pipeline deploy) has created it.

Other scripts: `npm run typecheck`, `npm run lint`, `npm run build:web`.

Sandbox cleanup: `npm run sandbox` leaves the sandbox stack deployed after you
stop it (Ctrl-C), so restarting is fast but it keeps costing (small amounts)
until removed. To avoid orphaned stacks:

- `npm run sandbox:delete` — manually delete the current sandbox stack.
- `npm run sandbox:auto-cleanup` — same as `npm run sandbox`, but deletes the
  stack automatically on Ctrl-C. Next start redeploys from scratch (slower).

> **Native note:** Amplify uses native modules that Expo Go doesn't include. To run
> on a device, use a development build (`npx expo run:ios` / `run:android`, or
> `eas build --profile development`).

## Deploying (one-time Amplify setup)

1. Push this repo to GitHub.
2. In the AWS console, go to **Amplify → Create new app → GitHub**, then pick the repo and the `main` branch.
   Amplify detects `amplify.yml` and the Gen 2 backend automatically. Let it create the service role.
3. **Rewrites and redirects**: add the SPA fallback so deep links like `/trips/123` load the app:
   - Source: `/<*>` · Target: `/index.html` · Type: `404 (Rewrite)`
4. **Custom domains**: add `cmirka.com`, map the subdomain `app` to `main`, and leave
   the root domain unmapped so your existing site is untouched.
   - DNS in Route 53: Amplify creates the records for you.
   - DNS elsewhere: add the verification CNAME and the `app` CNAME Amplify shows.

After that, every push to `main` redeploys both the backend and the web app.
