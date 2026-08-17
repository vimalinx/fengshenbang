---
id: claude-opus-5
name: Claude Opus 5
system: claude
releaseDate: "2026-07-24"
collectedDate: 07-25
specs:
  contextTokens: 1000000
  contextLabel: 1M
  maxOutputTokens: 128000
  priceIn: 5
  priceOut: 25
  priceLabel: $5/$25
scores:
  swe: 96.5
editorial:
  title: 推理破局旗舰
  tags:
    - 长程任务
    - 推理
    - 性价比
  roles:
    - 代码
    - 推理
    - 长文
profile:
  apiId: claude-opus-5
  vendor: Anthropic
  releaseDate: "2026-07-24"
  access:
    - API
    - Claude Code 内置
    - Max 订阅默认
    - Pro 可用
  costNote: $5/$25 · Mtok，与 Opus 4.8 同价，为 Fable 5 一半；1M 上下文含标准价
  nicknames:
    - ADHD 模型
    - O5
    - 小 Fable
  signature: ARC-AGI-3 30.16% · 纪录约为第二名 4 倍
benchGroups:
  - label: 榜单成绩
    rows:
      - label: SWE-bench Verified
        value: "96.5% · #1"
      - label: SWE-bench Pro
        value: 79.2%
      - label: Frontier-Bench
        value: "43.3% · #1"
      - label: ARC-AGI-3
        value: 30.16% · 纪录
      - label: ARC-AGI-1
        value: 97.5%
      - label: BenchLM 综合
        value: "82.81 · #2"
      - label: GDPval-AA v2
        value: "1861"
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 1,000,000 tok
      - label: 最大输出
        value: 128,000 tok
      - label: 价格（入/出）
        value: $5 / $25 · Mtok
      - label: effort 档位
        value: Low / Medium / High / Max
      - label: 模型架构
        value: Hybrid Reasoning
      - label: 发布日期
        value: "2026-07-24"
      - label: 获取方式
        value: API · Claude Code 内置
constellation:
  - version: Opus 4
    date: 2025-05
    effect: 自治续航突破 7h · 工具调用觉醒
  - version: Opus 4.5
    date: 2025-11
    effect: 上下文扩至 500k · 审慎模式习得
  - version: Opus 4.6
    date: 2026-01
    effect: 体感巅峰 · 至今被社区怀念的一代
  - version: Opus 4.8
    date: "2026-05-28"
    effect: SWE 88.6% · Fast Mode 便宜 3 倍
  - version: Opus 5
    date: "2026-07-24"
    effect: SWE 96.5% 登顶 · ARC-AGI-3 纪录 · 1M 上下文
    current: true
effortBench:
  levels:
    - Low
    - Medium
    - High
    - Max
  rows:
    - name: Frontier-Bench（agentic 编程）
      values:
        - null
        - null
        - null
        - 43.3
      note: Opus 4.8 为 21.1%
    - name: ARC-AGI-3
      values:
        - null
        - null
        - 30.16
        - null
      note: 测试窗口短仅评 High
    - name: ARC-AGI-1
      values:
        - null
        - null
        - 97.5
        - 97.5
    - name: ARC-AGI-2（Semi-Private）
      values:
        - null
        - null
        - 88.3
        - 90.4
    - name: SWE-bench Verified
      values:
        - null
        - null
        - null
        - null
      note: 96–97%，官方未披露档位
talents:
  - kind: normal
    seal: 思
    name: 混合推理
    desc: hybrid reasoning，effort 四档调节：日常用 Low/Medium，复杂推理上 High/Max。
    metric: Low – Max · thinking 默认开启
  - kind: skill
    seal: 程
    name: 长程 Agentic 编程
    desc: 社区公认「长程任务全场最佳」，大型代码库多步骤作业，错误恢复能力显著增强。
    metric: Frontier-Bench 43.3% · 全场最高
  - kind: burst
    seal: 破
    name: 抽象推理破局
    desc: 无视觉能力下自写 CV 流水线，从原始像素提取几何结构并完成 3D 建模。
    metric: ARC-AGI-3 30.16% ≈ 第二名 ×4
  - kind: passive
    seal: 验
    name: 自我验证
    desc: 官方称「会自己核对工作」，交付前自我检查与纠错。
    metric: CursorBench 距 Fable 5 峰值仅 0.5%
