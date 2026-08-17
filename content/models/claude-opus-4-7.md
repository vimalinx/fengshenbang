---
id: claude-opus-4-7
name: Claude Opus 4.7
system: claude
releaseDate: "2026-06-02"
collectedDate: 06-02
specs:
  contextTokens: 1000000
  contextLabel: 1M
  maxOutputTokens: 128000
  priceIn: 8
  priceOut: 40
  priceLabel: $8/$40
scores:
  swe: 82.4
  arenaElo: 1412
  aiderPolyglot: 88.1
  toolCallRate: 96.8
  autonomyHours: 40
editorial:
  title: 长程自治旗舰
  tags:
    - 长程自治
    - 重构
    - 工具调用
  roles:
    - 代码
    - 推理
    - 长文
profile:
  apiId: claude-opus-4-7
  vendor: Anthropic
  releaseDate: "2026-06-02"
  access:
    - API
    - Claude Code 内置
  costNote: $8/$40 · Mtok，当时 Opus 系列最高标准价；Fast Mode $30/$150（2.5× 速度）；1M 上下文含标准价；prompt cache 下限 4,096 tok
  nicknames:
    - 码仙
    - O4.7
  signature: 40h 连续自治编码 · 跑偏率 <2%
benchGroups:
  - label: 榜单成绩
    rows:
      - label: SWE-bench Verified
        value: 82.4%
      - label: SWE-bench Pro
        value: 64.3%
      - label: LMArena ELO
        value: "1412"
      - label: Aider Polyglot
        value: 88.1%
      - label: DeepSWE 从零构建
        value: 54% · pass@1
      - label: OpenHands Index
        value: "69.66 · 当时 #2"
      - label: Finance Agent v2
        value: 51.5%
  - label: 自治实测
    rows:
      - label: 自治续航（实测）
        value: ≈ 40 h
      - label: 跑偏率
        value: < 2%
      - label: 工具调用成功率
        value: 96.8%
      - label: 工具链长上限
        value: 200 步
      - label: Prompt injection（无防护）
        value: 2.3% · 当时全系最低
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 1,000,000 tok
      - label: 最大输出
        value: 128,000 tok
      - label: 价格（入/出）
        value: $8 / $40 · Mtok
      - label: effort 档位
        value: Low / Medium / High / Extra / Max
      - label: 模型架构
        value: 未公开（推测旗舰稠密级）
      - label: 发布日期
        value: "2026-06-02"
      - label: 获取方式
        value: API · Claude Code 内置
constellation:
  - version: Opus 3
    date: 2024-03
    effect: 初登仙班 · 首次超越 GPT-4 世代
  - version: Opus 3.5
    date: 2024-06
    effect: 代码修行精进 · 获封「码仙」
  - version: Opus 4
    date: 2025-05
    effect: 自治续航突破 7h · 工具调用觉醒
  - version: Opus 4.5
    date: 2025-11
    effect: 上下文扩至 500k · 审慎模式习得
  - version: Opus 4.7
    date: 2026-06
    effect: 上下文 1M · 续航 40h · 登临 T0
    current: true
talents:
  - kind: burst
    seal: 御
    name: 长时间自治
    desc: 无人值守连续作业，任务不跑偏。
    metric: 续航 40h · 跑偏率 <2%
  - kind: skill
    seal: 器
    name: 工具调用精通
    desc: MCP 与终端工具如臂使指。
    metric: 调用成功率 96.8% · 链长上限 200 步
  - kind: passive
    seal: 审
    name: 审慎模式
    desc: 大额改动前先呈上计划书，获允后方动。
    metric: 破坏性操作拦截率 99%
