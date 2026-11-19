# Arentzo web responsive smoke and public read evidence

## Responsive suite

`npm run test:responsive` runs a Node `node:test` suite with local Chromium against a built Next.js preview (`RESPONSIVE_BASE_URL`, default `http://127.0.0.1:3005`). It uses deterministic, intercepted Supabase responses for the required product success path and a separate 503-then-retry path. The fixture title explicitly says “mock only”; it does not create backend records or prove live marketplace behavior.

At 390×844, 768×1024 and 1440×900, the suite checks landing and browse headings/copy, title/body font-size and line-height thresholds, the fixture title/rate/policy disclosure, stable renter-facing disclosure order, inactive capability suppression, logged-out rentals redirect, and document/body width overflow. It saves landing, product, and scrolled policy screenshots for each viewport to `/tmp/arentzo-web-responsive-evidence` by default; `RESPONSIVE_ARTIFACT_DIR` overrides that path.

## Current Rental Dev read-only observations

Using the repo's configured Rental Dev public anon key via a read-only HTTP client:

- Public `products` GET for `0999d667-f53e-504e-bb7e-642a3787fa39`: HTTP 200, one active row, title `[DEV TEST] Electric city scooter`, daily rate ₹500. The row has no saved `pricing_rules` or `usage_limits` disclosures.
- Public `subcategory_attributes` GET for its subcategory: HTTP 200, 8 rows, each active. `included_km_per_day` is present; `fuel_type` is absent.
- Public `subcategory_extra_charges` GET for the same subcategory: HTTP 401 / PostgreSQL `42501 permission denied for table subcategory_extra_charges`. The anon role cannot establish the editor catalog order or contents.

The live browser is a separate result: a fresh page load in connected Chromium remained at “Loading listing…” after the reload, while a standalone browser request to the Supabase API failed with `net::ERR_CERT_AUTHORITY_INVALID`. We did not disable certificate validation. Thus the 200 API observation does not establish that the browser preview rendered the live listing; live browser read remains blocked by this browser's TLS trust path.

## Mobile contract comparison and web change

Current mobile main at `435e086467422d6632a8145658ec7fa6eb73204b` filters `subcategory_attributes` to `is_active = true`; its extra-charge editor reads active and unconfigured templates, ordered by `display_order` then `policy_key`, while requiring authentication. The web detail repository previously selected capability rows without an active filter. It now filters the query to active rows and defensively groups only active, valid capability DTOs before domain policy mapping. Renter disclosure order remains an explicit web presentation order; the anonymous role cannot read the provider editor catalog to verify its row order.

The public electric scooter read has no saved fee/usage JSON and no `fuel_type` attribute, so no fuel or distance charge amount should be disclosed for that listing. No database write or provider edit was performed.
