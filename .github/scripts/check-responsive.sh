#!/usr/bin/env bash
set -euo pipefail
# Browser tests target the build running inside CI before it is deployed.
export RESPONSIVE_BASE_URL=http://127.0.0.1:3005
mkdir -p .next/standalone/.next
cp -a .next/static .next/standalone/.next/static
cp -a public .next/standalone/public
find .next/standalone -maxdepth 1 -type f -name '.env*' -delete
pushd .next/standalone >/dev/null
HOSTNAME=127.0.0.1 PORT=3005 node server.js >"$RUNNER_TEMP/arentzo-next.log" 2>&1 &
server_pid=$!
popd >/dev/null
trap 'kill "$server_pid" 2>/dev/null || true' EXIT
for attempt in {1..60}; do
  if curl --fail --silent http://127.0.0.1:3005/ >/dev/null; then
    break
  fi
  sleep 2
done
curl --fail --silent http://127.0.0.1:3005/ >/dev/null
npm run test:responsive
