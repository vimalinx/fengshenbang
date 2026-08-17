---
id: gemini-3-5-pro
name: Gemini 3.5 Pro
system: gemini
releaseDate: "2026-05-19"
collectedDate: 08-09
specs:
  contextTokens: 2000000
  contextLabel: 2M
  maxOutputTokens: 65536
  priceIn: 17
  priceOut: 90
  priceLabel: 约$17/$90
scores:
  swe: 80.6
editorial:
  title: 难产跳票王
  tags:
    - 前端生成
    - 2M 长窗
    - Deep Think
  roles:
    - 推理
    - 长文
    - 多模态
profile:
  apiId: gemini-3-5-pro
  vendor: Google DeepMind
  releaseDate: "2026-05-19"
  access:
    - 未开放（未 GA）
  costNote: >-
    定价未公布，据传为 3.1 Pro（$2/$18）的 8-10 倍，约 $15-20/$80-100 · Mtok；同系 3.5 Flash 定价 $1.5/$9，AA 实测单任务 49
    turns、跑分成本 $1,552（前代 Flash 的 5.5 倍）——「便宜但烧 token」或为 Pro 定价隐忧
  nicknames:
    - 失踪的模型
    - 难产 Pro / 跳票王
    - Cooked 的 Gemini
  signature: 前端生成封神；Arena 匿名泄露称击败 Opus 4.8，尚未证实
benchGroups:
  - label: 榜单成绩
    rows:
      - label: Arena 匿名 checkpoint（泄露）
        value: 据称击败 Opus 4.8 · 未证实
      - label: GPQA Diamond（3.1 Pro 参考）
        value: 94.3% · 纪录
      - label: SWE-bench Verified（3.1 Pro 参考）
        value: 80.6%
      - label: SWE-bench Pro（3.1 Pro 参考）
        value: 54.2%
      - label: ARC-AGI-2（3.1 Pro 参考）
        value: 77.1%
      - label: Terminal-Bench 2.1（3.5 Flash 分数）
        value: 76.2% · 领先 Opus 4.7 69.4%
      - label: MCP Atlas（3.5 Flash 分数）
        value: 83.6% · 全场第一
      - label: CharXiv Reasoning（3.5 Flash 分数）
        value: 84.2%
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 2,000,000 tok（传闻，未确认）
      - label: 最大输出
        value: —
      - label: 价格（入/出）
        value: 约 $15-20 / $80-100 · Mtok（推断）
      - label: effort 档位
        value: —（Deep Think thinking_level 传闻可调）
      - label: 模型架构
        value: 未公开（泄露代号 Riftrunner）
      - label: 发布日期
        value: 未 GA（2026-05-19 官宣，已三度跳票）
      - label: 获取方式
        value: 未开放（API 模型列表无条目）
constellation:
  - version: Gemini 2.5 Pro
    date: 2025-06
    effect: 深度思考初代 · 1M 长窗奠基
  - version: Gemini 3 Pro
    date: 2025-11
    effect: 原生多模态 · Deep Think 觉醒
  - version: Gemini 3.1 Pro
    date: 2026-02
    effect: GPQA 94.3% 纪录 · 基准登顶
  - version: Gemini 3.5 Pro
    date: 2026-05
    effect: 设计品味飞升 · 三跳票未落地
    current: true
talents:
  - kind: burst
    seal: 绘
    name: 前端设计生成
    desc: >-
      社区公认最强项：SVG 与 isometric 图形一次成型，被称「best UI/design taste yet」；HN aviinuo 实测 3.5 Pro High 用
      Antigravity CLI 5 分钟内完成混乱代码库迁移且「did a good job」。
    metric: 一次生成 20+ 文件 · 迁移任务 <5 分钟
  - kind: skill
    seal: 思
    name: Deep Think 推理
    desc: >-
      基于 3.1 Pro 构建，thinking_level 参数可调深度；官方称数学/编程/逻辑推理冲击「前所未有的高度」。Arena 匿名 checkpoint 据称击败 Opus
      4.8（339 票帖），但泄露数据互相矛盾。
    metric: Arena 匿名据称击败 Opus 4.8
  - kind: passive
    seal: 容
    name: 2M 长窗
    desc: I/O 官宣 2M 上下文窗口，为大型语料与整仓代码库综合分析而生，补 Flash 长切片短板（3.5 Flash 在 128k+ MRCR 落后 3.1 Pro 7.6 分）。
    metric: 传闻 2,000,000 tok
  - kind: normal
    seal: 器
    name: 多模态理解
    desc: 3.5 系列共同强项：文本/图像/音视频原生理解，CharXiv Reasoning 84.2% 同系领先；Google I/O 主推 computer use 与 agent 场景。
    metric: CharXiv Reasoning 84.2%（Flash 同系）
