# Web CI, Development artifact, and environment setup

## What the workflows do

`.github/workflows/ci.yml` runs for pull requests into `main`, `dev`, or `prod`, and pushes to those three branches. It installs from `package-lock.json`, runs ESLint, the deterministic Node unit tests, a production Next.js build, and Chromium responsive browser checks at phone, tablet, and desktop sizes. CI uses inert placeholder Supabase configuration and requires no repository secrets. Screenshots are uploaded for failed runs only and expire after seven days. Feature branch pushes are checked through their pull request to avoid duplicate runs.

`.github/workflows/package-dev-artifact.yml` is manually dispatched, explicitly confirmed, and runs only when manually dispatched against the short Development branch `dev`. It repeats lint, unit, build, and responsive checks, then uploads a seven-day `.tar.gz` containing the Next.js standalone Node server. The workflow must first be merged to the default branch before GitHub enables `workflow_dispatch`; after that, select `dev` as the run ref. It does not publish an image, connect to a hosting account, or deploy.

The intended branch mapping is the short `dev` branch for Firebase App Hosting Development and `prod` for Vercel Production. `.firebaserc` maps the Firebase alias `dev` to project `rental-2c497`; legacy `firebase.json` configures static Hosting only and cannot serve this dynamic Next.js app. Firebase App Hosting backend existence, billing readiness, and deployment credentials remain unverified. GitHub showed a successful Vercel check on the merged PR and main commit, confirming an existing Vercel integration, but its project settings, Production branch mapping, production URL, and environment variables remain inaccessible. No provider deployment job is enabled by these workflows. The separate long-name refs `development` and `production` already exist; leave them unused. The short `dev` ref predates the merged web changes, so do not overwrite it or trigger a deployment from it. After CI and host configuration are ready, promote the verified `main` changes to `dev` through a reviewed pull request; then verify the Firebase Dev mapping before enabling deployment. Treat `prod` similarly: configure Vercel to deploy only from `prod` after the Production project and separate Production Supabase configuration are verified. Until then, the only Dev output is a manually requested archive and CI; no deployment is performed.

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

When the Firebase App Hosting backend for `dev` is verified, use the same source names in its **Development** build environment. Firebase documents that console-configured variables are available at build and runtime. For `prod`, use only a separately verified Production Supabase project and the verified Vercel project; configure those same three names in the Vercel **Production** environment. Do not copy Rental Dev values into Production. Both platforms require a new build/deployment after environment changes to replace the public values in the browser bundle.

## Current verification limits

The responsive browser suite uses explicit synthetic product and empty catalog fixtures and checks page layout; it is not a signed-in Rental Dev end-to-end test. The CI/CD files were merged through PR #2 to `main`; this short-name alignment updates branch filters and Development artifact gating without moving any branch refs. GitHub Actions PR and push checks passed after correcting an invalid runner-context reference and replacing an invalid `setup-node` pin with its verified upstream revision. The available GitHub integration cannot read or write repository Actions Variables (HTTP 403, `Resource not accessible by integration`); no Variables were created. A Vercel check completed successfully on the prior feature branch, but this is separate from the Actions checks and does not establish the Production branch mapping or a production deployment. The manual artifact workflow has not run; it requires the three Development Variables and an approved Development origin. The `dev` and `prod` refs were created separately and remain unmoved. The long-name `development` and `production` refs also exist but are unused. Only GitHub CI branch filters are verified; no automatic host deployment mapping is verified or enabled.

## References

- [GitHub Actions: GITHUB_TOKEN and permissions](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token)
- [GitHub Actions: workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
- [Next.js: self-hosting](https://nextjs.org/docs/app/guides/self-hosting)
- [Next.js: environment variables](https://nextjs.org/docs/app/guides/environment-variables)
- [Firebase App Hosting: configure backends and environment variables](https://firebase.google.com/docs/app-hosting/configure)
- [Vercel: environment variables](https://vercel.com/docs/environment-variables)
- [Vercel: deployment environments](https://vercel.com/docs/deployments/environments)
