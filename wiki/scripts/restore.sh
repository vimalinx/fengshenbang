#!/usr/bin/env bash
set -euo pipefail

WIKI_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
BACKUP_ROOT=$(realpath -m "$WIKI_DIR/backups")

usage() {
  echo "Usage: $0 --from <backup-directory> [--check|--confirm]" >&2
  exit 2
}

source_dir=""
mode=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) source_dir=${2:-}; shift 2 ;;
    --check) mode=check; shift ;;
    --confirm) mode=confirm; shift ;;
    *) usage ;;
  esac
done
[[ -n "$source_dir" && -n "$mode" ]] || usage
source_dir=$(realpath -e "$source_dir")
[[ "$source_dir" == "$BACKUP_ROOT"/* ]] || {
  echo "Refusing restore source outside $BACKUP_ROOT" >&2
  exit 1
}

for file in database.sql images.tar.gz config.tar.gz SHA256SUMS; do
  [[ -f "$source_dir/$file" ]] || { echo "Missing backup file: $file" >&2; exit 1; }
done
(cd "$source_dir" && sha256sum -c SHA256SUMS)
[[ "$mode" == confirm ]] || { echo "Backup is complete and checksums are valid."; exit 0; }

cd "$WIKI_DIR"
[[ -f .env ]] || { echo "Run make init first." >&2; exit 1; }
set -a
source .env
set +a

recovery="$WIKI_DIR/backups/pre-restore-$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$recovery"
chmod 700 "$recovery"
docker compose --env-file .env -f compose.yaml exec -T db \
  mariadb-dump --single-transaction --quick -u root -p"$MARIADB_ROOT_PASSWORD" \
  "$WIKI_DB_NAME" > "$recovery/database.sql"

docker compose --env-file .env -f compose.yaml stop web caddy
docker compose --env-file .env -f compose.yaml exec -T db mariadb \
  -u root -p"$MARIADB_ROOT_PASSWORD" -e \
  "DROP DATABASE IF EXISTS \`$WIKI_DB_NAME\`; CREATE DATABASE \`$WIKI_DB_NAME\` CHARACTER SET binary; GRANT ALL ON \`$WIKI_DB_NAME\`.* TO '$WIKI_DB_USER'@'%'; FLUSH PRIVILEGES;"
docker compose --env-file .env -f compose.yaml exec -T db mariadb \
  -u root -p"$MARIADB_ROOT_PASSWORD" "$WIKI_DB_NAME" < "$source_dir/database.sql"

# Canasta intentionally hands bind-mounted upload directories to www-data.
# Return ownership to the invoking operator before moving them into the
# recoverable pre-restore directory, using the already-built wiki image.
operator_uid=$(id -u)
operator_gid=$(id -g)
docker compose --env-file .env -f compose.yaml run --rm --no-deps \
  --entrypoint chown web -R "$operator_uid:$operator_gid" \
  /mediawiki/images /mediawiki/public_assets /mediawiki/config

if [[ -d data/images ]]; then
  mv data/images "$recovery/images"
fi
if [[ -d data/public-assets ]]; then
  mv data/public-assets "$recovery/public-assets"
fi
mkdir -p data/images data/public-assets
tar -C data -xzf "$source_dir/images.tar.gz"

mv config "$recovery/config"
tar -C "$WIKI_DIR" -xzf "$source_dir/config.tar.gz"
mkdir -p config/persistent
python3 scripts/render-config.py --env .env --output config/wikis.yaml

docker compose --env-file .env -f compose.yaml --profile tools run --rm bootstrap
docker compose --env-file .env -f compose.yaml up -d web caddy
echo "Restore complete. Pre-restore recovery copy: $recovery"
