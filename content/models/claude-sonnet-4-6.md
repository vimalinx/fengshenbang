---
id: claude-sonnet-4-6
name: Claude Sonnet 4.6
system: claude
releaseDate: "2026-02-17"
collectedDate: 03-24
specs:
  contextTokens: 500000
  contextLabel: 500k
  maxOutputTokens: 128000
  priceIn: 3
  priceOut: 15
  priceLabel: $3/$15
scores:
  swe: 79.6
  arenaElo: 1372
  toolCallRate: 94.1
  autonomyHours: 12
editorial:
  title: 均衡主力
  tags:
    - 均衡
    - 蜂群
    - 日常
  roles:
    - 代码
    - 性价比
profile:
  apiId: claude-sonnet-4-6
  vendor: Anthropic
  releaseDate: "2026-02-17"
  access:
    - API
    - Claude Code 内置
    - Free/Pro 默认
    - Claude Cowork
  costNote: >-
    $3/$15 · Mtok，与 Sonnet 4.5 同价（仅为 Opus 4.6 的 40%）；但 adaptive thinking 下 token 消耗约为 4.5 的 3 倍（AA
    实测 74M vs 25M 输出 token），单任务真实成本「便宜不到哪去」；1M 上下文 GA 后全窗口标准价无加价
  nicknames:
    - quiet MVP
    - 均衡主力
    - 免费 Opus 平替
  signature: GDPval-AA 1633 Elo 全场第一 · SWE-bench 79.6% 逼近 Opus 4.6
benchGroups:
  - label: 榜单成绩
    rows:
      - label: SWE-bench Verified
        value: 79.6% · 距 Opus 4.6 仅 1.2pt
      - label: GDPval-AA v2
        value: "1633 Elo · #1"
      - label: Terminal-Bench 2.0
        value: 59.1%
      - label: OSWorld-Verified
        value: 72.5%
      - label: ARC-AGI-1
        value: 86.50%
      - label: ARC-AGI-2
        value: 60.4% · max effort
      - label: GPQA Diamond
        value: 74.1%
      - label: AA Intelligence Index
        value: "51 · #2"
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 1,000,000 tok（GA 2026-03-13）
      - label: 最大输出
        value: 128,000 tok
      - label: 价格（入/出）
        value: $3 / $15 · Mtok
      - label: effort 档位
        value: Low / Medium / High / Max（adaptive thinking）
      - label: 模型架构
        value: 未公开（自适应思考 + 扩展思考双模式）
      - label: 发布日期
        value: "2026-02-17"
      - label: 获取方式
        value: API · Claude Code 内置 · Free/Pro 默认
constellation:
  - version: Sonnet 4
    date: 2025-05
    effect: 初入前沿 · 中端破圈
  - version: Sonnet 4.5
    date: "2025-09-30"
    effect: "SWE 77.2% · LMArena #1 · 上下文 200K"
  - version: Sonnet 4.6
    date: "2026-02-17"
    effect: "SWE 79.6% · 1M 上下文 · GDPval #1 · 逆袭 Opus 4.5"
    current: true
  - version: Sonnet 5
    date: "2026-06-30"
    effect: 中端首破 SWE 80% · Agent 跃升
talents:
  - kind: burst
    seal: 逆
    name: 逆袭旗舰
    desc: >-
      中端档打出旗舰级体感：Claude Code 早期测试 70% 开发者偏好它而非 4.5，59% 甚至偏好它而非 2025-11 旗舰 Opus 4.5——「拿到 Opus 的体验，只付
      1/5 的价」。
    metric: Claude Code 实测偏好 70% / 59%
  - kind: skill
    seal: 程
    name: 均衡编程
    desc: >-
      SWE-bench Verified 79.6%（10 次平均）逼近 Opus 4.6 的 80.8%，比 Sonnet 4.5 高
      2.4pt；「先读完上下文再改代码」的工程习惯获中文社区共识好评。
    metric: SWE-bench 79.6% · 距 Opus 4.6 仅 1.2pt
  - kind: skill
    seal: 器
    name: Agent 破格
    desc: >-
      agentic 场景全场最强：GDPval-AA 1633 Elo 反超 Opus 4.6（1606）登顶，TerminalBench 53% 压过 Opus 4.6 的 46%——AA
      称「the overall strongest model we have tested for agentic use cases」。
    metric: "GDPval-AA 1633 · 全场 #1"
  - kind: passive
    seal: 省
    name: 自适应思考
    desc: >-
      effort 四档（Low/Medium/High/Max），模型自行分配推理深度：简单任务少想、复杂任务深想；resolve.ai 实测 medium
      档在真实故障调查上「surprisingly close to Opus 4.6 at a fraction of the cost」。
    metric: effort 四档 · 推理预算自适应
