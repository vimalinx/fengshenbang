# Grok 5 深度调研补遗

调研基准日：2026-08-10 ｜ 调研方式：AgentKey 号池网关（18323）Brave 搜索 17 轮 + X/Twitter 搜索 2 轮 + 正文抓取 3 轮（felloai / zhihu 量子位 / grokipedia）+ HN Algolia 免费核验 4 轮 + Reddit 专项工具 2 轮
搜索成本：约 15 credits（< 号池总额 1%）

---

## ⚠️ 头条结论（必须读）

**截至调研基准日 2026-08-10，Grok 5 尚未发布。** 多路信源交叉证实：

1. **官方口径**：Grok 5 唯一官方提及出现在 2026-01-06 xAI Series E 融资公告（「Grok 5 正在训练中」）；此后 x.ai/news 无任何后续官方发布文（grokipedia 2026-04 核验）。
2. **马斯克亲口路线图**（X 推文，2026-08-04，获赞 4 万+，roic.ai / Sawyer Merritt 转述）：「Grok 4.6 下周发布，Grok 4.7 三到四周后；**Grok 5 将在年底前发布**，并纳入 SpaceX 全部工程语料」。
3. **跳票史**：原定 Q1 2026（马斯克 2025-11 定）→ 错过；xAI 官方 X 号改口 Q2（5-6 月）→ 6/30 仍无（Polymarket 追踪）→ 8 月最新预计全量 API 最早 Q3 2026。
4. **FelloAI 2026-08-02 更新文**（标题即「Grok 5: Release Date & All We Know So Far」）：「As of August 2026 there is still no confirmed date, with full availability most likely slipping to Q3 2026 or later.」并明确警告「1.5T V9-Medium 发布为 Grok 4.5，**不是** Grok 5；Grok 5 是仍在 Colossus 2 上训练的 6T 模型」。
5. **HN Algolia 核验**：`query="Grok 5"&tags=story` → **0 条独立 Grok 5 发布帖**；`query="Grok 5"` 广义命中 196 条但全部为 Grok 4.5 / Grok 4.3 / 无关话题（逐条核对）。HN 无 Grok 5 发布楼。
6. **docs.x.ai**：模型清单只有 grok-4.5 / grok-4.3 等，无 grok-5 模型 ID；API 定价页无 Grok 5 条目。

### ⚠️ 与 models.ts 的矛盾（录入方必看）

`app/src/data/models.ts` 中 `grok-5` 条目（releaseDate `2026-07-10`、contextTokens 1M、maxOutputTokens 64K、priceIn 6 / priceOut 24、swe 73.0、arenaElo 1349、toolCallRate 89.4、verdict「实时检索能力领先，输出方差较大」）**与调研结果全面冲突，无任何信源支撑**：

- 实际发布状态 = 未发布（无官方发布日期）；models.ts 的 `2026-07-10` 与 Grok 4.5（07-08 发布）仅隔 2 天，且同日无任何 Grok 5 官宣。
- 实际上下文 = 传闻 1.5M（未确认）；实际价格 = 未定价；实际榜单 = 无任何成绩（SWE/ELO/toolCall 均不存在）。
- 建议：**grok-5 详情页不应注册 hasDetail**；models.ts 该条应为「传闻/规划中」占位或等正式发布后再录入。本补遗已把可核实的「规划事实」整理齐全，发布后可快速补跑分。

---

## 一、调研发现（带 URL）

### A. 官方状态与发布时间线（全部可溯源）

