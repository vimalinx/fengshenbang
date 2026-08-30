#!/usr/bin/env python3
"""Verify the public, moderated JSON contract consumed by the React portal."""

from __future__ import annotations

import argparse
import json
import urllib.parse
import urllib.request
from typing import Any


def request(api_url: str, params: dict[str, str]) -> tuple[dict[str, Any], Any]:
    query = {
        **params,
        "format": "json",
        "formatversion": "2",
        "origin": "*",
        "maxlag": "5",
    }
    url = f"{api_url}?{urllib.parse.urlencode(query)}"
    req = urllib.request.Request(
        url,
        headers={"Accept": "application/json", "Origin": "https://fengshenbang.wiki"},
    )
    with urllib.request.urlopen(req, timeout=20) as response:
        payload = json.load(response)
        headers = response.headers
    if "error" in payload:
        raise RuntimeError(f"MediaWiki API error: {payload['error']}")
    return payload, headers


def revision_content(page: dict[str, Any]) -> dict[str, Any]:
    try:
        raw = page["revisions"][0]["slots"]["main"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError(f"page has no public revision content: {page.get('title', '<unknown>')}") from exc
    parsed = json.loads(raw)
    if not isinstance(parsed, dict):
        raise RuntimeError(f"page JSON is not an object: {page.get('title', '<unknown>')}")
    return parsed


def batches(items: list[dict[str, str]], size: int = 50):
    for offset in range(0, len(items), size):
        yield items[offset : offset + size]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True, help="Wiki public base URL")
    args = parser.parse_args()
    api_url = f"{args.url.rstrip('/')}/w/api.php"

    index_response, headers = request(api_url, {
        "action": "query",
        "prop": "info|revisions",
        "rvprop": "content|timestamp",
        "rvslots": "main",
        "titles": "数据:索引",
    })
    if headers.get("Access-Control-Allow-Origin") != "*":
        raise SystemExit("FAIL frontend-data: anonymous CORS is not enabled")
    pages = index_response.get("query", {}).get("pages", [])
    if len(pages) != 1 or pages[0].get("contentmodel") != "json":
        raise SystemExit("FAIL frontend-data: 数据:索引 is missing or not JSON")
    index = revision_content(pages[0])
    if index.get("schemaVersion") != 1:
        raise SystemExit("FAIL frontend-data: unsupported index schemaVersion")
    models = index.get("models")
    benchmarks = index.get("benchmarks")
    if not isinstance(models, list) or not isinstance(benchmarks, list):
        raise SystemExit("FAIL frontend-data: malformed index collections")
    if (len(models), len(benchmarks)) != (42, 74):
        raise SystemExit(
            f"FAIL frontend-data: inventory models={len(models)} benchmarks={len(benchmarks)}"
        )

    seen_models: set[str] = set()
    seen_benchmarks: set[str] = set()
    for kind, items, seen in [
        ("model", models, seen_models),
        ("benchmark", benchmarks, seen_benchmarks),
    ]:
        title_prefix = "数据:模型:" if kind == "model" else "数据:测试集:"
        expected_by_title: dict[str, str] = {}
        for item in items:
            if not isinstance(item, dict) or not isinstance(item.get("id"), str):
                raise SystemExit(f"FAIL frontend-data: malformed {kind} index item")
            expected_title = f"{title_prefix}{item['id']}"
            if item.get("title") != expected_title or expected_title in expected_by_title:
                raise SystemExit(f"FAIL frontend-data: non-canonical/duplicate index title {item.get('title')}")
            expected_by_title[expected_title] = item["id"]
        for batch in batches(items):
            titles = "|".join(str(item["title"]) for item in batch)
            response, _ = request(api_url, {
                "action": "query",
                "prop": "info|revisions",
                "rvprop": "content|timestamp",
                "rvslots": "main",
                "titles": titles,
            })
            for page in response.get("query", {}).get("pages", []):
                if page.get("missing") or page.get("contentmodel") != "json":
                    raise SystemExit(f"FAIL frontend-data: missing/non-JSON page {page.get('title')}")
                payload = revision_content(page)
                ident = payload.get("id")
                if payload.get("schemaVersion") != 1 or payload.get("kind") != kind:
                    raise SystemExit(f"FAIL frontend-data: invalid contract on {page.get('title')}")
                if not isinstance(ident, str) or not ident:
                    raise SystemExit(f"FAIL frontend-data: missing id on {page.get('title')}")
                if expected_by_title.get(page.get("title")) != ident:
                    raise SystemExit(f"FAIL frontend-data: index id mismatch on {page.get('title')}")
                if kind == "model":
                    if payload.get("card", {}).get("id") != ident or payload.get("detail", {}).get("modelId") != ident:
                        raise SystemExit(f"FAIL frontend-data: model id mismatch on {page.get('title')}")
                elif payload.get("entry", {}).get("id") != ident:
                    raise SystemExit(f"FAIL frontend-data: benchmark id mismatch on {page.get('title')}")
                seen.add(ident)

    if len(seen_models) != 42 or len(seen_benchmarks) != 74:
        raise SystemExit(
            f"FAIL frontend-data: resolved models={len(seen_models)} benchmarks={len(seen_benchmarks)}"
        )
    print("PASS frontend-data: CORS JSON contract; models=42; benchmarks=74; per-entry ids consistent")


if __name__ == "__main__":
    main()