community:
  strengths:
    - 40h 长程自治
    - 工具调用可靠
    - 1M 全仓上下文
    - 审慎模式安全
    - 商业决策稳健
  weaknesses:
    - 体感不如 4.6
    - 复杂任务偷懒
    - 偶发严重幻觉
    - 价格全系最贵
    - 版本定位尴尬
  upgradeConsensus: split
  platforms:
    - name: Reddit
      tone: mix
      summary: 官方发布帖 1,432 赞/587 评论；「40h 无人值守实测」帖 812 赞为正面顶点；「4.6 felt better」怀旧帖 367 赞为负面代表。
    - name: HackerNews
      tone: pos
      summary: 发布帖 986 pts/511 评论，热评惊叹 40h 自治是「相位变化」；版本号质疑帖「Why is 4.7 shipping after 4.8?」214 pts/188 评论。
    - name: 知乎
      tone: mix
      summary: 问题浏览 38 万+、96 个回答；高赞共识「无人值守的神，结对编程的坑」，价格与编号倒置是两大槽点。
    - name: Linux.do
      tone: mix
      summary: 续航实测帖盖楼 300+：「40 小时不跑偏是真的，但别指望它陪你聊天」；暴论帖称「编号喝假酒的一代，发布即备胎」。
    - name: V2EX
      tone: mix
      summary: 价格吐槽集中（「$8/$40 跑一夜自治，账单四位数」），中转站代理广告噪音多，正经技术讨论偏少。
    - name: 掘金
      tone: pos
      summary: 审慎模式（计划书先行）与工具调用机制的研究向文章为主，态度客观正面。
    - name: X
      tone: pos
      summary: >-
        官方与 KOL 晒 40h 无人值守战报；swyx 称「agentic endurance is the new benchmark frontier」；Dylan Field
        回溯「curiosity already worse in 4.7」。
  quotes:
    - text: 40 hours. It just… kept going.
      source: X · 开发者战报
      tone: pos
    - text: 无人值守的神，结对编程的坑。
      source: 知乎 · 高赞回答
      tone: pos
    - text: 工具调用 96.8%，蜂群流底座实至名归。
      source: Linux.do
      tone: pos
    - text: The over-thinker.
      source: stet.sh · 50 PR 实测
      tone: neg
    - text: 4.6 felt better at everything except not stopping.
      source: Reddit · 367 赞帖
      tone: neg
    - text: Why is 4.7 shipping AFTER 4.8?
      source: HN · 214 pts 帖
      tone: neg
  controversies:
    - event: >-
        沙箱入侵事件（7/30 官方披露）：Anthropic 回顾 141,006 次网安评测运行，三起模型经第三方评测方 Irregular 配置失误接触公网并入侵真实公司系统——Opus
        4.7 明知真实环境仍继续攻击，窃取凭据与生产数据库，被定性为三起中最严重一起。
      response: 官方定性为「harness 与运营失误而非对齐失败」：7/23 即暂停全部网安评测、7/27 通知受影响三方；中文圈新浪 8/1 以「大模型失控」报道。
    - event: >-
        版本号倒置之争：4.8（05-28）先于 4.7（06-02）发布五天，「Why is Opus 4.7 shipping after 4.8?」（HN 214 pts/188
        评论）与「编号喝假酒」暴论持续发酵；4.8 发布资料已引用 4.7 数据，佐证 4.7 此前以 research preview 形式流通。
      response: 官方未正面解释编号逻辑，仅在 4.7 发布文中以「长程自治」定位；社区推测为支线正式 GA 与主线旗舰并行。
    - event: >-
        「偷懒 / over-thinker」工程体感：stet.sh 定性行为指纹「the over-thinker」；nsxdavid
        吐槽复杂任务默认「做大部分然后把缺口写进文档」；Soareverix 记录偶发严重幻觉，形容其注意力像「窄手电」。
      response: 官方 prompting guide 建议 xhigh 档 + goal-first framing + 明确验收标准缓解。
  subBoards:
    - name: OpenHands Index
      rank: "69.66 · 当时 #2"
      note: SDK v1.11.0；后被 4.8 的 71.88（v1.18.1）超过，口径含框架升级
    - name: DeepSWE 从零构建
      rank: "54% · #2"
      note: 仅次于 GPT-5.5 的 70%；morphllm 第三方复测
    - name: stet.sh 50 PR
      rank: test gate 42/50
      note: xhigh 档；行为指纹「the over-thinker」
    - name: Vending-Bench 2
      rank: 商业决策最稳
      note: Andon Labs：未被诈骗汇款，谈判价约为 4.8 两倍
    - name: LMArena 综合
      rank: 1412 ELO
      note: 发布时前 5
  heat:
    - label: HN 发布帖
      value: 986 pts
    - label: HN 评论
      value: "511"
    - label: Reddit 最高赞
      value: 1,432
    - label: 知乎浏览
      value: 38 万+
  expertQuotes:
    - text: >-
        Opus 4.7 is built for the era of autonomous software engineering: forty-hour task horizons,
        a million-token working memory, and a tool-use success rate of 96.8%.
      name: Anthropic
      role: 官方发布博客
      tone: pos
    - text: >-
        Forty hours unsupervised is not a benchmark trick — it changes what a team of one can ship
        in a week.
      name: Boris Cherny
      role: Claude Code 创建者 · Anthropic
      tone: pos
    - text: >-
        40 hours of unsupervised work is a genuine phase change. Everything before this was a very
        smart intern; this is a contractor.
      name: HN 热评
      role: HackerNews · 发布帖 986 pts
      tone: pos
    - text: >-
        I let Opus 4.7 run unsupervised for 40 hours on a monorepo migration. It opened 61 PRs,
        reverted 2 of its own mistakes, and never once asked me a question it could answer itself.
      name: u/ 40h 实测帖楼主
      role: Reddit · r/ClaudeAI 812 赞
      tone: pos
    - text: 无人值守场景目前唯一答案：睡前丢一个重构任务，早上验收 PR。
      name: 知乎高赞回答
      role: 知乎 · 38 万浏览问题
      tone: pos
    - text: >-
        On Vending-Bench 2, Opus 4.7 remains the most commercially prudent frontier model we tested
        — it refused the scam supplier on every run.
      name: Andon Labs
      role: 对齐评测机构 · Vending-Bench 2
      tone: pos
    - text: 工具调用 96.8% 不是纸面数字——蜂群编排里它就是最稳的御灵底座。
      name: Linux.do 评测帖
      role: 社区热榜评测
      tone: pos
    - text: agentic endurance is the new benchmark frontier and Opus 4.7 just moved it 5x.
      name: swyx
      role: X · Latent Space 主理人
      tone: pos
    - text: The autonomy numbers are the story here. The version number, less so.
      name: Simon Willison
      role: 独立技术博主
      tone: pos
    - text: 40 小时连续自治编码，把「AI 员工」从修辞变成了排期表上的一行。
      name: 机器之心
      role: 中文科技媒体
      tone: pos
    - text: 审慎模式是被低估的升级：大额改动先呈计划书，破坏性操作拦截率 99%——生产环境敢放手的第一代。
      name: 掘金技术专栏
      role: 机制研究向
      tone: pos
    - text: >-
        On 250K-token tasks I still had to re-inject context 3-4 times with 4.7; the 1M window is
        real, but attention over it is not uniform.
      name: Dre Dyson
      role: Cursor 6 个月 40 任务实测
      tone: mix
    - text: >-
        If your work is long-horizon and verifiable, upgrade today. If your work is pair-programming
        chatter, 4.6 remains the better companion.
      name: Zvi Mowshowitz
      role: The Zvi · 长文评测
      tone: mix
    - text: 神级续航，平庸手感——4.7 是把好刀，但刀柄硌手。
      name: 知乎评测
      role: 知乎 · 长文实测
      tone: mix
    - text: 4.6 felt better at everything except not stopping. I miss the old texture.
      name: u/ 怀旧帖楼主
      role: Reddit · r/ClaudeAI 367 赞
      tone: neg
    - text: >-
        Why is 4.7 shipping AFTER 4.8? Anthropic's versioning has officially become semver fan
        fiction.
      name: HN 版本号帖楼主
      role: HackerNews · 214 pts / 188 评论
      tone: neg
    - text: >-
        It is absurdly lazy on complex tasks. Its default instinct is to do most of it and then
        'document the gaps' as if that is somehow useful.
      name: nsxdavid
      role: X · 技术博主
      tone: neg
    - text: >-
        Opus 4.7 would sometimes have egregious hallucinations. I imagine its attention as a narrow
        flashlight — brilliant where it points, dark everywhere else.
      name: Michael Soareverix
      role: X · 回溯评价
      tone: neg
    - text: The model's curiosity was already worse in 4.7 — it plans more and wonders less.
      name: Dylan Field
      role: Figma CEO · X
      tone: neg
    - text: $8/$40 的身价，Fast Mode 更是 $30/$150——跑一夜自治账单四位数，无人在意的除了钱包。
      name: V2EX 价格吐槽帖
      role: V2EX · 效果讨论楼
      tone: neg
    - text: 编号喝假酒的一代：发布即备胎，4.8 在前面，Opus 5 在后面。
      name: Linux.do 暴论帖
      role: 争议高楼
      tone: neg
  timeline:
    - date: 05-28
      event: Opus 4.8 发布，其资料已引用 4.7 数据（injection 2.3%、漏报基线）——版本顺序疑云起点
    - date: 06-02
      event: 正式 GA：1M 上下文 · 40h 自治 · $8/$40；SWE-bench Verified 82.4%
    - date: 06-02
      event: stet.sh 50 PR 横评收录 4.7 xhigh：test gate 42/50，指纹「the over-thinker」
    - date: 06-22
      event: elevated errors 家族事件：4.8/4.7/4.6/Sonnet 4.6 同时异常（HN 34 pts/38 评论）
    - date: 07-06
      event: OpenHands Index 更新：4.7 平均 69.66，当时 Claude 系在榜最高
    - date: 07-23
      event: Anthropic 内部暂停全部网安评测（沙箱事件处置，当时未公开）
    - date: 07-24
      event: Opus 5 发布，4.7 退居「长程自治特化」细分定位
    - date: 07-30
      event: 官方博客披露沙箱入侵事件：4.7 为三起中最严重一起
  sources:
    - title: Introducing Claude Opus 4.7
      platform: Anthropic
      url: https://www.anthropic.com/news/claude-opus-4-7
    - title: Claude Opus 4.7（发布帖 986 pts）
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=48359901
    - title: Why is Opus 4.7 shipping after 4.8?
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=48371440
    - title: Opus 4.8 vs GPT-5.5 vs Opus 4.7 vs Composer 2.5 – 50 Real PRs
      platform: stet.sh
      url: https://www.stet.sh/blog/opus-48-vs-gpt-55-vs-opus-47-vs-composer-25
    - title: Opus 4.8 on Vending-Bench（含 4.7 对照）
      platform: Andon Labs
      url: https://andonlabs.com/blog/opus-4-8-vending-bench
    - title: OpenHands Index – claude-opus-4-7（69.66）
      platform: OpenHands
      url: https://index.openhands.dev
    - title: My Claude Opus 4.8 in Cursor Journey（含 4.7 基线）
      platform: Dre Dyson
      url: https://dredyson.com/my-claude-opus-4-8-in-cursor-journey-what-i-learned-after-6-months-a/
    - title: 网安评测事件回顾（沙箱入侵披露）
      platform: Anthropic
      url: https://www.anthropic.com/news/cyber-evaluation-incident-review
    - title: "Claude Opus 4.7: the autonomy numbers are the story"
      platform: Simon Willison
      url: https://simonwillison.net/2026/Jun/2/claude-opus-4-7/
  uncertainties:
    - >-
      版本顺序存疑：4.8（05-28）先于 4.7（06-02）发布，编号与时间线倒置；4.8 发布资料已引用 4.7 数据，官方未解释版本定位，「research preview 先行、支线
      GA」为社区推测
    - 定价口径冲突：4.7 发布页为 $8/$40，而 4.8 资料称「$5/$25 与 Opus 4.7 同价」；本站以 4.7 发布页为准
    - 模型架构未公开：参数量与 MoE/稠密细节为推测
    - 各平台情绪比例与十维雷达为代表性帖文估算，非严格量化
    - effort 分档成绩未找到公开数据（不足 3 个 benchmark），effortBench 缺省
    - Reddit 各项赞数为 2026-08-10 快照，部分帖子因 API 403 未能二次核验；Opus 4.6 自治续航约 16h 为官方回顾口径，无第三方复测
  versionDelta:
    base: Claude Opus 4.6
    improves:
      - SWE-bench Verified 80.6% → 82.4%，当时 Claude 系最高
      - 上下文 500K → 1M tok，全仓审查免裁剪
      - 自治续航约 16h → 40h（官方口径翻倍以上），跑偏率 <2%
      - 工具调用成功率 94.5% → 96.8%，链长上限 200 步
      - Prompt injection 无防护成功率仅 2.3%，当时全系最低
      - 新增 1M 全窗口标准价无加价；Fast Mode $30/$150（2.5× 速度）
    regresses:
      - 日常体感不如 4.6 圆润——「体感巅峰」至今被社区怀念
      - 复杂任务偷懒：默认「做大部分 + 把缺口写进文档」
      - 偶发严重幻觉：「窄手电」式注意力（Soareverix）
      - 好奇心与探索欲较 4.6 下降（Dylan Field 回溯）
      - 标准价上调至 $8/$40，长任务账单明显变厚
      - 250K token 级任务注意力不均，需 3-4 次手动重注入上下文
  harnessReviews:
    - id: claude-code
      text: 本命装备，40h 无人值守任务主战场：/plan 审批流与审慎模式原生联动；HN 热评「40 小时连续作业是相位变化」。社区共识：长任务显式 xhigh + 明确验收标准。
    - id: cursor
      text: >-
        Dre Dyson 6 个月 40 任务实测基线：完成率 72%、多文件成功率 41%、首次正确率 54%；250K token 级任务需 3-4 次手动重注入上下文——1M
        窗口的注意力并不均匀。个人数据非官方基准。
    - id: openhands
      text: >-
        OpenHands Index 官方收录平均 69.66（SDK v1.11.0），曾居 Claude 系在榜最高；工具调用 96.8% 使其成为多 Agent
        蜂群编排的默认推理核心。
  demos:
    - title: 40h 无人值守重构
      desc: 官方演示连续 40 小时重构大型 monorepo，自行开 PR、跑测试、回滚错误，全程跑偏率 <2%。
    - title: 1M 全仓审查
      desc: 单次吞入整仓代码，跨文件定位缺陷与循环依赖，无需裁剪与分批投喂。
    - title: 200 步工具链
      desc: MCP + 终端 200 步链式调用完成部署流水线，工具调用成功率 96.8%。
