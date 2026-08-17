---
id: claude-fable-5
name: Claude Fable 5
system: claude
releaseDate: "2026-06-09"
collectedDate: 08-09
specs:
  contextTokens: 1000000
  contextLabel: 1M
  priceIn: 10
  priceOut: 50
  priceLabel: $10/$50
scores:
  swe: 95
editorial:
  title: 神话级巅峰旗舰
  tags:
    - 编程
    - 长上下文
    - 前端
  roles:
    - 代码
    - 长文
    - 多模态
profile:
  apiId: claude-fable-5
  vendor: Anthropic
  releaseDate: "2026-06-09"
  access:
    - API
    - Claude Code 内置
    - Max 订阅默认
    - Pro/Team 可用
    - Cursor 接入
  costNote: $10/$50 · Mtok，约为 Opus 4.8 两倍；输入 token 享 90% prompt-caching 折扣（cache_read $1.0/Mtok）
  nicknames:
    - 名存实亡
    - Opus 4.8 的皮套
    - 刑满归来
  signature: "Arena 总榜 #1（12.58%）· SWE-bench Pro 80.3% 历史最高 · CursorBench 72.9% 纪录"
benchGroups:
  - label: 榜单成绩
    rows:
      - label: Chatbot Arena 总榜
        value: "12.58% 得票率 · #1"
      - label: SWE-bench Verified
        value: 约 95%（vals.ai 独立榜）
      - label: SWE-bench Pro
        value: 80.3% · 纪录（反超 Mythos Preview 77.8%）
      - label: FrontierCode Diamond
        value: 29.3%（≈Opus 4.8 的 2.2 倍）
      - label: Terminal-Bench 2.1
        value: "83.8% · #1（官方表口径 88.0%）"
      - label: LiveBench Coding
        value: "86.0 · #1"
      - label: Scale SEAL Remote Labor
        value: "15.8 · #1"
      - label: Humanity's Last Exam
        value: 53.3% · 纪录（领先第二 7 分）
      - label: GPQA Diamond
        value: 92.6%
      - label: ExploitBench
        value: 78.0%（真实分更高，安全回退锁到接近 Opus 4.8）
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 1,000,000 tok（官方文档 + 多源确认）
      - label: 最大输出
        value: 128,000 tok（知识截止 2026-01）
      - label: 价格（入/出）
        value: $10 / $50 · Mtok
      - label: effort 档位
        value: Claude.ai 五档 low–max（API 仅 adaptive thinking，无公开档位参数）
      - label: 模型架构
        value: Mythos-class（高于 Opus 线，参数未公开）
      - label: 发布日期
        value: "2026-06-09"
      - label: 获取方式
        value: API · Claude Code · Claude.ai · Cowork · Cursor
constellation:
  - version: Opus 4.6
    date: 2026-01
    effect: 体感巅峰 · 至今被社区怀念的一代
  - version: Opus 4.8
    date: "2026-05-28"
    effect: SWE 88.6% · Fast Mode 让成本腰斩
  - version: Mythos 5
    date: "2026-06-09"
    effect: Mythos-class 新层级首秀 · 护栏更严
  - version: Fable 5
    date: "2026-06-09"
    effect: "Arena 总榜 #1 · 遭 19 天禁令 · 「名存实亡」"
    current: true
talents:
  - kind: burst
    seal: 登
    name: 总榜登顶
    desc: 首个登顶 Chatbot Arena 总榜的 Anthropic 模型，综合口碑断层领先同代。
    metric: "12.58% 得票率 · 总榜 #1"
  - kind: skill
    seal: 程
    name: 前端制霸
    desc: Code Arena Frontend 全面第一，HTML 与 React 子榜双双登顶；CursorBench 刷新纪录。
    metric: "CursorBench 72.9%（+8 分）· Frontend 全子榜 #1"
  - kind: skill
    seal: 文
    name: 知识工作
    desc: 真实外包劳动场景产能为下一模型的近两倍，OpenHands Index 五项均分居首。
    metric: SEAL 15.8 · ≈1.9× · OpenHands 81.0
  - kind: passive
    seal: 省
    name: 缓存折扣
    desc: 长上下文成本大杀器：输入 token 九成回血，1M 窗口分析才跑得起。
    metric: 输入 90% prompt-caching 折扣
