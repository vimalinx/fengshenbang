#!/usr/bin/env bash
set -euo pipefail

ssh_host=${1:-newserver}
wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

ssh -o BatchMode=yes "$ssh_host" 'cd /opt/fengshenbang-wiki && ./scripts/verify-live.sh >/dev/null && set -a && source .env && set +a && [[ "$WIKI_REQUIRE_EMAIL_CONFIRMATION" == true && "$WIKI_REQUIRE_2FA" == true ]] && result=$(docker compose --env-file .env -f compose.yaml exec -T db mariadb -N -u"$WIKI_DB_USER" -p"$WIKI_DB_PASSWORD" "$WIKI_DB_NAME" -e "SELECT CONCAT(SUM(u.user_name='\''WikiSysop'\'' AND ug.ug_group='\''sysop'\'' AND o.oad_id IS NOT NULL),'\''|'\'',SUM(u.user_name='\''WikiRecoveryAdmin'\'' AND ug.ug_group='\''sysop'\'' AND o.oad_id IS NOT NULL),'\''|'\'',SUM(u.user_name='\''WikiModerator'\'' AND ug.ug_group='\''moderator'\'' AND o.oad_id IS NOT NULL)) FROM user u JOIN user_groups ug ON ug.ug_user=u.user_id LEFT JOIN oathauth_devices o ON o.oad_user=u.user_id;") && [[ "$result" == "1|1|1" ]] && filter=$(docker compose --env-file .env -f compose.yaml exec -T db mariadb -N -u"$WIKI_DB_USER" -p"$WIKI_DB_PASSWORD" "$WIKI_DB_NAME" -e "SELECT COUNT(*) FROM abuse_filter WHERE af_enabled=1 AND af_deleted=0 AND af_public_comments='\''阻止新用户一次加入大量外链'\'';") && [[ "$filter" == 1 ]]'

"$wiki_dir/scripts/verify-offsite-backup.sh"
systemctl --user is-enabled --quiet fengshenbang-wiki-offsite-backup.timer
systemctl --user is-active --quiet fengshenbang-wiki-offsite-backup.timer
"$wiki_dir/scripts/public-trial-check.sh" "$ssh_host" \
  /home/vimalinx/storage/Backups/fengshenbang-wiki/public-trial --require-complete
echo "PASS production readiness: live, email, 2FA roles, abuse filter, off-site backup, trial"
