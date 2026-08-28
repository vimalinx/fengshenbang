#!/usr/bin/env python3
"""Exercise the real HTTP contribution -> moderation -> publication flow."""

from __future__ import annotations

import argparse
import http.cookiejar
import json
import secrets
import subprocess
import time
import urllib.parse
import urllib.request
import urllib.error
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


class WikiClient:
    def __init__(self, api_url: str):
        self.api_url = api_url
        self.opener = urllib.request.build_opener(
            urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar())
        )

    def request(
        self,
        params: dict[str, str],
        post: bool = False,
        accepted_error_codes: set[str] | None = None,
    ) -> dict:
        params = {**params, "format": "json", "formatversion": "2"}
        encoded = urllib.parse.urlencode(params).encode()
        request = urllib.request.Request(
            self.api_url if post else f"{self.api_url}?{encoded.decode()}",
            data=encoded if post else None,
            headers={"User-Agent": "fengshenbang-wiki-acceptance/1.0"},
        )
        with self.opener.open(request, timeout=20) as response:
            result = json.load(response)
        if "error" in result and result["error"].get("code") not in (accepted_error_codes or set()):
            raise RuntimeError(f"MediaWiki API error: {result['error']}")
        return result

    def login(self, username: str, password: str) -> None:
        token = self.request({"action": "query", "meta": "tokens", "type": "login"})[
            "query"
        ]["tokens"]["logintoken"]
        result = self.request(
            {
                "action": "login",
                "lgname": username,
                "lgpassword": password,
                "lgtoken": token,
            },
            post=True,
        )
        if result["login"]["result"] != "Success":
            raise RuntimeError(f"login failed for {username}: {result['login']}")

    def csrf(self) -> str:
        return self.request({"action": "query", "meta": "tokens"})["query"]["tokens"][
            "csrftoken"
        ]

    def userrights_token(self) -> str:
        return self.request(
            {"action": "query", "meta": "tokens", "type": "userrights"}
        )["query"]["tokens"]["userrightstoken"]

    def create_account(
        self, username: str, password: str, captcha_answer: str, return_url: str
    ) -> None:
        auth = self.request(
            {
                "action": "query",
                "meta": "authmanagerinfo|tokens",
                "amirequestsfor": "create",
                "type": "createaccount",
            }
        )["query"]
        captcha_id = ""
        for request in auth["authmanagerinfo"]["requests"]:
            if request["id"] == "CaptchaAuthenticationRequest":
                captcha_id = request["fields"]["captchaId"]["value"]
                break
        if not captcha_id:
            raise RuntimeError("public account creation did not provide a CAPTCHA challenge")

        result = self.request(
            {
                "action": "createaccount",
                "createtoken": auth["tokens"]["createaccounttoken"],
                "username": username,
                "password": password,
                "retype": password,
                "captchaId": captcha_id,
                "captchaWord": captcha_answer,
                "createreturnurl": return_url,
            },
            post=True,
        )["createaccount"]
        if result["status"] != "PASS":
            raise RuntimeError(f"public account creation failed: {result}")


def run_compose(wiki_dir: Path, *command: str, capture: bool = False) -> str:
    result = subprocess.run(
        [
            "docker",
            "compose",
            "--env-file",
            ".env",
            "-f",
            "compose.yaml",
            *command,
        ],
        cwd=wiki_dir,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else subprocess.DEVNULL,
        stderr=subprocess.PIPE if capture else subprocess.DEVNULL,
    )
    return result.stdout.strip() if capture else ""


def page_text(client: WikiClient, title: str) -> str:
    result = client.request(
        {
            "action": "query",
            "titles": title,
            "prop": "revisions",
            "rvprop": "content",
            "rvslots": "main",
        }
    )
    page = result["query"]["pages"][0]
    if page.get("missing"):
        return ""
    return page.get("revisions", [{}])[0].get("slots", {}).get("main", {}).get("content", "")