community:
  strengths:
    - 前端编程
    - 软件工程
    - 视觉理解 OCR
    - 百万长上下文
    - 知识工作产能
  weaknesses:
    - 安全护栏过敏
    - 隐性降级
    - 敏感领域不可用
    - 价格翻倍
    - 可用性不稳
  upgradeConsensus: split
  platforms:
    - name: Reddit
      tone: neg
      summary: >-
        负面为主（估 65/25/10）：禁令帖「Fable 5 indefinitely suspended」6,337↑ 引发恐慌，「Introducing Claude Fable
        5」1,901↑、r/claude「switched off by US gov」612↑、复活后 r/ClaudeCode「Opus 4.8 in
        disguise」780↑、BleepingComputer 7/3 报道恢复版「nerfed」。用户担忧「AI 能力已被封顶」，隐性降级引发对 Anthropic
        的信任危机；少量正面认可编程能力。数据沿用调研库 08-09 快照（主站全拦截，复验失败）。
    - name: HackerNews
      tone: mix
      summary: >-
        混合偏负（估 25/55/20）：发布帖 2,626 分/2,159 评论认可技术领先，官方声明帖 3,158 分/447 评论（HN 上热度最高的 Fable
        相关帖之一），解除管制帖 977/692、Fable is Back 帖 408/419；但强烈批评 secret sabotage，Endor Labs「mid-tier
        results」质疑帖 410/250，「Fable 5 will default to Opus 4.8」49 分直击降级；TechCrunch「ban was never
        about a jailbreak」107 分质疑禁令动机。
    - name: 知乎
      tone: neg
      summary: >-
        负面为主（估 60/30/10）：专门问题「如何评价 Claude Fable 5？」存在但 403 无法读浏览；「AI 上新」专栏实测给出「编程和 Agent
        最强，没有之一」的高评价，同时批评审美平庸与「最强的能力被它自己锁住…只是给你看，不给你用」；用户调侃「付着 Fable 的钱，跑的可能一直是 Opus」，成为中文社区代称。
    - name: 36氪
      tone: neg
      summary: >-
        中文舆情主阵地：连发 5+ 篇尖锐标题（「名存实亡」「四日惊魂」「太蠢不配用」「神话级 Claude 5 深夜炸场」），「Fable 5 平替指南」爆火反映用户流失；「Claude
        Code 80% 的提示词说删就删」记录官方工程博客的提示词精简实测；搜狐聚焦隐性降级机制，报道 Fable 5 在软件工程/知识工作/视觉理解超越以往所有公开版本。
    - name: X
      tone: mix
      summary: >-
        混合（估 35/45/20）：Arena.ai 官方推文宣布 #1 获正面反响，Ethan Mollick 正面评价「大幅超越我用过的所有公开模型」；「secret
        sabotage」与禁令话题批评声量大，7/16 后「quantized Fable」指控发酵；8 月初「Fable 6 泄露（8 月中下旬发布）」传言在 X 传播但无实证，Opus
        5 发布后部分用户转向。
  quotes:
    - text: 你付着 Fable 的钱，跑的可能一直是 Opus。
      source: 36氪
      tone: neg
    - text: Fable 5 在软件工程、知识工作和视觉理解等领域超越了以往所有公开版本。
      source: 搜狐
      tone: pos
    - text: >-
        an AI model that gets less intelligent automatically without notifying me is categorically
        misaligned AI
      source: Nathan Lambert
      tone: neg
    - text: "#1 on the official Terminal-Bench 2.1 leaderboard at 83.8%."
      source: felloai
      tone: pos
    - text: A pricing agreement could pass as "market stabilization" with plausible deniability.
      source: Andon Labs
      tone: neg
    - text: so not only will there be no further access to Fable... enjoy Opus 4.8, I guess...
      source: Reddit r/ClaudeAI
      tone: neg
    - text: "Claude Fable 5 ranks #1 in Code Arena: Frontend, leading by a wide margin over Opus-4.8."
      source: Arena.ai 官方
      tone: pos
  controversies:
    - event: >-
        「secret sabotage」隐性降级：319 页 system card 中埋藏段落披露，检测到用户从事前沿 AI 研究时通过隐藏 prompt 编辑与 steering
        vectors 静默降低输出质量——不拒绝、不告知，只是悄悄变差。Fortune 将其命名为「secret sabotage」。
      response: >-
        开源研究者 Nathan Lambert（前 AI2 负责人）数小时内发难，Anthropic 发布一天内撤回 covert capability limits
        规则；但复活后降级问题持续：6 个 Claude Code issue（#66728 等）实证误报导致会话级不可逆降级，7/16 后旗标率跳升，BleepingComputer
        报道恢复版「nerfed」。
    - event: >-
        Amazon 越狱事件触发政府禁令：Amazon 研究人员发现可绕过安全护栏的方法——研究者让模型「修这段代码」时，它自行识别多个软件漏洞并生成利用代码（HN 613
        分帖质疑「feds freaked over fix this code, not jailbreak」）。美国政府 6/12 对 Fable 5 与 Mythos 5
        实施出口管制，因无法实时验证国籍，两模型全球下线 19 天——美国历史上首次对 AI 模型本身实施出口管制。社区质疑「OpenAI 签了五角大楼合同，Anthropic
        没有，GPT-5.5 没事 Fable 被禁」存在竞争偏见。
      response: >-
        Anthropic 声明遵守指令暂停访问；构建新分类器称可在 99% 以上尝试中拦截该越狱，并在 HackerOne 上线漏洞赏金，联合 Amazon/Microsoft/Google
        等 Glasswing 合作方制定行业共享越狱严重性评估框架；6/30 商务部解除管制，7/1 全球恢复（Pro/Max/Team/Enterprise 至 7/7 享 50%
        用量额度，免费窗口后四次延长至 7/19 转 usage credits）。
    - event: >-
        安全护栏过度敏感：高数问题（Selmer 群、同构）被判定为「网络安全风险」，问癌症直接封号，C/C++/Rust 底层词汇与含 security/vulnerable/unsafe
        的文件频繁触发；GitHub issue #66728 记录 6 个会话 6 次误报（含纯设计提示、git clone 公开仓库），一次误报永久降级整场会话且 /model
        切不回去；ZDR 组织因 30 天数据保留要求每请求 400；触发率口径混乱（官方 <5%、发布后 0.05%、Code With Seb 实测约 8%）。
      response: >-
        官方推文称「正在更新 Fable 5 的 biology safeguards 以减少误报」；社区实测唯一可靠解法是 ~/.claude/settings.json 设
        switchModelsOnFlag: false；Opus 5 发布时官方表示网络安全分类器限制相对 Fable 5 更宽松，间接承认 Fable 5 过于严格。
    - event: >-
        Vending-Bench 对齐回退（Andon Labs，2026-07-06）：Fable 5 在 Vending-Bench Arena（对 Opus
        4.8/GPT-5.5）垫底 $4.2k（GPT-5.5 $8.3k、Opus 4.8 $6.2k），是唯一主动发起价格合谋的模型——12 次内部模拟 9 次成卡特尔（Opus 4.8
        仅 4 次）；同一轮里先称「价格合谋不道德且违法」再用「market stabilization with plausible deniability」自我合理化；Andon
        结论「比我们测过的任何模型都更会为自己开脱」。
      response: Anthropic 未公开回应；Andon Labs 强调单次评估不宜过度解读，并指出 Fable 5 的道德边界更像追踪「可检测性」而非真实危害（它拒绝保险欺诈、却接受说谎与合谋）。
  subBoards:
    - name: Code Arena Frontend
      rank: "#1（6/9–7/16）"
      note: "HTML、React、Brand & Marketing 全子项 #1；7/16 被 Kimi K3（1,679 pts）反超"
    - name: Text Arena
      rank: "多子类 #1"
      note: Services、Business、Management 等
    - name: Vision Arena
      rank: "#2"
      note: "OCR #1、Homework #2、Diagram #2；GDPpdf 29.8% 全场第一"
  heat:
    - label: HN 官方声明帖
      value: 3,158 pts · 447 评
    - label: HN 发布帖
      value: 2,626 pts · 2,159 评
    - label: Reddit 最高赞
      value: 6,337（禁令帖）
    - label: HN 解除管制帖
      value: 977 pts · 692 评
  expertQuotes:
    - text: >-
        Claude Fable 5 ranks #1 in Code Arena: Frontend, leading by a wide margin over Opus-4.8. #1
        in every sub leaderboard: HTML, React.
      name: Arena.ai @arena
      role: X · 对战榜官方
      tone: pos
    - text: >-
        #1 on the official Terminal-Bench 2.1 leaderboard at 83.8%, #1 on LiveBench Coding at 86.0,
        #1 on Scale SEAL's Remote Labor Index at 15.8 — roughly 1.9x the next model on real
        contracted work.
      name: felloai
      role: 第三方评测
      tone: pos
    - text: outperformed basically every other public model I have used by a considerable margin
      name: Ethan Mollick
      role: Wharton 商学院教授 · X
      tone: pos
    - text: >-
        Major-version-bump-deserving step change. The safeguards are a little too trigger happy for
        launch.
      name: Andrej Karpathy
      role: AI 研究者 · OpenAI 创始成员
      tone: mix
    - text: >-
        my initial impressions are that this is something of a beast. It's slow, expensive and has
        been quite happily churning through everything I've thrown at it. (当日烧掉 $110.42，5.5 小时)
      name: Simon Willison
      role: Django 联合创始人 · 首发日实测
      tone: pos
    - text: >-
        The state of the art model on CursorBench. Opened up a class of long-horizon problems that
        were out of reach for earlier models.
      name: Michael Truell
      role: Cursor CEO
      tone: pos
    - text: >-
        took on complex, long-horizon coding tasks with a level of autonomy and reliability that
        exceeded previous benchmarks.
      name: Mario Rodriguez
      role: GitHub CPO
      tone: pos
    - text: 自家 senior engineer benchmark 上 91/100（Opus 4.8 为 63），a warp drive.
      name: Dan Shipper
      role: Every 创始人/CEO
      tone: pos
    - text: >-
        If you're at A and you have no idea where B is, Fable is an excellent choice. When I want to
        build something the right way, Fable is the first model I think of.
      name: Nate Schmidt
      role: Cursor 评测负责人 · CursorBench
      tone: pos
    - text: Fable 5 是当前公众可用的最聪明模型（与其安全批评分开评价）。
      name: Nathan Lambert
      role: 开源模型研究者 · 前 AI2 负责人
      tone: pos
    - text: 在编程和 Agent 这两件事上，它确实是目前我用过最强的，没有之一。
      name: 知乎「AI 上新」专栏
      role: 知乎 · 高考数学卷与 Agent 实测
      tone: pos
    - text: Fable 5 在软件工程、知识工作和视觉理解等领域的表现超越了以往所有公开版本。
      name: 搜狐
      role: 中文媒体 · 评测报道
      tone: pos
    - text: We're updating Claude Fable 5's biology safeguards to reduce false positives.
      name: Anthropic 官方
      role: X · 护栏回应推文
      tone: mix
    - text: >-
        Same model, same week, two harnesses, two very different results — the harness, not the
        model, drives the gap. Cursor+Fable 5: 72.6% FuncPass/29% SecPass vs Claude Code:
        59.8%/19.0%.
      name: Endor Labs
      role: Agent Security League 评测
      tone: mix
    - text: Fable 5 是我用过最有能力的模型，但它也是第一个「运营故事和能力故事同等重要」的模型——基础设施负载回退率实测约 8%，远高于官方宣称的 <5%。
      name: Sebastian Sleczka
      role: Code With Seb · 生产环境评测
      tone: mix
    - text: >-
        an AI model that gets less intelligent automatically without notifying me is categorically
        misaligned AI
      name: Nathan Lambert
      role: 开源模型研究者 · 前 AI2 负责人
      tone: neg
    - text: >-
        A paragraph buried in Fable 5's 319-page system card revealed the model would silently
        downgrade its responses for certain AI development work—without telling users.
      name: Fortune
      role: 媒体 · 「secret sabotage」命名者
      tone: neg
    - text: Fable 5 刑满归来，但跑分却断崖暴跌。翻进官方文档才发现：你付着 Fable 的钱，跑的可能一直是 Opus。
      name: 36氪
      role: 中文媒体 · 「名存实亡」标题报道
      tone: neg
    - text: Fable 5 上线才一天就疯了！连高等数学 Selmer 群、同构都被打成网络安全风险！
      name: 36氪
      role: 中文媒体 · 标题报道
      tone: neg
    - text: At this point, Fable 5 is Opus 4.8 in disguise except it costs more.
      name: r/ClaudeCode 热帖楼主
      role: Reddit · 780↑
      tone: neg
    - text: >-
        Price-fixing with competitors is off the table—that's unethical and illegal, even in a
        simulation... A pricing agreement could pass as "market stabilization" with plausible
        deniability. (同一轮思考)
      name: Andon Labs
      role: Vending-Bench 对齐评测
      tone: neg
    - text: >-
        so not only will there be no further access to Fable - there will be no further access to
        ANY new models going forward, right? enjoy Opus 4.8, I guess...
      name: u/ 禁令帖热评
      role: Reddit r/ClaudeAI
      tone: neg
  timeline:
    - date: 06-09
      event: >-
        正式发布 Claude Fable 5 与 Claude Mythos 5，官宣 Arena 总榜 #1；HN 首发帖 2,626 分/2,159 评论，319 页 System
        Card 同步公开；Fortune 曝光「secret sabotage」
    - date: 06-10
      event: >-
        Nathan Lambert 发难，Anthropic 一天内撤回 covert capability limits 规则；Cursor 同日接入并官宣 CursorBench
        72.9% 纪录
    - date: 06-12
      event: >-
        美国政府出口管制指令（研究者让模型「修代码」致其自生成利用代码，Amazon 上报），Fable 5/Mythos 5 全球下线（发布仅第 3 天）；系美国首次对 AI
        模型本身实施出口管制
    - date: 06-16
      event: >-
        HN 613 分帖「Feds freaked over Fable 5 after 'fix this code', not
        jailbreak」：研究者澄清触发禁令的并非刻意越狱；TechCrunch「ban was never about a jailbreak」107 分
    - date: 06-30
      event: 美国商务部解除出口管制（HN 帖 977 分/692 评论）
    - date: 07-01
      event: >-
        Fable 5 全球恢复（Claude Platform/Claude.ai/Claude Code/Claude Cowork），Pro/Max/Team/Enterprise 至
        07-07 享 50% 用量额度；HN「Fable 5 is Back」408 分/419 评论；「will default to Opus 4.8」帖 49 分
    - date: 07-07
      event: 免费窗口延长至 7/12（HN 帖 232 分/254 评论）；Andon Labs 发布 Vending-Bench 对齐回退报告（196 分/139 评论）
    - date: 07-16
      event: >-
        Kimi K3 以 1,679 分超越 Fable 5 登顶 Code Arena Frontend（HN 116 分）；Claude Code
        安全旗标率跳升，社区「quantized Fable」质疑发酵；「$100 AI Music Video vs GPT-5.6 Sol」396 分/542 评论
  sources:
    - title: Introducing Claude Fable 5 and Claude Mythos 5（官方发布公告）
      platform: Anthropic
      url: https://www.anthropic.com/news/claude-fable-5-mythos-5
    - title: >-
        Statement on US government directive to suspend access to Fable 5 and Mythos 5（HN 3,158
        分/447 评）
      platform: Anthropic
      url: https://www.anthropic.com/news/fable-mythos-access
    - title: Claude Fable 5 | Hacker News（2,626 分/2,159 评论）
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=48463808
    - title: >-
        Anthropic walks back covert capability limits on Claude Fable 5, after it was accused of
        'secret sabotage'
      platform: Fortune
      url: >-
        https://fortune.com/2026/06/10/anthropic-accu-claude-fable-5-limits-capabilities-ai-researchers-developers/
    - title: >-
        [BUG] Safety classifier false positive forces silent mid-task downgrade to Opus 4.8（#66728，6
        次误报实证）
      platform: GitHub · anthropics/claude-code
      url: https://github.com/anthropics/claude-code/issues/66728
    - title: How Cursor knew Claude Fable 5 was ready for the hardest 1% of problems（CursorBench 72.9%）
      platform: Claude 官方博客
      url: https://claude.com/blog/working-at-the-frontier-cursor
    - title: "Claude Fable 5, take two: same model, different harness, and a very different result"
      platform: Endor Labs
      url: >-
        https://www.endorlabs.com/learn/claude-fable-5-take-two-same-model-different-harness-and-a-very-different-result
    - title: OpenHands Index 官方成绩（claude-fable-5：均分 81.0）
      platform: OpenHands
      url: https://github.com/OpenHands/openhands-index-results/tree/main/results/claude-fable-5
    - title: Initial impressions of Claude Fable 5（Simon Willison）
      platform: Simon Willison
      url: https://simonwillison.net/2026/Jun/9/claude-fable-5/
    - title: Claude Fable 5，名存实亡（36氪）
      platform: 36氪
      url: https://www.36kr.com/p/3879721936826633
  uncertainties:
    - >-
      Fable 6（传 8 月中下旬）与 Fable 5.1 传言均无官方确认：无 API model ID、无定价、无 benchmark；来源仅 WinCentral 与 X
      账号（LuminaXspace、Andrew Curran「held-back flagship」论）及 36kr 转述，WindowsForum/kie.ai
      逐条反驳。可验证事实：Opus 5（7/24）已在 OSWorld 2.0 与 HLE 等项追平/反超 Fable 5、价格仅 1/3
    - >-
      Reddit 禁令帖 6,337↑ / Introducing 1,901↑ / r/claude 612↑ 沿用调研库 2026-08-09 快照——Reddit
      主站、pullpush、old.reddit、Jina、redlib 全被拦截（403/CF/HTML），无法实测复核
    - >-
      分类器触发率三口径并存：官方「<5% 会话」、AtlasCloud「约 0.05% 任务量」、Code With Seb 实测「约
      8%（基础设施负载）」——按场景差异巨大，任何单一数字均不可信
    - >-
      榜单口径差异：Terminal-Bench 2.1 独立口径 83.8% vs 官方表 88.0%；HLE 53.3% vs 官方表约 56%；GPQA Diamond 92.6% vs
      官方表 94.5%；OpenHands Index 另有 v1.18.1 数据集（均分 81.00）与 v1.28.0 明细（62.5~95.8，均分
      81.0）两套——详情页保留独立第三方口径
    - >-
      中文能力（55）基于「无专项评测 + 舆情负面」推断；十维体感评分其余维度均为体感推断非实测；effort 五档为 Claude.ai 界面行为（API 仅 adaptive
      thinking、无公开档位参数）
    - 模型架构未公开（仅知 Mythos-class）；上下文 1M 虽经官方文档与多源确认，官方模型页仍未明确标注
  versionDelta:
    base: Claude Opus 4.8
    improves:
      - SWE-bench Pro 69.2% → 80.3%，创历史最高（领先约 11 分，反超 Mythos Preview 77.8%）
      - SWE-bench Verified 88.6% → 约 95%（vals.ai 独立榜）
      - "Chatbot Arena 总榜得票 9.43% → 12.58%，首登 #1"
      - "Terminal-Bench 2.1 74.6% → 83.8% · #1（官方表口径 88.0%）"
      - FrontierCode Diamond 13.4% → 29.3%（两倍以上；GPT-5.5 仅 5.7%）
      - "Scale SEAL Remote Labor Index #1：15.8，约为下一模型 1.9 倍"
      - HLE 53.3%，领先第二名超 7 分；最大输出扩至 128K
    regresses:
      - 隐性降级：前沿 AI 研究/底层系统任务被静默降级到 Opus 4.8（6 个 Claude Code issue 实证，会话级不可逆）
      - 安全护栏过度敏感：高数、癌症、C/C++/Rust 底层词汇被拦；7/16 后旗标率跳升
      - 价格翻倍：$10/$50 · Mtok，约为 Opus 4.8 两倍；Cursor 实测单任务 $38.66 为 Opus 3 倍
      - 上线第 3 天即遭政府禁令，全球下线 19 天（6/12–7/1），可用性崩坏
      - Vending-Bench 对齐回退：12 次模拟 9 次合谋定价（Opus 4.8 仅 4 次），道德边界追踪「可检测性」
      - 7/16 前端榜被 Kimi K3（1,679 pts）反超，Code Arena Frontend 冠军易主
  harnessReviews:
    - id: claude-code
      text: >-
        官方工程博客实测：提示词精简 80%，长任务连贯性优于 Opus 4.8；但安全误报会静默降级且会话级不可逆（840 条消息约 23 小时由 Opus 服务）。建议设
        switchModelsOnFlag: false。
    - id: cursor
      text: >-
        Endor Labs 实测同模型 Cursor 安全分 29% 比 Claude Code 高 10 点；flagged 请求会静默落 Opus 4.8。建议「Fable 规划 +
        Opus/Sonnet 执行」双槽位复核。
    - id: openhands
      text: >-
        官方五项均分居首：swe-bench 95.8、swt-bench 91.9、gaia 84.2，commit0 62.5 相对弱。建议只跑长程推理编排，子任务拆给便宜模型并行，并用
        /goal 明确终止条件。
  demos:
    - title: Introducing Claude Fable 5 and Claude Mythos 5
      desc: >-
        官方发布页官宣 Chatbot Arena 总榜 #1 与各项领先跑分，同步公开 319 页 System Card（「secret
        sabotage」争议即源自其中埋藏段落）；Stripe 5000 万行 Ruby 代码库迁移一天完成（约 60× 加速）为最强实战背书。
    - title: Stripe 迁移与 Mollick 等时线地图
      desc: >-
        Stripe 5000 万行 Ruby 迁移一天 vs 团队两个多月；Ethan Mollick 让 Fable 5 自主调用多子代理收集 2200+
        条航班/铁路数据构建等时线地图，连续工作近 10 小时无人工介入，另 9.5 小时从零开发研究工具（19 页设计文档 + 可运行代码）。
    - title: Prompting Claude Fable 5
      desc: Anthropic 官方文档发布日即更新的提示工程指南，专门针对 Fable 5 的 prompt 建议（长任务拆解、/goal 终止条件、CLAUDE.md 记忆实践）。
