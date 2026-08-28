#!/usr/bin/env python3
"""Verify the public role and registration contract through MediaWiki's API."""

from __future__ import annotations

import argparse
import json
import urllib.parse
import urllib.request


def api(base_url: str, params: dict[str, str]) -> dict:
    query = urllib.parse.urlencode({**params, "format": "json", "formatversion": "2"})
    request = urllib.request.Request(
        f"{base_url.rstrip('/')}/w/api.php?{query}",
        headers={"User-Agent": "fengshenbang-wiki-permission-acceptance/1.0"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def require(rights: dict[str, set[str]], group: str, expected: set[str]) -> None:
    missing = expected - rights[group]
    if missing:
        raise SystemExit(f"FAIL: {group} is missing rights: {sorted(missing)}")


def forbid(rights: dict[str, set[str]], group: str, forbidden: set[str]) -> None:
    present = forbidden & rights[group]
    if present:
        raise SystemExit(f"FAIL: {group} unexpectedly has rights: {sorted(present)}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    args = parser.parse_args()

    siteinfo = api(
        args.url,
        {"action": "query", "meta": "siteinfo", "siprop": "usergroups"},
    )
    groups = {group["name"]: group for group in siteinfo["query"]["usergroups"]}
    rights = {name: set(group.get("rights", [])) for name, group in groups.items()}
    required_groups = {"*", "user", "moderator", "curator", "sysop"}
    if missing_groups := required_groups - rights.keys():
        raise SystemExit(f"FAIL: missing groups: {sorted(missing_groups)}")

    require(rights, "*", {"read", "createaccount"})
    forbid(rights, "*", {"edit", "upload", "move", "moderation"})
    require(rights, "user", {"read", "edit", "createpage", "createtalk"})
    forbid(rights, "user", {"skip-moderation", "moderation", "upload", "move"})
    require(rights, "moderator", {"moderation", "approverevisions"})
    forbid(rights, "moderator", {"skip-moderation", "edit-curation"})
    require(rights, "curator", {"edit-curation", "skip-moderation"})
    require(rights, "sysop", {"moderation", "skip-moderation", "delete"})
    if not {"moderator", "curator"}.issubset(set(groups["sysop"].get("add", []))):
        raise SystemExit("FAIL: sysop cannot grant moderator and curator groups")

    auth = api(
        args.url,
        {
            "action": "query",
            "meta": "authmanagerinfo",
            "amirequestsfor": "create",
        },
    )["query"]["authmanagerinfo"]
    if not auth["cancreateaccounts"]:
        raise SystemExit("FAIL: public account creation is disabled")
    captcha = next(
        (request for request in auth["requests"] if request["id"] == "CaptchaAuthenticationRequest"),
        None,
    )
    if not captcha or captcha.get("required") != "required":
        raise SystemExit("FAIL: account creation CAPTCHA is not required")

    print(
        "PASS permissions: anonymous/read-register; contributor/queued-edit; "
        "moderator/review; curator/direct-curation; sysop/admin; CAPTCHA/required"
    )


if __name__ == "__main__":
    main()