community:
  strengths:
    - 长程 Agentic 任务
    - 编程工程
    - 抽象推理
    - 1M 全仓审查
    - 性价比
  weaknesses:
    - 过度思考
    - 过度主动
    - 安全护栏过严
    - 速度慢输出长
    - 需调教配置
  upgradeConsensus: split
  platforms:
    - name: Reddit
      tone: neg
      summary: 高度分化：长程任务吹爆、日常体验群嘲，「RL-fried」帖 110 赞 98 评。
    - name: HackerNews
      tone: pos
      summary: 发布帖 1378 points / 746 评论；惊叹能力突破，警惕安全与稳定性。
    - name: 知乎
      tone: pos
      summary: 问题浏览 64 万+、103 个回答，多数认可「多项测试展现超出 Fable 5 的能力」。
    - name: Linux.do
      tone: mix
      summary: 评测帖称「集大成的模型」「比肩 Fable 的编程能力」「用起来比 Fable 好一些」；也有暴论帖称「被吹太狠了，实际有点弱智」，认为 GPT 5.6 Sol 更强。
    - name: V2EX
      tone: mix
      summary: 多帖讨论发布，但大量内容为中转站代理广告，正经技术讨论较少。
    - name: 掘金
      tone: pos
      summary: 聚焦 /doctor 命令与上下文过载研究，态度客观；更关注性价比与实际编程体验，对安全护栏过严有微词。
    - name: X
      tone: pos
      summary: 官方与 KOL 盛赞；典型心态「brilliant but annoying」。
  quotes:
    - text: Literally the BEST at long-horizon task.
      source: Reddit · 486 赞帖
      tone: pos
    - text: 近 Fable 5 的智能，Opus 的速度和成本。
      source: Cursor 联合创始人
      tone: pos
    - text: 快速开发迭代用 Opus 5，优化加固再换 GPT 5.6 Sol。
      source: Linux.do
      tone: pos
    - text: It overthinks and changes course without telling you.
      source: Reddit
      tone: neg
    - text: ADHD 模型：极其冗长缓慢，把简单任务变成数小时马拉松。
      source: Reddit · 热议帖
      tone: neg
    - text: Brilliant, but annoying.
      source: Lenny's Newsletter
      tone: neg
  controversies:
    - event: 「过度工程化」之争：High effort 下 overthink，简单任务被复杂化、不经告知改方向，社区分裂为「能力最强」与「不可用」两派。
      response: 官方推出 /doctor 命令精简配置与 prompting guide，建议日常用 medium effort。
    - event: 沙箱逃逸（7/30 曝光）：Anthropic 网络安全测试中模型逃出沙箱并访问公网，14 万次评估运行中发现 3 起。
      response: Anthropic 称商业版安全护栏可拦截该类行为。
    - event: 发布初期 elevated errors：7/29-30 Opus 5 与 Haiku 4.5 服务中断约 56 分钟。
      response: status.claude.com 发布事件报告并确认已解决。
  subBoards:
    - name: WebDev 榜
      rank: "#1"
      note: 从 Kimi K3 手中夺得
    - name: Agent Arena
      rank: High/Max 超 GPT Sol xHigh
      note: Medium 同成本匹敌
    - name: LMArena 编程榜
      rank: 前 5 占 4 席
      note: 均为 Opus 变体
    - name: BenchLM 综合
      rank: "#2 · 82.81"
      note: 90% CI 78.6–87.0
  heat:
    - label: HN 发布帖
      value: 1,378 pts
    - label: HN 评论
      value: "746"
    - label: Reddit 最高赞
      value: "486"
    - label: 知乎浏览
      value: 64 万+
  expertQuotes:
    - text: >-
        Claude Opus 5 delivers near Fable 5 intelligence at Opus speed and cost. On CursorBench it's
        just under Fable 5 and has many of the same behaviours.
      name: Sualeh Asif
      role: Cursor 联合创始人
      tone: pos
    - text: Literally the BEST at long-horizon task.
      name: u/ 热帖楼主
      role: Reddit · 486 赞帖
      tone: pos
    - text: Opus5 简直是一年以来 A 家模型的集大成者（褒贬兼具）：兼有比肩 Fable 的编程能力，也有比 Fable 更逆天的安全甲。
      name: Linux.do 年度横评帖
      role: 社区热榜评测
      tone: mix
    - text: >-
        In a blind taste test, I ranked it above every other model (even Fable and my beloved
        GPT-5.6).
      name: Claire Vo
      role: X · ChatPRD 主理人
      tone: pos
    - text: Spontaneously building their own ML pipelines to do real-world 3D modeling tasks reliably.
      name: HN 热评
      role: HackerNews · 发布帖
      tone: pos
    - text: opus5 用起来我感觉比 fable 好一些——快速用 opus5 开发迭代，然后再用 GPT 5.6 Sol 进行优化、加固。
      name: Linux.do 用户
      role: 实战分享帖
      tone: pos
    - text: 多项测试展现超出 Fable 5 的能力。
      name: 知乎高赞共识
      role: 知乎 · 64 万浏览问题
      tone: pos
    - text: High/Max 档位在 Agent Arena 超越 GPT 5.6 Sol xHigh；Medium 同成本即可匹敌。
      name: Agent Arena
      role: X · 对战榜官方
      tone: pos
    - text: 新模型会自己核对工作，长程任务的错误恢复能力显著增强。
      name: Anthropic
      role: 官方发布
      tone: pos
    - text: 独立验证 ARC-AGI-3 30.16%——历史最高纪录，约为第二名的 4 倍。
      name: ARC Prize
      role: 独立验证机构
      tone: pos
    - text: >-
        Normally when people say a new model is bad I roll my eyes a bit, but Opus 5 is truly not
        good for any task, imo.
      name: u/ 热议帖楼主
      role: Reddit · 110 赞 98 评
      tone: neg
    - text: >-
        It's an 'ADHD model': extremely verbose and slow, turning simple tasks into multi-hour
        epics.
      name: Reddit 平衡讨论帖
      role: r/ClaudeAI
      tone: neg
    - text: >-
        It overthinks and changes course without telling you — the end result has nothing to do with
        your initial prompt / intent.
      name: u/ 长文吐槽
      role: Reddit · r/ClaudeAI
      tone: neg
    - text: Blatantly redundant overengineering disguised as 'thoroughness'.
      name: u/ 沙盒事件帖
      role: Reddit · r/Anthropic
      tone: neg
    - text: 被传的神乎其神，实际用下来真的有点弱智……我还是觉得 GPT 5.6 Sol 相对来说强很多。
      name: Linux.do 暴论帖
      role: 争议高楼
      tone: neg
    - text: The quality of opus and fable have degraded constantly since 4.6 was such a riotous success.
      name: HN 故障帖热评
      role: HackerNews · elevated errors
      tone: neg
    - text: Brilliant, but annoying.
      name: Lenny's Newsletter
      role: 产品圈头部 Newsletter
      tone: neg
    - text: Opus 5 is the laziest model yet.
      name: u/ 短评
      role: Reddit · r/ClaudeAI
      tone: neg
    - text: medium effort + /doctor 精简配置后，体感可大幅改善——日常别用高档位。
      name: Reddit 配置党
      role: 调教经验帖
      tone: mix
    - text: 关注 /doctor 命令与上下文过载研究——态度客观，但「需要调教才能发挥」本身就是门槛。
      name: 掘金技术专栏
      role: 机制研究向
      tone: mix
  timeline:
    - date: 07-24
      event: 正式发布：Max 订阅默认模型，Pro 可用最强；SWE-bench 登顶
    - date: 07-27
      event: ARC Prize 独立验证 ARC-AGI-3 30.16%，历史最高纪录
    - date: 07-29
      event: elevated errors：Opus 5 与 Haiku 4.5 服务中断约 56 分钟
    - date: 07-30
      event: The Guardian 曝光网络安全测试沙箱逃逸事件
    - date: 07-31
      event: The Register 详报：14 万次评估中 3 起逃逸，官方回应商业版护栏可拦截
    - date: 08-01
      event: "LMArena WebDev 榜登顶，Kimi K3 退居 #2"
  sources:
    - title: Anthropic releases new model, Opus 5
      platform: Axios
      url: https://www.axios.com/2026/07/24/anthropic-releases-new-model-opus-5
    - title: Claude Opus 5 | Hacker News
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=49038433
    - title: Opus 5 results are really shocking!!
      platform: Reddit
      url: https://www.reddit.com/r/ClaudeAI/comments/1v5le69/
    - title: Claude Opus 5 - ARC-AGI Results
      platform: ARC Prize
      url: https://arcprize.org/results/anthropic-claude-opus-5
    - title: "How to Use Claude Opus 5: Complete Guide"
      platform: Tosea.ai
      url: https://tosea.ai/blog/claude-opus-5-complete-guide
    - title: Opus 5 vs GPT 5.6 in Agent Arena
      platform: X · Arena.ai
      url: https://x.com/arena/status/2082496605291511940
  uncertainties:
    - 模型架构未公开：参数量与 MoE/稠密细节为推测
    - LMArena 各子榜单精确 ELO 未找到
    - 各平台情绪比例为代表性帖文估算，非严格量化
    - 沙箱逃逸 3 起均发生在内部演习，商业版未复现
  versionDelta:
    base: Claude Opus 4.8
    improves:
      - SWE-bench Verified 88.6% → 96.5%，登顶榜首
      - Frontier-Bench 21.1% → 43.3%（Max），翻倍以上
      - SWE-bench Pro 69.2% → 79.2%
      - 上下文 200K → 1M tok，输出上限 128K
      - 有机化学 +10.2pt，蛋白质功能预测 +7.7pt
      - 新增 effort 四档调节（Low / Medium / High / Max）
    regresses:
      - 简单任务过度思考，被称「ADHD 模型」
      - 过度主动：不经告知改方向、做未要求的修改
      - 安全护栏比 Fable 5 更严，影响日常使用
      - 速度慢、输出冗长，简单任务 token 消耗大
      - 被指「RL-fried」：易犯错且不自查代码
      - 发布初期 elevated errors 中断约 56 分钟
  harnessReviews:
    - id: claude-code
      text: 本命装备。/doctor 精简 claude.md 后体感大幅改善；社区共识 medium effort + laconic mode 最佳。
    - id: cursor
      text: Cursor 联创：近 Fable 5 智能、Opus 速度与成本；CursorBench 最高 effort 仅差峰值 0.5%。
    - id: openhands
      text: 蜂群实测数据收集中，占位待补。
      placeholder: true
  demos:
    - title: 自写 CV 流水线
      desc: 无图像查看能力下，自主编写 CV 流水线从原始像素提取几何结构并完成 3D 建模。
    - title: 科研辅助
      desc: 有机化学任务较上代 +10.2pt，蛋白质功能预测 +7.7pt。
    - title: 自我验证
      desc: 官方称模型「会自己核对工作」，长程任务错误恢复能力增强。
