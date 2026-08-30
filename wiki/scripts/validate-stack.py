#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
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
        "CodeEditor",
        "Moderation",
        "OATHAuth",
        "PageForms",
        "SemanticMediaWiki",
        "VisualEditor",
        "WikiEditor",
    }
    settings = (wiki / "config/settings/global/settings.yaml").read_text(encoding="utf-8")
    site_settings = (wiki / "config/settings/global/10-Fengshenbang.php").read_text(encoding="utf-8")
    missing = sorted(name for name in expected_extensions if f"- {name}" not in settings)
    if missing:
        raise SystemExit(f"missing required extensions: {', '.join(missing)}")
    if "$wgNamespaceContentModels[NS_DATA] = CONTENT_MODEL_JSON" not in site_settings:
        raise SystemExit("data namespace is not configured with the JSON content model")
    if "NS_MAIN, NS_MODEL, NS_BENCHMARK, NS_DATA" not in site_settings:
        raise SystemExit("data namespace is not part of the public content inventory")
    theme = wiki / "config/settings/global/fengshenbang-theme.css"
    if not theme.is_file() or "site.fengshenbang" not in site_settings:
        raise SystemExit("the versioned Fengshenbang ResourceLoader theme is not configured")
    if "SkinBuildSidebar" not in site_settings or "https://fengshenbang.wiki/models" not in site_settings:
        raise SystemExit("the Wiki sidebar does not bridge back to the public portal")
    theme_text = theme.read_text(encoding="utf-8")
    for token in ("#FAFAFA", "#09090B", "#B8860B", ".action-edit", "#wpTextbox1"):
        if token not in theme_text:
            raise SystemExit(f"the Wiki theme is missing required editor token/selector: {token}")
    moderation_match = re.search(r"\$wgModerationOnlyInNamespaces\s*=\s*\[(.*?)\];", site_settings, re.DOTALL)
    if not moderation_match or "NS_DATA" not in moderation_match.group(1):
        raise SystemExit("data namespace is not protected by the Moderation publication gate")

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
        frontend_data_count = 1 + model_count + benchmark_count
        expected = model_count + benchmark_count + curation_count + 16 + frontend_data_count
        if len(entries) != expected:
            raise SystemExit(f"seed manifest has {len(entries)} pages; expected {expected}")
        title_to_file = dict(line.split("\t", 1) for line in entries)
        for title in ["数据:索引", "数据:模型:gpt-5", "数据:测试集:aider-polyglot"]:
            filename = title_to_file.get(title)
            if not filename:
                raise SystemExit(f"seed manifest is missing frontend data page: {title}")
            json.loads((manifest.parent / filename).read_text(encoding="utf-8"))
        for title in ["MediaWiki:Sidebar", "MediaWiki:Sidebar/zh-hans", "MediaWiki:Editnotice-3006"]:
            if title not in title_to_file:
                raise SystemExit(f"seed manifest is missing unified editor interface page: {title}")

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