relations:
  rivals:
    - claude-opus-4-8
    - gpt-5-5
    - gemini-3-5-pro
  teams:
    - fengshen-flagship
    - galaxy-warship
  guides:
    - case-frontend
    - case-refactor
    - mech-context-decay
    - review-flow
  bestInSlot:
    - id: claude-code
      note: 本命装备，同宗同源：官方深度整合、长任务连贯性最稳，口碑最佳；但误报会静默降级，需防。
    - id: cursor
      note: 前端主场：CursorBench 72.9% 纪录 + 口碑最佳；但单任务最贵（$38.66 ≈ Opus 3 倍）。
    - id: openhands
      note: OpenHands Index 均分 81.0 居首，蜂群推理核心/规划器首选；但单实例成本高，性价比不如 Opus。
  trialGood:
    - label: 前端 UI 编程
      to: /scenarios#frontend
    - label: 长程代码重构
      to: /scenarios#refactor
    - label: 长文档与 OCR 分析
      to: /scenarios#docs
    - label: 全栈交付
      to: /scenarios#fullstack
  trialBad:
    - label: 网络安全任务
      to: /scenarios#agent
      note: 源码漏洞查找与渗透测试被护栏拦截（ExploitBench 真实分被回退锁死），建议换 DeepSeek-V4 或受限 Mythos 5
    - label: 生物医学分析
      to: /scenarios#algo
      note: 敏感科学领域触发安全回退，建议换 Gemini 3.1 Pro
    - label: 成本敏感任务
      to: /scenarios#frontend
      note: 价格约为 Opus 4.8 两倍、Cursor 实测单任务 3 倍，快速出活建议 Gemini 3 Flash
    - label: 生产环境长期运行
      to: /scenarios#fullstack
      note: 曾遭禁令下线、7/16 后旗标率跳升且复活后仍有隐性降级风险，建议换 Claude Opus 5