| 时间 | 事件 | 来源 |
|---|---|---|
| 2025-11-14 | 马斯克宣布 Grok 5 推迟到 2026，此前预计紧跟 Grok 4（2025-07）之后 | opentools.ai/news/elon-musks-xais-grok-5-launch-pushed-to-2026 |
| 2025-11（Baron Capital 采访） | 确认 6T 参数、原生视频理解、Q1 2026 目标；「intelligent density per GB」创纪录 | news.aibase.com/news/22865 |
| 2026-01-06 | xAI Series E：融资 $20B、估值 $230B（NVIDIA/Cisco/Fidelity/QIA 参投）；官方唯一提及「Grok 5 正在训练中」 | x.ai/news/series-e · grokipedia 核验 |
| 2026-02-02 | SpaceX 官宣收购 xAI（合并估值 $1.25T） | Reuters 2026-02-02 |
| 2026-02 | Colossus 2 激活：世界首个 1-gigawatt 训练集群，约 550,000 张 NVIDIA GB200/GB300，同时训练 7 个模型（1T/1.5T/6T/10T 变体） | x.ai/colossus · lumichats 确认 |
| 2026-Q1 末 | Q1 窗口错过，无发布 | aiinsightsnews.net/grok-5 |
| 2026-04-30 | 期间发布 Grok 4.3（消费旗舰：1M 上下文、原生视频输入、PDF/PPTX/XLSX 输出、$1.25/$2.50）——**不是 Grok 5** | felloai.com/all-we-know-so-far-about-grok-5 |
| 2026-06-30 | Polymarket 追踪的 6/30 窗口错过 | felloai 同文 |
| 2026-07-08 | 发布 Grok 4.5（V9-Medium 1.5T，$2/$6，Cursor 联合训练）——**不是 Grok 5**，但常被媒体误标为 Grok 5 | x.ai/news/grok-4-5 |
| 2026-08-04 | 马斯克：Grok 4.6 下周、Grok 4.7 三四周后、**Grok 5 年底前**；纳入 SpaceX 全量工程语料（「by far the best engineer」） | x.com/SawyerMerritt/status/2084741469609623916（40K+ 赞）· roic.ai/news/musk-grok-46-coming-out-likely-next-week-08-04-2026 |
| 2026-08-10 | 调研基准日：仍无 Grok 5；FelloAI 预计全量 API 最早 Q3 2026 | felloai 同文 |

### B. 传闻规格（全部标注「未确认」）

- **参数**：6T 总参 MoE（主流传闻；Colossus 2 另有 10T 变体在训）；马斯克称「intelligence density per GB 更高」；对比 Grok 3/4 各约 3T，「Grok 5 doubles that to 6 trillion」。
  - 来源：r/grok 泄漏帖（reddit.com/r/grok/comments/1oxppa8）、nextbigfuture.com/2025/11/xai-grok-5-bigger、juliangoldie.com/elon-musk-grok-5-rumors、rdworldonline.com/grok-5-agi-or-battleship-yamato-of-ai
- **上下文**：传闻 1.5M token（「about 50% larger than Claude Opus」）；未确认。
  - 来源：overchat.ai/ai-hub/grok-5-release-date · r/AISEOInsider 泄漏帖（reddit.com/r/AISEOInsider/comments/1q4lr19）
- **多模态**：文本/图片/视频/音频全模态；传闻实时视频输入 + 实时电脑使用（「play ANY game」暗示）；Grok Imagine 视频能力并入统一架构。
  - 来源：r/singularity（reddit.com/r/singularity/comments/1p65zgo）、grokipedia/page/Grok_5
- **多智能体**：Grok 4.20 已用 4 个专职 agent（Grok 协调 / Harper 调研 / Benjamin 逻辑 / Lucas 反方）；Grok 5 传闻扩到 **16+ agents**。
  - 来源：felloai 同文（Grok 4.20 部分）
- **「Reality Engine」**：传闻基于 Community Notes 数据的实时事实核验——**仅出现在博主内容，非 xAI 官方标签**。
  - 来源：felloai 同文 · nxcode.io
- **数据语料**：SpaceX 全量工程语料（除 ITAR 受限部分）——任何实验室拿不到的数据飞轮。
  - 来源：eneralabs.com/blog/spacexai-grok-46-47-enterprise-model-cadence-2026 · 马斯克 08-04 原话

