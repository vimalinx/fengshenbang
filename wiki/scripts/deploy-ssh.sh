#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <ssh-host> <public-domain> [remote-dir]" >&2
  exit 2
fi

ssh_host=$1
public_domain=$2
remote_dir=${3:-/opt/fengshenbang-wiki}
wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

[[ "$public_domain" =~ ^[a-z0-9.-]+$ ]] || {
  echo "Invalid public domain: $public_domain" >&2
  exit 1
}
[[ "$remote_dir" == /opt/* ]] || {
  echo "Remote directory must be an explicit path below /opt" >&2
  exit 1
}

remote_user=$(ssh -o BatchMode=yes "$ssh_host" 'id -un')
ssh -o BatchMode=yes "$ssh_host" \
  "sudo install -d -m 0750 -o '$remote_user' -g '$remote_user' '$remote_dir'"

rsync -a \
  --exclude .env \
  --exclude backups/ \
  --exclude data/ \
  --exclude config/persistent/ \
  --exclude config/wikis.yaml \
  --exclude config/composer.local.json \
  "$wiki_dir/" "$ssh_host:$remote_dir/"

ssh -o BatchMode=yes "$ssh_host" "cd '$remote_dir' && \
  chmod +x scripts/*.sh scripts/*.py && \
  ./scripts/init-env.sh && \
  python3 scripts/set-env.py --env .env \
    'WIKI_PUBLIC_URL=https://$public_domain' \
    'WIKI_HOST=$public_domain' \
    'WIKI_CADDY_ADDRESS=:80' \
    'WIKI_BIND_IP=127.0.0.1' \
    'WIKI_HTTP_PORT=18088' \
    'WIKI_HTTPS_PORT=18443' \
    'WIKI_CAPTCHA_QUESTION=封神榜里手持三尖两刃刀的是谁？' \
    'WIKI_CAPTCHA_ANSWER=杨戬' && \
  python3 scripts/render-config.py --env .env --output config/wikis.yaml && \
  docker compose --env-file .env -f compose.yaml build web && \
  docker compose --env-file .env -f compose.yaml up -d db web caddy && \
  docker compose --env-file .env -f compose.yaml --profile tools run --rm bootstrap"

echo "Wiki application deployed on $ssh_host; configure the reverse proxy for $public_domain."
