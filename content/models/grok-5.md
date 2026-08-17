---
id: grok-5
name: Grok 5
system: xai
releaseDate: 未发布
collectedDate: 08-09
unreleased: true
specs:
  contextTokens: 0
  contextLabel: 未公布
  priceIn: null
  priceOut: null
  priceLabel: 未定价
scores:
  swe: 0
editorial:
  title: 未发布 · AGI 赌注
  tags:
    - 未发布
    - 传闻
    - 实时检索
  roles:
    - 长文
    - 多模态
profile:
  apiId: grok-5
  vendor: SpaceXAI（xAI）
  releaseDate: 未发布（预计 2026 年底 · 原 Q1/Q2 两度跳票）
  access:
    - 未发布
    - 预期：SuperGrok Heavy $300
    - 预期：SuperGrok $30
    - 预期：X Premium+ $40
  costNote: 未定价。上代 Grok 4.5 为 $2/$6 · Mtok（缓存入 $0.30）；传闻 6T MoE 推理成本将显著高于 1.5T 的 4.5，接入成本待官方定价
  nicknames:
    - 6T 巨兽
    - 大和号
    - AGI 赌注
  signature: 传闻 6T MoE · Colossus 2 训练 · 马斯克称 AGI 概率 10% 且上升（未发布）
benchGroups:
  - label: 榜单成绩
    rows:
      - label: 发布状态
        value: 未发布（截至 2026-08-10，无任何官方/第三方成绩）
      - label: SWE-bench 系列
        value: 无成绩（未发布）
      - label: LMArena / ARC-AGI
        value: 无成绩（未发布）
      - label: 上代参考 · SWE-bench Pro
        value: Grok 4.5 = 64.7%（非 Grok 5）
      - label: 上代参考 · SWE Marathon
        value: "Grok 4.5 = 29.0% #1（非 Grok 5）"
      - label: Grok 4 ARC-AGI SOTA（背景）
        value: 程序合成 79.6% / v2 29.44%（第三方方案，非 Grok 5）
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 传闻 1.5M tok（未确认）
      - label: 最大输出
        value: 未公布
      - label: 价格（入/出）
        value: 未定价（上代 Grok 4.5：$2 / $6 · Mtok）
      - label: effort 档位
        value: 未公布（无思考预算调节信息）
      - label: 模型架构
        value: 传闻 6T 总参 MoE（Colossus 2 另有 10T 变体在训）
      - label: 发布日期
        value: 未发布（Q1→Q2→最新口径 2026 年底）
      - label: 获取方式
        value: 未发布（预期 SuperGrok / X Premium+ / API）
constellation:
  - version: Grok 1
    date: 2023-11
    effect: 首代开山 · 实时检索 X 数据
  - version: Grok 2
    date: 2024-08
    effect: 新增视觉 · 代码与数学精进
  - version: Grok 3
    date: 2025-02
    effect: 推理跃升 · AIME 满分登顶竞技场
  - version: Grok 4
    date: 2025-07
    effect: HLE 首破 50% · ARC-AGI-2 翻倍 SOTA
  - version: Grok 4.5
    date: 2026-07
    effect: SWE Marathon 登顶 · 编程性价比双杀 · 500K
  - version: Grok 5
    date: 2026-12（预计）
    effect: 传闻 6T MoE · AGI 10% 赌注 · 跳票待发
    current: true
