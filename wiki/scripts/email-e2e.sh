#!/usr/bin/env bash
set -euo pipefail

ssh_host=${1:-newserver}
mailbox=${2:-agent@vimalinx.com}
wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
artifact_dir=${3:-$wiki_dir/test-results/email-confirmation}
tmp_dir=$(mktemp -d)
fixture="$tmp_dir/fixture.json"
baseline="$tmp_dir/baseline.json"
confirmation_url="$tmp_dir/confirmation-url"

cleanup() {
  set +e
  ssh -o BatchMode=yes "$ssh_host" \
    "cd /opt/fengshenbang-wiki && python3 scripts/smoke-moderation.py --wiki-dir . --cleanup-only" \
    >/dev/null
  rm -rf -- "$tmp_dir"
}
trap cleanup EXIT

mkdir -p "$artifact_dir"
chmod 700 "$artifact_dir"
artifact_dir=$(realpath "$artifact_dir")
himalaya envelope list --account agent --page-size 20 --json --log-level off > "$baseline"
chmod 600 "$baseline"

remote_values=$(ssh -o BatchMode=yes "$ssh_host" \
  "cd /opt/fengshenbang-wiki && set -a && source .env && printf '%s\\n%s\\n%s' \"\$WIKI_PUBLIC_URL\" \"\$WIKI_CAPTCHA_ANSWER\" \"\${WIKI_REQUIRE_EMAIL_CONFIRMATION:-false}\"")
mapfile -t values <<<"$remote_values"
[[ "${values[2]:-}" == true ]] || { echo "FAIL: production email confirmation is not enabled" >&2; exit 1; }

BASE_URL=${values[0]} CAPTCHA_ANSWER=${values[1]} MAILBOX=$mailbox \
BASELINE=$baseline CONFIRMATION_URL=$confirmation_url ARTIFACT_DIR=$artifact_dir \
WAIT_SCRIPT=$wiki_dir/scripts/wait-confirmation-email.py FIXTURE=$fixture \
python3 - <<'PY'
import json
import os
import secrets
from pathlib import Path

fixture = {
    "baseUrl": os.environ["BASE_URL"],
    "username": "AcceptanceEmail" + secrets.token_hex(4),
    "password": "Wiki-" + secrets.token_urlsafe(24),
    "email": os.environ["MAILBOX"],
    "captchaAnswer": os.environ["CAPTCHA_ANSWER"],
    "title": "模型:验收沙盒-邮件-" + secrets.token_hex(4),
    "marker": "email-confirmation-acceptance-" + secrets.token_hex(10),
    "baseline": os.environ["BASELINE"],
    "confirmationUrl": os.environ["CONFIRMATION_URL"],
    "waitScript": os.environ["WAIT_SCRIPT"],
    "artifactDir": os.environ["ARTIFACT_DIR"],
}
path = Path(os.environ["FIXTURE"])
path.write_text(json.dumps(fixture, ensure_ascii=False) + "\n", encoding="utf-8")
path.chmod(0o600)
PY

cd "$wiki_dir"
WIKI_EMAIL_E2E_FIXTURE="$fixture" \
WIKI_E2E_ARTIFACTS="$artifact_dir" \
  npx playwright test tests/browser/wiki-email-confirmation.spec.mjs
echo "PASS email-e2e: public registration, delivery, confirmation, and queued editing"
