#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path
from urllib.parse import urlparse


def read_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key] = value
    return values


def main() -> None:
    parser = argparse.ArgumentParser(description="Render Canasta's non-secret wiki map")
    parser.add_argument("--env", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    env = read_env(args.env)
    public_url = env.get("WIKI_PUBLIC_URL", "").rstrip("/")
    parsed = urlparse(public_url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise SystemExit("WIKI_PUBLIC_URL must be an absolute http(s) URL")
    if parsed.path not in {"", "/"}:
        raise SystemExit("This single-wiki stack requires WIKI_PUBLIC_URL without a path")

    wiki_id = env.get("WIKI_DB_NAME", "fengshenbang")
    if not wiki_id.replace("_", "").isalnum():
        raise SystemExit("WIKI_DB_NAME may contain only letters, numbers and underscores")
    site_name = env.get("WIKI_SITE_NAME", "封神榜 Wiki").replace("\n", " ")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "wikis:\n"
        f"  - id: {wiki_id}\n"
        f"    url: {parsed.netloc}\n"
        f"    name: {site_name}\n",
        encoding="utf-8",
    )
    print(f"Rendered {args.output} for {public_url}")


if __name__ == "__main__":
    main()
