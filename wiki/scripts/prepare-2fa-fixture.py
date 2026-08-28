#!/usr/bin/env python3
"""Provision operational accounts and write a private browser-enrollment fixture."""

from __future__ import annotations

import argparse
import json
import os
import secrets
import subprocess
from pathlib import Path


def read_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        if raw and not raw.startswith("#") and "=" in raw:
            key, value = raw.split("=", 1)
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                value = value[1:-1]
            values[key] = value
    return values


def compose(wiki_dir: Path, *command: str) -> None:
    subprocess.run(
        ["docker", "compose", "--env-file", ".env", "-f", "compose.yaml", *command],
        cwd=wiki_dir,
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    wiki_dir = args.wiki_dir.resolve()
    env = read_env(wiki_dir / ".env")

    accounts = [
        {
            "username": env["WIKI_ADMIN_USER"],
            "password": env["WIKI_ADMIN_PASSWORD"],
            "role": "primary-admin",
        },
        {
            "username": "WikiRecoveryAdmin",
            "password": "Wiki-" + secrets.token_urlsafe(30),
            "role": "recovery-admin",
        },
        {
            "username": "WikiModerator",
            "password": "Wiki-" + secrets.token_urlsafe(30),
            "role": "moderator",
        },
    ]
    compose(
        wiki_dir,
        "exec",
        "-T",
        "web",
        "php",
        "maintenance/run.php",
        "createAndPromote",
        "--force",
        "--sysop",
        "--bureaucrat",
        "--reason",
        "公开 Wiki 恢复管理员与双重认证初始化",
        accounts[1]["username"],
        accounts[1]["password"],
    )
    compose(
        wiki_dir,
        "exec",
        "-T",
        "web",
        "php",
        "maintenance/run.php",
        "createAndPromote",
        "--force",
        "--custom-groups=moderator",
        "--reason",
        "公开 Wiki 审核员与双重认证初始化",
        accounts[2]["username"],
        accounts[2]["password"],
    )

    payload = {"baseUrl": env["WIKI_PUBLIC_URL"], "accounts": accounts}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    descriptor = os.open(args.output, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as output:
        json.dump(payload, output, ensure_ascii=False)
        output.write("\n")
    print("PASS provisioned primary admin, recovery admin, and moderator fixture")


if __name__ == "__main__":
    main()