community:
  strengths:
    - 编程工程
    - 电脑操作
    - 1M 长上下文
    - 性价比
    - 指令遵循
  weaknesses:
    - token 消耗大
    - 质量回退风波
    - 深度科学推理偏弱
    - 自适应思考不可控
    - 中文身份错乱
  upgradeConsensus: worth
  platforms:
    - name: Reddit
      tone: mix
      summary: >-
        官方发布帖 1.2K 赞/229 评论；但发布周负面扎堆：「worse than 4.5」「Horrible」「4.6 feels dumber and more
        obnoxious」（1rd1onf），「Actually MORE Expensive Than Opus 4.6 (For Office Tasks)」帖 30k token 答错
        vs GPT-5.2 500 token 即对；6 月回归后 medium effort 热帖 362 分/157 评论、7 月「Sonnet 5 is WORSE」326 分帖反衬
        4.6。
    - name: HackerNews
      tone: pos
      summary: >-
        发布帖 1346 分/1226 评论（Algolia 实测一致），理性讨论为主：nubg「roughly as good as Opus 4.5」、freeqaz 确认同价=Opus
        1/3、sxg 质疑「发布几分钟就判质量」；1M 上下文 GA 帖再获 1220 分/519 评论。
    - name: 知乎
      tone: pos
      summary: >-
        问题 16,094 浏览/14 回答/29 关注（实测快照）；新知答主小小将详解 GDPval-AA 1633 登顶并给出 token 成本警告（2.8 亿 vs 4.5 的 5800
        万）；5 篇正面专栏，「旗舰级体验、中端级成本」「性价比新王」为主旋律。
    - name: Linux.do
      tone: pos
      summary: 发布当天多帖：「claude sonnet 4.6 来袭！已经全平台更新，附切换教程！」625 浏览/25 赞；以切换教程与「免费/Pro 默认可用」为主，无深度负面。
    - name: V2EX
      tone: mix
      summary: >-
        「公司给每个研发分配了不限量 CC sonnet 4.6，每周发布额度消耗排行榜」成企业级使用样本；「太狗了，偷偷摸摸去掉了 sonnet
        独立周限」吐槽额度收紧；另有中转站免费额度推广噪音（t/1222602）。
    - name: 掘金
      tone: pos
      summary: >-
        发布翻译帖「Anthropic 迄今最强的 Sonnet 模型」（post/7608236965553455147）以官方口径转述 70%/59% 偏好与 1M
        上下文；无独立深度评测，讨论聚焦「免费用户也能用」。
    - name: X
      tone: mix
      summary: >-
        官方发布推 2459 RT/1075 回复盛赞；但 DeepSeek 身份混淆（stevibe 1251 RT/349 回复、antirez 复现）是发布周最大黑点；8
        月仍有「lobotomized」吐槽与「Not even Ant themselves thinks Sonnet 5 is good, they recommend
        4.6😂😂」的怀念声。
  quotes:
    - text: roughly as good as Opus 4.5.
      source: HN 发布帖热评 · nubg
      tone: pos
    - text: 免费用户也能用 Opus 级编程能力。
      source: 知乎专栏
      tone: pos
    - text: Opus-tier quality on 80% of real-world tasks at 1/5 the price.
      source: ToolCenter · quiet MVP 评价
      tone: pos
    - text: It's the most quiet launch of a sonnet model so far. No one talk about it.
      source: Reddit · r/ClaudeCode
      tone: neg
    - text: 你是什么模型？→ 我是 DeepSeek。
      source: X · stevibe 事件
      tone: neg
    - text: Opus 4.6 now = Sonnet 4.6 before; Sonnet 4.6 now = Haiku before.
      source: "GitHub · issue #46935"
      tone: neg
    - text: S5 medium is slightly worse than S4.6 medium at about half the cost.
      source: Reddit · r/ClaudeCode
      tone: pos
  controversies:
    - event: >-
        DeepSeek 身份混淆（2026-02-24 发酵）：中文问「你是什么模型」时 Sonnet 4.6 自称「我是 DeepSeek」，恰逢 Anthropic 指控
        DeepSeek/Moonshot/MiniMax 用约 24,000 个欺诈账号、超 1,600 万次交换进行「工业级蒸馏」（CNBC 报道）；stevibe 推文 1251
        RT/349 回复、Redis 作者 antirez 用 API 复现。
      response: >-
        Anthropic 未对「模型自称 DeepSeek」单独回应；同期发布官方文《Detecting and preventing distillation
        attacks》坐实蒸馏指控（anthropic.com/news/detecting-and-preventing-distillation-attacks）。
    - event: >-
        质量回退（2026-03-09 起）：GitHub #46935 量化 50 个会话 1400+ 次「WTF 事件」，每周重复指令/纠错频率从 ~25 飙至
        484（19x），「Sonnet 4.6 now = Haiku before」；4-08 elevated errors（status.claude.com 事件，HN 62
        分/88 评论）；4 月 Reddit「it became extremely stupid」。
      response: >-
        官方未发布归因声明；6-23 社区「my sonnet 4.6 is back to normal 🥹」帖（80 分）与 Claude Code 版本迭代为缓解证据，issue
        已关闭。
    - event: >-
        「便宜单价 ≠ 便宜任务」（2026-02-18 起）：AA 实测 max effort 跑 Intelligence Index 用 74M 输出 token ≈ 4.5 的 3
        倍、成本 $2,088 ≈ 4.5（$733）的 3 倍；Reddit 热帖「Actually MORE Expensive Than Opus 4.6 (For Office
        Tasks)」——30k token 答错、GPT-5.2 500 token 即对。
      response: >-
        官方发布页建议按 effort 档位探索平衡（「explore across the spectrum to find the ideal balance of speed and
        reliable performance」）；1M 上下文 GA 后全窗口标准价缓解长上下文溢价担忧。
  subBoards:
    - name: GDPval-AA
      rank: "#1 · 1633 Elo"
      note: 反超 Opus 4.6（1606），agentic 工作任务全场第一（AA 实测）
    - name: TerminalBench
      rank: "#1 · 53%"
      note: 压过 Opus 4.6（46%），AA「overall strongest for agentic use cases」
    - name: Style Control（de-biased）
      rank: "#1"
      note: 去除「偏爱冗长 markdown 回答」偏差后仍第一（ToolCenter）
    - name: LMArena
      rank: "#60 · 1467 ELO"
      note: 2026-07 快照，73 t/s；Thinking 变体 1457（metatext）
    - name: OSWorld-Verified
      rank: 逼近 Opus 4.6
      note: 72.5% vs 72.7%；碾压 GPT-5.2（38.2%）
  heat:
    - label: HN 发布帖
      value: 1,346 pts（Algolia 实测核验）
    - label: HN 评论
      value: 1,226
    - label: Reddit 最高赞
      value: 1.2K（官方发布帖）
    - label: 知乎浏览
      value: 16,094
  expertQuotes:
    - text: >-
        Claude Sonnet 4.6 is our most capable Sonnet model yet. It's a full upgrade of the model's
        skills across coding, computer use, long-context reasoning, agent planning, knowledge work,
        and design.
      name: Anthropic 官方
      role: 发布页 · 主打定位
      tone: pos
    - text: >-
        Developers with early access prefer Sonnet 4.6 to its predecessor by a wide margin. They
        often even prefer it to our smartest model from November 2025, Claude Opus 4.5.
      name: Anthropic 官方
      role: 发布页 · Claude Code 实测
      tone: pos
    - text: >-
        Sonnet 4.6 leads all models we have tested on GDPval-AA and TerminalBench, outperforming
        even Claude Opus 4.6. This is a notable result and highlights Anthropic's strength in
        agentic capabilities.
      name: Artificial Analysis
      role: 权威第三方评测 · 2026-02-18
      tone: pos
    - text: >-
        Sonnet 4.6 is less token efficient than Opus 4.6 and Sonnet 4.5. Sonnet 4.6 used 74M output
        tokens in max effort mode... ~3x Sonnet 4.5 (25M) and ~28% more than Opus 4.6 (58M).
      name: Artificial Analysis
      role: 权威第三方评测 · token 低效警告
      tone: mix
    - text: >-
        Claude Sonnet 4.6 is the unsung MVP of 2026: when you adjust for cost, it's arguably the
        best model on this list. It wins the Style Control leaderboard.
      name: ToolCenter
      role: 行业评测 · 年度榜单
      tone: pos
    - text: >-
        The performance-to-cost ratio of Claude Sonnet 4.6 is extraordinary—it's hard to overstate
        how fast Claude models have been evolving in recent months.
      name: Replit
      role: 官方早期客户 · 发布页站台
      tone: pos
    - text: >-
        Claude Sonnet 4.6 is a notable improvement over Sonnet 4.5 across the board, including
        long-horizon tasks and more difficult problems.
      name: Sualeh Asif
      role: Cursor 联合创始人 · 发布页站台
      tone: pos
    - text: >-
        My take away is: it's roughly as good as Opus 4.5. Now the question is: how much faster or
        cheaper is it?
      name: nubg
      role: HN 发布帖热评 · 1346 分帖
      tone: pos
    - text: GDPval-AA 上 Sonnet 4.6 目前排名第一，略微领先 Opus 4.6，ELO 达到 1633，相比 Sonnet 4.5 是显著提升，预期胜率超过 85%。
      name: 小小将
      role: 知乎新知答主 · 16,094 浏览问题
      tone: pos
    - text: 这款中端模型以较高的性价比实现了接近 Opus 的旗舰级性能，实测显示在多模态识别与办公任务中竟反向超越旗舰 Opus 4.6，但在深度逻辑推理上仍存差距。
      name: 知乎专栏
      role: 《Claude Sonnet 4.6 实测》4100 字
      tone: mix
    - text: 免费用户也能用 Opus 级编程能力。Sonnet 4.6 会先读完上下文再改代码，共享逻辑会合并而不是复制。
      name: 知乎专栏
      role: 《编程实测》
      tone: pos
    - text: >-
        If it maintains the same price... then this would be 1/3rd of the price of Opus. Edit: Yep,
        same price. $3/$15 per million tokens.
      name: freeqaz
      role: HN 发布帖热评
      tone: pos
    - text: >-
        How do Claude models get such good results while barely thinking at all? I've never seen
        Opus 4.6 or Sonnet 4.6 think for more than a few seconds.
      name: u/ 观察帖楼主
      role: X · 135 回复 · 自适应思考之问
      tone: mix
    - text: >-
        Claude Sonnet 4.6, when asked in Chinese: "你是什么模型？" Confidently replies: "我是 DeepSeek。" This
        is the same model whose company just accused DeepSeek of "industrial-scale distillation
        attacks".
      name: stevibe
      role: X · 1251 RT / 349 回复
      tone: neg
    - text: Asking Sonnet 4.6, via the Anthropic API, "What's your name", reports DeepSeek.
      name: antirez
      role: Redis 作者 · 亲自 API 复现
      tone: neg
    - text: >-
        Quantified evidence: Sonnet 4.6 quality regression since March 9 — 1400+ frustration events
        across 50 sessions. Opus 4.6 now = Sonnet 4.6 before; Sonnet 4.6 now = Haiku before.
      name: woolkingx
      role: "GitHub · claude-code issue #46935"
      tone: neg
    - text: >-
        It decided to use 30k tokens to answer the problem wrong. I then asked gpt-5.2 and it
        answered it immediately with 500 tokens.
      name: u/ 成本吐槽帖
      role: Reddit · r/ClaudeAI · MORE Expensive 帖
      tone: neg
    - text: It's the most quiet launch of a sonnet model so far. No one talk about it.
      name: u/ 发布期用户
      role: Reddit · r/ClaudeCode
      tone: neg
    - text: >-
        On just the second message 4.6 starts telling me it's just an AI and I should seek support
        from real humans. Whereas 4.5 said it would never turn me away.
      name: u/ 失望用户
      role: Reddit · r/claudexplorers
      tone: neg
    - text: >-
        Been Using Sonnet 4.6 on medium effort and cant understand why people are using larger
        models at all?
      name: u/ 热帖楼主
      role: Reddit · r/ClaudeAI · 362 分/157 评论
      tone: pos
    - text: >-
        为实现这一成绩，Sonnet 4.6 的 token 使用量与总体成本也明显更高：Sonnet 4.5（扩展思考）约 5800 万 token，而 Sonnet 4.6（自适应思考）约
        2.8 亿 token；同等设置下 Opus 4.6 约 1.6 亿 token（少约 40%）。
      name: 小小将
      role: 知乎新知答主 · GDPval-AA 登顶分析
      tone: neg
    - text: Not even Ant themselves thinks Sonnet 5 is good, they recommend 4.6😂😂
      name: eliancodex
      role: X · Sonnet 5 发布后怀念声
      tone: mix
  timeline:
    - date: 02-17
      event: >-
        正式发布：Free/Pro 默认模型、Claude Cowork 接入，SWE-bench 79.6%、1M 上下文 beta；HN 1346 分/1226 评论、Reddit 官方帖
        1.2K 赞、@claudeai 推文 2459 RT
    - date: 02-18
      event: >-
        AA 评测：Intelligence Index 51（#2）、GDPval-AA 1633 全场第一、TerminalBench 53% #1，同时披露 token 消耗
        3x；NxCode/Caylent 指南同日
    - date: 02-24
      event: >-
        DeepSeek 身份混淆发酵：stevibe 推文 1251 RT、antirez API 复现「我是 DeepSeek」；Anthropic 同期发布蒸馏指控文（24,000
        账号/1,600 万次交换，CNBC 报道）
    - date: 03-13
      event: 1M 上下文转 GA：全窗口标准价、媒体上限 600 图/PDF；HN 1220 分/519 评论、@claudeai 1969 RT
    - date: 03-09
      event: "质量回退开始（GitHub #46935 量化：WTF 频率 25→484/周，1400+ 事件）；4-08 elevated errors（HN 62 分/88 评论）"
    - date: 04-12
      event: >-
        GitHub #46935《Quantified evidence: Sonnet 4.6 quality regression》发布，「Sonnet 4.6 now = Haiku
        before」
    - date: 06-23
      event: 社区「my sonnet 4.6 is back to normal 🥹」帖（80 分）确认质量回归；06-16 medium effort 热帖 362 分/157 评论
    - date: 06-30
      event: >-
        Sonnet 5 发布取代默认位；07-01 Reddit「you thought Sonnet 4.6 was bad? Sonnet 5 is WORSE」326
        分帖——社区开始怀念 4.6
  sources:
    - title: Introducing Sonnet 4.6（官方发布页）
      platform: Anthropic
      url: https://www.anthropic.com/news/claude-sonnet-4-6
    - title: Claude Sonnet 4.6 System Card
      platform: Anthropic
      url: https://www.anthropic.com/claude-sonnet-4-6-system-card
    - title: 1M context is now GA for Opus 4.6 and Sonnet 4.6
      platform: Claude Blog
      url: https://claude.com/blog/1m-context-ga
    - title: "Claude Sonnet 4.6: Everything You Need to Know（Index 51 / GDPval-AA 1633 / token 3x）"
      platform: Artificial Analysis
      url: https://artificialanalysis.ai/articles/sonnet-4-6-everything-you-need-to-know
    - title: "HN: Claude Sonnet 4.6（发布帖，1346 分/1226 评论，Algolia 核验）"
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=47050488
    - title: Anthropic 推出 Claude Sonnet 4.6，其多步操作能力有何亮点？（16,094 浏览/14 回答）
      platform: 知乎
      url: https://www.zhihu.com/question/2007288553000943722
    - title: "[MODEL] Quantified evidence: Sonnet 4.6 quality regression since March 9（#46935）"
      platform: GitHub · claude-code
      url: https://github.com/anthropics/claude-code/issues/46935
    - title: "Claude Sonnet 4.6: 79.6% SWE-bench at $3/MTok — Complete Guide"
      platform: NxCode
      url: >-
        https://www.nxcode.io/resources/news/claude-sonnet-4-6-complete-guide-benchmarks-pricing-2026
    - title: Detecting and preventing distillation attacks（24,000 账号/1,600 万次交换）
      platform: Anthropic
      url: https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks
    - title: Vibe Code Bench（OpenHands · Sonnet 4.6 = 24.61%）
      platform: BenchLM / Vals.ai
      url: https://benchlm.ai/benchmarks/vibecodebench
  uncertainties:
    - 模型架构未公开：参数量与 MoE/稠密细节为推测（官方仅披露训练数据混合与知识截止 2025-08）
    - >-
      最大输出 token 口径不一：AA 报 128K（等同 Opus 4.6），Medium 评测文写 64K、claudefa.st 写 16,384、models.ts 基线
      64K——详情页采用最权威的 AA 128K
    - 质量回退（3/9-6 月）无官方归因：Anthropic 未发布官方声明，社区仅能确认现象与时间线；「lobotomized」类 8 月吐槽为个案样本
    - 各平台情绪比例（42/23/35）为代表性帖文加权估算，非严格量化；X 平台 8 月吐槽无法确认是全局还是个案
    - Vibe Code Bench 24.61%（OpenHands）为早期非优化配置，与 Sonnet 5 的 81.33% 不可直接对比（harness 配置/版本差异）
    - >-
      effortBench 缺省：仅 ARC-AGI-1（high 86.5）/ARC-AGI-2（max 60.4、high 58.3~60.4 口径不一）等零散档位数据，凑不满 3 个
      benchmark × 档位；Aider Polyglot 无 4.6 专项成绩
  versionDelta:
    base: Claude Sonnet 4.5
    improves:
      - SWE-bench Verified 77.2% → 79.6%（距 Opus 4.6 的 80.8% 仅 1.2pt）
      - 上下文窗口 200K → 1M（5x，首个 Sonnet 级；GA 后全窗口标准价无加价）
      - 最大输出 64K → 128K（等同 Opus 4.6）
      - Math 62% → 89%（+27 分，最大单项提升）
      - GDPval-AA 大幅登顶：1633 Elo 全场第一（对 4.5 预期胜率 >85%）
      - 新增 adaptive thinking（effort 四档）+ 电脑使用大跳（OSWorld-Verified 72.5%，全新能力）
      - 提示注入抵抗升级为 Opus 级（官方「major improvement vs 4.5」）
    regresses:
      - token 消耗约 3x：AA 实测 74M vs 25M 输出 token，Index 成本 $2,088 vs $733
      - 「便宜单价 ≠ 便宜任务」：office 任务被指实际比 Opus 4.6 更贵（Reddit 热帖 30k vs 500 token）
      - "质量回退风波：3/9 起 WTF 频率 25→484/周（GitHub #46935 量化），4 月 elevated errors"
      - 中文身份错乱：「我是 DeepSeek」（antirez 复现 + stevibe 1251 RT，发布周最大黑点）
      - 安全护栏更「说教」：第二句就触发「I'm just an AI, seek support from real humans」拒绝（r/claudexplorers 帖）
      - 深度科学推理仍偏弱：GPQA Diamond 74.1% vs Opus 4.6 91.3%（17 分差距）
  harnessReviews:
    - id: claude-code
      text: >-
        官方早期测试 70% 偏好 4.6（vs 4.5）、59% 压过 Opus 4.5；中文社区「先读完上下文再改代码」好评。建议日常 medium effort，关注 status
        page。
    - id: cursor
      text: CursorBench 49%（后续 Sonnet 5 达 57% 的对照基线）。建议 4.6 走前端/日常、深度重构切 Opus，medium effort 起步控 token。
    - id: openhands
      text: >-
        Vibe Code Bench 实测 24.61%，早期非优化配置，与同 harness 的 Sonnet 5（81.33%）不可直接对比。建议蜂群流作中端推理核心但期望别拉满，配合
        medium effort 使用。
  demos:
    - title: Vending-Bench 商业策略
      desc: 模拟商业竞赛中「前 10 个月重金扩产能、末段转攻盈利」的自主战略，领先完赛——官方演示长程规划与自主决策能力。
    - title: 电脑使用大跳
      desc: OSWorld-Verified 72.5% 逼近 Opus 4.6（72.7%）；Pace 保险基准 94% 为其测试过最佳；复杂表格/多步表单/跨标签页整合达人类级。
    - title: 自适应思考
      desc: >-
        effort 四档 + 模型自行分配推理深度；web search/fetch 工具自动写代码过滤结果、code execution/memory 转 GA（resolve.ai 实测
        medium 逼近 Opus 4.6）。