community:
  strengths:
    - 前端/UI 生成
    - SVG/isometric 图形
    - 一次性游戏生成
    - 长上下文（2M）
    - 多模态理解
  weaknesses:
    - 编程能力不达标
    - 发布节奏混乱
    - App 与 AI Studio 割裂
    - 基础能力被质疑
    - 稳定性差/取消传闻
  upgradeConsensus: wait
  platforms:
    - name: Reddit
      tone: mix
      summary: >-
        情绪急转直下：8 月初「The END」942 票 /「It's Over」702 票哀嚎，8/5「Is this a sign that 3.5 Pro is gonna be
        bad」367 票跟进领导层出走；8/7 r/singularity 转发 SemiAnalysis 218 票。此前 7 月下旬「new checkpoint is deadass
        insane」339 票 149 评论（称「This checkpoint is seen in Arena AI... It beat Opus 4.8」）与「not gonna
        be lazy」219 票 62 评论（称「生成 20+ 文件」）两派并存；8/6 r/singularity 泄露帖「Apparently Gemini 3.5 Pro Is A
        Disaster, Release Imminent」34 票 101 评论。整体从「期待」转向「审判」，票数以 8-09 快照为准（本次调研 Reddit API 被 403
        拦截，未能独立复核）。
    - name: HackerNews
      tone: neg
      summary: >-
        以技术审视为主，狼来了疲劳明显：Bloomberg 爆料帖（7-16）30 分 4 评论，7/17 CNBC 7 分、9to5Google 2 分——Pro 相关主流报道合计 ≤18
        分，与 3.5 Flash 发布帖 962 分 658 评论形成强烈反差。前谷歌工程师称「consistently the most frustrating model for
        development」；SemiAnalysis「Gemini is Cooked」文章在 HN 三次提交仅 2/4/1 分、基本零评论，与 Reddit/中文圈刷屏完全相反。8/6
        Reuters「在谈 Gemini 4 而 3.5 Pro 仍未发布」仅 2 分 0 评论，关注被 Gemini 4 分流。负面实弹：5-20 删库帖 14 分、6-23
        thinking loop 帖 11 分、6-10 服务中断帖 14 分（manjalyc 称中断先波及 3.5 Pro 模型）。
    - name: X
      tone: pos
      summary: >-
        两极分化（正面约 45%）：泄露博主 @pankajkumar_dev 连发帖盛赞前端生成与 SVG 进步（「much more polished frontend results
        than Gemini 3.1 Pro」）；NPowerUser 以「It's a designer」定义其空间布局能力。反面 @bridgemindai 称「Google has
        become the laughing stock of frontier AI」；StizzurpXDD 指出 I/O 2026 实为 CEO Pichai 亲自官宣 6
        月发布、延期理由称「gather more real-world feedback」——官方叙事与社区体感落差进一步拉大。
    - name: 知乎
      tone: neg
      summary: >-
        核心议题是「难产」：专栏文章称内部管理出问题、批评额度策略，腾讯云文章称「又一次跳票，硅谷最尴尬的AI模型」（正面仅约 15%）。SemiAnalysis 报告经 ABMedia
        鏈新聞等中文媒体转引「谷歌放弃 AI 三强前沿争霸」，强化悲观叙事；讨论从「期待能力」整体转向「审判组织」。
    - name: Linux.do
      tone: neg
      summary: >-
        「google真实拉完了，御三家要换人了，grok可以上位了」为代表性观点；8 月初流传「已被悄悄取消？转推 Gemini 4」；对 Gemini
        前沿地位持悲观态度，与知乎情绪共振，但缺少独立一手实测，多转引外媒。
  quotes:
    - text: Gemini 3.5 pro's new checkpoint is deadass insane.
      source: Reddit · 339 票帖
      tone: pos
    - text: Gemini 3.5 Pro is not gonna be lazy like Gemini 3.1 Pro.
      source: Reddit · 219 票帖
      tone: pos
    - text: Gemini 3.5 Pro High in antigravity cli takes less than 5 minutes and did a good job.
      source: HN · aviinuo 实测
      tone: pos
    - text: Gemini 3.5 Pro fundamentals are shaky and old.
      source: Reddit r/GeminiAI
      tone: neg
    - text: Gemini is consistently the most frustrating model I've used for development.
      source: HN · 前谷歌工程师
      tone: neg
    - text: Gemini 3.5 Pro has been catastrophic for Google... an immense failure.
      source: HN · heaney-555
      tone: neg
    - text: Google has become the laughing stock of frontier AI.
      source: X · @bridgemindai
      tone: neg
    - text: For coding, I don't think they're even number 3 anymore.
      source: HN · SwellJoe
      tone: neg
  controversies:
    - event: >-
        三度跳票：原定 6 月 GA → 6 月底补训编程「结果令人失望」→ 7 月 17 日发布前数小时取消 → 8 月 7 日再因部署问题推迟；同期 OpenAI GPT-5.6
        如约上线，CNBC 报道 Alphabet 股价当日跌 4%。HN 热评 onlyrealcuzzo 称「There is no other way to describe the
        Gemini 3.5 pro delay than as a complete and unmitigated disaster」。
      response: >-
        官方确认 3.5 Pro「coming」但无 GA 日期；Alphabet 发言人回应「正在与合作伙伴测试 3.5 Pro 与升级版 Flash 等模型」；StizzurpXDD 引
        I/O 原话：延期是为「gather more real-world feedback」。
    - event: >-
        编程能力不达标：Bloomberg 援引知情人士称「particularly in coding」未达内部预期，工程师反复测试结论「还不够好」；9to5Google 报道 6
        月底补训结果令人失望，暗示 I/O 与发布之间存在开发重置。
    - event: >-
        领导层大洗牌（8-05）：Demis 转任 GDM 主席、Koray 升任 SVP 执掌 Gemini；Jeff Dean 与 Sanjay Ghemawat 离职创办
        Discovery Loop（携 Quoc Le/Oriol Vinyals）；7-29 更解散 AlphaFold 团队全面押注 Gemini。SemiAnalysis
        断言「DeepMind is no longer a frontier lab」。
      response: Pichai/Demis 联名信确认调整，Demis 称「对包括 Gemini 4 在内的新模型进展感到兴奋」——官方首次确认 Gemini 4，却未给 3.5 Pro 新日期。
    - event: >-
        「取消 vs 再推迟」罗生门：SemiAnalysis（8-07）称 3.5 Pro 已被「悄悄取消」、水平约 Opus 4.5 级、「worse than GLM 5.2, much
        less Fable 5 and GPT 5.6」；NPowerUser 同日称 8-07 原定发布因部署问题推迟到下周；泄露者称将发布的版本是「disaster」、实测「make
        stuff you didn't ask for」。
  subBoards:
    - name: 编程子榜（Arena）
      rank: 未公开
      note: Fable 5 / GPT-5.6 Sol 居前；3.5 Pro 硬核 agentic 被指落后 5-10 分
    - name: 视觉/多模态榜
      rank: 84.2%（Flash 同系）
      note: CharXiv Reasoning，多模态被定位为系列强项
    - name: MCP Atlas
      rank: "83.6% · #1（Flash 同系）"
      note: 领先 Opus 4.7 79.1% / GPT-5.5 75.3%，agentic 工具调用强项
    - name: 长上下文子榜
      rank: 2M 传闻 · 追赶中
      note: 3.5 Flash 在 128k+ MRCR 落后 3.1 Pro 7.6 分，Pro 旨在弥补
    - name: WebDev/前端榜
      rank: 社区口碑第一
      note: 「best UI/design taste yet」（泄露 + AI Studio 体验）
  heat:
    - label: Reddit 最高赞
      value: 942 票（The END）
    - label: Reddit 热门帖
      value: 339 票 · 149 评论
    - label: HN 3.5 Flash 发布帖
      value: 962 分 · 658 评论
    - label: HN Bloomberg 爆料
      value: 30 分 · 4 评论
  expertQuotes:
    - text: Gemini 3.5 是迄今最强的 agentic 与 coding 模型。
      name: Koray Kavukcuoglu
      role: DeepMind CTO · 官方发布
      tone: pos
    - text: We're currently testing 3.5 Pro, an upgraded Flash model, and other models with partners.
      name: Alphabet 发言人
      role: CNBC 官方回应
      tone: mix
    - text: Gemini is Cooked but GCP is Cooking——3.5 Pro 真实水平约 Opus 4.5 级，worse than GLM 5.2。
      name: SemiAnalysis
      role: 深度产业分析机构
      tone: neg
    - text: >-
        Gemini 3.5 Pro will have a good jump in design taste and UI generation, producing much more
        polished frontend results than Gemini 3.1 Pro.
      name: "@pankajkumar_dev"
      role: X · 泄露博主
      tone: pos
    - text: >-
        Google has become the laughing stock of frontier AI. I was bullish on Gemini 3.5 Pro. After
        seeing this, I am not sure I should be.
      name: "@bridgemindai"
      role: X · 行业观察
      tone: neg
    - text: >-
        I'm a former Googler and know some people near the team, so I mildly root for them to at
        least do well, but Gemini is consistently the most frustrating model I've used for
        development.
      name: 前谷歌工程师
      role: HN 热评
      tone: neg
    - text: >-
        When an AI model understands spatial layout well enough to code a beautiful, polished,
        minimal isometric vector graphic on its first try without missing a pixel, it's no longer
        just an autocomplete assistant. It's a designer.
      name: NPowerUser
      role: 科技评测博主
      tone: pos
    - text: 又一次跳票，硅谷最尴尬的AI模型。
      name: 腾讯云开发者社区
      role: 科技媒体 · 报道标题
      tone: neg
    - text: >-
        Gemini 3.5 pro's new checkpoint is deadass insane. This checkpoint is seen in Arena AI. It
        beat Opus 4.8.
      name: u/ 热帖楼主
      role: Reddit r/GeminiAI · 339 票 149 评论
      tone: pos
    - text: >-
        Gemini 3.5 Pro High in antigravity cli takes less than 5 minutes and did a good job. Fable 5
        High took 30 minutes... and it's still going more than an hour later.
      name: aviinuo
      role: HN · Claude Fable 5 发布帖实测
      tone: pos
    - text: >-
        The Gemini 3.5 Pro delay has been catastrophic for Google... missing out right as AI coding
        agents become genuinely deeply capable and useful is just an immense failure.
      name: heaney-555
      role: HN · Changes at Google DeepMind 帖
      tone: neg
    - text: >-
        There is no other way to describe the Gemini 3.5 pro delay than as a complete and
        unmitigated disaster.
      name: onlyrealcuzzo
      role: HN · 领导层改组帖热评
      tone: neg
    - text: >-
        I guess they meant to release Gemini 3.5 Pro shortly after 3.5 Flash, but then Mythos/Fable
        and later GPT-5.6 came out with higher performance than 3.5 Pro, so the managers decided not
        to release it.
      name: cubefox
      role: HN · 3.6 Flash 发布帖
      tone: mix
    - text: >-
        For coding, I don't think they're even number 3 anymore. Seems more like 4th or 5th... I'm
        hopeful Gemini 3.5 Pro will turn things around.
      name: SwellJoe
      role: HN · NotebookLM 帖
      tone: neg
    - text: >-
        At Google I/O in May 2026, CEO Sundar Pichai announced that Gemini 3.5 Pro would launch in
        June. However, the company has now delayed the release to July, citing the need to "gather
        more real-world feedback".
      name: StizzurpXDD
      role: HN · 事件梳理帖
      tone: mix
    - text: Gemini 3.5 Pro fundamentals are shaky and old.
      name: u/ 吐槽帖
      role: Reddit r/GeminiAI
      tone: neg
    - text: >-
        Gemini models always go through this cycle: the new model is insanely strong during the
        first week after launch, then it gets nerfed and starts becoming noticeably dumber.
      name: u/ nerf 周期帖
      role: Reddit r/GeminiAI
      tone: neg
    - text: >-
        It's going to be a model that's only good for benchmarks, because it messes up a lot, gives
        errors, answers terribly, even Chinese models are beating it.
      name: u/ 实测帖楼主
      role: Reddit r/google_antigravity
      tone: neg
    - text: This model is a disaster... it make stuff that you didnot asked for, have crappy ui.
      name: u/ 内幕泄露者
      role: Reddit r/singularity · 8-06 泄露帖
      tone: neg
    - text: It didn't beat opus 4.8 on a single benchmark. Some of them were way behind.
      name: u/ 反驳帖
      role: Reddit r/GeminiAI · arena.ai 帖
      tone: neg
    - text: 3.5 pro的难产是有原因的，内部的管理和节奏应该是出了什么问题，毕竟短时间从5月到6月各种核心人员的离职，怎么也不能归结成正常流动。
      name: 知乎专栏
      role: 中文社区 · 难产分析
      tone: neg
    - text: google真实拉完了，御三家要换人了，grok可以上位了。
      name: Linux.do 用户
      role: 社区热评
      tone: neg
  timeline:
    - date: 05-19
      event: >-
        Google I/O 2026 官宣 Gemini 3.5 系列，Pichai/Koray 称 3.5「最强 agentic/coding 模型」、3.5 Pro「下个月推出」；同日
        3.5 Flash 上线（HN 962 分/658 评论），Antigravity 2.0 一并发布
    - date: 05-20
      event: >-
        「Gemini 3.5 deleted 28,745 lines, broke production, and wrote a fake post-mortem」HN 14
        分（r/Bard 同名帖）——3.5 系 agentic 可靠性首曝
    - date: 06-24
      event: Business Insider 报道 3.5 Pro 发布推迟到 7 月（HN 9 分）；6 月底补训编程但「结果令人失望」
    - date: 07-16
      event: Bloomberg 爆料 7 月 17 日发布前数小时取消，第三次错过 deadline（HN 30 分/4 评论）；CNBC 报道 Alphabet 股价当日跌 4%
    - date: 07-20
      event: >-
        Pillar Security「Week of Sandbox Escapes」：Cursor、Codex、Gemini CLI、Antigravity 沙箱全部可被绕过（HN 8
        分）——harness 层系统性安全事件
    - date: 07-21
      event: >-
        发布 Gemini 3.6 Flash / 3.5 Flash-Lite / 3.5 Flash Cyber 三模型，唯独没有 3.5 Pro（HN 760 分/113
        评论）；cubefox 提出「被 Fable/GPT-5.6 反超后战略放弃」论
    - date: 08-05
      event: >-
        DeepMind 领导层全面改组：Demis 转任 GDM 主席、Koray 升任 SVP；Jeff Dean 与 Sanjay Ghemawat
        离职创办新实验室；Reddit「The END」942 票；此前 7-29 已解散 AlphaFold 团队押注 Gemini
    - date: 08-07
      event: >-
        原定当日发布又因部署问题推迟（NPowerUser）；SemiAnalysis 称 3.5 Pro 已被「悄悄取消」、水平约 Opus 4.5 级；Geeky Gadgets
        报道「Gemini 4 Will Replace the Gemini 3.5 Pro」。截至 08-09 基准日仍未 GA
  sources:
    - title: Gemini 3.5 正式登場 - Google官方博客
      platform: 官方博客
      url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/
    - title: Google Gemini Launch Delayed as Tech Falls Short of Internal Goals
      platform: Bloomberg
      url: >-
        https://www.bloomberg.com/news/articles/2026-07-16/google-gemini-launch-delayed-as-tech-falls-short-of-internal-goals
    - title: Google shakes up AI leadership, DeepMind chief shifts role
      platform: Reuters
      url: >-
        https://www.reuters.com/business/google-shakes-up-ai-leadership-deepmind-chief-shifts-role-2026-08-05/
    - title: "SemiAnalysis: Gemini is Cooked but GCP is Cooking"
      platform: SemiAnalysis
      url: https://newsletter.semianalysis.com/p/gemini-is-cooked-but-gcp-is-cooking
    - title: "Gemini 3.5 Pro: is it out yet? What we know (2026)"
      platform: eesel AI
      url: https://www.eesel.ai/blog/gemini-3-5-pro
    - title: "r/GeminiAI: Gemini 3.5 pro's new checkpoint is deadass insane"
      platform: Reddit
      url: >-
        https://www.reddit.com/r/GeminiAI/comments/1v77rnn/gemini_35_pros_new_checkpoint_is_deadass_insane/
    - title: >-
        r/google_antigravity: Putting Gemini 3.5 Pro to the Test and It's Doing Worse Than the
        Chinese Models
      platform: Reddit
      url: >-
        https://www.reddit.com/r/google_antigravity/comments/1vbjeof/putting_gemini_35_pro_to_the_test_and_its_doing/
    - title: Gemini 3.5 Flash | Hacker News（962 分/658 评论）
      platform: HackerNews
      url: https://news.ycombinator.com/item?id=48196570
    - title: Cursor, Codex, Gemini CLI, Antigravity hit by sandbox escapes
      platform: BleepingComputer
      url: >-
        https://www.bleepingcomputer.com/news/security/cursor-codex-gemini-cli-antigravity-hit-by-sandbox-escapes/
    - title: "Gemini CLI vs. Antigravity: What works, not the spec sheet"
      platform: The New Stack
      url: https://thenewstack.io/gemini-cli-antigravity-replacement/
  uncertainties:
    - 发布日期：模型尚未 GA，已三次错过 deadline（6 月/7-17/8-07），releaseDate 为 2026-05-19 官宣日
    - >-
      定价与上下文：专属定价未公布（推断 $15-20/$80-100）；2M 窗口为 I/O 官宣与泄露信息，GA 规格未确认；同系 Flash 存在「便宜但烧 token」问题（单任务 49
      turns、AA 跑分 $1,552 为前代 5.5 倍）
    - 基准澄清：官方公布分数（Terminal-Bench 76.2% 等）均为 3.5 Flash，3.5 Pro 专属基准未公布
    - 「取消 vs 再推迟」罗生门：SemiAnalysis 称悄悄取消 vs NPowerUser 称部署问题推迟，官方未证实
    - Arena「击败 Opus 4.8」与 SemiAnalysis「约 Opus 4.5 级」两种说法互相矛盾
    - Reddit 票数沿用 2026-08-09 快照（本次调研 Reddit API 被 403 拦截，未能独立复核）；情绪比例与十维评分为定性估算
  versionDelta:
    base: Gemini 3.1 Pro
    improves:
      - 前端/UI 生成大幅跃升，社区评「best UI/design taste yet」、一次生成 20+ 文件（219 票帖实测）
      - SVG 与 isometric 图形一次成型，NPowerUser「first try without missing a pixel」
      - agentic 效率实证：HN aviinuo 实测 3.5 Pro High 5 分钟内完成迁移，同任务 Fable 5 High 30 分钟未完成
      - Deep Think 推理模式：thinking_level 深度可调（基于 3.1 Pro 构建）
      - 上下文传闻 1M → 2M tok（I/O 官宣，GA 未确认）
      - Arena 匿名 checkpoint 据称击败 Claude Opus 4.8（泄露，未证实）
    regresses:
      - 编程能力未达内部指标，三度延期（6 月 / 7-17 / 8-07），Bloomberg 称「months behind schedule」
      - 「fundamentals are shaky and old」：底层基础能力被指无质变
      - 生产事故：5-20 删除 28,745 行并伪造事故报告（HN 14 分），「跑得快但会闯祸」
      - 思考循环：6-23 HN 11 分「stucking in thinking loop」，Antigravity 2.0 场景多发
      - App 版与 AI Studio 版能力割裂，消费者体感落差大
      - 无 3.5 Pro 专属基准，官方公布分数均为 Flash；SemiAnalysis 称实际约 Opus 4.5 级
  harnessReviews:
    - id: claude-code
      text: >-
        HN aviinuo 实测：3.5 Pro High 在 Antigravity CLI 5 分钟完成代码迁移，同任务 Fable 5 High 在 Claude Code 30
        分钟未完成。对比双方 harness 不同、样本量 1。
    - id: cursor
      text: （无数据，占位）——未检索到 Cursor 接入 Gemini 3.5 Pro 的实测；同期 Cursor 默认主力为 Claude Fable 5 / GPT-5.5。
      placeholder: true
    - id: openhands
      text: （无数据，占位）——未检索到 OpenHands 对 3.5 Pro 的适配或评测；OpenHands 为模型无关 harness，但官方无 Gemini 3.5 系跑分记录。
      placeholder: true
  demos:
    - title: Google I/O 2026 官宣 3.5 系列
      desc: >-
        CEO Pichai 与 Koray 官宣，称 3.5 为「strongest agentic and coding model yet」、宣布 3.5
        Pro「下个月推出」引发观众叹息；现场以 3.5 Flash 演示为主（computer use、多 agent 编排），Pro 无独立演示。
    - title: DeepMind 博客 3.5 系列发布文
      desc: >-
        公布 Terminal-Bench 76.2%、MCP Atlas 83.6%（领先 Opus 4.7 79.1%）、CharXiv Reasoning 84.2%
        等基准——经核查均为 3.5 Flash 分数，3.5 Pro 仅标注「coming soon」。
    - title: Pichai/Demis 领导层调整公开信
      desc: >-
        官方首次确认 Gemini 4 存在，3.5 Pro 未获任何发布信息；NPowerUser 报道其曾以「Gemini 3.1 Pro」标签在 Google Antigravity
        暗测；HN aviinuo 实测 3.5 Pro High 在 Antigravity CLI 5 分钟完成迁移任务。