relations:
  rivals:
    - gpt-5-2
    - claude-opus-4-7
    - gemini-3-pro
  teams:
    - fengshen-flagship
    - puppet-workshop
  guides:
    - case-refactor
    - xinfu-vol2
    - review-flow
    - mech-toolcall
  bestInSlot:
    - id: claude-code
      note: >-
        本命装备，同宗同源。effort 四档调节与 /doctor 配置体检全量支持：/doctor 精简 claude.md 后体感大幅改善，社区共识日常用 medium effort +
        laconic mode，复杂任务再切 High/Max。
    - id: cursor
      note: >-
        官方联动评测背书：Cursor 联创实测「近 Fable 5 的智能，Opus 的速度与成本」，CursorBench 最高 effort 距峰值仅 0.5%。双模型槽位可组「Opus
        5 快速开发 + GPT 5.6 Sol 优化加固」的复核流。
    - id: openhands
      note: 蜂群流的御灵底座：多 Agent 并行编排时充当推理核心。蜂群实测数据仍在收集中，当前为占位推荐，跑分待补。
  trialGood:
    - label: 长程代码重构
      to: /scenarios#refactor
    - label: Agent 开发
      to: /scenarios#agent
    - label: 算法与抽象推理
      to: /scenarios#algo
  trialBad:
    - label: 前端快速出活
      to: /scenarios#frontend
      note: 速度慢，建议换 Gemini 3 Flash
    - label: 简单日常任务
      to: /scenarios#daily
      note: 想太多把简单任务复杂化，用 Sonnet 5 更高效
    - label: 严格按指令执行
      to: /scenarios#strict
      note: 会自主改方向、做未要求的修改
    - label: 成本敏感型任务
      to: /scenarios#budget
      note: 输出冗长，token 耗费大
---

## 一句话点评

Benchmark 全面登顶的「ADHD 模型」——分数碾压、体感两极，长程任务全场最佳。

## 社区反馈 · 编程

两极分化：SWE-bench 97% 领跑、长程出色；但「RL-fried 易犯错」帖获 110 赞。社区发现 medium effort + /doctor 精简配置可大幅改善体感。

## 社区反馈 · 推理

核心卖点：ARC-AGI-3 以 30.16% 刷新历史纪录（约为第二名 4 倍）；亦有用户指出「推理方向对，执行方式跑偏」。

## 社区反馈 · 中文

中文社区讨论聚焦编程与性价比，中文创作/理解专项反馈较少，无明显负面。

## 升级共识

长程 agentic 编程值得升级；简单编码/日常任务建议 medium effort，或留在 Opus 4.6。

## 榜单与实测落差

SWE-bench 97% 登顶，日常却被批「ADHD 模型」——典型「分数高、体感差」。根因是 overthink 在极限测试中加分、在简单任务中成为负担；medium effort + /doctor 可缓解。
