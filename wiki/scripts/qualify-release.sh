#!/usr/bin/env bash
set -euo pipefail

wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
repo_dir=$(cd "$wiki_dir/.." && pwd)
full_restore=false
[[ ${1:-} == --full-restore ]] && full_restore=true
[[ $# -le 1 ]] || { echo "Usage: $0 [--full-restore]" >&2; exit 2; }

cd "$wiki_dir"
set -a
# shellcheck disable=SC1091
source .env
set +a

cd "$repo_dir"
npm --prefix app run content:check
npm --prefix app run build
bash -n wiki/scripts/*.sh
python3 -m compileall -q wiki/scripts
make -C wiki seed validate
python3 wiki/scripts/verify-permissions.py --url "$WIKI_PUBLIC_URL"
python3 wiki/scripts/smoke-moderation.py --wiki-dir wiki --provision-contributor

cd "$wiki_dir"
backup_output=$(./scripts/backup.sh)
printf '%s\n' "$backup_output"
backup_path=$(sed -n 's/^Backup created: //p' <<<"$backup_output")
./scripts/restore.sh --from "$backup_path" --check
if [[ "$full_restore" == true ]]; then
  ./scripts/restore.sh --from "$backup_path" --confirm
fi
./scripts/verify-live.sh
echo "PASS release-qualification: full-restore=$full_restore"
