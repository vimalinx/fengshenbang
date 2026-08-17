---
id: gpt-5-mini-nano
name: GPT-5 mini/nano
system: gpt
releaseDate: "2025-08-07"
collectedDate: 08-09
specs:
  contextTokens: 400000
  contextLabel: 400k
  maxOutputTokens: 128000
  priceIn: 0.25
  priceOut: 2
  priceLabel: $0.25/$2
scores:
  swe: 45.7
editorial:
  title: 轻量性价比标杆
  tags:
    - 轻量
    - 性价比
    - 工具调用
  roles:
    - 性价比
    - 速度
    - 代码
profile:
  apiId: gpt-5-mini
  vendor: OpenAI
  releaseDate: "2025-08-07"
  access:
    - API
    - ChatGPT 订阅
    - GitHub Copilot 内置
    - OpenRouter
  costNote: >-
    $0.25/$2 · Mtok（mini），nano 低至 $0.05/$0.4——约为旗舰 1/3 至 1/10；2026-12 停用，后继 5.4 mini 涨 3
    倍（$0.75/$4.5）
  nicknames:
    - 阉割版
    - godsend mini
    - Thinking Mini
  signature: 1/3 成本实现 SWE-Bench Pro 45.7%，nano 输入 $0.05/M 当时全场最低
benchGroups:
  - label: 榜单成绩
    rows:
      - label: SWE-Bench Pro
        value: 45.7%（mini high）· 同级领先
      - label: GPQA Diamond
        value: 81.6%（mini high）
      - label: AA Intelligence Index
        value: 25（high）/ 31（medium）· 超中位数
      - label: Chatbot Arena ELO
        value: ≈1300 · 中端
      - label: OSWorld-Verified
        value: 42.0%（mini）/ 39.0%（nano）
      - label: Terminal-Bench 2.0
        value: 38.2%
      - label: Toolathlon
        value: 26.9%
      - label: BenchLM.ai 综合
        value: "#165/215 · 43.01"
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 400,000 tok
      - label: 最大输出
        value: 128,000 tok
      - label: 价格（入/出）
        value: mini $0.25 / $2 · Mtok；nano $0.05 / $0.4
      - label: effort 档位
        value: Low / Medium / High（最高 High，旗舰才到 xhigh）
      - label: 模型架构
        value: 轻量架构（AA 推测 Medium 级 40B–150B）
      - label: 发布日期
        value: "2025-08-07"
      - label: 获取方式
        value: API · ChatGPT 订阅 · GitHub Copilot · OpenRouter
constellation:
  - version: GPT-5
    date: "2025-08-07"
    effect: 路由统一 · 全榜登顶，却因下架 4o 引爆争议
  - version: GPT-5 mini/nano
    date: "2025-08-07"
    effect: 轻量双生 · 1/3 成本扛起高频任务，性价比封神
    current: true
  - version: GPT-5.2
    date: "2025-12-11"
    effect: SWE-bench Pro 55.6% 创 SOTA · 知识工作强化
  - version: GPT-5.4 mini/nano
    date: "2026-03-17"
    effect: 提速 2 倍+ · 涨价 3 倍，SWE-Bench Pro 升至 54.4%
  - version: GPT-5.5
    date: "2026-04-23"
    effect: SWE-bench 88.7% · 1M 上下文 · 价格翻倍
  - version: GPT-5.6 Sol
    date: "2026-06-26"
    effect: Terminal-Bench 2.1 登顶 · Ultra 91.9%
talents:
  - kind: burst
    seal: 省
    name: 低成本智能
    desc: mini 成本约为旗舰 1/3、nano 低至 1/10，$20 plan 用户额度可延长约 3.3 倍，被 r/codex 用户称「godsend」。
    metric: mini $0.25/$2 · nano $0.05/$0.4
  - kind: skill
    seal: 器
    name: 工具调用编排
    desc: r/ChatGPTPro 称「massive improvement in tool calling」，多步工具编排可替代 o3；Codex 子代理专司低推理强度工作。
    metric: tau2-bench 74.1% · 子代理省 70% 额度
  - kind: normal
    seal: 速
    name: 低延迟快响应
    desc: 官方定位「对延迟零容忍的场景」，首 token 响应快，实时交互不拖沓；HN 实测 5.4 mini 较初代提速约 30%。
    metric: 官方延迟敏感场景主推 · 5.4 代再快 ~30%
  - kind: passive
    seal: 思
    name: 推理链完整
    desc: 同等规模中推理链完整度较好——知乎实测「小模型不是阉割版」；AA 指数高于可比中位数，HN 实测 mini medium 对齐 o4-mini medium。
    metric: AA Index 31 > 中位数 16