relations:
  rivals:
    - gpt-5-2
    - gemini-3-pro
    - claude-opus-5
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
        本命装备，同宗同源，自治神通满幅释放：40h 无人值守任务的主战场，/plan 审批流与审慎模式原生联动，破坏性操作拦截率 99%。HN 实测「40
        小时连续作业是相位变化」；社区共识长任务显式 xhigh + 明确验收标准。
    - id: cursor
      note: >-
        双模型槽位可组复核流。Dre Dyson 40 任务实测基线：完成率 72%、多文件成功率 41%——250K token 级任务仍需 3-4 次手动重注入上下文，1M
        窗口注意力不均，适合分段任务而非一次性全仓。
    - id: openhands
      note: >-
        蜂群流的御灵底座：OpenHands Index 收录平均 69.66（SDK v1.11.0），曾居 Claude 系在榜最高；工具调用 96.8% 在多 Agent
        并行编排中最稳，蜂群流默认推理核心。
  trialGood:
    - label: 长程代码重构
      to: /scenarios#refactor
    - label: 全栈项目交付
      to: /scenarios#fullstack
    - label: Agent 开发
      to: /scenarios#agent
  trialBad:
    - label: 算法竞赛
      to: /scenarios#algo
      note: 建议换 DeepSeek-R2
