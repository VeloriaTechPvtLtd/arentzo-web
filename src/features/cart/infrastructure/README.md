# Signed-in cart repository

`createCartRepository(supabaseClient, expectedUserId?)` authenticates using `getUser()` before every operation. Supply the current context owner ID to prevent a stale view acting as another account. Every row read/update/delete is scoped by verified `user_id`; insert explicitly sets that ID. Availability first verifies ownership of all requested IDs, then calls advisory `check_cart_availability`.

- `list()` returns cart rows joined as `products`.
- `add({productId,start,end,quantity})` returns inserted row. Daily/non-subscription only.
- `update(id,{start?,end?,quantity?})` returns updated row; dates must be supplied together.
- `remove(id)` returns `{id}` after a returned deleted row confirms the mutation.
- `checkAvailability(ids)` returns RPC data, not a reservation or checkout authorization.

Dates require explicit timezone ISO timestamps with seconds, valid calendar values, and end after start. Both date column pairs receive identical normalized timestamps. Quantity is a positive safe integer. Only known fields are written; no amounts, fees, policies or pricing arithmetic are invented.

`CartError.code`: validation, unauthenticated, backend, outcome_uncertain, not_found. Transport failures during mutation have uncertain outcome: reload/reconcile before retrying. No automatic retries. A later account switch cannot remove the server's responsibility to enforce RLS; this adapter is not an authorization replacement.

Verification: tests exercise actual repository source with an instrumented client, including auth gating, row scoping, date synchronization, unknown-field exclusion, advisory ownership, network uncertainty and stale-account rejection. No live database queries/mutations, RLS evaluation, product join integration, checkout or payment tests were performed.

Every getUser/read/mutation has a15-second deadline. Tests can override via third factory argument `{timeoutMs:5}`. Timing out stops waiting, not the remote operation: a mutation can still finish server-side after `outcome_uncertain`. Reload/reconcile before retrying; do not automatically repeat it. Each sequential read (ownership check then availability RPC) has its own deadline. Update additionally filters `rental_type=daily` and `is_subscription=false`, preserving unsupported cart modes even if called outside the UI.

## Live-contract correction
No cart-to-product foreign key exists in the checked Dev contract, so list does not request a PostgREST relationship. It reads own cart rows, then explicitly fetches products in batches of100 IDs and merges them into the `products` property (`null` for inaccessible/missing products). Identity is rechecked before each product batch. At1000 cart rows, `limit_exceeded` explicitly refuses a potentially truncated view rather than silently displaying it.

Add performs a fresh product read for existence, `is_active` and `quantity_available`, rejects missing/inactive/known insufficient quantity, and rechecks identity before inserting. This is advisory, not atomic capacity enforcement. Existing-item quantity updates remain validated as positive integers only; availability and checkout remain responsible for stock checks. A missing quantity limit is not invented.16 local repository tests pass; no live mutation or RLS integration test performed here.

`add` optionally accepts `id` (validated UUID). UI should retain one `crypto.randomUUID()` per draft across uncertain results and explicit retries; the same primary key prevents duplicate rows if the first write completed. The adapter uses insert, never upsert or automatic retry. A collision is a backend rejection requiring reload/reconciliation; the adapter does not assume conflicting content is equivalent. Without id, existing server-default UUID behavior is preserved.17 tests pass, including identical ID/payload preservation across explicit repeated calls (database PK enforcement not simulated by this client stub).