### C. AGI 声明与竞技噱头（有头有脸）

- 马斯克：「Grok 5 达成 AGI 的概率估计为 **10% 且还在上升**」（此前他认为 Grok 系列不会出 AGI）。
  - 来源：winsomemarketing（「Sure, Elon」反讽标题）· cybernews.com/ai-news/grok-5-artificial-general-intelligence · teslarati.com（Grok 5 now has a 10% chance of becoming world's first AGI）· Zhihu 问题「如何看待马斯克称 Grok-5 有 10%概率实现 AGI」（deephub 回答）
- **ARC-AGI SOTA 背景**（Grok 4 而非 Grok 5）：Jeremy Berman 在 Grok 4 上用英语替代 Python 程序合成，ARC-AGI v1 79.6% / v2 29.44%；Eric Pang 的 DreamCoder 启发方案 v1 77.1% / v2 26%，单任务成本 v1 $8.42→$2.56、v2 $30.4→$3.97。马斯克以此为傲并顺势剧透 Grok 5。
  - 来源：量子位（zhuanlan.zhihu.com/p/1952025867187357654）· jeremyberman.substack.com
- **电竞挑战**：马斯克称 2026 年用 Grok 5 挑战人类顶级《英雄联盟》战队（像素级视觉 + 人类反应速度，公开点过 T1）；对比 OpenAI Five 直读内存数字的方式，Grok 5 只能「看屏幕像素」。
  - 来源：bitget.com/news/detail/12560605081330 · eu.36kr.com/en/p/3569825950825602 · x.com/elonmusk/status/1993208505486979327
- **Karpathy 挑战**：马斯克公开向 Andrej Karpathy 发起「Grok 5 vs 人类」编程对决（类比 1997 深蓝 vs 卡斯帕罗夫），Karpathy 礼貌拒绝。
  - 来源：igorslab.de/en/musk-challenges-karpathy-to-a-ki-coding-duel-against-grok-5 · tomshardware.com/tech-industry/musk-challenges-kaparthy-to-an-ai-coding-showdown

### D. 社区情绪（未发布模型的「预期战」）

**Reddit（mix，预期与质疑对半）**
- r/grok「Grok 5 Release Thoughts?」（2026-01）：楼主称 Polymarket 给「3/31 前发布」51% 概率；Colossus 2 2 月完工佐证。→ reddit.com/r/grok/comments/1pocipq
- r/grok「Musk claims Grok 5 AI could be 'true AGI' by year-end」热评：**「will it hell, gemini will be there before grok gets there」**；「Musk claims」与「Putin warns」并列「99% 可忽略的 bullshit」；反方「Considering the rate Grok is improving compared to its peers, he's likely correct」。→ reddit.com/r/grok/comments/1mzfyou
- r/agi「Musk claims Grok 5 will achieve AGI」热评：**「LOL no. grok is the loserest of all the LLMs」**；「从马斯克视角我们可能早就达成 AGI 了」。→ reddit.com/r/agi/comments/1srcpuu
- r/singularity「Elon is hinting that Grok 5 will have live video as input plus live computer use」：**「If Grok can achieve this, it's really going to mess with online games」**——AI 看屏幕实时追踪的作弊想象。→ reddit.com/r/singularity/comments/1p65zgo
- r/AISEOInsider 泄漏帖：「AGI discussions amplify expectations that may never materialize」。→ reddit.com/r/AISEOInsider/comments/1q4lr19

**HackerNews（无独立 Grok 5 楼）**
- HN Algolia 实测 0 条 Grok 5 发布帖；Grok 4.5 发布帖 776 分/1502 评（07-08）是 Grok 系当前 HN 热度顶（系上代，非 Grok 5）。

