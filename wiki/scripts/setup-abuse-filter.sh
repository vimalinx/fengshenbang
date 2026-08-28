#!/usr/bin/env bash
set -euo pipefail

ssh_host=${1:-newserver}
wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
tmp_dir=$(mktemp -d)
fixture="$tmp_dir/fixture.json"
cleanup() { rm -rf -- "$tmp_dir"; }
trap cleanup EXIT

python3 "$wiki_dir/scripts/keyring-wiki-fixture.py" \
  --account WikiSysop \
  --base-url https://wiki-staging.fengshenbang.wiki \
  --output "$fixture"
cd "$wiki_dir"
WIKI_ABUSE_FILTER_FIXTURE="$fixture" \
  npx playwright test tests/browser/wiki-abuse-filter-setup.spec.mjs
ssh -o BatchMode=yes "$ssh_host" \
  "cd /opt/fengshenbang-wiki && python3 scripts/verify-abuse-filter.py --wiki-dir ."
echo "PASS AbuseFilter setup and controlled behavior verification"
