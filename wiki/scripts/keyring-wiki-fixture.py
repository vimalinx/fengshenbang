#!/usr/bin/env python3
"""Write a private browser fixture from the local Wiki keyring entries."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
from pathlib import Path


def lookup(account: str, kind: str) -> str:
    return subprocess.run(
        [
            "secret-tool",
            "lookup",
            "service",
            "fengshenbang-wiki",
            "account",
            account,
            "kind",
            kind,
        ],
        check=True,
        capture_output=True,
        text=True,
    ).stdout.rstrip("\r\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--account", required=True)
    parser.add_argument("--base-url", required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    payload = {
        "baseUrl": args.base_url,
        "username": args.account,
        "password": lookup(args.account, "password"),
        "totpSecret": lookup(args.account, "totp-secret"),
    }
    if not all(payload.values()):
        raise SystemExit("FAIL: incomplete Wiki credential set in keyring")
    descriptor = os.open(args.output, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as output:
        json.dump(payload, output)
        output.write("\n")
    print(f"PASS keyring fixture prepared for {args.account}")


if __name__ == "__main__":
    main()