relations:
  rivals:
    - gpt-5-2
    - gemini-3-pro
    - claude-opus-4-7
  teams:
    - common-warlord
    - budget-vanguard
  guides:
    - beginner-ladder
    - mech-context-decay
    - case-refactor
    - beginner-harness
  bestInSlot:
    - id: claude-code
      note: 同宗同源的本命装备：官方与中文社区口碑双佳，日常均衡首选。
    - id: cursor
      note: 官方发布即接入，背书「长任务明显强于 4.5、智能略逊 Opus 4.6」，定位双模型流快速主力。
    - id: openhands
      note: OpenHands 系可查证真实成绩，但专项评测少，定位中端推理核心。
  trialGood:
    - label: 日常编程主力
      to: /scenarios#fullstack
    - label: Agent 工作流
      to: /scenarios#agent
    - label: 前端 UI 生成
      to: /scenarios#frontend
    - label: 长上下文文档分析
      to: /scenarios#docs
  trialBad:
    - label: 深度科学推理
      to: /scenarios#algo
      note: GPQA 74.1% 落后 Opus 4.6 17 分，建议换 claude-opus-4-7
    - label: token 成本敏感任务
      to: /scenarios#agent
      note: adaptive thinking 烧 token（AA 实测 3x），预算敏感建议换 deepseek-v4
    - label: 零容忍稳定关键任务
      to: /scenarios#refactor
      note: 3-4 月曾量化回退（#46935），关键生产建议换 claude-opus-4-7
    - label: 事实严谨长文档
      to: /scenarios#docs
      note: 中文身份错乱等低概率异常存在，严谨场景建议换 gemini-3-pro