community:
  strengths:
    - 极高性价比
    - 低延迟快响应
    - 分类提取轻量任务
    - 推理链完整度
    - 工具调用改进
  weaknesses:
    - 复杂编程交付细节
    - 幻觉率极高
    - 长上下文易丢信息
    - 速度不及前代
    - 非智能突破
  upgradeConsensus: split
  platforms:
    - name: Reddit
      tone: mix
      summary: >-
        混合偏正面：godsend 帖 57 赞、benchmark 帖 215 赞 67 评、SWE-bench 独立评测 79 赞 35 评；反方「disaster」帖 72 赞 57
        评、速度差评并存。
    - name: HackerNews
      tone: mix
      summary: >-
        GPT-5 发布帖（id=44826997）2063 分/2482 评是系列最大热度，内含「nano 不如 o4-mini」「mini medium ≈ o4-mini
        medium」「免费用户额度耗尽自动降级 mini」等一手实测；GPT-5.4 mini/nano 帖（id=47415441）248 分/145 评贡献「simple 任务 99%
        够用」「mini 更能反映真实进步」「30% 配额」等热评；Tau² 提示词重写 +22% 帖 197 分/65 评。
    - name: 知乎
      tone: pos
      summary: 偏正面但理性：多篇实测称「mini 已能胜任绝大多数开发任务」，选型参考「不再是谁更强，而是谁更适合哪一部分」。
    - name: Linux.do
      tone: pos
      summary: 野榜帖「GPT-5 mini(high) 编程能力超过 o4-mini，且成本更低」，并热议低价接入 gpt-5-mini 的渠道。
    - name: V2EX
      tone: neg
      summary: 对 GPT-5 系列集中吐槽「跟弱智一样」（主要针对旗舰），mini 单独正经讨论较少，中转站广告混杂。
    - name: 掘金
      tone: mix
      summary: 中文场景实测准确率 71.5%，但「gpt-5.4-mini-high 在纯中文成本效率比上不占优」，GLM-5-Turbo、Gemini 3 Flash 同准确率更便宜。
    - name: X
      tone: mix
      summary: >-
        Matt Shumer 称「big leap」；Artificial Analysis 447 赞 44 转曝光 92% 幻觉率；Zvi 评「net win for
        sophisticated crowd, but not a major one」。
  quotes:
    - text: GPT-5.4 mini is a godsend
      source: Reddit r/codex · 57 赞
      tone: pos
    - text: GPT-5-mini is a lot of bang for the buck!
      source: Reddit r/ChatGPTCoding · 79 赞
      tone: pos
    - text: Why is NOBODY talking about just how amazing GPT-5-mini is??
      source: Reddit r/ChatGPTPro
      tone: pos
    - text: nano 的性价比几乎无敌
      source: 知乎
      tone: pos
    - text: GPT-5 Mini is not just bad, it's a disaster
      source: Reddit r/GithubCopilot · 72 赞
      tone: neg
    - text: worse than GPT-4.1 in almost every way
      source: Reddit r/GithubCopilot
      tone: neg
    - text: hallucinates like I can't even begin to describe it
      source: OpenAI Developer Community
      tone: neg
    - text: 5 mini 比 5.2 慢很多
      source: Reddit r/OpenAI
      tone: neg
  controversies:
    - event: >-
        幻觉率争议：Artificial Analysis（447 赞 44 转）报告 GPT-5.4 mini Reasoning 模式幻觉率 92%、准确率仅 54%、综合得分
        -18.7（nano 74%、-29.6），远超同级 Claude Haiku 4.5（26%），引发「声称减少幻觉、实测相反」的质疑。
      response: >-
        OpenAI 于 2026-03-17 发布 GPT-5.4 mini/nano，称「significantly improves over GPT-5 mini… running
        more than 2x faster」，间接承认初代 mini 的不足。
    - event: >-
        编程翻车：r/GithubCopilot 72 赞 57 评帖称 mini「not just bad, it's a disaster」「worse than GPT-4.1 in
        almost every way」，另有「GPT-5 mini seems dumber than GPT-4.1」「GPT 5 mini and GPT 5.4 mini
        sucks」等帖。
    - event: >-
        nano 安全评估（2026-06-15）：Lateos.ai 经 opencode.ai harness 黑盒评测 gpt-5-nano 提示注入易感率——210 例 IPI
        测试总易感率 38.3%（严重级 42.3%），递归指令框架 100% 易感、MCP 工具描述投毒 80%、角色/工具操纵类 70%；但对 CSS/视觉隐藏、HTML
        属性伪装、SEO/钓鱼放大、RAG 语料投毒 4 类完全免疫，是 nano 首份独立安全量化。
      response: 评测方注明为黑盒观测、样本 n=10/类、架构归因为工作假设；未公开恶意载荷，官方未另行回应。
    - event: >-
        静默路由与停用涨价双重争议：r/ChatGPTPro 帖「Pro model quietly redirects to GPT-mini based model.
        $200/month」；2026-06-26 起 GPT-5 mini 列入废弃名单、HN 热评确认「will be discontinued in December」，替代的 5.4
        mini 涨价 3 倍（$0.25/$2 → $0.75/$4.5），首评吐槽「Price keeps going up, and to justify it they keep
        forcing you to upgrade」。
  subBoards:
    - name: Chatbot Arena 综合
      rank: ELO ≈1300 · 中端
      note: 落后旗舰 GPT-5 约 82 分
    - name: AA Intelligence Index
      rank: 25（high）/ 31（medium）
      note: 高于可比模型中位数 16–17
    - name: Code（WebDev）子榜
      rank: 5.4-mini-high 已上榜
      note: 原版 mini 编程中端，视觉/长上下文缺独立排名
    - name: BenchLM.ai 综合
      rank: "#165/215 · 43.01"
    - name: DataCamp 排序
      rank: 5.4 > 5.4 mini > 5.4 nano > 5 mini
      note: OSWorld 为例外：mini 42.0% 略高于 nano 39.0%
  heat:
    - label: HN GPT-5 发布帖
      value: 2,063 分 · 2,482 评
    - label: HN GPT-5.4 mini/nano 帖
      value: 248 分 · 145 评
    - label: Reddit 最高赞
      value: 215（基准帖 67 评）
    - label: HN Tau² 热帖
      value: 197 分 · 65 评
  expertQuotes:
    - text: >-
        GPT-5.4 mini and nano significantly improves over GPT-5 mini across coding, reasoning,
        multimodal understanding, and tool use, while running more than 2x faster.
      name: OpenAI
      role: 官方博客 · Introducing GPT-5.4 mini and nano
      tone: pos
    - text: >-
        GPT-5 nano is recommended for classification, data extraction, ranking, and coding subagents
        that handle simple tasks.
      name: OpenAI
      role: 开发者文档 · GPT-5 nano 模型页
      tone: pos
    - text: >-
        GPT-5.4 mini scores -18.7 with a 92% hallucination rate, well behind Claude Sonnet 4.6 and
        Gemini 3 Flash.
      name: Artificial Analysis
      role: 机构评测 · X 447 赞 44 转
      tone: neg
    - text: GPT-5 is clearly a big leap from previous models.
      name: Matt Shumer
      role: X · @mattshumer_
      tone: pos
    - text: GPT-5 mini is a net win for sophisticated crowd, but not a major one.
      name: Zvi
      role: Zvi Substack · GPT-5s Are Alive
      tone: mix
    - text: >-
        For many 'simple' LLM tasks, GPT-5-mini was sufficient 99% of the time. GPT-5.4-mini is
        about 30% faster than GPT-5-mini.
      name: powera（HN 热评）
      role: HackerNews · GPT-5.4 mini/nano 帖（248 分）
      tone: pos
    - text: >-
        To me, mini releases matter much more and better reflect the real progress than SOTA models
        — the frontier models have become so good that it is almost impossible to notice meaningful
        differences.
      name: BoumTAC（HN 热评）
      role: HackerNews · GPT-5.4 mini/nano 帖
      tone: pos
    - text: >-
        In Codex, GPT-5.4 mini uses only 30% of the GPT-5.4 quota, letting developers quickly handle
        simpler coding tasks.
      name: beklein（Codex 重度用户）
      role: HackerNews · GPT-5.4 mini/nano 帖
      tone: pos
    - text: Why is NOBODY talking about just how amazing GPT-5-mini is??
      name: u/ 热帖楼主
      role: Reddit r/ChatGPTPro
      tone: pos
    - text: >-
        GPT-5-mini is a massive improvement in tool calling — I get the same results I was getting
        with o3 in a fraction of the time!
      name: u/ 工具调用帖
      role: Reddit r/ChatGPTPro
      tone: pos
    - text: GPT-5-mini is a lot of bang for the buck!
      name: SWE-bench 独立评测团队
      role: Reddit r/ChatGPTCoding · 79 赞 35 评
      tone: pos
    - text: GPT-5 Mini is not just bad, it's a disaster — one of the worst OpenAI models I've used.
      name: u/ 差评帖楼主
      role: Reddit r/GithubCopilot · 72 赞 57 评
      tone: neg
    - text: GPT-5 is worse than GPT-4.1 in almost every way.
      name: u/ 深度差评
      role: Reddit r/GithubCopilot
      tone: neg
    - text: >-
        It hallucinates like I can't even begin to describe it — it's really, really smart, but the
        hallucinations are unbearable.
      name: OpenAI Developer Community 用户
      role: 生产环境帖 · 22+ 回复
      tone: neg
    - text: Not impressed. gpt-5-nano gives noticeably worse results than o4-mini does.
      name: lynx97（HN 发布帖热评）
      role: HackerNews · GPT-5 帖（2,063 分）
      tone: neg
    - text: >-
        For us, it was also pretty good, but the performance decreased recently, that forced us to
        migrate to haiku-4.5. More expensive but much more reliable.
      name: HugoDias（生产环境用户）
      role: HackerNews · GPT-5.4 mini/nano 帖
      tone: neg
    - text: >-
        GPT-5 mini costs $0.25/$2 and will be discontinued in December. GPT-5.4 mini costs
        $0.75/$4.5 and is supposed to be the replacement.
      name: HyperL0gi（HN 热评）
      role: HackerNews · GPT-5.6 Sol 帖
      tone: neg
    - text: The Pro model quietly redirects to GPT-mini based model. $200/month.
      name: u/ 订阅用户
      role: Reddit r/ChatGPTPro · 静默路由帖
      tone: neg
    - text: >-
        The code was cheap. The quality gates were expensive — build passed, but the app failed at
        startup because of a DI registration issue.
      name: El Bruno
      role: GitHub Copilot CLI + GPT-5-mini BYOK 实测
      tone: mix
    - text: 之前觉得小模型就是阉割版，但 Mini 在推理链完整度上真的不错。
      name: 知乎/CSDN 实测
      role: 中文社区实测长文
      tone: pos
    - text: nano 的性价比几乎无敌。
      name: 知乎用户
      role: 分类提取场景实测
      tone: pos
    - text: gpt-5.4-mini-high 在纯中文成本效率比上不占优。
      name: 掘金评测
      role: 中文场景实测 · 准确率 71.5%
      tone: mix
  timeline:
    - date: 08-07
      event: >-
        GPT-5 mini/nano 随 GPT-5 家族发布，API 同步上线（mini $0.25/$2，nano $0.05/$0.4），effort 支持至 high；HN 发布帖
        2,063 分/2,482 评
    - date: 08-08
      event: >-
        热度首日爆发：r/OpenAI 基准帖 215 赞 67 评、SWE-bench 独立评测 79 赞刷屏，GitHub Copilot 公开预览上线；lynx97 首日唱衰
        nano「不如 o4-mini」
    - date: 08-12
      event: r/ChatGPTPro 帖称工具调用「massive improvement」，可替代 o3 完成多步编排；Cursor 官方论坛开始出现 gpt-5-mini 实测帖
    - date: 09-17
      event: HN 热帖：Tau² 基准提示词重写让 GPT-5-mini 提升 22%（197 分/65 评）
    - date: 09-25
      event: >-
        OpenAI 官方 status 事故单：GPT-5-nano Elevated API error rates（incident
        01K610WSX99YJPB4YAF150M1TG）
    - date: 11-08
      event: GPT-5-Codex-Mini 发布（HN 56 分），次日 Simon Willison 逆向 Codex CLI 演示 mini 干活（168 分/76 评）
    - date: 03-17
      event: GPT-5.4 mini/nano 发布（HN 248 分/145 评）：「运行速度快 2 倍以上」，SWE-Bench Pro 升至 54.4%，价格涨 3 倍
    - date: 06-26
      event: GPT-5.6 系列发布；mini 列入废弃名单、HN 确认 12 月停用、nano 标注旧版，轻量档位交接 Luna；07-30 Luna 降价 80% 定价地板再上移
  sources:
    - title: Introducing GPT-5.4 mini and nano | OpenAI
      platform: OpenAI官方
      url: https://openai.com/index/introducing-gpt-5-4-mini-and-nano/
    - title: GPT-5.4 mini (xhigh) - Intelligence, Performance & Price Analysis
      platform: Artificial Analysis
      url: https://artificialanalysis.ai/models/gpt-5-4-mini
    - title: GPT-5 | Hacker News（发布帖 2,063 分/2,482 评）
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=44826997
    - title: GPT-5.4 Mini and Nano | Hacker News（248 分/145 评）
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=47415441
    - title: GPT-5 mini costs $0.25/$2 and will be discontinued（12 月停用/涨 3 倍热评）
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=48689193
    - title: GPT-5-Mini is a great value | Cursor Community Forum
      platform: Cursor 官方论坛
      url: https://forum.cursor.com/t/gpt-5-mini-is-a-great-value/130858
    - title: "Mini Models Battle: Claude Haiku 4.5 vs GLM-4.6 vs GPT-5 Mini"
      platform: Kilo Code Blog
      url: https://blog.kilo.ai/p/mini-models-battle-claude-haiku-45
    - title: GPT-5 Nano IPI Assessment — LLM Vulnerability Research
      platform: Lateos.ai
      url: https://lateos.ai/llm-research/gpt5-nano/
    - title: "GPT-5 Benchmarks: How GPT-5, Mini, and Nano Perform in Real Tasks (215 votes, 67 comments)"
      platform: Reddit
      url: >-
        https://www.reddit.com/r/OpenAI/comments/1mnf43m/gpt5_benchmarks_how_gpt5_mini_and_nano_perform_in/
    - title: "GPT-5-Mini vs Claude Sonnet 4: I Tested 5 AI Coding Assistants"
      platform: Dre Dyson
      url: >-
        https://dredyson.com/gpt-5-mini-vs-claude-sonnet-4-i-tested-5-ai-coding-assistants-cost-performance-real-results/
  uncertainties:
    - 模型架构未公开：参数量/MoE 细节为推测，Artificial Analysis 估计 Medium 级（40B–150B）
    - Vals.ai 多项基准 0.0% 疑为评测配置/格式问题，非真实能力为零
    - OpenHands Index 未收录初代 mini，官方 500 例 SWE-bench 评测两次因基建故障（404/503）取消，harness 跑分缺失
    - 中文能力反馈主要来自 GPT-5.4 mini 评测（302.AI/掘金/EasyLLM），原版 GPT-5 mini 中文专项数据较少
    - Reddit 热门帖点赞数（215/79/72/57 等）无法二次核验（JSON 403 + PullPush 无归档），沿用调研库 2026-08-01 值
    - nano 在主流编码 harness（Cursor/Claude Code）的专门实测未找到，仅有 opencode.ai 安全评测与 Copilot CLI 的 mini 实测
  versionDelta:
    base: GPT-4.1 mini
    improves:
      - 成本大幅下降：mini 约为旗舰 1/3、nano 低至 1/10，nano 输入 $0.05/M 当时全场最低
      - 工具调用大幅改进：r/ChatGPTPro「massive improvement」，可替代 o3 完成多步编排；Kilo Code 实测唯一理解 SQLite 并发并实现租约式锁
      - 推理链完整度显著提升：从「小模型=阉割版」到「推理链完整度真的不错」，mini medium 实测对齐 o4-mini medium
      - 延迟更低、首 token 更快：官方定位「对延迟零容忍的场景」，后继 5.4 mini 再提速约 30%
      - Codex 子代理委派：$20 plan 用量可延长约 3.3 倍，5.4 mini 在 Codex 仅耗 30% 配额
      - AA Intelligence Index 25–31 分，高于可比中位数 16–17
    regresses:
      - 复杂编程交付细节与旗舰差距明显，nano 仅宜简单执行单元
      - 幻觉率极高：AA 测 mini（Reasoning）92%，准确率仅 54%
      - 长上下文压缩时易丢信息、重复已完成任务
      - 速度不及预期：「5 mini 比 5.2 慢很多」
      - 被指「worse than GPT-4.1 in almost every way」（r/GithubCopilot）
      - nano 推理密集任务力不从心（OSWorld 39.0%、Toolathlon 35.5%）；2026-12 停用、替代涨价 3 倍
  harnessReviews:
    - id: claude-code
      text: >-
        有人自建代理实测跑通并在 Claude Code 内构建出 API；但非 Anthropic 模型回复 terse、unhelpful，提示词工程是 Claude
        专属护城河。建议复杂交付直接用官方 Codex CLI。
    - id: cursor
      text: >-
        Dre Dyson 独立测试 200+ 案例：73% 更少 token、94% 指令遵循、89% 样板一次到位，可扛 86% 日常任务。建议高频补全与轻量重构跑
        mini，交付细节要求高的活切回旗舰，并预留质量门禁预算。
    - id: openhands
      text: >-
        OpenHands Index 未收录初代 mini（官方 500 例 SWE-bench 评测两次因基建故障取消）；nano 安全评测总易感率 38.3%、MCP 工具描述投毒
        80%。建议 MCP 工具描述要防投毒、结果要过质量门禁。
  demos:
    - title: OpenAI GPT-5 官方发布页
      desc: 官方演示 mini/nano「lightweight models」定位：面向延迟与成本敏感场景，附定价与能力概述。
    - title: Introducing GPT-5.4 mini and nano（官方博客）
      desc: 官方基准表演示：SWE-Bench Pro 45.7%→54.4%、OSWorld 42.0%→72.1%，「运行速度快 2 倍以上」。
    - title: Kilo Code Mini Models Battle（第三方 harness 实测）
      desc: 52 万+ 安装的 Kilo Code 实测：GPT-5 Mini 6 分钟 $0.05 全场最低成本，唯一实现租约式锁与事务/指数退避重试的正确并发方案。