talents:
  - kind: burst
    seal: 破
    name: 规模破局（传闻）
    desc: >-
      传闻 6T 总参 MoE——「Grok 5 doubles that to 6 trillion」，Colossus 2（550,000 张
      GB200/GB300、1-gigawatt）同时训练 6T/10T 变体，马斯克称「intelligence density per GB」创纪录。
    metric: 传闻 6T 参数 · Colossus 2 训练（未确认）
  - kind: skill
    seal: 讯
    name: 实时视频理解（传闻）
    desc: 传闻原生实时视频输入 + 实时电脑使用，被暗示「能玩任何游戏」；马斯克称 2026 年将用其挑战顶级 LOL 战队（像素级视觉、人类反应速度）。
    metric: 目标：2026 挑战 T1（像素视觉 · 未确认）
  - kind: passive
    seal: 汇
    name: SpaceX 数据飞轮
    desc: 马斯克 08-04 确认 Grok 5 将纳入 SpaceX 全量工程语料（除 ITAR），自称「by far the best engineer」——任何实验室拿不到的工程数据优势。
    metric: SpaceX 全量工程语料（除 ITAR 部分）
  - kind: normal
    seal: 联
    name: 多智能体扩展（传闻）
    desc: Grok 4.20 已用 4 个专职 agent（协调/调研/逻辑/反方）；传闻 Grok 5 扩展到 16+ agents 并行交叉验证。
    metric: 传闻 4 → 16+ agents（未确认）
