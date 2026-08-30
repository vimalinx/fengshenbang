#!/usr/bin/env python3
"""Convert the repository's Markdown/YAML source into idempotent MediaWiki seed pages."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
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
        raise TypeError(f"frontmatter must be a mapping: {path}")
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


def data_page(title: str, payload: dict[str, Any]) -> tuple[str, str]:
    """Render a canonical machine-readable page in MediaWiki's JSON namespace."""
    return title, json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=False)


def frontend_data_pages(repo: Path) -> list[tuple[str, str]]:
    """Publish the validated frontend shape as individually moderated Wiki records.

    The React portal deliberately consumes the same flattened contract that its
    checked-in fallback snapshot uses.  Per-entry pages keep review diffs small,
    allow one record to be reverted independently, and stay below MediaWiki's
    maximum page size even for the richest model dossiers.
    """
    generated = repo / "app/src/data/generated"
    required = {
        "models": generated / "models.json",
        "model_details": generated / "model-details.json",
        "benchmarks": generated / "benchmarks.json",
    }
    missing = [str(path.relative_to(repo)) for path in required.values() if not path.is_file()]
    if missing:
        raise SystemExit(f"missing validated frontend data: {', '.join(missing)}")

    models = json.loads(required["models"].read_text(encoding="utf-8"))
    details = json.loads(required["model_details"].read_text(encoding="utf-8"))
    benchmarks = json.loads(required["benchmarks"].read_text(encoding="utf-8"))
    if not isinstance(models, list) or not isinstance(details, dict) or not isinstance(benchmarks, list):
        raise SystemExit("validated frontend data has an unexpected top-level shape")

    pages: list[tuple[str, str]] = []
    model_index: list[dict[str, str]] = []
    for card in models:
        ident = scalar(card.get("id")) if isinstance(card, dict) else ""
        name = scalar(card.get("name")) if isinstance(card, dict) else ""
        detail = details.get(ident)
        if not ident or not name or not isinstance(detail, dict):
            raise SystemExit(f"model frontend payload is incomplete: {ident or '<missing id>'}")
        title = f"数据:模型:{ident}"
        model_index.append({"id": ident, "title": title})
        pages.append(data_page(title, {
            "schemaVersion": 1,
            "kind": "model",
            "id": ident,
            "wikiTitle": f"模型:{name}",
            "card": card,
            "detail": detail,
        }))

    benchmark_index: list[dict[str, str]] = []
    for entry in benchmarks:
        ident = scalar(entry.get("id")) if isinstance(entry, dict) else ""
        name = scalar(entry.get("name")) if isinstance(entry, dict) else ""
        if not ident or not name:
            raise SystemExit(f"benchmark frontend payload is incomplete: {ident or '<missing id>'}")
        title = f"数据:测试集:{ident}"
        benchmark_index.append({"id": ident, "title": title})
        pages.append(data_page(title, {
            "schemaVersion": 1,
            "kind": "benchmark",
            "id": ident,
            "wikiTitle": f"测试集:{name}",
            "entry": entry,
        }))

    index = {
        "schemaVersion": 1,
        "models": model_index,
        "benchmarks": benchmark_index,
    }
    return [data_page("数据:索引", index), *pages]


