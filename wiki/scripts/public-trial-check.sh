#!/usr/bin/env bash
set -euo pipefail

ssh_host=${1:-newserver}
state_root=${2:-/home/vimalinx/storage/Backups/fengshenbang-wiki/public-trial}
require_complete=${3:-}
mkdir -p "$state_root/observations"
chmod 700 "$state_root" "$state_root/observations"

started="$state_root/started-at"
if [[ ! -f "$started" ]]; then
  date -u +%Y-%m-%dT%H:%M:%SZ > "$started"
  chmod 600 "$started"
fi
started_epoch=$(date -u -d "$(<"$started")" +%s)
now_epoch=$(date -u +%s)
elapsed=$((now_epoch - started_epoch))
minimum=$((7 * 86400))

snapshot=$(ssh -o BatchMode=yes "$ssh_host" \
  'cd /opt/fengshenbang-wiki && ./scripts/verify-live.sh >/dev/null && set -a && source .env && set +a && docker compose --env-file .env -f compose.yaml exec -T db mariadb -N -u"$WIKI_DB_USER" -p"$WIKI_DB_PASSWORD" "$WIKI_DB_NAME" -e "SELECT CONCAT((SELECT COUNT(*) FROM user),'\''|'\'',(SELECT COUNT(*) FROM moderation WHERE mod_rejected=0),'\''|'\'',(SELECT COUNT(*) FROM abuse_filter_log),'\''|'\'',(SELECT COUNT(*) FROM revision))"')
IFS='|' read -r users pending abuse_events revisions <<<"$snapshot"
stamp=$(date -u +%Y%m%dT%H%M%SZ)
STARTED=$(<"$started") STAMP=$stamp USERS=$users PENDING=$pending \
ABUSE_EVENTS=$abuse_events REVISIONS=$revisions ELAPSED=$elapsed MINIMUM=$minimum \
python3 - "$state_root/observations/$stamp.json" <<'PY'
import json
import os
import sys
from pathlib import Path

payload = {
    "schemaVersion": 1,
    "observedAt": os.environ["STAMP"],
    "startedAt": os.environ["STARTED"],
    "elapsedSeconds": int(os.environ["ELAPSED"]),
    "minimumSeconds": int(os.environ["MINIMUM"]),
    "metrics": {
        "users": int(os.environ["USERS"]),
        "pendingModeration": int(os.environ["PENDING"]),
        "abuseEvents": int(os.environ["ABUSE_EVENTS"]),
        "revisions": int(os.environ["REVISIONS"]),
    },
    "liveChecksPassed": True,
}
Path(sys.argv[1]).write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
PY

if (( elapsed >= minimum )); then
  echo "PASS public trial elapsed: seconds=$elapsed minimum=$minimum"
elif [[ "$require_complete" == --require-complete ]]; then
  echo "PENDING public trial: seconds=$elapsed minimum=$minimum" >&2
  exit 1
else
  echo "PASS public trial observation recorded; gate remains pending: seconds=$elapsed minimum=$minimum"
fi