relations:
  rivals:
    - gpt-5-2
    - deepseek-v4-flash
    - doubao-2-0-lite
  teams:
    - budget-vanguard
    - puppet-workshop
  guides:
    - beginner-budget
    - mech-toolcall
    - beginner-harness
    - xinfu-vol1
  bestInSlot:
    - id: claude-code
      note: 无官方接入，可经兼容端点手动配置；社区实测「so cheap, pretty fast」口碑，只宜作非关键省成本子代理。
    - id: cursor
      note: 官方论坛实测背书最多，口碑「无比听话」，是 Auto 模式平价平替。
    - id: openhands
      note: 适合作蜂群执行单元跑分类/提取/格式化子任务省额度，追求官方跑分建议直接换后继 5.4 mini 或 Luna。
  trialGood:
    - label: Agent 子代理编排
      to: /scenarios#agent
    - label: 常规代码开发
      to: /scenarios#refactor
    - label: 中低难度推理
      to: /scenarios#algo
    - label: 前端原型快速出活
      to: /scenarios#frontend
  trialBad:
    - label: 复杂编程交付
      to: /scenarios#refactor
      note: 交付细节与旗舰差距明显，建议换 Claude Sonnet 5
    - label: 高精度推理数学
      to: /scenarios#algo
      note: 非智能突破，追求前沿建议 GPT 5.6 Sol
    - label: 长上下文深度分析
      to: /scenarios#refactor
      note: 压缩易丢信息，建议换 Gemini 3 Pro
    - label: 生产关键路径
      to: /scenarios#agent
      note: 幻觉率极高，容错敏感场景换 Claude Haiku 4.5
