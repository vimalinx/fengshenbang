# content/ — 站点内容

**这里是内容的真身。** `app/src/data/generated/` 只是构建产物，不要改它，也不要提交它。

## 目录

| 路径 | 内容 | 状态 |
|---|---|---|
| `content/benchmarks/<id>.md` | 74 个测试集档案 | ✅ 已迁移 |
| `content/models/<id>.md` | 42 个模型档案（Tier 1 + Tier 2） | ✅ 已迁移 |
| `curation/models/<id>.yml` | 42 个模型的 Tier 3 主观打分 | ✅ 已迁移 |
| `content/harnesses/<id>.md` | Harness 档案 | ⏳ 仍在 `app/src/data/harnesses.ts` |
| teams / trials / guides / comparisons | 配队、场景、攻略、对决 | ⏳ 仍在 `app/src/data/` |

## 分层：哪些算事实，哪些算本站评估

这条界线由构建期校验强制执行，不是约定俗成。

| 层 | 放哪 | 例子 | 要求 |
|---|---|---|---|
| **Tier 1 可核实事实** | YAML frontmatter | 题量、主办方、发布日期、分数天梯、开源状态 | 必须有出处；不得放主观打分 |
| **Tier 2 散文考据** | Markdown 正文的 `##` 小节 | 测什么、怎么测、含金量与局限 | 结论要能追到 Tier 1 或公开信源 |
| **Tier 3 主观打分** | `curation/models/<id>.yml` | 梯队、星级、综合战力、六维、情绪比例、体感雷达、弹幕 | 与事实层**物理分离**；benchmark 没有这一层 |

**把主观打分塞进 frontmatter 会被直接拦下**——`schema/benchmark.ts` 用了 `.strict()`，出现未定义字段即构建失败。

## 改一条 benchmark

编辑 `content/benchmarks/<id>.md`，然后：

```bash
cd app
npm run content:check   # 只校验
npm run dev             # 校验 + 生成 + 起站
```

文件结构：

```markdown
---
id: swe-bench-verified        # 必须与文件名一致
name: SWE-bench Verified
category: coding              # coding|reasoning|agent|arena|multimodal|other
organizer: ...
url: https://...              # 可选，须是合法 URL
aliases: [...]                # 站内出现过的别名，用于战绩反查的精确匹配
traits: [...]                 # 3-5 条短语
facts:                        # 至少一条
  - label: 题量
    value: 500 个任务
frontier:
  value: 80                   # 0-100，或 null（该榜非百分制）
  note: ...
openSource:
  status: open                # open|partial|closed
  url: https://...            # 可选
history:                      # 至少一条
  - date: 2024-08             # YYYY / YYYY-MM / YYYY-MM-DD，或「2024–2026」这类区间
    event: ...
ladder:                       # 可选。score 用字符串，量纲不统一（'96.5%' / '1861'）
  - model: Claude Opus 5
    score: 96.0%
    note: 出处与日期
relatedIds: [swe-bench-pro]   # 可选，必须指向真实存在的条目
---

## 一句话
（≤60 字）

## 测什么
## 怎么测
## 典型任务
## 分数怎么看
## 含金量与局限
## 冷知识
（可选，其余六节必填）
```

小节标题必须逐字一致——写错会报错并列出允许的标题，不会静默丢内容。

## 加一条 benchmark

1. 先在 `benchmark-research/` 留调研笔记（联网核验，标明信源）
2. 新建 `content/benchmarks/<id>.md`，`id` 用小写字母/数字/连字符，与文件名一致
3. `npm run content:check` 通过后再提 PR

## 校验会拦住什么

`app/schema/benchmark.ts` 定义规则，`app/scripts/build-content.ts` 执行，CI 在 PR 上跑（阻塞）。

- 事实层出现未定义字段（例如偷偷加主观评分）
- 必填散文小节缺失，或小节标题写错
- `frontier.value` 越界、`category`/`openSource.status` 非法枚举
- `id` 与文件名不一致、`id` 重复
- `relatedIds` 指向不存在的条目或指向自身
- `facts`/`history` 为空——事实层不允许是空的

