# 模型详情页 · 内容区块与爬数清单

> 用途：批量爬取/整理模型调研数据时的对照表。每块按页面出现顺序排列，
> 标注：页面区块 → 前端数据字段（`app/src/data/modelDetails.ts`）→ 需要爬什么。
> 数据结构以 OPUS_5（claude-opus-5）为完整样板，抄它的形状即可。

## 页面结构总览（自上而下）

| # | 区块 | 数据字段 | 必填 | 爬数要点 |
|---|------|----------|------|----------|
| 1 | 面包屑 + 收录日期 | `models.ts` 的 `name` / `releaseDate` | 是 | 官方发布日 |
| 2 | 主卡：3D 柱阵雷达（左） | `community.radar`（有调研）或 `models.ts` 六维 stats（兜底） | 是 | 社区体感十维评分 0-100：长程任务/编程工程/抽象推理/上下文利用/中文能力/响应速度/稳定性/指令遵循/易用性/性价比。非官方跑分，按社区讨论估 |
| 3 | 主卡：身份区（右上） | `models.ts`：`name`/`title`/`tier`/`stars`/`system`/`tags`/`verdict` | 是 | title=封号（如「推理破局旗舰」）；verdict=一句判词，要点出核心矛盾 |
| 4 | 主卡：规格参数墙（右下 3×3） | `benchGroups` 末组（规格组）的 `rows` | 是 | 上下文窗口/最大输出/价格入出/effort 档位/模型架构/发布日期/获取方式。官方公告为准 |
| 5 | 锚点标签页 | 自动从区块生成 | — | 不需要数据 |
| 6 | 口碑·榜单（左栏）：公认强项/弱项 | `community.strengths` / `community.weaknesses` | 有调研必填 | 各 5 条短词。来源：调研 `公认强项`/`公认弱项` |
| 7 | 口碑·榜单（左栏）：体感雷达图 | 同 #2 `community.radar` | 有调研必填 | 同 #2 |
| 8 | 口碑·榜单（左栏）：整体情绪倾向 | `community.sentiment` {positive, mixed, negative} | 有调研必填 | 三数合计 100。来源：`整体情绪倾向` |
| 9 | 口碑·榜单（左栏）：分平台情绪 | `community.platforms[]` {name, tone, summary} | 有调研必填 | 每个平台单独一行：Reddit/HackerNews/知乎/Linux.do/V2EX/掘金/X…… tone∈pos/mix/neg；summary 要带具体数字（赞数/浏览量/帖子引用）。来源：`Reddit情绪`/`HackerNews情绪`/`中文社区情绪`（逐社区拆开）/`Twitter-X情绪` |
| 10 | 口碑·榜单（左栏）：细分反馈 | `community.notes[]` {label, text} | 有调研必填 | 按能力维度：编程/推理/中文…… 来源：`编程能力反馈`/`推理能力反馈`/`中文能力反馈` |
| 11 | 口碑·榜单（左栏）：讨论热度 | `community.heat[]` {label, value} | 有调研必填 | 4 个硬数字：HN points/评论数/Reddit 最高赞/知乎浏览。来源：`讨论热度` |
| 12 | 口碑·榜单（右栏）：榜单成绩表 | `benchGroups` 前几组（成绩组） | 是 | 官方/第三方榜：名称 + 成绩 + 「#1」「纪录」标记（含 #1/纪录 会朱砂高亮+迷你条）。来源：`榜单表现` |
| 13 | 口碑·榜单（右栏）：实测落差批注 | `community.benchmarkGap` | 有调研必填 | 一段话讲清「分数 vs 体感」矛盾及根因。来源：`实测落差` |
| 14 | 口碑·榜单（右栏）：思考强度档位表 | `effortBench` {levels, rows[{name, values[], note}]} | 仅支持 effort 调节的模型 | 各 benchmark × 各档位的成绩矩阵，null=未测。需专门爬「同一 benchmark 不同 effort 档」的数据 |
| 15 | 口碑·榜单（右栏）：子榜单交叉 | `community.subBoards[]` {name, rank, note} | 有调研必填 | 细分领域榜单排名。来源：`子榜单交叉` |
| 16 | 口碑·榜单（右栏）：争议事件 | `community.controversies[]` {event, response} | 有调研必填 | 事件 + 官方回应成对。来源：`主要争议`/`官方回应` |
| 17 | 口碑·榜单（右栏）：升级共识 | `community.upgradeConsensus`(worth/wait/split) + `consensusNote` | 有调研必填 | 来源：`社区升级共识` |
| 18 | 版本变迁·大事记（左长条）：发布大事记 | `community.timeline[]` {date, event} | 有调研必填 | 发布前后关键节点：发布/独立验证/事故/曝光/登顶，4-8 条带日期 |
| 19 | 版本变迁·大事记（右）：精进/失守 | `community.versionDelta` {base, improves[], regresses[]} | 有调研必填 | 对照基准=上一代型号；各 5-7 条，带前后数字对比。来源：`相比上一版进步`/`相比上一版退步` |
| 20 | 版本变迁·大事记（右）：官方演示 | `community.demos[]` {title, desc, placeholder?} | 有调研必填 | 官方发布演示的亮点能力 3 条 |
| 21 | 法宝实战评测 | `community.harnessReviews[]` {id, text, placeholder?} | 有调研必填 | 各主流 Harness（claude-code/cursor/openhands…）上的实测表现；没数据的标 placeholder |
| 22 | 推荐法宝 | `bestInSlot[]` {id, note} | 是 | note 要写细：为什么适配、有什么实测背书、怎么搭配用 |
| 23 | 推荐配队 | `teamIds[]` | 是 | 关联 `teams.ts` 已有配队 id |
| 24 | 试炼相性：擅长/不擅长 | `trialGood[]` / `trialBad[]` {label, to, note?} | 是 | **用大白话**（如「长程代码重构」「前端快速出活」），不擅长要带换人建议。来源：`推荐场景`/`不推荐场景` |
| 25 | 试炼相性同区：名家锐评双行轮播 | `community.expertQuotes[]` {text, name, role, tone} | 有调研必填 | ~20 条有头有脸的人物/媒体/热帖原话，中英都要有，正负混合。来源：`正面代表评价`/`负面代表评价` 里挑署名的 + 官方/机构发言 |
| 26 | 相关攻略 | `guideIds[]` → `guides.ts`（title/category/author/reads/date/excerpt） | 是 | 攻略条目要有 excerpt 摘要 |
| 27 | 存疑与来源 | `community.uncertainties[]` + `community.sources[]` {title, platform, url} | 有调研必填 | 不确定项诚实标注（对应调研 `uncertain` 清单）；来源链接 6-10 条（从 `_sources` 挑权威的） |
| 28 | 全页背景弹幕 | `community.danmaku[]` {text, platform, main} | 有调研必填 | 12-16 条真实社区原声，main=true 的大胶囊放主流/高赞观点（5-6 条），其余小号。platform∈reddit/hn/x/zhihu/linuxdo/v2ex/juejin |

