#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
wiki_dir="$(cd -- "$script_dir/.." && pwd)"
cd "$wiki_dir"

if [[ ! -f .env ]]; then
    echo "FAIL: $wiki_dir/.env is missing" >&2
    exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

compose=(docker compose --env-file .env -f compose.yaml)
running="$("${compose[@]}" ps --services --filter status=running | wc -l | tr -d ' ')"
if [[ "$running" != "3" ]]; then
    echo "FAIL: expected three running services, found $running" >&2
    "${compose[@]}" ps >&2
    exit 1
fi

api_url="${WIKI_PUBLIC_URL%/}/w/api.php?action=query&meta=siteinfo&siprop=general%7Cextensions&format=json"
api_json="$(curl -fsS "$api_url")"
API_JSON="$api_json" python3 - <<'PY'
import json
import os

payload = json.loads(os.environ["API_JSON"])
generator = payload["query"]["general"]["generator"]
extensions = {item["name"] for item in payload["query"]["extensions"]}
required = {
    "Moderation",
    "Approved Revs",
    "PageForms",
    "SemanticMediaWiki",
    "VisualEditor",
}
missing = sorted(required - extensions)
if generator != "MediaWiki 1.43.9" or missing:
    raise SystemExit(
        f"FAIL: generator={generator!r}; missing extensions={','.join(missing) or 'none'}"
    )
print(f"PASS api: generator={generator}; required extensions={len(required)}")
PY

registration_page="$(curl -fsS "${WIKI_PUBLIC_URL%/}/wiki/特殊:创建账户")"
if [[ "$registration_page" != *"$WIKI_CAPTCHA_QUESTION"* ]]; then
    echo "FAIL: public registration page or CAPTCHA question is unavailable" >&2
    exit 1
fi
echo "PASS registration-page: public account creation and CAPTCHA are visible"

counts="$("${compose[@]}" exec -T db mariadb \
    -uroot "-p${MARIADB_ROOT_PASSWORD}" "$WIKI_DB_NAME" -N \
    -e "SELECT CONCAT(page_namespace, ':', COUNT(*)) FROM page WHERE page_namespace IN (3000,3002,3004) GROUP BY page_namespace ORDER BY page_namespace")"
for expected in 3000:42 3002:74 3004:42; do
    if ! grep -qx "$expected" <<<"$counts"; then
        echo "FAIL: namespace inventory mismatch; expected $expected" >&2
        printf '%s\n' "$counts" >&2
        exit 1
    fi
done
echo "PASS inventory: models=42; benchmarks=74; curation=42"

latest_backup="$(find backups -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' 2>/dev/null | sort -nr | head -1 | cut -d' ' -f2-)"
if [[ -z "$latest_backup" ]]; then
    echo "FAIL: no remote backup exists" >&2
    exit 1
fi
./scripts/restore.sh --from "$latest_backup" --check >/dev/null
echo "PASS backup: $latest_backup checksums are valid"
