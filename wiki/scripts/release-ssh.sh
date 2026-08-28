#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <bundle.tar.gz> <ssh-host> <domain> [remote-dir] [--simulate-postcheck-failure] [--fetch-backup]" >&2
  exit 2
}

[[ $# -ge 3 ]] || usage
bundle=$(realpath -e "$1")
ssh_host=$2
domain=$3
shift 3
remote_dir=/opt/fengshenbang-wiki
if [[ $# -gt 0 && "$1" != --* ]]; then
  remote_dir=$1
  shift
fi
simulate=false
fetch_backup=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --simulate-postcheck-failure) simulate=true ;;
    --fetch-backup) fetch_backup=true ;;
    *) usage ;;
  esac
  shift
done

[[ "$domain" =~ ^[a-z0-9.-]+$ ]] || usage
[[ "$remote_dir" == /opt/* && "$remote_dir" != /opt/ ]] || usage
checksum_file="$bundle.sha256"
[[ -f "$checksum_file" ]] || { echo "Missing checksum: $checksum_file" >&2; exit 1; }
(cd "$(dirname "$bundle")" && sha256sum -c "$(basename "$checksum_file")")
bundle_sha=$(sha256sum "$bundle" | awk '{print $1}')

wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
remote_user=$(ssh -o BatchMode=yes "$ssh_host" 'id -un')
release_root="${remote_dir}-releases"
ssh -o BatchMode=yes "$ssh_host" \
  "sudo install -d -m 0750 -o '$remote_user' -g '$remote_user' '$release_root'"

token="$(date -u +%Y%m%dT%H%M%SZ)-$$"
remote_bundle="$release_root/incoming-$token.tar.gz"
remote_helper="/tmp/fengshenbang-release-apply-$token.sh"
local_log=$(mktemp)
cleanup() {
  rm -f "$local_log"
  ssh -o BatchMode=yes "$ssh_host" "rm -f '$remote_helper' '$remote_bundle'" >/dev/null 2>&1 || true
}
trap cleanup EXIT

scp -q "$bundle" "$ssh_host:$remote_bundle"
scp -q "$wiki_dir/scripts/release-apply.sh" "$ssh_host:$remote_helper"
remote_args=(
  --bundle "$remote_bundle" --sha256 "$bundle_sha" --domain "$domain"
  --remote-dir "$remote_dir"
)
[[ "$simulate" == true ]] && remote_args+=(--simulate-postcheck-failure)

set +e
ssh -o BatchMode=yes "$ssh_host" bash "$remote_helper" "${remote_args[@]}" | tee "$local_log"
status=${PIPESTATUS[0]}
set -e
[[ $status -eq 0 ]] || exit "$status"

receipt=$(sed -n 's/^RELEASE_RECEIPT=//p' "$local_log" | tail -1)
prebackup=$(sed -n 's/^PRE_RELEASE_BACKUP=//p' "$local_log" | tail -1)
[[ "$receipt" == "$release_root"/*/release-receipt.json ]] || {
  echo "FAIL: remote release receipt was not returned" >&2
  exit 1
}

artifact_dir="$wiki_dir/release-artifacts/receipts"
mkdir -p "$artifact_dir"
scp -q "$ssh_host:$receipt" "$artifact_dir/"
if [[ "$fetch_backup" == true ]]; then
  [[ "$prebackup" == "$remote_dir/backups/"* ]] || {
    echo "FAIL: unsafe remote backup path" >&2
    exit 1
  }
  backup_target="$wiki_dir/backups/remote-$(basename "$(dirname "$receipt")")"
  mkdir -p "$backup_target"
  chmod 700 "$backup_target"
  rsync -a "$ssh_host:$prebackup/" "$backup_target/"
  (cd "$backup_target" && sha256sum -c SHA256SUMS)
  echo "PASS off-host-backup: $backup_target"
fi

echo "PASS release-ssh: receipt copied to $artifact_dir/$(basename "$receipt")"