刻意**不**校验的：`history.date` 不做 ISO 强校验。真实数据里「2024–2026」「2025 起」「发布以来」是合法的沿革表述（289 条中 34 条如此），强校验会误杀。

## 数据不是「演示 mock」

榜单成绩、价格、日期、引文都来自公开渠道调研，逐条对应 `benchmark-research/`、`research-addenda/` 下的笔记。本站无遥测、无账号，因此不存在任何「使用率／阅读量／通关率」类数据。详见根目录 `README.md` 的三类分级表与 `model-research-requirements.md`。

---

## 改一个模型

模型分两个文件，**事实与打分分开放**：

```bash
content/models/<id>.md     # Tier 1 事实（frontmatter）+ Tier 2 散文（## 小节）
curation/models/<id>.yml   # Tier 3 主观打分
```

`content/models/<id>.md` 的 frontmatter 按分层分组，界线肉眼可见：

```yaml
id / name / system / releaseDate / collectedDate   # 身份与发布事实
specs:      # 规格事实：上下文、最大输出、价格（priceIn: null = 自部署）
scores:     # 榜单成绩事实：swe 必填，arenaElo/aiderPolyglot/toolCallRate/autonomyHours 可选
editorial:  # ← 本站编排，不是事实：title / tags（≤3）/ roles
profile:    # 基础档案：apiId、vendor、access、costNote、nicknames、signature
benchGroups / constellation / effortBench?          # 成绩表、版本沿革、思考档位实测
talents:    # 天赋：kind/seal/name/metric 结构化 + desc 散文
community:  # 社区事实：platforms、quotes、controversies、sources、timeline、
            # subBoards、heat、expertQuotes、strengths、weaknesses、
            # upgradeConsensus、versionDelta、harnessReviews、demos、uncertainties
relations:  # 站内关联：rivals（须真实存在）、teams、guides、bestInSlot、trialGood、trialBad
```

正文 6 个固定小节（前 5 必填）：

```
## 一句话点评      ## 社区反馈 · 编程    ## 社区反馈 · 推理
## 社区反馈 · 中文  ## 升级共识          ## 榜单与实测落差（可选）
```

`curation/models/<id>.yml` 只放这些，多一个字段就会被拦：

```yaml
id / tier（T0-T3）/ stars（3-6）/ composite（0-100）
stats:      # 六维 0-100：code/reasoning/context/speed/multimodal/value
sentiment:  # positive + mixed + negative 必须 == 100
radar:      # 固定 10 轴，不多不少：长程任务/编程工程/抽象推理/上下文利用/中文能力/
            # 响应速度/稳定性/指令遵循/易用性/性价比
danmaku:    # text + platform（reddit|hn|x|zhihu|linuxdo|v2ex|bilibili）+ main
```

**把打分写进 content 会被拦下**（`Unrecognized key: "composite"`），反之亦然。两个文件必须一一对应，缺一侧即报错。

未发布模型（`unreleased: true`）另有约束：`releaseDate` 必须是「未发布」，`scores.swe` 必须为 0——避免出现无信源的臆造数字。

## 已知待办：releaseDate 两处不一致

迁移核对时发现 42 个模型里有 **9 个** 的 `releaseDate`（卡片层）与 `profile.releaseDate` 取值不同，最大相隔 9 个月：

| 模型 | 卡片 | profile |
|---|---|---|
| deepseek-v3-2 | 2025-11-27 | 2025-12-01 |
| deepseek-v4 | 2026-02-11 | 2026-04-24 |
| gemini-3-pro | 2026-04-28 | 2025-11-18 |
| glm-5 | 2026-04-16 | 2026-02-07 |
| gpt-5-2 | 2026-05-14 | 2025-12-11 |
| kimi-k3 | 2026-05-28 | 2026-07-16 |
| qwen3-max | 2026-06-25 | 2025-09-24 |
| grok-5 | 未发布 | 未发布（预计 2026 年底 · 原 Q1/Q2 两度跳票） |
| llama-5-maverick | 未发布 | 未发布（站内基线 2026-03-08 · 无信源） |

两者语义尚未厘清（首发日期 vs 站内收录的版本日期？），迁移**保留两份未做合并**，避免丢数据或替编辑做决定。需要回到 `research-addenda/` 核对后统一口径。