def cleanup_acceptance(
    admin: WikiClient, reviewer: str | None = None, title: str | None = None
) -> tuple[int, int]:
    if reviewer is None:
        users = admin.request(
            {
                "action": "query",
                "list": "allusers",
                "auprefix": "AcceptanceReviewer",
                "auprop": "groups",
                "aulimit": "max",
            }
        )["query"]["allusers"]
        reviewers = [user["name"] for user in users if "moderator" in user.get("groups", [])]
    else:
        reviewers = [reviewer]

    if title is None:
        pages = admin.request(
            {
                "action": "query",
                "list": "allpages",
                "apnamespace": str(3000),
                "apprefix": "验收沙盒-",
                "aplimit": "max",
            }
        )["query"]["allpages"]
        titles = [page["title"] for page in pages]
    else:
        titles = [title]

    for username in reviewers:
        admin.request(
            {
                "action": "userrights",
                "user": username,
                "remove": "moderator",
                "reason": "自动化验收完成，撤销临时审核权限",
                "token": admin.userrights_token(),
            },
            post=True,
        )
    for page_title in titles:
        admin.request(
            {
                "action": "delete",
                "title": page_title,
                "reason": "自动化审批闭环验收清理",
                "token": admin.csrf(),
            },
            post=True,
        )
    return len(reviewers), len(titles)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki-dir", type=Path, required=True)
    parser.add_argument("--cleanup-only", action="store_true")
    parser.add_argument(
        "--provision-contributor",
        action="store_true",
        help="create the contributor through maintenance for repeat tests after registration rate limits",
    )
    args = parser.parse_args()
    wiki_dir = args.wiki_dir.resolve()
    env = read_env(wiki_dir / ".env")
    base_url = env["WIKI_PUBLIC_URL"].rstrip("/")
    api_url = f"{base_url}/w/api.php"

    ready = False
    for _ in range(60):
        try:
            with urllib.request.urlopen(
                f"{api_url}?action=query&meta=siteinfo&format=json", timeout=5
            ) as response:
                ready = response.status == 200
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
            ready = False
        if ready:
            break
        time.sleep(0.5)
    if not ready:
        raise SystemExit("FAIL: MediaWiki API did not become ready")

    if args.cleanup_only:
        admin = WikiClient(api_url)
        admin.login(env["WIKI_ADMIN_USER"], env["WIKI_ADMIN_PASSWORD"])
        reviewers, pages = cleanup_acceptance(admin)
        print(
            f"PASS cleanup: revoked {reviewers} temporary reviewers; "
            f"deleted {pages} acceptance pages"
        )
        return

    suffix = secrets.token_hex(4)
    contributor = f"AcceptanceContributor{suffix}"
    reviewer = f"AcceptanceReviewer{suffix}"
    contributor_password = "Wiki-" + secrets.token_urlsafe(24)
    reviewer_password = "Wiki-" + secrets.token_urlsafe(24)
    marker = f"moderation-acceptance-{secrets.token_hex(10)}"
    title = f"模型:验收沙盒-{suffix}"

    if args.provision_contributor:
        run_compose(
            wiki_dir,
            "exec",
            "-T",
            "web",
            "php",
            "maintenance/createAndPromote.php",
            contributor,
            contributor_password,
        )
        print("PASS provision: repeat-test contributor created through maintenance")
    else:
        registrar = WikiClient(api_url)
        registrar.create_account(
            contributor,
            contributor_password,
            env["WIKI_CAPTCHA_ANSWER"],
            base_url,
        )
        print("PASS registration: anonymous visitor created a contributor account via HTTP")
    run_compose(
        wiki_dir,
        "exec",
        "-T",
        "web",
        "php",
        "maintenance/createAndPromote.php",
        "--custom-groups=moderator",
        reviewer,
        reviewer_password,
    )

    author = WikiClient(api_url)
    author.login(contributor, contributor_password)
    author.request(
        {
            "action": "edit",
            "title": title,
            "text": f"== 审批闭环验收 ==\n{marker}",
            "summary": "自动化审批闭环验收",
            "token": author.csrf(),
        },
        post=True,
        accepted_error_codes={"moderation-edit-queued"},
    )

    public = WikiClient(api_url)
    if marker in page_text(public, title):
        raise SystemExit("FAIL: contributor edit became public before approval")
    print("PASS queued: contributor edit is not visible to anonymous readers")

    sql = (
        "SELECT mod_id FROM moderation WHERE mod_user_text='"
        + contributor
        + "' AND mod_rejected=0 ORDER BY mod_id DESC LIMIT 1"
    )
    mod_id = run_compose(
        wiki_dir,
        "exec",
        "-T",
        "db",
        "mariadb",
        "-N",
        "-u",
        env["WIKI_DB_USER"],
        f"-p{env['WIKI_DB_PASSWORD']}",
        env["WIKI_DB_NAME"],
        "-e",
        sql,
        capture=True,
    )
    if not mod_id.isdigit():
        raise SystemExit("FAIL: no pending Moderation row was created")
    print("PASS queue-record: pending edit exists in Moderation")

    moderator = WikiClient(api_url)
    moderator.login(reviewer, reviewer_password)
    moderator.request(
        {
            "action": "moderation",
            "modaction": "approve",
            "modid": mod_id,
            "token": moderator.csrf(),
        },
        post=True,
    )

    for _ in range(20):
        if marker in page_text(public, title):
            print("PASS approved: reviewer approval published the exact contribution")
            print(f"PASS role: reviewer={reviewer}; page={title}; moderation_id={mod_id}")
            admin = WikiClient(api_url)
            admin.login(env["WIKI_ADMIN_USER"], env["WIKI_ADMIN_PASSWORD"])
            reviewers, pages = cleanup_acceptance(admin, reviewer, title)
            print(
                f"PASS cleanup: revoked {reviewers} temporary reviewer; "
                f"deleted {pages} acceptance page"
            )
            return
        time.sleep(0.5)
    raise SystemExit("FAIL: approved content did not become publicly visible")


if __name__ == "__main__":
    main()