STATIC_PAGES = {
    "MediaWiki:Mainpage": "首页",
    "MediaWiki:Sidebar": """* navigation
** 首页|协作首页
** 模型:模型索引|模型知识库
** 测试集:测试集索引|测试集知识库
** 封神榜_Wiki:参与编辑|参与编辑
** Special:Moderation|审核队列
* portal
** https://fengshenbang.wiki|返回封神榜主站
** https://fengshenbang.wiki/models|主站模型榜
** https://fengshenbang.wiki/benchmarks|主站测试集
""",
    "MediaWiki:Sidebar/zh-hans": """* navigation
** 首页|协作首页
** 模型:模型索引|模型知识库
** 测试集:测试集索引|测试集知识库
** 封神榜_Wiki:参与编辑|参与编辑
** Special:Moderation|审核队列
* portal
** https://fengshenbang.wiki|返回封神榜主站
** https://fengshenbang.wiki/models|主站模型榜
** https://fengshenbang.wiki/benchmarks|主站测试集
""",
    "MediaWiki:Editnotice-3006": """<div class="fsb-edit-notice">
<strong>正在编辑主站实时数据</strong>
<span>此命名空间的已审核版本会驱动封神榜主站。请保持 JSON 结构有效并在编辑摘要中说明来源；提交后先进入审核队列，审核通过前不会影响公开主站。</span>
<span>[[封神榜 Wiki:参与编辑|查看编辑指南]] · [https://fengshenbang.wiki 返回主站]</span>
</div>""",
    "首页": """__NOTOC__
= 封神榜 Wiki =

这是面向公众协作的大模型知识库。注册用户可以提交修改；修改在审核员批准前不会改变公开页面。

* [[Special:CreateAccount|注册参与]]
* [[封神榜 Wiki:参与编辑|参与编辑]]
* [[Special:Moderation|审核队列（审核员）]]
* [[Form:模型|用表单创建模型]]
* [[Form:测试集|用表单创建测试集]]
* [[封神榜 Wiki:社区规则|社区规则、反滥用与申诉]]

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
    "封神榜 Wiki:社区规则": """= 社区规则 =

封神榜 Wiki 欢迎可核验、善意且与大模型知识相关的贡献。参与者必须遵守以下规则：

* 为事实、数字和时间敏感信息提供可追溯来源；
* 把事实描述与本站主观编排明确分开；
* 不发布广告、骚扰、人身攻击、违法内容、个人隐私或未授权机密；
* 不批量复制受版权保护的内容，不使用自动化制造垃圾投稿；
* 披露与厂商、模型或评测项目有关的利益关系。

普通投稿在审核员批准前不会公开。严重或重复违规可被拒绝、限制编辑或封禁。具体执行见 [[封神榜 Wiki:反滥用规则|反滥用规则]]；对处理结果有异议时使用 [[封神榜 Wiki:申诉流程|申诉流程]]。
""",
    "封神榜 Wiki:反滥用规则": """= 反滥用规则 =

== 自动控制 ==
* 注册、登录、外链和编辑均受速率限制与 CAPTCHA 保护；
* 新用户短时间加入大量外链、重复文本或明显推广内容时，系统可阻止提交并记录 AbuseFilter 日志；
* 普通用户的正文修改统一进入 Moderation 队列，不直接改变公开内容。

== 人工处置 ==
审核员应留下简短、可复核的拒绝理由。管理员仅在持续垃圾信息、威胁、冒充、泄露隐私或规避封禁时采取封禁；除紧急隐私风险外，优先使用最短且足够的期限。

== 数据与隐私 ==
不要在公开页面粘贴邮箱、电话号码、访问令牌、私聊或其他个人信息。发现此类内容时应先隐藏，再通知管理员处理修订版本。
""",
    "封神榜 Wiki:申诉流程": """= 申诉流程 =

投稿被拒绝、页面被保护或账号受限后，可以通过以下方式申诉：

# 在 [[封神榜 Wiki讨论:申诉流程|本页讨论页]] 新建主题，写明页面、时间、相关差异链接和期望处理方式；
# 涉及隐私或无法登录时，发送邮件至 '''agent@vimalinx.com'''，标题以“[封神榜 Wiki 申诉]”开头；
# 未参与原处理的管理员应复核事实、规则依据和处置比例，并在七日内给出结论；
# 紧急隐私、密钥泄露或人身安全事项优先下线内容，再进行复核。

公开申诉不要包含密码、验证码、私信全文或其他敏感信息。
""",
    "封神榜 Wiki:隐私政策": """= 隐私政策 =

本站为防止滥用和保障账号安全，会处理账号名、邮箱、登录与编辑时间、IP 及必要的安全日志。邮箱用于验证、密码恢复和站务通知，不用于广告营销。

编辑历史通常公开且长期保留。请勿提交他人的个人信息、访问凭据或私密通信。需要查询、纠正或紧急隐藏隐私信息时，请联系 '''agent@vimalinx.com'''。
""",
    "封神榜 Wiki:公开试运行": """= 公开试运行 =

公开试运行自 '''2026年8月29日''' 开始，最短观察七个自然日。期间保持现有 React 主站不变，Wiki 使用独立 staging 域名。

每日门禁记录以下项目：站点与备份健康、注册邮件送达、待审队列长度、审核时效、AbuseFilter 命中、申诉与恢复演练。只有连续七日无阻塞故障、至少两名启用 2FA 的管理员可恢复操作，且异机备份持续有效，才进入主域名切换评审。
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
    pages.extend(frontend_data_pages(repo))

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
        f"{len(list((repo / 'curation/models').glob('*.yml')))} curation records, "
        f"{1 + len(list((repo / 'content/models').glob('*.md'))) + len(list((repo / 'content/benchmarks').glob('*.md')))} frontend data pages"
    )


if __name__ == "__main__":
    main()