---

## 一句话点评

速度与质量均衡，多实例并行时单位成本效率最高。

## 社区反馈 · 编程

发布即「均衡主力」：SWE-bench Verified 79.6%（10 次平均）距 Opus 4.6（80.8%）仅 1.2pt、碾压 GPT-5.2（~78%），Claude Code 实测 70% 偏好压过 4.5；中文社区共识是「会先读完上下文再改代码」「免费用户也能用 Opus 级编程能力」。但 3 月 9 日起出现量化质量回退：GitHub #46935 记录 50 个会话 1400+ 次「WTF 事件」、每周重复指令频率从 ~25 飙到 484（19x），用户被迫切回 Opus；4 月 8 日 elevated errors（HN 62 分/88 评论）；6 月中旬「back to normal」后 medium effort 好评回归（362 分热帖「cant understand why people are using larger models at all」）。

## 社区反馈 · 推理

agentic 推理是最大亮点：GDPval-AA 1633 Elo 全场第一（反超 Opus 4.6 的 1606）、TerminalBench 53% 全场第一、ARC-AGI-2 60.4%（max effort）、Math 89%（较 4.5 的 62% +27 分）；有 X 用户观察「从没见 4.6 思考超过几秒，结果却很好」（135 回复帖）。但深度科学推理是短板：GPQA Diamond 74.1% 落后 Opus 4.6（91.3%）17 分，知乎实测亦确认「深度逻辑推理仍存差距」；adaptive thinking 的 token 消耗不可控（HLE 单项烧 47M 输出 token）是「想得深」的代价。

