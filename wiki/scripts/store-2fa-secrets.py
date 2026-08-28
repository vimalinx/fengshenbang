#!/usr/bin/env python3
"""Store operational Wiki credentials in GNOME Keyring without argv leakage."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path


def store(username: str, kind: str, value: str) -> None:
    subprocess.run(
        [
            "secret-tool",
            "store",
            "--label",
            f"Fengshenbang Wiki {username} {kind}",
            "service",
            "fengshenbang-wiki",
            "account",
            username,
            "kind",
            kind,
        ],
        input=value.encode(),
        check=True,
        stdout=subprocess.DEVNULL,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("fixture", type=Path)
    parser.add_argument("enrollment", type=Path)
    args = parser.parse_args()
    fixture = json.loads(args.fixture.read_text(encoding="utf-8"))
    enrollment = json.loads(args.enrollment.read_text(encoding="utf-8"))
    passwords = {item["username"]: item["password"] for item in fixture["accounts"]}
    for item in enrollment["accounts"]:
        username = item["username"]
        store(username, "password", passwords[username])
        store(username, "totp-secret", item["secret"])
        store(username, "recovery-codes", "\n".join(item["recoveryCodes"]))
    print(f"PASS stored {len(enrollment['accounts'])} operational 2FA credential sets")


if __name__ == "__main__":
    main()
