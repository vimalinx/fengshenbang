#!/usr/bin/env python3
"""Update named values in a local runtime .env without printing secrets."""

from __future__ import annotations

import argparse
import os
from pathlib import Path


def quote(value: str) -> str:
    if value == "" or any(char.isspace() or char in "#'\"" for char in value):
        return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return value


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--env", type=Path, required=True)
    parser.add_argument("assignments", nargs="+")
    args = parser.parse_args()

    updates: dict[str, str] = {}
    for assignment in args.assignments:
        if "=" not in assignment:
            raise SystemExit(f"expected KEY=VALUE: {assignment}")
        key, value = assignment.split("=", 1)
        if not key or not key.replace("_", "").isalnum() or not key[0].isalpha():
            raise SystemExit(f"invalid environment key: {key}")
        updates[key] = value

    lines = args.env.read_text(encoding="utf-8").splitlines()
    seen: set[str] = set()
    rendered: list[str] = []
    for line in lines:
        if line and not line.lstrip().startswith("#") and "=" in line:
            key = line.split("=", 1)[0]
            if key in updates:
                rendered.append(f"{key}={quote(updates[key])}")
                seen.add(key)
                continue
        rendered.append(line)
    for key, value in updates.items():
        if key not in seen:
            rendered.append(f"{key}={quote(value)}")

    temporary = args.env.with_suffix(args.env.suffix + ".tmp")
    temporary.write_text("\n".join(rendered) + "\n", encoding="utf-8")
    os.chmod(temporary, 0o600)
    temporary.replace(args.env)
    print(f"Updated {len(updates)} runtime settings in {args.env}")


if __name__ == "__main__":
    main()
