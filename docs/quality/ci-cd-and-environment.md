# Development and Production deployments

| Branch | GitHub environment | Deployment |
| --- | --- | --- |
| dev | dev | Next.js static export on Firebase Hosting site rental-2c497 at https://dev.arentzo.com |
| prod | prod | Next.js standalone/server build deployed as a prebuilt Vercel Production artifact |

There is no main workflow. Pull requests run verification; pushes after merge run verification and then deployment. Vercel Git auto-deployments are disabled in vercel.json so they cannot bypass checks.

## GitHub configuration

All settings are environment-scoped. No repository-level application variables are required.

| Environment | Variables | Secret |
| --- | --- | --- |
| dev | SUPABASE_URL, SUPABASE_ANON_KEY, SITE_URL, FIREBASE_PROJECT_ID | FIREBASE_SERVICE_ACCOUNT |
| prod | SUPABASE_URL, SUPABASE_ANON_KEY, SITE_URL, VERCEL_ORG_ID, VERCEL_PROJECT_ID | VERCEL_TOKEN |

Development uses the Rental Dev Supabase project astiltnwyoxtcisedcyx, SITE_URL=https://dev.arentzo.com, FIREBASE_PROJECT_ID=rental-2c497. The service-account secret is the complete JSON credential for that project and needs Firebase Hosting deploy permissions. No App Hosting backend, Cloud Run service, or App Hosting variable is used. Production uses its separate Supabase project, its actual HTTPS domain, and orgId/projectId from the linked Vercel project.

Production verification reads public variables from the prod environment; the Vercel token is mapped only in the deployment job. Development PR checks use placeholders, then the deployment job rebuilds and browser-tests the static export with the real dev configuration before publishing. Public Supabase values are embedded at build time through next.config.mjs. Never put a service-role or secret Supabase key in these public variables.

## Static export behavior

npm run build:dev sets STATIC_EXPORT=true and exports out/. npm run build retains the Production standalone/server output. Server-only detail route files use page.server.tsx and are included only by the standalone build. Both builds support query detail routes /product/?id=... and /my-rentals/?id=.... Firebase Hosting compatibility pages translate old /product/ID and /my-rentals/ID deep links to those routes, preserving campaign query parameters and fragments while discarding untrusted next/id overrides. Existing arbitrary product IDs do not need to be enumerated at build time. Authentication return paths are read on the client and protected rental routes preserve the requested query.

Firebase publishes only out/ to the explicitly selected rental-2c497 site. Its dev-admin site is not a deployment target. Unknown nested detail paths return 404 rather than the landing page. Android and Apple .well-known association files remain published as JSON. The local Hosting emulator uses 127.0.0.1:5105; the local Production test server uses 127.0.0.1:3005. These are internal test addresses, unrelated to SITE_URL.

## Verification

Both workflows run lint, deterministic unit tests, build, and responsive Chromium checks. Development additionally tests legacy deep links, reload behavior, protected-route return paths, malformed IDs, and association files against the real Firebase Hosting emulator. These tests use synthetic fixtures and do not establish authenticated user-write or payment behavior.

Deployment writes deployment.json containing the exact GitHub SHA and environment, then verifies that same identity on the live domain after deployment, followed by route, sitemap, robots, and association-file checks. A previous healthy release cannot satisfy this commit check. Secrets are not included in the identity file.

Live verification also checks that marketing HTML is served with no-transform and without Cloudflare email rewriting, which otherwise causes React hydration errors. Route comparisons normalize trailing slashes while preserving the original auth return URL. Production resolves the configured Vercel project through the stored token and uses the project's actual accountId for deployment, including personal-account projects migrated into a team scope.