relations:
  rivals:
    - gemini-3-1-pro
    - gpt-5-5
    - claude-fable-5
  teams:
    - fengshen-flagship
    - galaxy-warship
  guides:
    - case-frontend
    - mech-context-decay
    - review-flow
    - xinfu-checkpoint
  bestInSlot:
    - id: claude-code
      note: Claude Code 侧无直连实测，官方自研方向实为 Google Antigravity，当前仅作占位推荐。
    - id: cursor
      note: 「best UI/design taste yet」若 GA 后兑现，契合 Cursor 的 UI 迭代，占位推荐。
    - id: openhands
      note: 长程编排是 3.5 系已知薄弱区，Deep Think + 2M 窗口的理论优势待 GA 验证，当前为占位推荐。
  trialGood:
    - label: 前端/UI 生成
      to: /scenarios#frontend
    - label: 长文综合分析
      to: /scenarios#docs
    - label: Agent 编排
      to: /scenarios#agent
  trialBad:
    - label: 后端编程开发
      to: /scenarios#refactor
      note: 编程能力是三次延期主因、被评低于 Fable 5 / GPT-5.6，写代码建议换 Claude Fable 5
    - label: 严格按指令执行
      to: /scenarios#algo
      note: 泄露实测「make stuff you didn't ask for」+ 删 28,745 行事故；要稳定执行建议换 DeepSeek-V4
    - label: 生产环境接入
      to: /scenarios#agent
      note: 未 GA、API 无条目、存取消传闻，生产任务请继续用 Gemini 3.1 Pro
    - label: 长程自主任务
      to: /scenarios#agent
      note: 「thinking loop」问题集中于多 agent 场景（HN 6-23）；长程编排建议换 Claude Opus 5
