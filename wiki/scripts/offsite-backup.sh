#!/usr/bin/env bash
set -euo pipefail

ssh_host=${1:-newserver}
remote_dir=${2:-/opt/fengshenbang-wiki}
target_root=${3:-/home/vimalinx/storage/Backups/fengshenbang-wiki}
keep=${WIKI_OFFSITE_BACKUP_KEEP:-30}

[[ "$remote_dir" == /opt/* && "$remote_dir" != /opt/ ]] || {
  echo "FAIL: remote directory must be an explicit child of /opt" >&2
  exit 1
}
[[ "$target_root" == /home/vimalinx/storage/Backups/* ]] || {
  echo "FAIL: off-site target must be under /home/vimalinx/storage/Backups" >&2
  exit 1
}
if [[ ! "$keep" =~ ^[0-9]+$ ]] || (( keep < 7 )); then
  echo "FAIL: WIKI_OFFSITE_BACKUP_KEEP must be an integer of at least 7" >&2
  exit 1
fi

mkdir -p "$target_root"
chmod 700 "$target_root"
source_device=$(stat -c %d "$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)")
target_device=$(stat -c %d "$target_root")
[[ "$source_device" != "$target_device" ]] || {
  echo "FAIL: off-site backup target is not on a separate filesystem" >&2
  exit 1
}

backup_output=$(ssh -o BatchMode=yes "$ssh_host" "cd '$remote_dir' && ./scripts/backup.sh")
remote_backup=$(sed -n 's/^Backup created: //p' <<<"$backup_output" | tail -1)
[[ "$remote_backup" == "$remote_dir/backups/"* ]] || {
  echo "FAIL: remote backup path is outside the expected root" >&2
  exit 1
}
stamp=$(basename "$remote_backup")
[[ "$stamp" =~ ^[0-9]{8}T[0-9]{6}Z$ ]] || {
  echo "FAIL: unexpected remote backup identifier" >&2
  exit 1
}

incoming="$target_root/.incoming-$stamp-$$"
cleanup() {
  [[ "$incoming" == "$target_root/.incoming-"* ]] && rm -rf -- "$incoming"
}
trap cleanup EXIT
mkdir -m 700 "$incoming"
rsync -a "$ssh_host:$remote_backup/" "$incoming/"
(cd "$incoming" && sha256sum -c SHA256SUMS)

final="$target_root/$stamp"
if [[ -e "$final" ]]; then
  echo "FAIL: off-site backup already exists: $final" >&2
  exit 1
fi
mv "$incoming" "$final"
ln -sfn "$stamp" "$target_root/latest"

TARGET_ROOT="$target_root" KEEP="$keep" python3 - <<'PY'
import os
import re
import shutil
from pathlib import Path

root = Path(os.environ["TARGET_ROOT"]).resolve()
keep = int(os.environ["KEEP"])
pattern = re.compile(r"^\d{8}T\d{6}Z$")
backups = sorted(
    (path for path in root.iterdir() if path.is_dir() and pattern.fullmatch(path.name)),
    key=lambda path: path.name,
    reverse=True,
)
for path in backups[keep:]:
    if path.parent.resolve() != root:
        raise SystemExit("unsafe retention target")
    shutil.rmtree(path)
PY

echo "PASS off-site backup: $final"