---

## 一句话点评

以旗舰三分之一成本扛起高频轻量任务——性价比封神、工具调用惊艳，幻觉率与智能落差却是硬伤：选型不看谁更强，看谁更适合。

## 社区反馈 · 编程

两极但整体正面：SWE-Bench Pro 45.7%（官方）、独立评测 79 赞称「a lot of bang for the buck」，Codex 子代理仅耗 30% 额度；但 r/GithubCopilot 72 赞帖称「worse than GPT-4.1 in almost every way」——交付细节与旗舰差距明显，nano 更只宜高频简单执行。Harness 实测分化同样显著：Cursor 官方论坛用户称「nailing bugs again and again」「tool calls work almost perfectly」、Dre Dyson 独立测试 200+ 案例得出 73% 更少 token / 94% 指令遵循 / 89% 样板一次到位；而 El Bruno 在 GitHub Copilot CLI + BYOK 里用 4.16K 请求、104.27M tokens、总成本仅 $6.81 构建 Windows 托盘应用，结论却是「代码便宜、质量门禁贵」——运行时 DI、XAML 解析、托盘生命周期连环踩坑，构建通过≠能跑。

## 社区反馈 · 推理

同等成本下可圈可点：AA Intelligence Index 25–31 分高于可比中位数（16–17），GPQA Diamond 81.6%，HN 实测 mini medium 在 NYT Connections 扩展基准对齐 o4-mini medium；但社区共识「不是智能突破」，nano 推理密集任务明显力不从心（OSWorld 39.0%、Toolathlon 35.5%），发布首日 lynx97 即称「gpt-5-nano gives noticeably worse results than o4-mini」；HN 热评（248 分帖）powera 总结「simple tasks 里 GPT-5-mini 99% 时间够用」，BoumTAC 则说「mini 发布比旗舰更能反映真实代际进步」——它的价值定位是「够用」而非「惊艳」。

