#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki-dir", type=Path, required=True)
    parser.add_argument("--repo", type=Path, required=True)
    args = parser.parse_args()
    wiki = args.wiki_dir.resolve()
    repo = args.repo.resolve()

    expected_extensions = {
        "AbuseFilter",
        "ApprovedRevs",
        "ConfirmEdit",
        "ConfirmEdit/QuestyCaptcha",
        "Moderation",
        "OATHAuth",
        "PageForms",
        "SemanticMediaWiki",
        "VisualEditor",
    }
    settings = (wiki / "config/settings/global/settings.yaml").read_text(encoding="utf-8")
    missing = sorted(name for name in expected_extensions if f"- {name}" not in settings)
    if missing:
        raise SystemExit(f"missing required extensions: {', '.join(missing)}")

    compose = (wiki / "compose.yaml").read_text(encoding="utf-8")
    dockerfile = (wiki / "Dockerfile").read_text(encoding="utf-8")
    if "healthcheck:" not in compose or "depends_on:" not in compose:
        raise SystemExit("compose stack lacks health/dependency controls")
    if len(re.findall(r"image:\s+[^\n]+@sha256:[0-9a-f]{64}", compose)) < 2:
        raise SystemExit("MariaDB and Caddy images must both be digest-pinned")
    if not re.search(r"canasta@sha256:[0-9a-f]{64}", dockerfile):
        raise SystemExit("Canasta base image is not digest-pinned")
    if "MODERATION_COMMIT=" not in dockerfile:
        raise SystemExit("Moderation extension is not commit-pinned")
    if "OATHAUTH_COMMIT=" not in dockerfile:
        raise SystemExit("OATHAuth extension is not commit-pinned")

    model_count = len(list((repo / "content/models").glob("*.md")))
    benchmark_count = len(list((repo / "content/benchmarks").glob("*.md")))
    curation_count = len(list((repo / "curation/models").glob("*.yml")))
    if (model_count, benchmark_count, curation_count) != (42, 74, 42):
        raise SystemExit(
            "unexpected source inventory: "
            f"models={model_count}, benchmarks={benchmark_count}, curation={curation_count}"
        )

    manifest = wiki / "generated/seed/manifest.tsv"
    if manifest.exists():
        entries = [line for line in manifest.read_text(encoding="utf-8").splitlines() if line]
        expected = model_count + benchmark_count + curation_count + 13
        if len(entries) != expected:
            raise SystemExit(f"seed manifest has {len(entries)} pages; expected {expected}")

    env_path = wiki / ".env"
    if env_path.exists():
        env_text = env_path.read_text(encoding="utf-8")
        if "replace-with-" in env_text:
            raise SystemExit("runtime .env still contains placeholder secrets")

    print(
        "PASS stack validation: pinned images/extensions, moderation controls, "
        f"source inventory {model_count}/{benchmark_count}/{curation_count}"
    )


if __name__ == "__main__":
    main()