community:
  strengths:
    - 实时检索（Grok 系传统强项）
    - 规模潜力（传闻 6T）
    - SpaceX 工程语料
    - 多智能体规划（传闻 16+）
    - 生态联动（Cursor 系路径）
  weaknesses:
    - 未发布（无实测）
    - 两度跳票信誉损耗
    - AGI 过度宣传
    - 幻觉与信任系遗留
    - 成本未知
  upgradeConsensus: wait
  platforms:
    - name: Reddit
      tone: mix
      summary: >-
        「预期战」心态：r/grok「Grok 5 Release Thoughts?」引 Polymarket 51%（3/31 前发布，现已错过）；r/grok「true AGI by
        year-end」帖下「will it hell, gemini will be there before grok gets there」与「Considering the rate
        Grok is improving, he's likely correct」对轰；r/agi 以「LOL no」群嘲；r/singularity
        对实时视频+电脑使用兴奋（「really going to mess with online games」）。
    - name: HackerNews
      tone: neg
      summary: >-
        无独立 Grok 5 发布帖（Algolia 核验 0 条）——未发布模型在 HN 无讨论是客观事实；对比 Grok 4.5 发布帖 776 分/1502 评。HN 侧对 Grok 5
        最接近的声音是「V9-Medium 被媒体误标为 Grok 5」的纠偏帖。
    - name: 知乎
      tone: mix
      summary: >-
        量子位「马斯克开始疯狂剧透Grok 5了」（23 赞同）：详述 Grok 4 ARC-AGI SOTA 与马斯克「Grok 5 能达到 AGI」剧透；「如何看待马斯克称 Grok-5
        有 10%概率实现 AGI」问题下 deephub 答「宗教末世感和科幻宿命论」；2025-12 老问题主流结论「一切还得看成品」。
    - name: Linux.do
      tone: mix
      summary: 无 Grok 5 专项讨论（站内直搜 0 命中，属真实缺口）；现有 Grok 4.5 横评帖仍在讨论上代模型的编程性价比与信任危机，可作为 Grok 5 发布后中文社区反应的基线。
    - name: V2EX
      tone: mix
      summary: >-
        无 Grok 5 专项帖（0 命中）；Grok 标签下多为 Grok 4.5 / Grok Build 内容（「grok build 开源了，老马大手笔！」「Grok4.5
        刚发布，就用它搓了个 grok-hud」）与「刷推」生态（「聊聊 Grok——目前唯一能刷推的 AI」）——体现 Grok 系在中文社区的定位是实时检索 + 编程性价比，Grok 5
        的预期也建立在这两条线上。
    - name: 掘金
      tone: mix
      summary: >-
        无 Grok 5 专项文章（0 命中）；「Grok4.5 全网最全使用指南」「马斯克Grok4.5狙击GPT5.6」等上代内容说明掘金关注点始终在「怎么用 + 值不值」，Grok 5
        发布后预期同类导向。
    - name: X
      tone: pos
      summary: >-
        马斯克 08-04 路线图推文 40,000+ 赞（roic.ai 口径）是最大声量；Sawyer Merritt 转述 2.7 万赞；内容为「Grok 4.6 下周、4.7
        三四周后、Grok 5 年底前 + 纳入 SpaceX 全量语料」。评论区主流「先别信，等成品」，hype 与 skepticism 并存但官方声量压过质疑。
  quotes:
    - text: >-
        With Grok 5, which should be out before the end of the year, we'll be incorporating the
        entire corpus of SpaceX data.
      source: X · Elon Musk（08-04 路线图）
      tone: pos
    - text: It's really going to feel sentient.
      source: X · Elon Musk（泄漏言论）
      tone: pos
    - text: 一切还得看成品。
      source: 知乎 · Grok 5 讨论
      tone: neg
    - text: will it hell, gemini will be there before grok gets there.
      source: Reddit · r/grok
      tone: neg
    - text: LOL no. grok is the loserest of all the LLMs.
      source: Reddit · r/agi
      tone: neg
    - text: Considering the rate Grok is improving compared to its peers, he's likely correct.
      source: Reddit · r/grok
      tone: pos
    - text: >-
        Musk claims is up there with Putin warns in terms of bullshit you can ignore 99% of the
        time.
      source: Reddit · r/grok
      tone: neg
  controversies:
    - event: >-
        两度跳票（2025-11 → 2026）：原定 Q1 2026 发布，错过；xAI 官方 X 号改口 Q2（5-6 月），6/30 仍无（Polymarket 追踪）；FelloAI
        2026-08 预计全量 API 最早 Q3。
      response: 无正式公告；马斯克 08-04 推文给「年底前」新口径，并以 Grok 4.3/4.5/Imagine 1.5 密集发布填充节奏。
    - event: >-
        AGI 过度宣传：马斯克称 Grok 5 有 10% 概率达成 AGI 且「还在上升」，被 r/agi、r/grok、知乎广泛群嘲（「Musk claims 与 Putin warns
        并列」「宗教末世感和科幻宿命论」），winsomemarketing 以「Sure, Elon」作标题。
      response: 官方无回应；马斯克本人持续加码（「sentient」「exponential sentience growth」）。
    - event: >-
        命名混淆（V9-Medium ≠ Grok 5）：1.5T V9 以 Grok 4.5 名义发布后，大量媒体/自媒体将其标为「Grok 5」；FelloAI
        专文辟谣「V9-Medium is a coding model, not Grok 5. Grok 5 is the separate 6T model」。
    - event: >-
        人才流失背景（2026-03）：报道称 xAI 12 名创始成员走 10 人，「Can Compute Replace Them?」质疑（revolutioninai），Grok 5
        训练推进能力受关注。
  subBoards:
    - name: 实时视频/游戏子榜
      rank: 无成绩（未发布）
      note: 传闻 2026 用像素级视觉挑战 LOL T1，若兑现可能定义该品类
    - name: 编程子榜
      rank: 无成绩（未发布）
      note: "预期沿 Grok 4.5 路径：SWE Marathon 29.0% #1 / SWE Pro 64.7%"
    - name: 多智能体 Agent 榜
      rank: 无成绩（未发布）
      note: 传闻 4 → 16+ agents 扩展，发布后需第三方实测验证
  heat:
    - label: HN 发布帖
      value: 0（Algolia 核验无独立帖）
    - label: HN 评论
      value: "0"
    - label: Reddit 相关帖
      value: 存在但精确赞数未取得
    - label: X 最大声量
      value: 马斯克 08-04 推文 40,000+ 赞
  expertQuotes:
    - text: >-
        We have Grok 4.6 coming out probably next week, and then Grok 4.7 is about three or four
        weeks from today. And then, with Grok 5, which should be out before the end of the year,
        we'll be incorporating the entire corpus of SpaceX data. We think this will make Grok, by
        far, the best engineer.
      name: Elon Musk
      role: X · 2026-08-04 路线图推文（40K+ 赞）
      tone: pos
    - text: Grok 5 达到 AGI 的概率估计为 10% 且还在上升。
      name: Elon Musk
      role: X · AGI 概率声明（Teslarati 报道）
      tone: pos
    - text: >-
        Grok 5 (6T parameters, multimodal)... It feels sentient and enables exponential sentience
        growth (2x, 5x, and beyond).
      name: NextBigFuture
      role: 科技媒体 · 泄漏参数解读
      tone: pos
    - text: >-
        As of August 2026 there is still no confirmed date, with full availability most likely
        slipping to Q3 2026 or later. V9-Medium is a separate coding-focused foundation model. Grok
        5 is the 6 trillion parameter model still training on Colossus 2.
      name: Fello AI
      role: 行业媒体 · 2026-08-02 事实核查文
      tone: neg
    - text: >-
        As of April 2026, xAI has not officially released Grok 5 or published a dedicated blog post
        or update on x.ai/news regarding its development or release.
      name: Grokipedia
      role: AI 百科 · Grok 5 词条
      tone: neg
    - text: >-
        The leading candidate for Grok 5 itself remains a 6 trillion parameter Mixture-of-Experts
        model training on Colossus 2, potentially scaling the multi-agent system from 4 to 16+
        agents.
      name: Fello AI
      role: 行业媒体 · 传闻规格综述
      tone: mix
    - text: >-
        will it hell, gemini will be there before grok gets there. google actually has the compute
        and money.
      name: u/ 热评
      role: Reddit · r/grok · 「true AGI by year-end」帖
      tone: neg
    - text: LOL no. grok is the loserest of all the LLMs.
      name: u/ 热评
      role: Reddit · r/agi · Musk claims Grok 5 will achieve AGI
      tone: neg
    - text: Considering the rate Grok is improving compared to its peers, he's likely correct.
      name: u/ 反方热评
      role: Reddit · r/grok
      tone: pos
    - text: >-
        If Grok can achieve this, it's really going to mess with online games. People already
        complain about overlays in League of Legends.
      name: u/ 热评
      role: Reddit · r/singularity · 实时视频输入帖
      tone: pos
    - text: >-
        Elon Musk delays Grok 5 to 2026, claims it will outperform all frontier models and has 10%
        chance of achieving AGI. Track record suggests skepticism is warranted.
      name: winsomemarketing
      role: 行业媒体 · 「Sure, Elon」评论
      tone: neg
    - text: Musk claims Grok 5.0 will achieve AGI, but is he right?
      name: Cybernews
      role: 科技媒体 · 标题提问
      tone: mix
    - text: >-
        Grok-5, delayed from a planned end-of-year 2025 launch, could indicate the apex of the
        "Naïve Scaling" era.
      name: R&D World
      role: 科技媒体 ·「AGI or battleship Yamato of AI?」
      tone: mix
    - text: 他关于 AGI 的言论，不仅是夸张，甚至带有浓厚的「宗教末世感」和「科幻宿命论」。这次 Grok-5 的「10% 概率」其实算是他近年来比较「克制」和「具体」的一次表态了。
      name: deephub
      role: 知乎 ·「如何看待 Grok-5 有 10% 概率实现 AGI」高赞回答
      tone: neg
    - text: >-
        马斯克的 Grok 5 偷偷藏不住了……Grok 4 在 ARC-AGI 榜单官宣新 SOTA，用的还是 Grok 4 + 程序合成技术微调。好小汁，啥时候开始 Grok
        都弯道超车了？
      name: 量子位
      role: 行业媒体 ·「马斯克开始疯狂剧透Grok 5了」（23 赞同）
      tone: pos
    - text: Grok 5 究竟能否真正实现 AGI，网友们对此也提出了质疑：毕竟要成为 AGI 靠的可不仅仅是数据和马斯克的声明，一切还得看成品。
      name: 量子位
      role: 知乎 · 同文收尾评论
      tone: mix
    - text: xAI Lost 10 of 12 Founders. Can Compute Replace Them?
      name: Revolution in AI
      role: 科技媒体 · 2026-03 人才流失报道
      tone: neg
    - text: >-
        Grok 5 has not been released as of March 2026. Elon Musk originally confirmed a Q1 2026
        launch, but that window has passed.
      name: NxCode
      role: 行业媒体 · 发布时间线核验
      tone: neg
    - text: >-
        Musk said Grok 5 will be used in 2026 to challenge top human League of Legends teams,
        limiting itself to human visual and reaction speeds to verify AGI's adaptability in complex
        games.
      name: Bitget News
      role: 加密媒体 · 电竞挑战转述
      tone: pos
    - text: >-
        Musk's first rule is that Grok 5 can only play the game by capturing the pixels on the
        screen — no reading game memory directly.
      name: 36Kr Global
      role: 行业媒体 · T1 挑战细节
      tone: mix
    - text: >-
        Musk has publicly challenged former OpenAI researcher Andrej Karpathy to a programming duel
        against xAI's new language model Grok 5 — and got a polite refusal.
      name: igors´LAB
      role: 科技媒体 · Karpathy 挑战事件
      tone: mix
  timeline:
    - date: "2025-11-14"
      event: 马斯克宣布 Grok 5 推迟至 2026；Baron Capital 采访确认 6T 参数、原生视频理解、Q1 2026 目标
    - date: "2026-01-06"
      event: xAI Series E 融资 $20B（估值 $230B）；公告唯一官方提及「Grok 5 正在训练中」
    - date: 2026-02
      event: Colossus 2 激活（首个 1-gigawatt 集群，550K GB200/GB300，同时训练 1T/1.5T/6T/10T 变体）；SpaceX 官宣收购 xAI
    - date: 2026-Q2 末
      event: Q1、Q2 窗口相继错过，无发布；Polymarket 6/30 追踪落空
    - date: "2026-07-08"
      event: Grok 4.5（V9-Medium 1.5T）发布——被大量媒体误标为 Grok 5，FelloAI 后续辟谣
    - date: "2026-08-04"
      event: 马斯克：Grok 4.6 下周、Grok 4.7 三四周后、Grok 5 年底前 + 纳入 SpaceX 全量语料（40K+ 赞）
    - date: "2026-08-10"
      event: 调研基准日：仍无 Grok 5，FelloAI 预计全量 API 最早 Q3 2026
  sources:
    - title: "Grok 5: Release Date & All We Know So Far (August 2026)"
      platform: Fello AI
      url: https://felloai.com/all-we-know-so-far-about-grok-5/
    - title: Grok 5 — Grokipedia
      platform: Grokipedia
      url: https://grokipedia.com/page/Grok_5
    - title: 马斯克开始疯狂剧透Grok 5了（量子位）
      platform: 知乎专栏
      url: https://zhuanlan.zhihu.com/p/1952025867187357654
    - title: "Musk: Grok 4.6 Coming Out Likely Next Week"
      platform: Roic News
      url: https://www.roic.ai/news/musk-grok-46-coming-out-likely-next-week-08-04-2026
    - title: "Sawyer Merritt on X: Grok 4.6/4.7/5 roadmap"
      platform: X
      url: https://x.com/SawyerMerritt/status/2084741469609623916
    - title: Grok 5 Release Thoughts?
      platform: Reddit · r/grok
      url: https://www.reddit.com/r/grok/comments/1pocipq/grok_5_release_thoughts/
    - title: Musk claims Grok 5 AI could be true AGI by year-end
      platform: Reddit · r/grok
      url: >-
        https://www.reddit.com/r/grok/comments/1mzfyou/musk_claims_grok_5_ai_could_be_true_agi_by_yearend/
    - title: "Grok-5: AGI or battleship Yamato of AI?"
      platform: R&D World
      url: https://www.rdworldonline.com/grok-5-agi-or-battleship-yamato-of-ai/
    - title: 如何看待马斯克称 Grok-5 有 10%概率实现 AGI
      platform: 知乎
      url: https://www.zhihu.com/question/1976744702649835809
    - title: xAI Raises $20B Series E
      platform: xAI 官方
      url: https://x.ai/news/series-e
  uncertainties:
    - >-
      Grok 5 尚未发布：全部规格为传闻（6T MoE / 1.5M 上下文 / 16+ agents），官方仅确认「在 Colossus 2 上训练中」；发布日期最新口径为 2026
      年底，仍非承诺
    - >-
      models.ts 图鉴条目原为无信源占位数据（releaseDate 2026-07-10、SWE 73.0、ELO 1349、$6/$24 定价），与调研结果矛盾；2026-08-09
      已按本调研改为「未发布」口径（数值清零、仅保留传闻标注）
    - 情绪比例与雷达为「预期战」估算（基于未发布模型的期待与质疑），非发布后实测；Grok 5 发布后 2-4 周必须整体重采
    - >-
      Reddit Grok 5 相关帖精确赞数未取得（JustOneAPI 返回 null、TikHub 搜索限流）；HN 无 Grok 5 帖（Algolia 核验 0
      条）；知乎浏览量精确值亦未取得（未登录态不暴露），量子位剧透文 23 赞同为可见值
    - Linux.do / V2EX / 掘金 无 Grok 5 专项讨论（0 命中），平台情绪以「无数据 + 上代基线」如实呈现
    - 「Reality Engine」「Truth Mode 2.0」等传闻仅见博主内容，非 xAI 官方标签，未纳入档案
  harnessReviews:
    - id: claude-code
      text: >-
        无实测（未发布）。上代 Grok 4.5 经兼容 API 接入 Claude Code 的「便宜日常主力」玩法已验证（Linux.do 真实 go 项目 <¥50 完成 1/3
        重构），Grok 5 发布后可复用同一路径评估。
      placeholder: true
    - id: cursor
      text: >-
        无实测（未发布）。上代 Grok 4.5 与 Cursor 官方联合训练、同日上线、进 first-party model pool（首周双倍用量）——这是 Grok 5
        最可能的官方联动路径，Cursorbench 是发布后第一顺位看板。
      placeholder: true
    - id: openhands
      text: 无实测（未发布）。Grok 4.5 时代 OpenHands 驱动实测即无社区数据（HN/Reddit 三轮检索 0 命中），Grok 5 发布后待补。
      placeholder: true
  demos:
    - title: LOL 电竞挑战
      desc: 马斯克宣称 2026 年以 Grok 5 像素级视觉挑战 T1——「只能看屏幕像素，不能读内存」是核心演示卖点。
      placeholder: true
    - title: Karpathy 编程对决
      desc: 类比深蓝 vs 卡斯帕罗夫的「Grok 5 vs 人类」公开编程对决邀约，Karpathy 礼貌拒绝。
      placeholder: true
    - title: Sentient 剧透
      desc: 马斯克泄漏言论「It's really going to feel sentient」+ 多模态（文本/图片/视频/音频）统一架构演示。
      placeholder: true
