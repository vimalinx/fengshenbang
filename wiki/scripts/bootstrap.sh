#!/usr/bin/env bash
set -euo pipefail

cd /var/www/mediawiki/w

# The normal Canasta entrypoint creates extension/skin symlinks. This one-shot
# maintenance container replaces that entrypoint, so perform the same step.
/create-symlinks.sh >/dev/null
/create-storage-dirs.sh >/dev/null

required=(WIKI_PUBLIC_URL WIKI_SITE_NAME WIKI_DB_NAME WIKI_DB_USER WIKI_DB_PASSWORD MARIADB_ROOT_PASSWORD WIKI_ADMIN_USER WIKI_ADMIN_PASSWORD MW_SECRET_KEY)
for name in "${required[@]}"; do
  if [[ -z "${!name:-}" ]]; then
    echo "Missing required environment variable: $name" >&2
    exit 1
  fi
done

until mariadb-admin ping -h db -u root -p"$MARIADB_ROOT_PASSWORD" --silent; do
  sleep 2
done

has_page=$(mariadb -h db -u "$WIKI_DB_USER" -p"$WIKI_DB_PASSWORD" "$WIKI_DB_NAME" \
  -Nse "SHOW TABLES LIKE 'page'" || true)
has_admin=""
if [[ "$has_page" == page ]]; then
  has_admin=$(mariadb -h db -u "$WIKI_DB_USER" -p"$WIKI_DB_PASSWORD" "$WIKI_DB_NAME" \
    -Nse "SELECT user_name FROM user WHERE user_name='$WIKI_ADMIN_USER' LIMIT 1" || true)
fi

if [[ "$has_page" == page && "$has_admin" != "$WIKI_ADMIN_USER" ]]; then
  echo "Detected a partial MediaWiki installation (schema exists, admin missing)." >&2
  echo "Restore a backup or explicitly reset this staging database before retrying." >&2
  exit 1
fi

if [[ "$has_page" != page ]]; then
  echo "Installing MediaWiki schema..."
  rm -rf /tmp/canasta-install
  mkdir -p /tmp/canasta-install
  env -u MW_SECRET_KEY php maintenance/install.php \
    --dbserver=db \
    --dbname="$WIKI_DB_NAME" \
    --confpath=/tmp/canasta-install \
    --scriptpath=/w \
    --server="$WIKI_PUBLIC_URL" \
    --lang=zh-hans \
    --skins=Vector \
    --installdbuser=root \
    --installdbpass="$MARIADB_ROOT_PASSWORD" \
    --dbuser=root \
    --dbpass="$MARIADB_ROOT_PASSWORD" \
    --pass="$WIKI_ADMIN_PASSWORD" \
    "$WIKI_SITE_NAME" "$WIKI_ADMIN_USER"
  rm -rf /tmp/canasta-install
fi

echo "Updating MediaWiki and extension schemas..."
php maintenance/update.php --quick

if [[ -f /seed/manifest.tsv ]]; then
  imported=0
  skipped=0
  replaced_installer_home=0
  while IFS=$'\t' read -r title filename; do
    [[ -n "$title" && -n "$filename" ]] || continue
    if [[ "$title" == "首页" ]]; then
      current_home=$(php maintenance/getText.php "$title" 2>/dev/null || true)
      revision_count=$(mariadb -h db -u "$WIKI_DB_USER" -p"$WIKI_DB_PASSWORD" \
        "$WIKI_DB_NAME" -Nse \
        "SELECT COUNT(*) FROM revision JOIN page ON rev_page=page_id WHERE page_namespace=0 AND page_title='首页'" || true)
      if [[ "$revision_count" == 1 && "$current_home" == *"<strong>已安装MediaWiki。</strong>"* ]]; then
        php maintenance/edit.php --user "$WIKI_ADMIN_USER" \
          --summary "用封神榜首页替换安装器默认页" "$title" < "/seed/$filename"
        replaced_installer_home=$((replaced_installer_home + 1))
        continue
      fi
    fi
    if php maintenance/edit.php --createonly --user "$WIKI_ADMIN_USER" \
      --summary "从现有封神榜内容初始化" "$title" < "/seed/$filename"; then
      imported=$((imported + 1))
    else
      skipped=$((skipped + 1))
    fi
  done < /seed/manifest.tsv
  echo "Seed pages created: $imported; installer home replaced: $replaced_installer_home; existing pages preserved: $skipped"
fi

# Preserve community edits while making newly introduced governance pages
# discoverable from home. This append-only migration is idempotent.
current_home=$(php maintenance/getText.php "首页" 2>/dev/null || true)
if [[ -n "$current_home" && "$current_home" != *"[[封神榜 Wiki:社区规则"* ]]; then
  {
    printf '%s\n\n' "$current_home"
    printf '%s\n' '== 社区治理 =='
    printf '%s\n' '* [[封神榜 Wiki:社区规则|社区规则]]'
    printf '%s\n' '* [[封神榜 Wiki:反滥用规则|反滥用规则]]'
    printf '%s\n' '* [[封神榜 Wiki:申诉流程|申诉流程]]'
    printf '%s\n' '* [[封神榜 Wiki:隐私政策|隐私政策]]'
    printf '%s\n' '* [[封神榜 Wiki:公开试运行|公开试运行状态]]'
  } | php maintenance/edit.php --user "$WIKI_ADMIN_USER" \
    --summary "在首页公开社区治理入口" "首页"
fi

php maintenance/run.php initSiteStats --update || true
php extensions/SemanticMediaWiki/maintenance/rebuildData.php --quiet || true
echo "Bootstrap complete."