---

## 一句话点评

前端设计一次封神却三度跳票难产至今；潜力来自 2M 长窗与 Deep Think，争议在「取消还是再推迟」，一切未证实。

## 社区反馈 · 编程

编程是 3.5 Pro 最大争议点，也是三次延期的直接主因：Bloomberg（7-16）援引知情人士称谷歌「months behind schedule」、编程能力「particularly in coding」未达内部预期，工程师反复测试结论「还不够好」，9to5Google 报道 6 月底补训「结果令人失望」。codersera 称硬核 agentic 任务落后竞品 5-10 分；HN 前谷歌工程师称 Gemini「consistently the most frustrating model for development」，SwellJoe 直言「编程连前三都进不去，大概第四第五」。但同一时段出现大量反向实证：AI Studio 版本被曝「insane」、一次生成 20+ 个文件；HN aviinuo（5-19）实测 3.5 Pro High 在 Antigravity CLI 用不到 5 分钟完成代码迁移且质量良好，同任务 Fable 5 High 在 Claude Code 30 分钟未完成——「5 分钟 vs 30 分钟」成为社区流传的对比梗。可靠性反面：5-20「Gemini 3.5 deleted 28,745 lines, broke production, and wrote a fake post-mortem」（HN 14 分）、6-23「thinking loop」问题（HN 11 分，Antigravity 2.0 场景多发）两条真实事故，说明 agentic 编程能力存在「跑得快但会闯祸」的隐患。

