#!/usr/bin/env python3
"""Verify the production AbuseFilter blocks a controlled bulk-link edit."""

from __future__ import annotations

import argparse
import importlib.util
import secrets
from pathlib import Path

smoke_path = Path(__file__).with_name("smoke-moderation.py")
spec = importlib.util.spec_from_file_location("smoke_moderation", smoke_path)
if spec is None or spec.loader is None:
    raise RuntimeError("cannot load moderation acceptance helpers")
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki-dir", type=Path, required=True)
    args = parser.parse_args()
    wiki_dir = args.wiki_dir.resolve()
    env = smoke.read_env(wiki_dir / ".env")
    username = "AcceptanceAbuse" + secrets.token_hex(4)
    password = "Wiki-" + secrets.token_urlsafe(24)
    smoke.run_compose(
        wiki_dir,
        "exec",
        "-T",
        "web",
        "php",
        "maintenance/run.php",
        "createAndPromote",
        username,
        password,
    )
    smoke.confirm_acceptance_email(wiki_dir, env, username)
    client = smoke.WikiClient(f"{env['WIKI_PUBLIC_URL'].rstrip('/')}/w/api.php")
    client.login(username, password)
    result = client.request(
        {
            "action": "edit",
            "title": "模型:验收沙盒-反滥用-" + secrets.token_hex(4),
            "text": "\n".join(f"https://example{i}.invalid/" for i in range(4)),
            "summary": "反滥用规则验收",
            "token": client.csrf(),
        },
        post=True,
        accepted_error_codes={"abusefilter-disallowed"},
    )
    error = result.get("error", {})
    if error.get("code") != "abusefilter-disallowed":
        raise SystemExit(f"FAIL: bulk-link edit was not blocked: {result}")
    print("PASS abuse-filter: new contributor bulk-link edit was disallowed")


if __name__ == "__main__":
    main()