## 还需要的外围数据（不在 community 里）

- `profile`：apiId/vendor/releaseDate/access/costNote/nicknames/signature（外号列表 + 招牌成就一句）
- `constellation[]`：历代版本号 + 日期 + 每代一句话成就，`current: true` 标当前版
- `talents[]`：3-4 个核心能力，kind∈normal/skill/burst/passive，各带 desc + metric 硬指标
- `rivalIds[]`：3 个同档对手模型 id（雷达对比用）

## 调研 data.json 字段 → 页面字段对照速查

- 模型系列/版本号/发布日期/发布方/定价/上下文窗口/模型架构 → `profile` + 规格组 `benchGroups`
- 相比上一版进步/退步 → `versionDelta`
- 社区升级共识 → `upgradeConsensus` + `consensusNote`
- 公认强项/弱项 → `strengths`/`weaknesses`
- 编程/推理/中文能力反馈 → `notes`
- Reddit/HN/中文社区/X 情绪 → `platforms`（中文社区按知乎/Linux.do/V2EX/掘金拆开）
- 整体情绪倾向 → `sentiment`
- 讨论热度 → `heat`
- 典型社区 → 决定 `platforms` 和 `danmaku` 覆盖哪些平台
- 主要争议/官方回应 → `controversies`
- 榜单表现 → 成绩组 `benchGroups`
- 子榜单交叉 → `subBoards`
- 实测落差 → `benchmarkGap`
- 正面/负面代表评价 → `expertQuotes`（挑署名的）+ `danmaku`（挑短的）
- 推荐/不推荐场景 → `trialGood`/`trialBad`（转大白话）
- _sources → `sources`（挑 6-10 条权威链接）
- uncertain → `uncertainties`