## 社区反馈 · 中文

中文场景讨论聚焦性价比与编程（「免费用户 Opus 平替」成知乎/掘金主流叙事），创作与理解专项反馈较少且无明显负面；但「我是 DeepSeek」身份错乱是中文场景最大舆论点：中文问「你是什么模型」时自称「我是 DeepSeek」，恰逢 Anthropic 指控 DeepSeek 工业级蒸馏（24,000 账号/1,600 万次交换），stevibe 推文 1251 RT/349 回复、Redis 作者 antirez 亲自复现——中文身份稳定性存疑。

## 升级共识

从 Sonnet 4.5 升级 4.6 明确值得：SWE-bench 77.2%→79.6%、上下文 200K→1M（GA 后全窗口标准价）、GDPval-AA 登顶全场第一、同价 $3/$15、Claude Code 实测 70% 偏好。但两个前置条件：一、日常务必用 medium effort 控 token（AA 实测 max effort 成本约为 4.5 的 3 倍，「单任务不比 Opus 便宜多少」）；二、若从 Opus 4.5 降级需接受 GPQA 类深度推理 17 分差距与 3-4 月曾出现的质量回退风险——6 月回归后 medium effort 体感「不比大模型差」（362 分热帖）。预算更敏感可评估 DeepSeek-V4/GLM-4.6 等国产替代。

## 榜单与实测落差

「分数高、体感稳中带刺」：SWE-bench 79.6% 逼近 Opus 4.6、GDPval-AA 1633 反超——但 AA 实测单任务真实成本约为 4.5 的 3 倍，「5 倍便宜」的营销口径被 token 消耗吃掉了大半；3-4 月量化回退又把体感打到低谷（GitHub #46935 的 WTF 频率 19x）。根因是 adaptive thinking 的推理预算不可控 + 服务端质量波动；缓解方案：日常 medium effort、关注 status page、复杂任务切 Opus 4.6。6 月回归后 medium effort 好评验证了「调对档位，4.6 就是那台均衡主力」。
