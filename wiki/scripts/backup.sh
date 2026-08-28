#!/usr/bin/env bash
set -euo pipefail

WIKI_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$WIKI_DIR"
[[ -f .env ]] || { echo "Run make init first." >&2; exit 1; }
set -a
source .env
set +a

stamp=$(date -u +%Y%m%dT%H%M%SZ)
target="$WIKI_DIR/backups/$stamp"
mkdir -p "$target"
chmod 700 "$target"

docker compose --env-file .env -f compose.yaml exec -T db \
  mariadb-dump --single-transaction --quick --routines --events \
  -u root -p"$MARIADB_ROOT_PASSWORD" "$WIKI_DB_NAME" > "$target/database.sql"

tar -C "$WIKI_DIR/data" -czf "$target/images.tar.gz" images public-assets
tar -C "$WIKI_DIR" -czf "$target/config.tar.gz" \
  --exclude=config/persistent --exclude=config/wikis.yaml config

(
  cd "$target"
  sha256sum database.sql images.tar.gz config.tar.gz > SHA256SUMS
)

echo "Backup created: $target"
