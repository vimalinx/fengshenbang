#!/usr/bin/env python3
"""Poll the operator mailbox and save one MediaWiki confirmation URL privately."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import subprocess
import time
from email import policy
from email.parser import BytesParser
from pathlib import Path


def himalaya(*args: str) -> bytes:
    return subprocess.run(
        ["himalaya", *args, "--account", "agent", "--log-level", "off"],
        check=True,
        capture_output=True,
    ).stdout


def message_text(raw: bytes) -> str:
    message = BytesParser(policy=policy.default).parsebytes(raw)
    parts: list[str] = []
    for part in message.walk():
        if part.get_content_type() in {"text/plain", "text/html"}:
            try:
                parts.append(str(part.get_content()))
            except (LookupError, UnicodeDecodeError):
                continue
    return html.unescape("\n".join(parts))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--username", required=True)
    parser.add_argument("--baseline", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--timeout", type=int, default=180)
    args = parser.parse_args()

    baseline_payload = json.loads(args.baseline.read_text(encoding="utf-8"))
    baseline = {item["id"] for item in baseline_payload.get("envelopes", [])}
    deadline = time.monotonic() + args.timeout
    url_pattern = re.compile(r"https?://[^\s<>\"']+")

    while time.monotonic() < deadline:
        payload = json.loads(
            himalaya("envelope", "list", "--page-size", "20", "--json")
        )
        for envelope in payload.get("envelopes", []):
            if envelope["id"] in baseline:
                continue
            raw = himalaya("message", "read", envelope["id"], "--raw")
            text = message_text(raw)
            if args.username not in text:
                continue
            for candidate in url_pattern.findall(text):
                candidate = candidate.rstrip(".,;)")
                normalized = candidate.lower()
                if "confirmemail" not in normalized and "%e7%a1%ae%e8%ae%a4" not in normalized:
                    continue
                args.output.parent.mkdir(parents=True, exist_ok=True)
                descriptor = os.open(
                    args.output, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600
                )
                with os.fdopen(descriptor, "w", encoding="utf-8") as output:
                    output.write(candidate + "\n")
                print(f"PASS confirmation email received for {args.username}")
                return
        time.sleep(5)
    raise SystemExit(f"FAIL: no confirmation email received for {args.username}")


if __name__ == "__main__":
    main()