**知乎（mix）**
- 量子位「马斯克开始疯狂剧透Grok 5了」（2025-09-18）：23 赞同；核心内容 = Grok 4+程序合成 ARC-AGI SOTA + 马斯克「我现在认为Grok 5能达到AGI」+ 训练数据 Grok 4 = Grok 2 的 100 倍 / Grok 3 的 10 倍 + Colossus 已部署约 23 万 GPU（含 3 万 GB200）。→ zhuanlan.zhihu.com/p/1952025867187357654
- 「如何看待马斯克称 Grok-5 有 10%概率实现 AGI」deephub 回答：**「他关于 AGI 的言论，不仅是夸张，甚至带有浓厚的『宗教末世感』和『科幻宿命论』。这次 Grok-5 的『10% 概率』其实算是他近年来比较『克制』和『具体』的一次表态了。」**
- 「马斯克宣布 Grok 5 将在 2025 年年底前推出」问题（2025-12）：主流评论「一切还得看成品」。→ zhihu.com/question/1937093098380461317

**Linux.do / V2EX / 掘金（Grok 5 专项讨论 = 0）**
- 三平台均无 Grok 5 专项讨论帖，只有 Grok 4.5 / Grok Build 内容（V2EX 多帖、掘金「Grok4.5 全网最全使用指南」等）。**「未找到」而不是「没搜」**——三平台按模型名直搜均 0 命中。

**X（pos 偏 hype，马斯克 4 万+ 赞是最大声量）**
- 官方/马斯克路线图推文 40K+ 赞（08-04）；Sawyer Merritt 转述 2.7 万赞推；评论区主流心态「先别信，等成品」。

### E. 热度数字（基准日快照 2026-08-10）

| 项 | 数值 | 口径 |
|---|---|---|
| HN Grok 5 发布帖 | **0**（Algolia 核验无独立帖） | 与 Grok 4.5 发布帖 776 分/1502 评对比明显 |
| HN 评论数 | **0** | 同上 |
| Reddit 最高赞（Grok 5 相关帖） | 未能取得精确分（r/grok 讨论帖存在但 API 返回空） | 见存疑 |
| 知乎相关热度 | 量子位剧透文 23 赞同；「10% AGI」问题多回答 | 低热（未发布模型的正常体量） |
| X 最大声量 | 马斯克 08-04 路线图推文 **40,000+ 赞** | roic.ai 报道口径 |

### F. 争议与官方回应（均为「预期战」争议，非发布后事故）

1. **两度跳票**：Q1 2026 → Q2 2026 → 至今无期。官方回应 = 无正式公告，仅马斯克 08-04 推文给「年底前」新口径 + 期间用 Grok 4.3/4.5/Imagine 1.5 填充节奏（FelloAI 指这正是「Grok 5 is here」假新闻的来源）。
2. **AGI 过度宣传**：10% 概率声明被 r/agi / r/grok / 知乎广泛群嘲（「Musk claims 与 Putin warns 并列」）；winsomemarketing 标题「Sure, Elon」。官方回应 = 无，马斯克本人持续加码（「sentient」「exponential sentience growth」）。
3. **命名混淆（V9-Medium ≠ Grok 5）**：1.5T V9 以 Grok 4.5 名义发布后，大量媒体/自媒体将其标为「Grok 5」，FelloAI 专文辟谣。官方回应 = xAI 未专门澄清（靠 FelloAI 类第三方纠偏）。
4. **人才流失背景**：2026-03 报道 xAI 12 名创始成员走 10 人，「Compute can't replace them」质疑（revolutioninai.com/2026/03/xai-grok5-rebuild-founder-exodus-2026.html）。官方回应 = 无。

### G. Harness 实测（全部为「无数据」——未发布模型不可能有）

- claude-code / cursor / openhands：三轮检索（HN Algolia / Brave / Reddit）均 **0 条** Grok 5 驱动实测。`harnessReviews` 三条全部标 placeholder。
- 上代参考：Grok 4.5 在 Cursor 生态有「first-party model pool + 首周双倍用量」官方联动（cursor.com/blog/grok-4-5），可作为 Grok 5 发布后生态路径的参考预判。

