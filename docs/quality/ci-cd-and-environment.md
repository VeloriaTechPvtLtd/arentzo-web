# Web CI, Development artifact, and environment setup

## What the workflows do

`.github/workflows/ci.yml` runs for pull requests into `main` and pushes to `main` or `feat/web-ci-cd-dev`. It installs from `package-lock.json`, runs ESLint, the deterministic Node unit tests, a production Next.js build, and Chromium responsive browser checks at phone, tablet, and desktop sizes. CI uses inert placeholder Supabase configuration and requires no repository secrets. Screenshots are uploaded for failed runs only and expire after seven days.

`.github/workflows/package-dev-artifact.yml` is manually dispatched, explicitly confirmed, and runs only when dispatched against `feat/web-ci-cd-dev`. It repeats lint, unit, build, and responsive checks, then uploads a seven-day `.tar.gz` containing the Next.js standalone Node server. The workflow must first be merged to the default branch before GitHub enables `workflow_dispatch`; after that, select the feature branch as the run ref. It does not publish an image, connect to a hosting account, or deploy.

The requested deployment targets are Firebase App Hosting for Development and Vercel for Production. This repository currently has only legacy static Firebase Hosting configuration, which cannot serve the dynamic Next.js application. `.firebaserc` identifies `rental-2c497` as the Firebase Development candidate, but the Firebase CLI is signed out and no App Hosting backend or billing readiness could be confirmed. GitHub reported a successful Vercel check on the prior feature-branch commit `5d67c7b`, confirming a connected Vercel check integration; its project settings, preview URL, and configured Production Branch are not accessible here. No Firebase backend or deploy credential path could be verified. This change therefore adds CI and a Development artifact only; it does not create the `development` or `production` refs or provider deploy jobs because those refs could trigger external deployments with unverified environment mappings. Verify the Firebase App Hosting backend and Vercel project/branch settings in their authorized consoles before adding provider deployment workflows or creating those refs.

The archive can be unpacked on a compatible Node.js 24 host and started with `HOSTNAME=0.0.0.0 PORT=3000 node server.js`. The packaging workflow removes copied `.env*` files from the output before testing and archiving it; the built browser config comes from the explicit GitHub Actions Variables. The host must provide HTTPS and an approved reverse proxy. A hosting provider and its deployment workflow need to be selected and reviewed before adding a deploy job.

## Variables to configure for a Development artifact

Set these as **GitHub Actions repository Variables**, not Secrets, at **Settings → Secrets and variables → Actions → Variables**. They are public client configuration and are embedded in the browser bundle by Next.js.

| Name | Required for Development artifact | Value source |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Rental Dev Supabase project API URL; the workflow rejects any URL other than `https://astiltnwyoxtcisedcyx.supabase.co`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | The Rental Dev project's publishable/anon client key from its approved Supabase dashboard. Never use a service-role or secret key here. |
| `NEXT_PUBLIC_SITE_URL` | Yes for this package workflow | The final HTTPS Development site origin, supplied by the selected host. The workflow rejects the production canonical URL and requires an explicit HTTPS Development origin. |

These are the exact `NEXT_PUBLIC_*` names read by the source. For ordinary CI, the workflow sets safe placeholders directly; no GitHub Variables or Secrets are needed. The Development artifact job accepts a publishable `sb_publishable_` key or a legacy anon JWT whose payload role is `anon`, and fails without logging the value if a privileged or unrecognized key is supplied. Do not add credentials to `.env` files or commit generated artifacts. `NEXT_PUBLIC_` variables are browser-visible by design, so they must never contain privileged credentials.

The other workflow-only variables are set internally and need no repository setup: `RESPONSIVE_BASE_URL` points the browser suite at its local server, `RESPONSIVE_ARTIFACT_DIR` selects its temporary screenshot directory, `CI=true` makes Playwright use its pinned browser, and the workflow step supplies `HOSTNAME` and `PORT` for the temporary test server. `confirm_dev_artifact` is a manual workflow input, not an environment variable.

The standalone server uses standard host runtime settings `HOSTNAME=0.0.0.0` and `PORT` (typically the port assigned by the host). `NODE_ENV=production` is set by Next.js for the production server. Supabase values are compiled into the standalone artifact at build time; changing host runtime variables afterward will not replace those public client values.

`GITHUB_TOKEN` is provided automatically by GitHub Actions. The workflows declare only `contents: read`, and no manually created PAT, Supabase Secret, or hosting token is required. The Development packaging workflow has no deployment step.

When a compatible host is approved, use the same source names in that host's **Development** build environment for Firebase App Hosting. Firebase documents that console-configured variables are available at build and runtime. For Production, use only a separately verified Production Supabase project and the verified Vercel project; configure those same three names in the Vercel **Production** environment. Do not copy Rental Dev values into Production. Both platforms require a new build/deployment after environment changes to replace the public values in the browser bundle.

## Current verification limits

The responsive browser suite uses explicit synthetic product and empty catalog fixtures and checks page layout; it is not a signed-in Rental Dev end-to-end test. The new workflow files are on a fresh CI/CD-only branch based on merged `main`; PR #1 is already closed and merged and remains unchanged. `gh run list` returned no GitHub Actions runs for the initial CI/CD commit, and the available GitHub integration could not read Actions settings (HTTP 403, `Resource not accessible by integration`). It also could not read or write repository Actions Variables (HTTP 403); no Variables were created. The Vercel check succeeded on the prior feature branch, but is separate from a GitHub Actions run and does not verify an application deployment. The manual artifact workflow remains unconfigured until the three Development Variables are added and the Development origin/host is approved. Creating the `development` and `production` refs remains pending verification of external auto-deploy mappings.

## References

- [GitHub Actions: GITHUB_TOKEN and permissions](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token)
- [GitHub Actions: workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
- [Next.js: self-hosting](https://nextjs.org/docs/app/guides/self-hosting)
- [Next.js: environment variables](https://nextjs.org/docs/app/guides/environment-variables)
- [Firebase App Hosting: configure backends and environment variables](https://firebase.google.com/docs/app-hosting/configure)
- [Vercel: environment variables](https://vercel.com/docs/environment-variables)
- [Vercel: deployment environments](https://vercel.com/docs/deployments/environments)
