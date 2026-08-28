#!/usr/bin/env bash
set -euo pipefail

target_root=${1:-/home/vimalinx/storage/Backups/fengshenbang-wiki}
max_age_hours=${WIKI_OFFSITE_MAX_AGE_HOURS:-30}

[[ "$target_root" == /home/vimalinx/storage/Backups/* ]] || {
  echo "FAIL: unexpected off-site backup root" >&2
  exit 1
}
[[ -L "$target_root/latest" ]] || { echo "FAIL: latest off-site backup link is missing" >&2; exit 1; }
latest=$(realpath -e "$target_root/latest")
[[ "$latest" == "$target_root/"* && "$(basename "$latest")" =~ ^[0-9]{8}T[0-9]{6}Z$ ]] || {
  echo "FAIL: latest off-site backup link is unsafe" >&2
  exit 1
}
(cd "$latest" && sha256sum -c SHA256SUMS >/dev/null)

now=$(date +%s)
mtime=$(stat -c %Y "$latest/SHA256SUMS")
age_hours=$(( (now - mtime) / 3600 ))
(( age_hours <= max_age_hours )) || {
  echo "FAIL: latest off-site backup is ${age_hours}h old" >&2
  exit 1
}

project_device=$(stat -c %d "$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)")
backup_device=$(stat -c %d "$latest")
[[ "$project_device" != "$backup_device" ]] || {
  echo "FAIL: off-site backup is on the project filesystem" >&2
  exit 1
}
echo "PASS off-site backup: path=$latest age-hours=$age_hours separate-filesystem=true"