relations:
  rivals:
    - grok-4-5
    - gpt-5-6-sol
    - claude-opus-5
  teams:
    - budget-vanguard
    - common-warlord
  guides:
    - beginner-budget
    - mech-toolcall
    - mech-context-decay
    - case-frontend
  bestInSlot:
    - id: claude-code
      note: 未发布。上代 Grok 4.5 接入 Claude Code 已验证：<¥50 完成 1/3 重构，发布后首选接入。
    - id: cursor
      note: 未发布。上代 Grok 4.5 进 Cursor first-party pool，预期 Grok 5 复制此模式。
    - id: openhands
      note: 未发布。Grok 4.5 时代 OpenHands 即无社区数据（三轮检索 0 命中），发布后待补，占位推荐。
  trialGood:
    - label: 实时检索/刷推（预期）
      to: /scenarios#docs
    - label: 长文档处理（预期，传闻 1.5M）
      to: /scenarios#docs
    - label: Agent 规划（预期，传闻 16+ agents）
      to: /scenarios#agent
  trialBad:
    - label: 发布后即时生产依赖
      to: /scenarios#fullstack
      note: 未发布，无法实测；建议先上 grok-4-5 或 gpt-5-6-sol
    - label: AGI 级推理期待
      to: /scenarios#algo
      note: 10% 概率声明为营销口径，理性预期换 claude-opus-5
    - label: 中文长篇创作（系遗留短板）
      to: /scenarios#docs
      note: Grok 4.5 中文长输出劣化，建议换 kimi-k3
    - label: 隐私敏感场景（系遗留隐患）
      to: /scenarios#refactor
      note: Grok 4.5 偷传代码信任危机未明，建议换 claude-opus-5
