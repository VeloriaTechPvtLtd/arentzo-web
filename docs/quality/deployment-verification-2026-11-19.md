# Deployment verification — 19 November 2026

Both requested deployments completed successfully through GitHub Actions and were verified on their actual public domains.

| Environment | Hosting | Live URL | Verified deployed commit | Successful workflow |
| --- | --- | --- | --- | --- |
| dev | Firebase Hosting static export | https://dev.arentzo.com | e33db70fd0b0257bbc9f4255348e9f1600bfa510 | [Development run](https://github.com/VeloriaTechPvtLtd/arentzo-web/actions/runs/44508456116) |
| prod | Vercel Production, retaining Next.js server detail routes | https://arentzo.com | 29e4ed57f1207bed2d273b05ee0331aa6b1c6909 | [Production run](https://github.com/VeloriaTechPvtLtd/arentzo-web/actions/runs/44509115381) |

The deployment identity endpoints returned the exact expected GitHub commit and environment. An older healthy release could not satisfy these checks.

## Completed checks

| Check | Development | Production |
| --- | --- | --- |
| Workflow syntax and configuration validation | Passed | Passed |
| Lint | Passed | Passed |
| Deterministic unit tests | 12 passed | 12 passed |
| Configured build | Static export passed | Standalone and Vercel artifact builds passed |
| CI responsive browser tests | 12 passed | 12 passed |
| Firebase Hosting compatibility regression tests | 10 passed | Not applicable to Vercel routing |
| Actual publishing credential | Firebase JSON authenticated and published | Vercel token authenticated and published |
| Live HTTP route checks | 47/47 passed | 49/49 passed |
| Live JS/CSS bundles and tracked public-file checks | 91/91 passed | 92/92 passed |
| Live browser navigation cases | 56/56 passed | 56/56 passed |
| Runtime errors, failed API reads, blank pages, horizontal overflow in browser cases | Zero | Zero |
| Exact live commit identity | Passed | Passed |
| Marketing HTML transformation protection | Passed | Passed |
| Robots, sitemap, Android and Apple association paths | Passed | Passed |

The HTTP inventory covered the exported routes and metadata/association endpoints; Production additionally checked its original dynamic product and rental URLs. Browser checks covered the exported pages on desktop, with the core public and protected flows also checked at phone size. Signed-out favorites, rentals, onboarding, provider dashboard, and nested provider routes redirected to login correctly.

Additional live checks verified Firebase legacy detail links, reload behavior, tracking/hash preservation, removal of unsafe next overrides, and a nested-path 404. Vercel's server product URL rendered a valid missing-record state, and its protected rental URL preserved the requested detail URL when redirecting to login. Representative live screenshots were visually inspected.

## Issues found and corrected

- Replaced the incorrect App Hosting development pipeline with a real static export and Firebase Hosting publication. No App Hosting backend or Cloud Run service was created.
- Corrected dev SITE_URL from the production domain to https://dev.arentzo.com after verifying the Firebase custom-domain/site mapping. The deployment explicitly targets rental-2c497, not the separate dev-admin site.
- Changed Production verification to read the variables stored in the prod GitHub environment. Repository-level copies are not required.
- Removed a stalled, redundant system-package installation and installed the pinned headless Chromium used by the tests. The first verification attempt was cancelled; the replacement run passed.
- Corrected trailing-slash route comparisons so protected routes redirect consistently and marketing pages do not gain duplicate headers. Added a permanent browser regression.
- Prevented Cloudflare email rewriting from changing React HTML before hydration by returning no-transform headers. The live About and Contact responses contained no obfuscated email markup and raised no hydration errors. No Cloudflare account setting was changed.
- Fixed Vercel publishing after Project not found under the supplied personal User ID. The workflow resolves the exact project owner through authenticated project metadata. The verified owner ID was saved back into prod VERCEL_ORG_ID: team_rAGfqR4hpEQJUILTifpm2Yfr. The existing token successfully published afterward.
- Removed tracked environment files from the release source while preserving local copies. CI builds obtain application values and publishing credentials from the dev/prod GitHub environments.
- Added deployment.json identity generation and post-deployment gates for the exact SHA, routes, JSON associations, and unmodified marketing HTML.

## Branch and workflow verification

Only Development CI/CD and Production CI/CD are active workflows. They target dev and prod respectively. Main has no CI/CD trigger or Vercel automatic Git deployment. No Actions run was created for main commit a717284b7ebebabf05b63d9a084f55bae8dcf9e5. The remote dev, prod, and main file trees match, although their merge commit IDs differ. The deleted development and production branch names remain absent.

Changes were published through PRs [5](https://github.com/VeloriaTechPvtLtd/arentzo-web/pull/5), [6](https://github.com/VeloriaTechPvtLtd/arentzo-web/pull/6), [7](https://github.com/VeloriaTechPvtLtd/arentzo-web/pull/7), [8](https://github.com/VeloriaTechPvtLtd/arentzo-web/pull/8), [9](https://github.com/VeloriaTechPvtLtd/arentzo-web/pull/9), and [10](https://github.com/VeloriaTechPvtLtd/arentzo-web/pull/10). Publishing used an isolated checkout at /tmp/arentzo-web-deployment-check; the primary checkout's existing merge/index was not committed or reset.

## Verification limits

This verifies CI/CD, deployment credentials, live release identity, public routes/assets, rendering, public API reads encountered by those pages, and signed-out access behavior. It does not claim authenticated signup/OTP/email delivery, rental or provider writes, payments, or complete business transaction testing. No user account or transaction was created.

Non-blocking warnings remain: an existing unused ESLint-disable directive and GitHub's Node 20 action-runtime deprecation notice for the pinned checkout/setup actions. The jobs ran under Node 24 and passed.

## Local evidence

- [Development core browser results](/tmp/arentzo-live-dev/results.json)
- [Development additional browser results](/tmp/arentzo-live-dev/results-additional.json)
- [Production core browser results](/tmp/arentzo-live-prod/results.json)
- [Production additional browser results](/tmp/arentzo-live-prod/results-additional.json)
- [Development HTTP inventory](/tmp/arentzo-http-dev.json)
- [Production HTTP inventory](/tmp/arentzo-http-prod.json)
- [Development static resource inventory](/tmp/arentzo-assets-dev.json)
- [Production static resource inventory](/tmp/arentzo-assets-prod.json)
- [Development phone browse screenshot](/tmp/arentzo-live-dev/phone-browse.png)
- [Production desktop landing screenshot](/tmp/arentzo-live-prod/desktop-landing.png)
