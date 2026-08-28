#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <release-bundle.tar.gz> [off-site-backup-directory]" >&2
  exit 2
fi

bundle=$(realpath -e "$1")
backup=${2:-/home/vimalinx/storage/Backups/fengshenbang-wiki/latest}
backup=$(realpath -e "$backup")
[[ "$backup" == /home/vimalinx/storage/Backups/fengshenbang-wiki/* ]] || {
  echo "FAIL: restore drill requires an off-site Wiki backup" >&2
  exit 1
}
(cd "$backup" && sha256sum -c SHA256SUMS >/dev/null)

checksum="$bundle.sha256"
[[ -f "$checksum" ]] || { echo "FAIL: release checksum file is missing" >&2; exit 1; }
(cd "$(dirname "$bundle")" && sha256sum -c "$(basename "$checksum")")

drill_root=$(mktemp -d)
project="fengshenbang-wiki-drill-$$"
export COMPOSE_PROJECT_NAME="$project"
cleanup() {
  set +e
  if [[ -d "$drill_root/wiki" && "$project" == fengshenbang-wiki-drill-* ]]; then
    docker compose --env-file "$drill_root/wiki/.env" \
      -f "$drill_root/wiki/compose.yaml" down -v --remove-orphans >/dev/null 2>&1
  fi
  rm -rf -- "$drill_root"
}
trap cleanup EXIT

tar -C "$drill_root" -xzf "$bundle"
wiki_dir="$drill_root/wiki"
cd "$wiki_dir"
./scripts/init-env.sh

read -r http_port https_port < <(python3 - <<'PY'
import socket

ports = []
for _ in range(2):
    sock = socket.socket()
    sock.bind(("127.0.0.1", 0))
    ports.append(sock.getsockname()[1])
    sock.close()
print(*ports)
PY
)
python3 scripts/set-env.py --env .env \
  "WIKI_PUBLIC_URL=http://127.0.0.1:$http_port" \
  "WIKI_HOST=127.0.0.1:$http_port" \
  'WIKI_CADDY_ADDRESS=:80' \
  'WIKI_BIND_IP=127.0.0.1' \
  "WIKI_HTTP_PORT=$http_port" \
  "WIKI_HTTPS_PORT=$https_port" \
  'WIKI_REQUIRE_EMAIL_CONFIRMATION=false' \
  'WIKI_REQUIRE_2FA=false'
python3 scripts/render-config.py --env .env --output config/wikis.yaml

stamp=$(basename "$backup")
mkdir -p "backups/$stamp"
rsync -a "$backup/" "backups/$stamp/"
make start
./scripts/restore.sh --from "backups/$stamp" --confirm
./scripts/verify-live.sh
python3 scripts/smoke-moderation.py --wiki-dir . --provision-contributor
./scripts/verify-live.sh
echo "PASS empty-instance off-site restore drill: backup=$stamp project=$project"
