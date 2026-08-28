#!/usr/bin/env python3
"""Convert the repository's Markdown/YAML source into idempotent MediaWiki seed pages."""

from __future__ import annotations

import argparse
import hashlib
import html
import re
import shutil
from pathlib import Path
from typing import Any

import yaml


def parse_matter(path: Path) -> tuple[dict[str, Any], str]:
    text = path.read_text(encoding="utf-8").lstrip("\ufeff")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, text.strip()
    try:
        closing = next(i for i, line in enumerate(lines[1:], 1) if line.strip() == "---")
    except StopIteration as exc:
        raise ValueError(f"unclosed frontmatter: {path}") from exc
    data = yaml.safe_load("\n".join(lines[1:closing])) or {}
    if not isinstance(data, dict):
        raise ValueError(f"frontmatter must be a mapping: {path}")
    return data, "\n".join(lines[closing + 1 :]).strip()


def scalar(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, list):
        return "、".join(scalar(item) for item in value)
    if isinstance(value, dict):
        return "；".join(f"{key}: {scalar(item)}" for key, item in value.items())
    return str(value)


def template_value(value: Any) -> str:
    return scalar(value).replace("|", "{{!}}").replace("\n", "<br>")


def semantic_value(value: Any) -> str:
    return scalar(value).replace("[", "&#91;").replace("]", "&#93;")


def markdown_to_wikitext(body: str) -> str:
    text = body
    text = re.sub(r"^######\s+(.+)$", r"====== \1 ======", text, flags=re.MULTILINE)
    text = re.sub(r"^#####\s+(.+)$", r"===== \1 =====", text, flags=re.MULTILINE)
    text = re.sub(r"^####\s+(.+)$", r"==== \1 ====", text, flags=re.MULTILINE)
    text = re.sub(r"^###\s+(.+)$", r"=== \1 ===", text, flags=re.MULTILINE)
    text = re.sub(r"^##\s+(.+)$", r"== \1 ==", text, flags=re.MULTILINE)
    text = re.sub(r"^#\s+(.+)$", r"= \1 =", text, flags=re.MULTILINE)
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"[\2 \1]", text)
    text = re.sub(r"\*\*([^*\n]+)\*\*", r"'''\1'''", text)
    text = re.sub(r"`([^`\n]+)`", r"<code>\1</code>", text)
    return text


def model_page(data: dict[str, Any], body: str) -> tuple[str, str]:
    name = scalar(data["name"])
    profile = data.get("profile") if isinstance(data.get("profile"), dict) else {}
    specs = data.get("specs") if isinstance(data.get("specs"), dict) else {}
    scores = data.get("scores") if isinstance(data.get("scores"), dict) else {}
    editorial = data.get("editorial") if isinstance(data.get("editorial"), dict) else {}
    fields = {
        "标识": data.get("id"),
        "名称": name,
        "厂商": profile.get("vendor"),
        "模型系列": data.get("system"),
        "发布日期": data.get("releaseDate"),
        "采集日期": data.get("collectedDate"),
        "上下文窗口": specs.get("contextLabel"),
        "最大输出": specs.get("maxOutputTokens"),
        "价格": specs.get("priceLabel"),
        "SWE分数": scores.get("swe"),
        "定位": editorial.get("title"),
        "标签": editorial.get("tags"),
    }
    template = "{{模型信息框\n" + "".join(
        f"|{key}={template_value(value)}\n" for key, value in fields.items()
    ) + "}}"
    source = f"content/models/{data['id']}.md"
    text = (
        f"{template}\n"
        f"[[条目类型::模型]][[源文件::{source}]]\n\n"
        f"{markdown_to_wikitext(body)}\n\n"
        f"== 数据来源 ==\n"
        f"本页由仓库 <code>{source}</code> 初始化。后续修订通过公开审核队列发布。\n"
        f"[[分类:模型]]"
    )
    return f"模型:{name}", text


