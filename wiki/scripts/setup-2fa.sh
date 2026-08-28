#!/usr/bin/env bash
set -euo pipefail

ssh_host=${1:-newserver}
wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
tmp_dir=$(mktemp -d)
remote_fixture="/tmp/fengshenbang-2fa-fixture-$$.json"
fixture="$tmp_dir/fixture.json"
enrollment="$tmp_dir/enrollment.json"

cleanup() {
  set +e
  ssh -o BatchMode=yes "$ssh_host" "rm -f '$remote_fixture'" >/dev/null
  rm -rf -- "$tmp_dir"
}
trap cleanup EXIT

ssh -o BatchMode=yes "$ssh_host" \
  "cd /opt/fengshenbang-wiki && python3 scripts/prepare-2fa-fixture.py --wiki-dir . --output '$remote_fixture'"
scp -q "$ssh_host:$remote_fixture" "$fixture"
chmod 600 "$fixture"

cd "$wiki_dir"
WIKI_2FA_FIXTURE="$fixture" WIKI_2FA_OUTPUT="$enrollment" \
  npx playwright test tests/browser/wiki-2fa-setup.spec.mjs
chmod 600 "$enrollment"
python3 scripts/store-2fa-secrets.py "$fixture" "$enrollment"

ssh -o BatchMode=yes "$ssh_host" \
  "cd /opt/fengshenbang-wiki && python3 scripts/set-env.py --env .env WIKI_REQUIRE_2FA=true && docker compose --env-file .env -f compose.yaml up -d --force-recreate web >/dev/null && timeout 90 sh -c 'until [ \"\$(docker inspect -f \"{{.State.Health.Status}}\" fengshenbang-wiki-web-1 2>/dev/null)\" = healthy ]; do sleep 2; done' && ./scripts/verify-live.sh"
echo "PASS 2FA setup: primary admin, recovery admin, and moderator enrolled and re-login verified"