## 社区反馈 · 中文

原版中文专项评测较少（掘金/302.AI 侧重 GPT-5.4 mini）：中文场景准确率约 71.5%、法律行政领域 +16.6%；但「纯中文成本效率比不占优」，GLM-5-Turbo、Gemini 3 Flash 同准确率更便宜；302.AI 实测结论「mini 已能胜任绝大多数开发任务，选型不再是谁更强而是谁更适合哪一部分」，nano 定位「低复杂度高频执行单元」；知乎/CSDN 未见集中负面，苍何在 Cursor CLI 的中文实测称 GPT-5「很少瞎改代码、前端审美和指令遵循进步大」。

## 升级共识

高频轻量任务与成本敏感用户值得入手——mini 让 $20 plan 额度延长约 3.3 倍，nano 纯分类/提取性价比无敌；但追求前沿智能、容错率低的生产关键路径应等旗舰或直接用旗舰档，nano 仅宜简单执行单元。HN 热评（248 分帖）点破核心判断：powera「simple 任务 99% 够用」、BoumTAC「mini 发布比旗舰更能反映真实代际进步」、HugoDias 却因「性能疑似漂移」从 mini 迁回 Claude Haiku 4.5——它是一台「性价比正确」的机器，但生产环境要像 El Bruno 那样为质量门禁预留预算；2026-12 停用后轻量档位交接 Luna，新用户选型应直接评估 5.4 mini 或 Luna。

## 榜单与实测落差

榜单中端、体感两极：SWE-Bench Pro 45.7% 同级领先、AA 指数超中位数，但实测幻觉率 92%、r/GithubCopilot 称「worse than GPT-4.1」；根因是轻量架构压缩能力与期望错位（当降级备选超预期、当旗舰替代低预期），Vals.ai 多项 0.0% 疑为评测配置问题；Harness 视角拉大这种分化——Cursor 论坛与 Dre Dyson（73% 更少 token、94% 遵循、89% 样板一次到位）给出「超预期」证据，而 El Bruno 的 Copilot CLI 实测（$6.81 构建成功但质量门禁连环踩坑）与 OpenHands 官方评测基建故障（issue #239 三次 404/503 取消）则提示「跑分缺失≠能力缺失、能跑≠能交付」；缓解靠高质量 prompt（Tau² 重写 +22%）与按场景选 mini/nano。