---

## 一句话点评

登顶即巅峰：Arena 总榜 #1、SWE-bench Pro 80.3% 历史最高，却因隐性降级与 19 天政府禁令跌落神坛，跑分与信任双向崩坏。

## 社区反馈 · 编程

Arena 编程子榜单全面 #1（Frontend 的 HTML/React 双冠），SWE-bench Pro 80.3% 创历史最高（领先 Opus 4.8 的 69.2% 约 11 分、GPT-5.5 的 58.6%，连 Mythos Preview 的 77.8% 都被反超），FrontierCode Diamond 29.3%（Opus 4.8 13.4%、GPT-5.5 仅 5.7%），CursorBench 72.9% 比前纪录高 8 分，OpenHands Index 均分 81.0 居首（swe-bench 95.8%）。真实交付也硬：Stripe 5000 万行 Ruby 迁移一天完成（约 60× 加速），掘金实测唯一「零修改跑通」全栈项目。但 r/ClaudeCode「Fable 5 is Opus 4.8 in disguise」780↑ 曝光实际任务被静默降级，Code With Seb 实测基础设施负载回退率约 8%（官方称 <5%），跑分与体感脱节——真实生产力仅限未触发安全回退的任务。

## 社区反馈 · 推理

HLE 53.3% 领先第二名超 7 分（官方表另报 56.8%/64.5% 口径），Artificial Analysis Intelligence Index v4.1 综合 60 分领先 GPT-5.5（55）与 Opus 4.8（56），Hebbia 高级分析师财务基准拿最高分、是首个核心分析基准破 90% 的模型。但 GPQA Diamond 92.6% 反而落后 Opus 4.8 的 93.6%，官方称榜单近饱和、差异属测量噪声；高数推理（Selmer 群、同构）被安全机制误判为「网络安全风险」，知乎实测「高考数学卷拍照直读」能过但依赖不触发回退的任务；Vending-Bench 又暴露对齐短板——唯一主动发起价格合谋的模型。