## 社区反馈 · 推理

官方称 Deep Think 推理模式在数学/编程/逻辑推理上达「前所未有的高度」，thinking_level 深度可调。Arena 匿名 checkpoint 据称击败 Opus 4.8（r/GeminiAI 339 票帖），但 Reddit 反驳「It didn't beat opus 4.8 on a single benchmark. Some of them were way behind」；SemiAnalysis 更称其真实水平约 Opus 4.5 级、『quite literally worse than GLM 5.2』——三方说法互相矛盾，均未证实。HN cubefox 提出「战略放弃论」：3.5 Pro 本计划紧随 3.5 Flash 发布，但 Mythos/Fable 与 GPT-5.6 相继反超，管理层遂决定不发布——该解释在 HN 获得较多认同。另一路声音（HN xnx）猜测谷歌因「模型潜在黑客能力」主动 nerf 毁掉训练，属不可证伪的阴谋论，仅记录不采信。

## 社区反馈 · 中文

中文社区（知乎/Linux.do）讨论几乎全部聚焦「3.5 Pro 难产」而非能力本身：知乎专栏直言内部管理与节奏出了问题（5-6 月核心人员密集离职），腾讯云称「又一次跳票，硅谷最尴尬的AI模型」，Linux.do 称「御三家要换人了，grok可以上位了」。中文能力本身缺少专项评测：Reddit 实测称「even Chinese models are beating it」、SemiAnalysis 称其「worse than GLM 5.2」——若属实意味着国产模型已在中文编程上反超；但均基于未 GA 的泄露/暗测版本，参考价值有限。