def benchmark_page(data: dict[str, Any], body: str) -> tuple[str, str]:
    name = scalar(data["name"])
    open_source = data.get("openSource") if isinstance(data.get("openSource"), dict) else {}
    frontier = data.get("frontier") if isinstance(data.get("frontier"), dict) else {}
    fields = {
        "标识": data.get("id"),
        "名称": name,
        "类别": data.get("category"),
        "主办方": data.get("organizer"),
        "网址": data.get("url"),
        "开源状态": open_source.get("status"),
        "前沿分": frontier.get("value"),
        "特征": data.get("traits"),
    }
    template = "{{测试集信息框\n" + "".join(
        f"|{key}={template_value(value)}\n" for key, value in fields.items()
    ) + "}}"
    source = f"content/benchmarks/{data['id']}.md"
    text = (
        f"{template}\n"
        f"[[条目类型::测试集]][[源文件::{source}]]\n\n"
        f"{markdown_to_wikitext(body)}\n\n"
        f"== 数据来源 ==\n"
        f"本页由仓库 <code>{source}</code> 初始化。后续修订通过公开审核队列发布。\n"
        f"[[分类:测试集]]"
    )
    return f"测试集:{name}", text


def curation_page(data: dict[str, Any], source: str) -> tuple[str, str]:
    ident = scalar(data["id"])
    rendered = yaml.safe_dump(data, allow_unicode=True, sort_keys=False).rstrip()
    text = (
        "{{DISPLAYTITLE:编排：" + ident + "}}\n"
        f"[[条目类型::主观编排]][[标识::{semantic_value(ident)}]][[源文件::{source}]]\n\n"
        "'''这不是客观事实。''' 本页记录本站的梯队、星级、六维和情绪等主观判断，"
        "与模型事实页物理分离，仅编排员和管理员可修改。\n\n"
        f"<syntaxhighlight lang=\"yaml\">\n{html.escape(rendered)}\n</syntaxhighlight>\n"
        "[[分类:主观编排]]"
    )
    return f"编排:{ident}", text