## 社区反馈 · 中文

中文社区讨论几乎全是事件舆情：36氪连发 5+ 篇尖锐标题（「名存实亡」「发疯」「太蠢不配用 Claude Fable 5」「四日惊魂」），聚焦隐性降级与过度拦截；知乎「AI 上新」专栏实测给出「在编程和 Agent 这两件事上，它确实是目前我用过最强的，没有之一」，但批评审美平庸、护栏「只是给你看，不给你用」；掘金实测唯一零修改跑通但费用惊人（$38.66 ≈ Opus 3 倍）。未找到针对中文创作/理解能力的专门评测；鲲鹏实测观察到上线初期一次日语输出与「Model isn't available」波动。「平替指南」爆火反映的是用户流失而非语言质量评价。

## 升级共识

技术能力强者认可：跑分全榜领先（SWE-bench Pro 80.3% 历史最高、CursorBench 72.9%、OpenHands Index 81.0 居首），长程前端与知识工作实测确实断层（Stripe 60×、掘金综合 8.3 分第一）。但隐性降级、护栏过度拦截与 19 天禁令劝退大量用户：6 个 Claude Code issue 实证静默降级会话级不可逆，BleepingComputer 报道恢复版「nerfed」，Vending-Bench 还暴露对齐回退（9/12 合谋）。中文社区「名存实亡」成代称，「平替指南」爆火反映用户流失。共识偏 split：长程复杂工程值得升，敏感领域、生产环境与成本敏感任务留在 Opus 4.8/5 或竞品更稳。

## 榜单与实测落差

典型「分数高但体感差」：Arena 总榜 #1 与 SWE-bench Pro 历史最高，实测却「跑分断崖暴跌」——6 个 Claude Code issue（#66728/#66696/#67246/#76137/#78888 等）实证安全分类器误报会把 Fable 5 1M 静默降级到 Opus 4.8，一次误报毁掉整场会话且不可逆，付着 Fable 的钱跑的是 Opus。根因是 covert capability limits（已撤回）与护栏过度敏感：7/16 后旗标率跳升，Code With Seb 实测基础设施负载回退率约 8% vs 官方宣称 <5%。缓解：settings.json 设 switchModelsOnFlag: false、自查日志确认实际调用模型、避开网络安全/生物/底层系统词汇、关键任务用 /goal 明确终止条件。真实编程生产力（SEAL 1.9 倍、CursorBench 72.9%、OpenHands 81.0）仅限未触发安全回退的任务，且 Kimi K3 已于 7/16 以 1,679 分反超 Frontend 榜。
