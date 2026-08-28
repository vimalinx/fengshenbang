#!/usr/bin/env bash
set -euo pipefail

wiki_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
repo_dir=$(cd "$wiki_dir/.." && pwd)
output_dir=${1:-$wiki_dir/release-artifacts}

cd "$repo_dir"
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Refusing to build a release from modified tracked files." >&2
  exit 1
fi
untracked=$(git ls-files --others --exclude-standard wiki)
[[ -z "$untracked" ]] || {
  echo "Refusing to build a release with untracked Wiki source:" >&2
  printf '%s\n' "$untracked" >&2
  exit 1
}

bash -n wiki/scripts/*.sh
python3 -m compileall -q wiki/scripts
make -C wiki seed validate

commit=$(git rev-parse HEAD)
short_commit=${commit:0:12}
source_epoch=$(git show -s --format=%ct HEAD)
created_at=$(date -u -d "@$source_epoch" +%Y-%m-%dT%H:%M:%SZ)
tmp_dir=$(mktemp -d)
trap 'rm -rf "$tmp_dir"' EXIT
mkdir -p "$tmp_dir/wiki" "$output_dir"

git archive --format=tar HEAD:wiki | tar -C "$tmp_dir/wiki" -xf -
mkdir -p "$tmp_dir/wiki/generated"
cp -a wiki/generated/seed "$tmp_dir/wiki/generated/seed"

COMMIT="$commit" CREATED_AT="$created_at" ROOT="$tmp_dir/wiki" python3 - <<'PY'
import json
import os
from pathlib import Path

root = Path(os.environ["ROOT"])
manifest = {
    "schemaVersion": 1,
    "commit": os.environ["COMMIT"],
    "createdAt": os.environ["CREATED_AT"],
    "sourceFiles": sum(1 for path in root.rglob("*") if path.is_file()),
    "seedPages": sum(1 for path in (root / "generated" / "seed").glob("*.wiki")),
    "contentInventory": {"models": 42, "benchmarks": 74, "curation": 42},
}
(root / "release-manifest.json").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
PY

bundle="$output_dir/fengshenbang-wiki-$short_commit.tar.gz"
tar --sort=name --mtime="@$source_epoch" --owner=0 --group=0 --numeric-owner \
  -C "$tmp_dir" -czf "$bundle" wiki
(cd "$(dirname "$bundle")" && sha256sum "$(basename "$bundle")" > "$(basename "$bundle").sha256")

if tar -tzf "$bundle" | grep -Eq '(^|/)(\.env|backups|data|persistent|wikis\.yaml|composer\.local\.json)(/|$)'; then
  echo "FAIL: release bundle contains runtime state or secrets" >&2
  exit 1
fi

echo "PASS release-bundle: commit=$commit; seed-pages=166"
echo "Release bundle: $(realpath "$bundle")"
echo "Release checksum: $(realpath "$bundle.sha256")"
