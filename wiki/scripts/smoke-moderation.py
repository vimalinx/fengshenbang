#!/usr/bin/env python3
"""Exercise the real HTTP contribution -> moderation -> publication flow."""

from __future__ import annotations

import argparse
import http.cookiejar
import json
import os
import secrets
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
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


def run_compose(
    wiki_dir: Path,
    *command: str,
    capture: bool = False,
    input_text: str | None = None,
) -> str:
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
        input=input_text,
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


def page_content_model(client: WikiClient, title: str) -> str:
    result = client.request(
        {
            "action": "query",
            "titles": title,
            "prop": "info",
        }
    )
    return result["query"]["pages"][0].get("contentmodel", "")


def sql_value(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def db_query(wiki_dir: Path, env: dict[str, str], sql: str) -> str:
    return run_compose(
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


def confirm_acceptance_email(
    wiki_dir: Path, env: dict[str, str], username: str
) -> None:
    timestamp = time.strftime("%Y%m%d%H%M%S", time.gmtime())
    db_query(
        wiki_dir,
        env,
        "UPDATE user SET user_email="
        + sql_value(f"{username}@invalid.example")
        + ", user_email_authenticated="
        + sql_value(timestamp)
        + " WHERE user_name="
        + sql_value(username),
    )


def cleanup_acceptance(
    wiki_dir: Path,
    env: dict[str, str],
    reviewer: str | None = None,
    title: str | None = None,
) -> tuple[int, int]:
    if reviewer is None:
        result = db_query(
            wiki_dir,
            env,
            "SELECT DISTINCT u.user_name FROM user u "
            "JOIN user_groups ug ON ug.ug_user=u.user_id "
            "WHERE u.user_name LIKE 'AcceptanceReviewer%' "
            "AND ug.ug_group IN ('moderator','acceptance-reviewer')",
        )
        reviewers = [line for line in result.splitlines() if line]
    else:
        reviewers = [reviewer]

    if title is None:
        result = db_query(
            wiki_dir,
            env,
            "SELECT CONCAT(CASE page_namespace "
            "WHEN 3000 THEN '模型:' WHEN 3006 THEN '数据:' END, page_title) "
            "FROM page WHERE page_namespace IN (3000,3006) "
            "AND page_title LIKE '验收沙盒-%'",
        )
        titles = [line for line in result.splitlines() if line]
    else:
        titles = [title]

    if reviewers:
        names = ",".join(sql_value(username) for username in reviewers)
        db_query(
            wiki_dir,
            env,
            "DELETE ug FROM user_groups ug JOIN user u ON u.user_id=ug.ug_user "
            f"WHERE u.user_name IN ({names}) "
            "AND ug.ug_group IN ('moderator','acceptance-reviewer')",
        )
    if titles:
        run_compose(
            wiki_dir,
            "exec",
            "-T",
            "web",
            "php",
            "maintenance/run.php",
            "deleteBatch",
            "--u",
            env["WIKI_ADMIN_USER"],
            "--r",
            "自动化审批闭环验收清理",
            input_text="\n".join(titles) + "\n",
        )
    db_query(
        wiki_dir,
        env,
        "DELETE FROM moderation WHERE mod_user_text LIKE 'AcceptanceContributor%' "
        "OR mod_user_text LIKE 'AcceptanceEmail%' "
        "OR mod_title LIKE '验收沙盒-%'",
    )
    return len(reviewers), len(titles)


def prepare_browser_fixture(wiki_dir: Path, base_url: str, output: Path) -> None:
    env = read_env(wiki_dir / ".env")
    suffix = secrets.token_hex(4)
    contributor = f"AcceptanceContributor{suffix}"
    reviewer = f"AcceptanceReviewer{suffix}"
    contributor_password = "Wiki-" + secrets.token_urlsafe(24)
    reviewer_password = "Wiki-" + secrets.token_urlsafe(24)
    marker = f"browser-moderation-acceptance-{secrets.token_hex(10)}"
    title = f"模型:验收沙盒-{suffix}"

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
    if env.get("WIKI_REQUIRE_EMAIL_CONFIRMATION") == "true":
        confirm_acceptance_email(wiki_dir, env, contributor)
    run_compose(
        wiki_dir,
        "exec",
        "-T",
        "web",
        "php",
        "maintenance/createAndPromote.php",
        "--custom-groups=acceptance-reviewer",
        reviewer,
        reviewer_password,
    )

    payload = {
        "baseUrl": base_url,
        "contributor": contributor,
        "contributorPassword": contributor_password,
        "reviewer": reviewer,
        "reviewerPassword": reviewer_password,
        "title": title,
        "marker": marker,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    descriptor = os.open(output, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as fixture:
        json.dump(payload, fixture, ensure_ascii=False)
        fixture.write("\n")
    print(
        f"PASS browser-fixture: contributor={contributor}; reviewer={reviewer}; "
        f"path={output}"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki-dir", type=Path, required=True)
    parser.add_argument("--cleanup-only", action="store_true")
    parser.add_argument(
        "--provision-contributor",
        action="store_true",
        help="create the contributor through maintenance for repeat tests after registration rate limits",
    )
    parser.add_argument(
        "--prepare-browser-fixture",
        type=Path,
        help="provision temporary browser-test users and write a mode-0600 fixture file",
    )
    parser.add_argument(
        "--data-namespace",
        action="store_true",
        help="exercise the moderated JSON namespace consumed by the React portal",
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
        reviewers, pages = cleanup_acceptance(wiki_dir, env)
        print(
            f"PASS cleanup: revoked {reviewers} temporary reviewers; "
            f"deleted {pages} acceptance pages"
        )
        return

    if args.prepare_browser_fixture:
        prepare_browser_fixture(
            wiki_dir, base_url, args.prepare_browser_fixture.resolve()
        )
        return

    suffix = secrets.token_hex(4)
    contributor = f"AcceptanceContributor{suffix}"
    reviewer = f"AcceptanceReviewer{suffix}"
    contributor_password = "Wiki-" + secrets.token_urlsafe(24)
    reviewer_password = "Wiki-" + secrets.token_urlsafe(24)
    marker = f"moderation-acceptance-{secrets.token_hex(10)}"
    title = (
        f"数据:验收沙盒-{suffix}"
        if args.data_namespace
        else f"模型:验收沙盒-{suffix}"
    )
    contribution = (
        json.dumps(
            {
                "schemaVersion": 1,
                "kind": "acceptance",
                "id": f"acceptance-{suffix}",
                "marker": marker,
            },
            ensure_ascii=False,
            indent=2,
        )
        if args.data_namespace
        else f"== 审批闭环验收 ==\n{marker}"
    )

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
        if env.get("WIKI_REQUIRE_EMAIL_CONFIRMATION") == "true":
            confirm_acceptance_email(wiki_dir, env, contributor)
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
        "--custom-groups=acceptance-reviewer",
        reviewer,
        reviewer_password,
    )

    author = WikiClient(api_url)
    author.login(contributor, contributor_password)
    author.request(
        {
            "action": "edit",
            "title": title,
            "text": contribution,
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
            if args.data_namespace:
                if page_content_model(public, title) != "json":
                    raise SystemExit("FAIL: approved data page is not using the JSON content model")
                print("PASS data-contract: approved portal data uses the JSON content model")
            print(f"PASS role: reviewer={reviewer}; page={title}; moderation_id={mod_id}")
            reviewers, pages = cleanup_acceptance(
                wiki_dir, env, reviewer, title
            )
            print(
                f"PASS cleanup: revoked {reviewers} temporary reviewer; "
                f"deleted {pages} acceptance page"
            )
            return
        time.sleep(0.5)
    raise SystemExit("FAIL: approved content did not become publicly visible")


if __name__ == "__main__":
    main()
