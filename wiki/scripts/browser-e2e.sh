#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <ssh-host> [artifact-directory]" >&2
  exit 2
fi

ssh_host=$1
wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
artifact_dir=${2:-$wiki_dir/test-results/release-browser}
fixture_name="fengshenbang-browser-fixture-$(date -u +%Y%m%dT%H%M%SZ)-$$.json"
remote_fixture="/tmp/$fixture_name"
local_tmp=$(mktemp -d)
local_fixture="$local_tmp/$fixture_name"

cleanup() {
  set +e
  ssh -o BatchMode=yes "$ssh_host" \
    "cd /opt/fengshenbang-wiki && python3 scripts/smoke-moderation.py --wiki-dir . --cleanup-only; rm -f '$remote_fixture'" \
    >/dev/null
  rm -rf "$local_tmp"
}
trap cleanup EXIT

mkdir -p "$artifact_dir"
chmod 700 "$artifact_dir"
artifact_dir=$(realpath "$artifact_dir")
ssh -o BatchMode=yes "$ssh_host" \
  "cd /opt/fengshenbang-wiki && python3 scripts/smoke-moderation.py --wiki-dir . --prepare-browser-fixture '$remote_fixture'"
scp -q "$ssh_host:$remote_fixture" "$local_fixture"
chmod 600 "$local_fixture"

cd "$wiki_dir"
WIKI_E2E_FIXTURE="$local_fixture" \
WIKI_E2E_ARTIFACTS="$artifact_dir" \
  npm run test:browser

echo "PASS browser-e2e: rendered screenshots and moderation flow are in $artifact_dir"