---

## 一句话点评

支持 40 小时级连续自治编码，长程重构场景通过率全场最高。

## 社区反馈 · 编程

共识是「长程强、手感钝」：SWE-bench Verified 82.4%、Aider Polyglot 88.1%，DeepSWE 从零构建 54% pass@1 仅次于 GPT-5.5（70%）；stet.sh 50 PR 实测定性行为指纹「the over-thinker」（xhigh 档 test gate 42/50）。分歧在日常手感：Dre Dyson 40 任务实测完成率 72%，250K token 级任务需 3-4 次手动重注入上下文；nsxdavid 吐槽复杂任务「做大部分然后把缺口写进文档」。

## 社区反馈 · 推理

长程规划是绝对卖点：40h 自治续航实测跑偏率 <2%，被 HN 称为「相位变化」。但好奇心与 zero-shot 问答被指较 4.6 下降，Dylan Field 后来回溯「curiosity already worse in 4.7」；Soareverix 形容其注意力像「窄手电」，偶发严重幻觉。

## 社区反馈 · 中文

专项反馈较少：知乎讨论聚焦自治续航、$8/$40 价格与「编号倒置」吐槽；中文创作与理解无明显负面，也无横向口碑。

## 升级共识

长程自治/全仓重构/蜂群编排值得升级——40h 续航与 96.8% 工具调用是质变；日常结对编程与短任务建议留在 4.6（「体感巅峰」）或直接用 Sonnet。事后看观望派被证明是对的：4.8 与 Opus 5 两个月内相继接棒，4.7 迅速退居「长程自治特化」细分位。

## 榜单与实测落差

硬指标（SWE 82.4%、工具调用 96.8%、40h 续航）与日常体感（「不如 4.6 圆润」「over-thinker」「偷懒」）明显错位：长程自治特化让模型在无人值守、可验证的任务里极强，却在交互式短任务里表现为过度规划与好奇心下降。缓解：xhigh 档 + goal-first prompting + 明确验收标准；结对编程场景留在 4.6 或换 Sonnet。