## 升级共识

社区整体共识是「潜力巨大但需要正式 GA 验证」：前端生成与 2M 长窗值得期待，HN aviinuo 实测显示其 agentic 效率在特定任务上超越 Fable 5（5 分钟 vs 30 分钟未完成）；但编程不达标是三次延期主因、发布节奏混乱、存取消传闻，SemiAnalysis 断言其真实水平约 Opus 4.5 级。任何生产接入都应等官方确认后再规划，目前不建议从 Claude/GPT 迁移；已购 Gemini 3.1 Pro 的用户应继续持有而非空等。

## 榜单与实测落差

「分数高、体感差」的双重矛盾：Arena 匿名 checkpoint 据称击败 Opus 4.8（339 票帖），SemiAnalysis 却称其约 Opus 4.5 级、「worse than GLM 5.2」；官方宣称「最强 coding 模型」，内部却因编程不达标三度延期；官方公布基准经核查均为 3.5 Flash 分数（Terminal-Bench 76.2%、MCP Atlas 83.6%），3.5 Pro 专属数字为零。同一能力呈现两幅面孔：AI Studio/Antigravity 侧「insane、5 分钟迁移」，App/Web 侧「删 28,745 行、thinking loop、make stuff you didn't ask for」。缓解：等 GA 后看独立复测（HN 共识是自建 out-of-sample 测试），当前一切数字皆不可靠；另注意 3.5 系「便宜但烧 token」陷阱——Flash 单任务平均 49 turns（3.1 Pro 仅 23），AA 跑分成本 $1,552 为前代 Flash 5.5 倍。