### H. 诨名（预期战阶段社区用语，官方名不算）

- **「6T 巨兽」**：r/grok 泄漏帖 + nextbigfuture 标题化用语（6 trillion beast）。
- **「大和号」（battleship Yamato）**：rdworldonline 标题「Grok-5: AGI or battleship Yamato of AI?」——「巨型但可能过时」的双关（Naïve Scaling 时代顶点隐喻）。
- **「AGI 赌注」**：马斯克「10% and rising」被广泛转述成「Musk's AGI bet」。

---

## 二、核验与矛盾

| 数据点 | 宣称 | 实测 | 结论 |
|---|---|---|---|
| 发布状态 | models.ts releaseDate 2026-07-10 | 无任何信源支持；官方/社区/榜单均无 | ❌ **models.ts 条目为前瞻占位，与事实冲突** |
| SWE 73.0 / ELO 1349 / toolCall 89.4 | models.ts | 无 Grok 5 榜单存在 | ❌ 无来源，疑似借用邻代估算 |
| $6/$24 定价 | models.ts | 未定价；上代 Grok 4.5 为 $2/$6 | ❌ 无来源 |
| 1M 上下文 | models.ts | 传闻 1.5M（未确认） | ⚠️ 传闻口径不一，均未官方确认 |
| 64K 最大输出 | models.ts | 未公布 | ❌ 无来源 |
| 「实时检索能力领先」verdict | models.ts | 无发布后体验支撑（实时检索是 Grok 系传统强项，但 Grok 5 未实测） | ⚠️ 应为 Grok 系共性而非 Grok 5 实测 |
| HN 热度 | — | Grok 5 = 0 帖；Grok 4.5 = 776 分 | ✅ 客观数据 |
| AGI 10% | 马斯克 | 多方一致转述 | ✅ 属实（营销声明） |
| 6T MoE / 1.5M 上下文 | 传闻 | 多源一致但均未官方确认 | ⚠️ 传闻级，进 uncertain |
| 年底前发布 | 马斯克 08-04 | 最新官方口径 | ✅ 最新事实（仍非承诺） |

## 三、未找到（诚实清单）

1. **未找到**：Grok 5 任何官方/第三方榜单成绩（SWE-bench / LMArena / ARC-AGI / Aider / Terminal-Bench 全无——未发布）。
2. **未找到**：官方定价与 API 接入（grok-5 模型 ID 不存在于 docs.x.ai）。
3. **未找到**：effort 档位/思考预算调节的任何信息（无法填 effortBench，字段省略并在 uncertain 说明）。
4. **未找到**：官方演示（发布会/博文演示 0 条——未发布；demos 3 条全部 placeholder）。
5. **未找到**：Harness 实测（claude-code/cursor/openhands 均 0 数据，全部 placeholder）。
6. **未找到**：Linux.do / V2EX / 掘金 的 Grok 5 专项讨论（3 平台直搜 0 命中）。
7. **未找到**：Reddit Grok 5 相关帖精确赞数（JustOneAPI 返回 null，TikHub 搜索被 400 限流，保留描述性引用）。
8. **未找到**：知乎浏览量精确值（知乎未登录态不暴露，量子位文 23 赞同为可见值）。
9. **未找到**：官方对跳票/AGI 质疑的正式回应（仅马斯克推文口径）。

## 四、给录入方的建议

- **暂不注册 hasDetail**：grok-5 详情页数据全部为规划/传闻，注册会渲染「成绩组无数据 + 规格组传闻」的页面，与 models.ts 现值冲突。
- **保留 models.ts 条目但建议主代理复核**：该条 swe/ELO/pricing 无信源，建议标注「传闻/规划」或等发布后以实测替换（本补遗 I-H 节已备好发布后快速回填所需信源）。
- **发布后 2-4 周复查**：按需求文档 §10 时间敏感条款，Grok 5 一旦发布，本补遗的 timeline / 传闻规格 / 情绪预期可直接替换为实测。
