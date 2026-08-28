#!/usr/bin/env bash
set -Eeuo pipefail

usage() {
  echo "Usage: $0 --bundle <path> --sha256 <hex> --domain <domain> [--remote-dir /opt/path] [--simulate-postcheck-failure]" >&2
  exit 2
}

bundle=""
expected_sha=""
domain=""
remote_dir=/opt/fengshenbang-wiki
simulate_failure=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --bundle) bundle=${2:-}; shift 2 ;;
    --sha256) expected_sha=${2:-}; shift 2 ;;
    --domain) domain=${2:-}; shift 2 ;;
    --remote-dir) remote_dir=${2:-}; shift 2 ;;
    --simulate-postcheck-failure) simulate_failure=true; shift ;;
    *) usage ;;
  esac
done

[[ -f "$bundle" && "$expected_sha" =~ ^[0-9a-f]{64}$ ]] || usage
[[ "$domain" =~ ^[a-z0-9.-]+$ ]] || usage
[[ "$remote_dir" == /opt/* && "$remote_dir" != /opt/ ]] || {
  echo "FAIL: remote directory must be an explicit child of /opt" >&2
  exit 1
}

actual_sha=$(sha256sum "$bundle" | awk '{print $1}')
[[ "$actual_sha" == "$expected_sha" ]] || {
  echo "FAIL: candidate bundle checksum mismatch" >&2
  exit 1
}

release_root="${remote_dir}-releases"
mkdir -p "$release_root"
chmod 750 "$release_root"
exec 9>"$release_root/.release.lock"
flock -n 9 || { echo "FAIL: another Wiki release is active" >&2; exit 1; }

candidate_root=$(mktemp -d "$release_root/candidate.XXXXXX")
trap 'rm -rf "$candidate_root"' EXIT
tar -C "$candidate_root" -xzf "$bundle"
candidate="$candidate_root/wiki"
[[ -f "$candidate/release-manifest.json" ]] || {
  echo "FAIL: release manifest is missing" >&2
  exit 1
}

commit=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["commit"])' "$candidate/release-manifest.json")
[[ "$commit" =~ ^[0-9a-f]{40}$ ]] || { echo "FAIL: invalid release commit" >&2; exit 1; }
release_id="${commit:0:12}-$(date -u +%Y%m%dT%H%M%SZ)"
release_dir="$release_root/$release_id"
mkdir -p "$release_dir"
chmod 750 "$release_dir"

managed=(
  .dockerignore .env.example Dockerfile Makefile README.md RELEASE.md compose.yaml
  requirements.txt package.json package-lock.json playwright.config.mjs release-manifest.json
  config/Caddyfile config/settings deploy generated scripts tests
)

apply_tree() {
  local source=$1
  local path
  local target
  for path in "${managed[@]}"; do
    target="$remote_dir/$path"
    [[ "$target" == "$remote_dir/"* ]] || { echo "FAIL: unsafe managed path" >&2; return 1; }
    rm -rf -- "${target:?}"
    if [[ -e "$source/$path" ]]; then
      mkdir -p "$(dirname "$remote_dir/$path")"
      cp -a -- "$source/$path" "$remote_dir/$path"
    fi
  done
  chmod +x "$remote_dir"/scripts/*.sh "$remote_dir"/scripts/*.py
}

configure_and_start() {
  cd "$remote_dir"
  ./scripts/init-env.sh
  python3 scripts/set-env.py --env .env \
    "WIKI_PUBLIC_URL=https://$domain" \
    "WIKI_HOST=$domain" \
    'WIKI_CADDY_ADDRESS=:80' \
    'WIKI_BIND_IP=127.0.0.1' \
    'WIKI_HTTP_PORT=18088' \
    'WIKI_HTTPS_PORT=18443' \
    'WIKI_CAPTCHA_QUESTION=封神榜里手持三尖两刃刀的是谁？' \
    'WIKI_CAPTCHA_ANSWER=杨戬'
  python3 scripts/render-config.py --env .env --output config/wikis.yaml
  docker compose --env-file .env -f compose.yaml build web
  docker compose --env-file .env -f compose.yaml up -d db web caddy
  docker compose --env-file .env -f compose.yaml --profile tools run --rm bootstrap
}

rollback_ready=false
prebackup=""
rollback() {
  echo "ROLLBACK starting: release=$release_id"
  cd "$remote_dir"
  ./scripts/restore.sh --from "$prebackup" --confirm
  previous_tree=$(mktemp -d "$release_root/previous.XXXXXX")
  tar -C "$previous_tree" -xzf "$release_dir/previous-source.tar.gz"
  apply_tree "$previous_tree"
  rm -rf "$previous_tree"
  configure_and_start
  WIKI_DIR="$remote_dir" ./scripts/verify-live.sh
  ROLLBACK_RELEASE_ID="$release_id" ROLLBACK_COMMIT="$commit" python3 - <<'PY'
import json
import os
from datetime import datetime, timezone
from pathlib import Path

receipt = {
    "schemaVersion": 1,
    "failedReleaseId": os.environ["ROLLBACK_RELEASE_ID"],
    "failedCommit": os.environ["ROLLBACK_COMMIT"],
    "rolledBackAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "verified": True,
}
Path("rollback-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
PY
  mv rollback-receipt.json "$release_dir/rollback-receipt.json"
  echo "ROLLBACK PASS: receipt=$release_dir/rollback-receipt.json"
}

on_error() {
  status=$?
  trap - ERR
  set +e
  if [[ "$rollback_ready" == true ]]; then
    if (set -e; rollback); then
      :
    else
      echo "ROLLBACK FAILED: manual recovery required from $prebackup" >&2
    fi
  fi
  exit "$status"
}
trap on_error ERR

cd "$remote_dir"
WIKI_DIR="$remote_dir" ./scripts/verify-live.sh
backup_output=$(./scripts/backup.sh)
printf '%s\n' "$backup_output"
prebackup=$(sed -n 's/^Backup created: //p' <<<"$backup_output")
[[ -d "$prebackup" ]] || { echo "FAIL: pre-release backup was not created" >&2; exit 1; }

existing=()
for path in "${managed[@]}"; do
  [[ -e "$remote_dir/$path" ]] && existing+=("$path")
done
tar -C "$remote_dir" -czf "$release_dir/previous-source.tar.gz" "${existing[@]}"
sha256sum "$release_dir/previous-source.tar.gz" > "$release_dir/previous-source.tar.gz.sha256"
cp "$bundle" "$release_dir/candidate.tar.gz"
printf '%s  %s\n' "$expected_sha" candidate.tar.gz > "$release_dir/candidate.tar.gz.sha256"
rollback_ready=true

apply_tree "$candidate"
configure_and_start

if [[ "$simulate_failure" == true ]]; then
  echo "SIMULATED post-release failure requested" >&2
  false
fi

cd "$remote_dir"
./scripts/verify-live.sh
python3 scripts/verify-permissions.py --url "https://$domain"
python3 scripts/smoke-moderation.py --wiki-dir . --provision-contributor
./scripts/verify-live.sh

RELEASE_ID="$release_id" RELEASE_COMMIT="$commit" RELEASE_SHA="$expected_sha" \
PREBACKUP="$prebackup" RELEASE_DOMAIN="$domain" python3 - <<'PY'
import json
import os
from datetime import datetime, timezone
from pathlib import Path

receipt = {
    "schemaVersion": 1,
    "releaseId": os.environ["RELEASE_ID"],
    "commit": os.environ["RELEASE_COMMIT"],
    "bundleSha256": os.environ["RELEASE_SHA"],
    "domain": os.environ["RELEASE_DOMAIN"],
    "preReleaseBackup": os.environ["PREBACKUP"],
    "releasedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "checks": ["live", "permissions", "moderation", "cleanup", "backup"],
    "status": "passed",
}
Path("release-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
PY
mv release-receipt.json "$release_dir/release-receipt.json"
cp "$release_dir/release-receipt.json" "$release_root/current-release.json"
rollback_ready=false
echo "PRE_RELEASE_BACKUP=$prebackup"
echo "RELEASE_RECEIPT=$release_dir/release-receipt.json"
echo "RELEASE PASS: id=$release_id commit=$commit"