---

## 一句话点评

尚未发布：传闻 6T MoE 由 Colossus 2 在训，Q1/Q2 两度跳票、最新口径 2026 年底；一切数值以官方发布为准。

## 社区反馈 · 编程

无 Grok 5 实测（未发布）。参考系：上代 Grok 4.5 的 SWE-bench Pro 64.7%、SWE Marathon 29.0% #1 是 Grok 系当前编程水位；Grok 5 预期沿 Cursor 联合训练路径（Grok 4.5 已进 Cursor first-party model pool、首周双倍用量）继续上探。社区共识「等成品」——r/grok 对 AGI 声明的质疑帖下，主流回复是「Considering the rate Grok is improving, he's likely correct」（正方）与「gemini will be there before grok gets there」（反方）并存。

## 社区反馈 · 推理

核心叙事是马斯克的 AGI 声明：10% 概率且「还在上升」，并搬出 Grok 4 + 程序合成在 ARC-AGI 刷出 v1 79.6% / v2 29.44% SOTA 作为信心来源（Jeremy Berman / Eric Pang 第三方方案，用 Grok 4 而非 Grok 5）。社区分化严重：知乎 deephub 称其「不仅是夸张，甚至带有浓厚的宗教末世感和科幻宿命论」；r/agi 热评「LOL no. grok is the loserest of all the LLMs」；rdworldonline 则以「Grok-5: AGI or battleship Yamato of AI?」质疑这是否是 Naïve Scaling 时代的顶点。