STATIC_PAGES = {
    "MediaWiki:Mainpage": "首页",
    "首页": """__NOTOC__
= 封神榜 Wiki =

这是面向公众协作的大模型知识库。注册用户可以提交修改；修改在审核员批准前不会改变公开页面。

* [[Special:CreateAccount|注册参与]]
* [[封神榜 Wiki:参与编辑|参与编辑]]
* [[Special:Moderation|审核队列（审核员）]]
* [[Form:模型|用表单创建模型]]
* [[Form:测试集|用表单创建测试集]]

== 最近收录的模型 ==
{{#ask: [[条目类型::模型]] | ?厂商 | ?发布日期 | ?上下文窗口 | limit=20 | mainlabel=模型}}

== 最近收录的测试集 ==
{{#ask: [[条目类型::测试集]] | ?类别 | ?主办方 | ?开源状态 | limit=20 | mainlabel=测试集}}
""",
    "封神榜 Wiki:参与编辑": """= 参与编辑 =

 # 注册并登录。
 # 打开一个模型或测试集页面，点击“编辑”或“可视化编辑”。
 # 写清事实来源；主观评分不要混进事实字段。
 # 保存后会看到“等待审核”的提示。公开读者仍看到上一版。
 # 审核员在 [[Special:Moderation|审核队列]] 核对来源后批准或拒绝。

== 角色 ==
* '''贡献者'''：所有注册用户；可提交修改，不能直接发布。
* '''审核员（moderator）'''：检查待审内容并批准、拒绝。
* '''编排员（curator）'''：维护“编排:”命名空间的本站主观评分，可直接发布。
* '''管理员（sysop）'''：用户组、站务和系统配置。
""",
    "封神榜 Wiki:审批规则": """= 审批规则 =

审核员至少检查：来源是否可追溯、日期与口径是否清楚、事实与本站主观判断是否分离、是否包含广告或人身攻击。

普通内容使用 Moderation 做'''发布前审核'''。“封神榜 Wiki:”里的站务规则另用 ApprovedRevs 标记正式版本。
""",
    "Template:模型信息框": """<includeonly>
{| class="wikitable"
! 名称 || {{{名称|}}}
|-
! 厂商 || [[厂商::{{{厂商|}}}]]
|-
! 发布日期 || [[发布日期::{{{发布日期|}}}]]
|-
! 上下文 || [[上下文窗口::{{{上下文窗口|}}}]]
|-
! 最大输出 || [[最大输出::{{{最大输出|}}}]]
|-
! 价格 || [[价格::{{{价格|}}}]]
|-
! 定位 || {{{定位|}}}
|}
[[标识::{{{标识|}}}]][[模型系列::{{{模型系列|}}}]][[SWE分数::{{{SWE分数|}}}]][[标签::{{{标签|}}}]]
</includeonly><noinclude>模型结构化信息框，由 [[Form:模型]] 使用。</noinclude>""",
    "Template:测试集信息框": """<includeonly>
{| class="wikitable"
! 名称 || {{{名称|}}}
|-
! 类别 || [[类别::{{{类别|}}}]]
|-
! 主办方 || [[主办方::{{{主办方|}}}]]
|-
! 开源状态 || [[开源状态::{{{开源状态|}}}]]
|-
! 网址 || [{{{网址|}}} 官方页面]
|}
[[标识::{{{标识|}}}]][[前沿分::{{{前沿分|}}}]][[特征::{{{特征|}}}]]
</includeonly><noinclude>测试集结构化信息框，由 [[Form:测试集]] 使用。</noinclude>""",
    "Form:模型": """<noinclude>用此表单创建或编辑模型条目。</noinclude>
{{{for template|模型信息框}}}
{| class="formtable"
! 标识: | {{{field|标识|mandatory}}}
|-
! 名称: | {{{field|名称|mandatory}}}
|-
! 厂商: | {{{field|厂商|property=厂商}}}
|-
! 模型系列: | {{{field|模型系列}}}
|-
! 发布日期: | {{{field|发布日期|property=发布日期}}}
|-
! 上下文窗口: | {{{field|上下文窗口}}}
|-
! 最大输出: | {{{field|最大输出}}}
|-
! 价格: | {{{field|价格}}}
|-
! SWE 分数: | {{{field|SWE分数}}}
|-
! 定位: | {{{field|定位}}}
|-
! 标签: | {{{field|标签|list}}}
|}
{{{end template}}}
'''正文'''
{{{standard input|free text|rows=20}}}
{{{standard input|summary}}} {{{standard input|save}}} {{{standard input|preview}}}
""",
    "Form:测试集": """<noinclude>用此表单创建或编辑测试集条目。</noinclude>
{{{for template|测试集信息框}}}
{| class="formtable"
! 标识: | {{{field|标识|mandatory}}}
|-
! 名称: | {{{field|名称|mandatory}}}
|-
! 类别: | {{{field|类别|property=类别}}}
|-
! 主办方: | {{{field|主办方}}}
|-
! 网址: | {{{field|网址|input type=URL}}}
|-
! 开源状态: | {{{field|开源状态|input type=dropdown|values=open,partial,closed}}}
|-
! 前沿分: | {{{field|前沿分}}}
|-
! 特征: | {{{field|特征|list}}}
|}
{{{end template}}}
'''正文'''
{{{standard input|free text|rows=20}}}
{{{standard input|summary}}} {{{standard input|save}}} {{{standard input|preview}}}
""",
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    repo = args.repo.resolve()
    output = args.output.resolve()

    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)

    pages: list[tuple[str, str]] = list(STATIC_PAGES.items())
    for path in sorted((repo / "content/models").glob("*.md")):
        data, body = parse_matter(path)
        pages.append(model_page(data, body))
    for path in sorted((repo / "content/benchmarks").glob("*.md")):
        data, body = parse_matter(path)
        pages.append(benchmark_page(data, body))
    for path in sorted((repo / "curation/models").glob("*.yml")):
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        pages.append(curation_page(data, str(path.relative_to(repo))))

    titles: set[str] = set()
    manifest: list[str] = []
    for index, (title, content) in enumerate(pages, 1):
        if title in titles:
            raise SystemExit(f"duplicate MediaWiki title: {title}")
        titles.add(title)
        digest = hashlib.sha256(title.encode()).hexdigest()[:12]
        filename = f"{index:04d}-{digest}.wiki"
        (output / filename).write_text(content.rstrip() + "\n", encoding="utf-8")
        manifest.append(f"{title}\t{filename}")

    (output / "manifest.tsv").write_text("\n".join(manifest) + "\n", encoding="utf-8")
    print(
        f"Generated {len(pages)} seed pages: "
        f"{len(list((repo / 'content/models').glob('*.md')))} models, "
        f"{len(list((repo / 'content/benchmarks').glob('*.md')))} benchmarks, "
        f"{len(list((repo / 'curation/models').glob('*.yml')))} curation records"
    )


if __name__ == "__main__":
    main()
