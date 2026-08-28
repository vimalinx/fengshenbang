#!/usr/bin/env bash
set -euo pipefail

WIKI_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
ENV_FILE="$WIKI_DIR/.env"

mkdir -p "$WIKI_DIR/data/images" "$WIKI_DIR/data/public-assets" \
  "$WIKI_DIR/extensions" "$WIKI_DIR/skins" "$WIKI_DIR/generated/seed" \
  "$WIKI_DIR/backups" "$WIKI_DIR/config/persistent"

if [[ ! -f "$ENV_FILE" ]]; then
  umask 077
  db_password=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
  root_password=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
  secret_key=$(python3 -c 'import secrets; print(secrets.token_hex(64))')
  admin_password=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
  captcha_answer=$(python3 -c 'import secrets; print(secrets.token_hex(4))')

  sed \
    -e "s|replace-with-a-random-secret|$db_password|" \
    -e "s|replace-with-a-different-random-secret|$root_password|" \
    -e "s|replace-with-at-least-64-random-hex-characters|$secret_key|" \
    -e "s|replace-with-a-strong-random-password|$admin_password|" \
    -e "s|WIKI_CAPTCHA_QUESTION=.*|WIKI_CAPTCHA_QUESTION=\"请输入验证码：$captcha_answer\"|" \
    -e "s|WIKI_CAPTCHA_ANSWER=.*|WIKI_CAPTCHA_ANSWER=\"$captcha_answer\"|" \
    "$WIKI_DIR/.env.example" > "$ENV_FILE"
  chmod 600 "$ENV_FILE"
  echo "Created $ENV_FILE with local-only random credentials."
else
  echo "$ENV_FILE already exists; leaving credentials unchanged."
fi

python3 "$WIKI_DIR/scripts/render-config.py" --env "$ENV_FILE" \
  --output "$WIKI_DIR/config/wikis.yaml"