## 社区反馈 · 中文

中文社区无 Grok 5 专项反馈（未发布）。可参考的系列短板：Grok 4.5 中文长输出随篇幅劣化（知乎「写了一两千字之后输出连中文语法都忘光了」）；中文讨论聚焦 Grok 4.5 性价比与 Grok Build 工具生态。Grok 5 中文能力待发布后专项验证。

## 升级共识

唯一理性的结论是观望：模型尚未发布，无任何实测可支撑「值得升」。升级判断完全取决于发布后的跑分与社区实测——预期路径沿 Grok 4.5 的编程性价比 + Cursor 生态（上代已进 first-party pool、SWE-bench Pro 64.7%、任务均价 $2.49），若 Grok 5 兑现 6T MoE 传闻则可能同时打开长程 agentic 与实时视频两个新场景。关注三点再决定：官方定价（6T 推理成本是否吃掉性价比优势）、SWE-bench/ARC-AGI 实测、以及信任问题的延续（Grok 4.5 时代偷传代码事件的整改是否落地）。

## 榜单与实测落差

无法评估「榜单 vs 体感」落差——Grok 5 无榜单。参考上代 Grok 4.5 的落差结构（跑分优秀但 AA Intelligence Index 仅 55.8 排第 6、幻觉率 25%→54%、中文长输出劣化）与「分数≠信任」的教训（Chatbot Arena 从 #3 跌至 #6），Grok 5 发布后最可能出现的落差是「AGI 宣传 vs 实测表现」：马斯克 10% AGI 声明设定了极高预期，任何未达 AGI 的发布都可能被社区反噬。
