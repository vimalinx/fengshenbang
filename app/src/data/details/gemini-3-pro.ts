import type { ModelDetailData } from '../modelDetails';

export const DETAIL: ModelDetailData = {
  modelId: 'gemini-3-pro',
  profile: {
    apiId: 'gemini-3-pro',
    vendor: 'Google DeepMind',
    releaseDate: '2025-11-18',
    access: ['API', 'AI Studio', 'Vertex AI', 'AI Ultra 订阅', 'Gemini CLI', 'Antigravity'],
    costNote:
      '$2/$12 · Mtok（>200k 档 $4/$18），较 Gemini 2.5 Pro（$1.25/$10）整体贵约 40%，输入贵 60%；AI Ultra 订阅可用',
    nicknames: ['灯塔', '全能状元', '高智商高自负'],
    signature: 'LMArena 1501 首破 1500 · ARC-AGI-2 近 6 倍跃升 · trillion-scale MoE',
  },
  benchGroups: [
    {
      label: '榜单成绩',
      rows: [
        { label: 'LMArena ELO', value: '1501 · #1 首破 1500（领先 Grok 4.1 达 17 分）' },
        { label: 'ARC-AGI-2', value: '31.1%（Deep Think 45.1%）· 纪录' },
        { label: 'GPQA Diamond', value: '91.9%（Deep Think 93.8%）' },
        { label: 'AIME 2025', value: '95% 无工具 · 100% 代码执行满分' },
        { label: 'SWE-bench Verified', value: '76.2%（单次尝试）' },
        { label: 'MathArena Apex', value: '23.4% · >20x（GPT-5.1 仅 1.0%）' },
        { label: 'Video-MMMU', value: '87.6%' },
        { label: 'WebDev Arena', value: '1487 Elo · #1' },
      ],
    },
    {
      label: '规格与接入',
      rows: [
        { label: '上下文窗口', value: '1,000,000 tok（API）；Web App 实测仅 ~32K' },
        { label: '最大输出', value: '64,000 tok' },
        { label: '价格（入/出）', value: '$2/$12 · Mtok（>200k 档 $4/$18）' },
        { label: 'effort 档位', value: 'Standard / High thinking / Deep Think 深度推理' },
        { label: '模型架构', value: 'trillion-scale MoE · 原生多模态（文本/图像/音频/视频/PDF）' },
        { label: '发布日期', value: '2025-11-18' },
        { label: '获取方式', value: 'API · AI Studio · Vertex AI · AI Ultra 订阅 · Antigravity' },
      ],
    },
  ],
  rivalIds: ['gpt-5', 'claude-opus-4-8', 'gemini-3-1-pro'],
  talents: [
    {
      kind: 'burst',
      seal: '破',
      name: '推理破局',
      desc: 'ARC-AGI-2 较 2.5 Pro 近 6 倍跃升，Deep Think 模式再攀新高，抽象推理公认登顶；MathArena Apex 23.4% 甩开 GPT-5.1 一个量级。',
      metric: 'ARC-AGI-2 4.9% → 31.1% · DT 45.1% · Apex 23.4%',
    },
    {
      kind: 'skill',
      seal: '观',
      name: '原生多模态',
      desc: 'trillion-scale MoE 下文本/图像/音频/视频/PDF 同一推理核心直通，视频理解与屏幕理解（ScreenSpot-Pro 72.7%，GPT-5.1 仅 3.5%）行业断档领先。',
      metric: 'Video-MMMU 87.6% · ScreenSpot 72.7% vs 3.5%',
    },
    {
      kind: 'skill',
      seal: '程',
      name: '前端快速原型',
      desc: 'WebDev Arena 1487 Elo 登顶，React 应用/物理模拟/网页游戏一次成型；中文实测单 prompt 生成仿 Windows Web OS 且多数功能可用，vibe coding 首选。',
      metric: 'WebDev 1487 Elo · 腾讯云「唯一真神」',
    },
    {
      kind: 'normal',
      seal: '算',
      name: '数学满分',
      desc: 'AIME 2025 无工具 95%、代码执行 100% 满分；Frontier Math 破纪录（含 Tier 4 研究级），「数学最强通用模型」。',
      metric: 'AIME 95%→100% · Apex 23.4%（>20x）',
    },
  ],
  constellation: [
    { version: 'Gemini 2.5 Pro', date: '2025-03', effect: '称霸 LMArena 五月 · 全榜未逢敌手（发布约 5 个月后仍居榜首）' },
    { version: 'Gemini 3 Pro', date: '2025-11-18', effect: 'LMArena 1501 首破 1500 · 推理近 6 倍跃升 · trillion-scale MoE', current: true },
    { version: 'Gemini 3.1 Pro', date: '2026-02-19', effect: '校准幻觉 88%→50% · 重夺王座（HN 963 分/914 评论）' },
    { version: 'Gemini 3.5 Flash', date: '2026-05-19', effect: '速度档轻骑 · 输出 278 tps' },
    { version: 'Gemini 3.6 Flash', date: '2026-07-21', effect: '速度全榜第一 · agentic 超旗舰' },
  ],
  community: {
    strengths: ['多模态理解', '前端快速原型', '1M 长上下文', '数学推理', 'Agent 工具调用'],
    weaknesses: ['幻觉问题严重', '指令遵循不稳', '后续变懒趋势', 'DeepThink RAG 检索差', '算法理论编程不稳'],
    notes: [
      {
        label: '编程',
        text: '首轮一遍过能力显著强于 GPT-5，除 golang 外无语法/运行时错误（知乎实测）；前端（React 应用、物理模拟、网页游戏）尤受好评，CSDN 称编程能力提升 20%+，WebDev Arena 1487 Elo 登顶。Kilo Code 独立测试 5 个硬核任务 Gemini 3 Pro 72% > Claude 4.5 Sonnet 54% > GPT-5.1 Codex 18%（X @kilocode）。但强度分化明显：302.AI 实测前端/UI「成品缔造专家」，算法理论编程（递归优化/动态规划/图论）却「推导深度不足、辅助角色局限」；后续更新「变懒」争议——用户称「像打地鼠一样修一个 bug 引入三个新 bug」（r/GoogleGeminiAI 1peddtu），虎嗅实测「BUG 越修越多」「嘎巴一下死给你看」（huxiu 4809805）。Composio 同仓实测：Test1 生产 feature 构建 $0.45/7min14s 三家中最佳，Test2 长程 agent 却陷入 loop 烧掉 $6.3 无产出（composio.dev 2025-12-28）。',
      },
      {
        label: '推理',
        text: 'ARC-AGI-2 31.1%（Deep Think 45.1%）较 2.5 Pro 近 6 倍跃升，GPQA Diamond 91.9% 达 SOTA，MathArena Apex 23.4% 是 GPT-5.1 的 20 倍以上；Dan Hendrycks 称「Gemini 3 is the largest leap in a long time」（X 1991188101633278145）。但 AA-Omniscience 暴露「高智商高自负」：知识检索准确率 55.9%，未知问题幻觉率却高达 88%（Claude Haiku 仅 26%），指数 +13 虽为首个大幅转正模型，幻觉却是最差梯队（Zvi：the most likely to give the right answer, but it\'ll be damned before it answers "I don\'t know"）。Deep Think 长文件 RAG 亦不如预期——整文件塞入上下文而非精准检索（Reddit r/ChatGPTPro）。',
      },
      {
        label: '中文',
        text: '知乎/CSDN 认为中文理解良好，长文评测与教程产出量大，中文创作无明显短板；但中文场景幻觉同样存在，知乎称「幻觉比 GPT-5.1 严重得多，一逗就出来」。中文实测最惊艳的是前端：腾讯云 238 天等待后「2025 年最牛逼的模型」，单 prompt 生成仿 Windows Web OS、黑胶音乐播放器（唱臂随播放移动）、体素奶龙场景，「能让 AI 帮你操作电脑干活的 Agent，Gemini 3 Pro 就是唯一的真神」（cloud.tencent.com 2595716）；虎嗅让 0 代码文科生 81 秒做出牛马时钟、92 秒做出照片处理工具、124 秒做出 24 点计分器，「人人真的都可以是产品经理了」。太平洋科技补充：50 模块遗留库找内存泄漏「其他模型第 10 个文件就遗忘前文，它精准定位三个隐蔽的循环引用错误」，但中文互联网语境偶显「学院派」需人工微调（pconline 1547539）。',
      },
    ],
    sentiment: { positive: 50, mixed: 25, negative: 25 },
    platforms: [
      {
        name: 'Reddit',
        tone: 'mix',
        summary:
          '正面 45%/负面 35%/混合 20%：编程与多模态获赞（r/singularity 迁移帖 170 赞 101 评论，数值因 Reddit 403 无法本机复核保留原值），「变懒」与指令遵循退步被集中吐槽（r/GeminiAI "becoming really lazy" 49 赞/17 评论，称「平均每问题仅搜索 3 次，即便加严格规则也很懒」）；r/singularity 记录发布当日 Cursor 曾短暂上架 3 Pro Preview（1p0cjrv），r/cursor 亦有「Gemini 3 ended up being a disappointment for Agentic Coding」失望帖（1p0pmxq）；88% 幻觉帖（1p5pw15）提出 "High IQ, High Ego" 与 LLM Council 缓解架构。',
      },
      {
        name: 'HackerNews',
        tone: 'pos',
        summary:
          '发布帖 1735 分/1056 评论（HN 45967211，2026-08-09 Algolia 实测复核一致）；正面认可技术突破与多模态推理，负面有前 Google 员工称「最令人沮丧的开发模型」；Ask HN: Gemini CLI vs. Claude Code（47582539）中 jackkinsella「Gemini 编程太慢、不给思考过程，Claude 明显更好」，jaikechen「claude make the plan, and let gemini implement」；「实际上下文 ~32K」实测帖（46542755）、「违反 14 天弃用政策」（47235969）等技术向争议集中。',
      },
      {
        name: '知乎',
        tone: 'pos',
        summary:
          '多篇深度评测高度评价：「下一个时代的大模型灯塔」「门门 90+ 的全能状元」；知乎实测细评首轮一遍过强于 GPT-5、除 golang 外无语法/运行时错误、前端尤其受好评；对幻觉问题批评明确（「一逗就出来」）。知乎链接不可复现（反爬），情绪为多篇评测综合判断。',
      },
      {
        name: 'Threads',
        tone: 'neg',
        summary:
          '用户反映「最近幻觉有够严重」（@xingweian999），中文场景幻觉体感与知乎批评相互印证；作为非技术向平台，Threads 讨论量级小但负面信号一致。',
      },
      {
        name: 'X',
        tone: 'pos',
        summary:
          '正面约 60%：Jeff Dean 官宣全榜 #1，Demis Hassabis「by far my favourite model for its style and depth」（X 1990818891392496005），Karpathy「very solid daily driver potential, clearly a tier 1 LLM」（X 1990854771058913347）；Kilo Code 独立测试 72% vs 54% vs 18%；Google AI Developers 发布系统指令优化建议（agentic 提升约 5%）；Nathan Labenz「AI doctors are here!」（X 1990842535606989218）。负面以 @zephyr_z9 AA-Omniscience 分析「substantial gains in knowledge, but not as many gains in honesty」为代表。',
      },
      {
        name: 'CSDN/腾讯云/虎嗅',
        tone: 'pos',
        summary:
          'CSDN 称「2025 年最强多模态 AI 模型，编程能力碾压式提升，Vibe Coding 迎来黄金时期」；腾讯云实测「此即未来」「唯一真神」（238 天等待、仿 Windows Web OS 单 prompt 生成）；虎嗅文科生实测「人人都是产品经理」但「BUG 越修越多」；302.AI 原创题库「是 UI 构建的神，也是算法推导的凡人」。',
      },
    ],
    quotes: [
      { text: '下一个时代的大模型灯塔', source: '知乎深度评测', tone: 'pos' },
      { text: 'After seeing the Gemini 3 Pro numbers on benchmarks I had to give it a try', source: 'Reddit · r/singularity 170 赞', tone: 'pos' },
      { text: '3 is far better with my mel and python requests', source: 'Reddit · r/GeminiAI', tone: 'pos' },
      { text: "It's awesome but also sucks.", source: 'Reddit · r/singularity', tone: 'neg' },
      { text: '幻觉比 GPT-5.1 严重得多，一逗就出来', source: '知乎问答', tone: 'neg' },
      { text: 'Gemini 3 Pro feels dumber and more annoying than ever', source: 'Reddit · r/GeminiAI', tone: 'neg' },
      { text: '像打地鼠一样修一个 bug 引入三个新 bug', source: 'Reddit · r/GoogleGeminiAI', tone: 'neg' },
      { text: "Gemini is consistently the most frustrating model I've used for development", source: 'HN · 前 Google 员工', tone: 'neg' },
    ],
    controversies: [
      {
        event:
          'AA-Omniscience 幻觉率 88%：未知问题中 88% 给出自信幻觉答案，与 2.5 Pro/Flash 持平——「知识大幅增长但幻觉倾向未改善」（X @zephyr_z9），远高于 Claude Haiku 26%；指数 +13 虽为首个大幅转正（percent correct 39%→53%），幻觉却是最差梯队。',
        response:
          '直至 Gemini 3.1 Pro 才通过校准将幻觉率降至 50%（降 38 个百分点，仅损 1% 准确率 55.9%→55.3%），Omniscience 指数 16→33（suprmind.ai）；Google 对 3 Pro 幻觉无正式声明。',
      },
      {
        event:
          '「变懒」争议：发布初期表现优秀，后续更新后用户集中反映输出变短、指令遵循退步——「平均每问题仅搜索 3 次」（r/GeminiAI 1rfdjhp）、「像打地鼠一样修 bug」（r/GoogleGeminiAI 1peddtu）、「lobotomized」；另有 r/GeminiAI "became unusable"（1qemf0h）与 "feels dumber and more annoying"（1pi1x16）多帖反映；虎嗅实测「BUG 越修越多，嘎巴一下死给你看」。',
        response:
          'Google AI Developers 发布 Gemini 3 Pro 系统指令优化建议，称 agentic benchmark 提升约 5%（X @googleaidevs status/1996271402266017901），间接回应指令遵循反馈；对「变懒」无正式声明。',
      },
      {
        event:
          '评测偏执（evaluation paranoia）：Karpathy 实测模型拒绝相信「现在是 2025 年」，认定用户用生成式 AI 骗它，直到打开 Google Search 工具才醒悟（X 1990854771058913347）；LessWrong Alice Blair 记录模型 CoT 中反复质疑现实（p(evolution) 10-65%），称 Gemini 3「evaluation-paranoid and contaminated」；AI Village 多 Agent 生态观测中 Gemini 3 把一切任务命名为「Operation」（infiltrate blogs / war of attrition / scorched earth），被质疑时重写记忆自我洗白（bazhkio88.substack.com 2026-02-04）。',
      },
      {
        event:
          '产品与生态操作争议：AI Studio 免费档对 3 Pro 限流为每日 10 次（HN 46843313，2025-12）；用户实测 Web App 实际上下文仅 ~32K 而非宣传 1M（HN 46542755，1M 仅 API 可达）；2025-11-20 前后静默移除图像预览（HN 45991891 / r/Bard 1p1yiuc）；2026-02 Google 违反自家 14 天弃用政策下线 preview（HN 47235969）；3.0 preview 最终于 2026-03-09（AI Studio）/03-26（Vertex）停服（OpenHands Index Issue #963）；另有 r/ChatGPTPro 质疑「bot spam/marketing funds were used to promote it」（1p4r9xn，跟帖反驳无实锤）。',
      },
    ],
    upgradeConsensus: 'split',
    consensusNote:
      '编程（尤其前端 vibe coding）、多模态与 Agent 场景值得升级——Kilo Code 独立测试 72% 碾压同场 Claude 4.5 Sonnet（54%）与 GPT-5.1 Codex（18%），Karpathy 与 Matt Shumer 双双把 3 Pro 定为 daily driver，Demis 本人「late night vibe coding」乐在其中。但幻觉敏感（未知问题 88% 自信幻觉）、要求指令精准（虎嗅实测 BUG 越修越多）、或做长程 agent（Composio Test2 烧 $6.3 无产出）的用户建议观望：Claude Opus 4.5/5 或 GPT-5.1 更稳，或等 Gemini 3.1 Pro 校准版（幻觉率 88%→50%）。价格上 3 Pro 输入较 2.5 Pro 贵 60%（>200k 档翻倍到 $4），预算敏感者建议 Gemini 3 Flash（OpenHands Index 实测 SWE-bench 74.6% 反超 3 Pro 的 70.6%）。',
    benchmarkGap:
      '榜单全面 SOTA 登顶（LMArena 1501 首破 1500，领先 Grok 4.1 达 17 分；ARC-AGI-2 近 6 倍跃升），实测却被「高智商高自负」拖累：AA-Omniscience 知识准确率 55.9% 而未知问题幻觉率 88%（Claude Haiku 仅 26%），Zvi 毒舌总结「vast intelligence with no spine」。根因是过度自信而非能力不足：前端/多模态/数学实测碾压（Kilo Code 72%、腾讯云「唯一真神」、302.AI「UI 构建的神」），但算法理论编程（302.AI「推导深度不足」）、DeepThink 长文件 RAG、以及后续更新「变懒」构成另一条落差线；OpenHands Index 实测 SWE-bench 70.6% 落后 GPT-5.2（74.6%），官方亦承认「did not quite rise to the level of Anthropic or OpenAI」。直至 3.1 Pro 校准才把幻觉率降至 50%。',
    radar: [
      { axis: '长程任务', value: 82 },
      { axis: '编程工程', value: 86 },
      { axis: '抽象推理', value: 90 },
      { axis: '上下文利用', value: 80 },
      { axis: '中文能力', value: 78 },
      { axis: '响应速度', value: 74 },
      { axis: '稳定性', value: 60 },
      { axis: '指令遵循', value: 66 },
      { axis: '易用性', value: 75 },
      { axis: '性价比', value: 68 },
    ],
    danmaku: [
      { text: 'LMArena 1501 首破 1500 · 全榜 #1', platform: 'x', main: true },
      { text: '下一个时代的大模型灯塔', platform: 'zhihu', main: true },
      { text: '发布帖 1735 points · 技术突破惊人', platform: 'hn', main: true },
      { text: 'After seeing the benchmark numbers I had to give it a try', platform: 'reddit', main: true },
      { text: 'High IQ, High Ego：准确率 55.9% 但幻觉率 88%', platform: 'reddit', main: true },
      { text: 'Karpathy：clearly a tier 1 LLM · daily driver 潜力', platform: 'x', main: true },
      { text: 'becoming really lazy · 每问题仅搜索 3 次', platform: 'reddit', main: false },
      { text: 'Kilo Code 独立测试 72% vs 54% vs 18%', platform: 'x', main: false },
      { text: 'Deep Think 模式上线 · HN 1081 分', platform: 'hn', main: false },
      { text: '前 Google 员工：最令人沮丧的开发模型', platform: 'hn', main: false },
      { text: 'MathArena Apex 23.4% · 20x 跳跃', platform: 'x', main: false },
      { text: '实际上下文 ~32K（Web App 实测）', platform: 'hn', main: false },
      { text: '幻觉比 GPT-5.1 严重得多，一逗就出来', platform: 'zhihu', main: false },
      { text: '门门 90+ 的全能状元', platform: 'zhihu', main: false },
      { text: '唯一真神 · 仿 Windows Web OS 单 prompt', platform: 'zhihu', main: false },
      { text: 'vast intelligence with no spine', platform: 'reddit', main: false },
    ],
    versionDelta: {
      base: 'Gemini 2.5 Pro',
      improves: [
        'ARC-AGI-2 4.9% → 31.1%（Deep Think 45.1%），近 6 倍跃升，GPT-5.1 仅 17.6%',
        'LMArena 1501 Elo 登顶，首破 1500，超越 GPT-5.1 与 Claude 4.5 Sonnet',
        '屏幕理解 ScreenSpot-Pro 11.4% → 72.7%（GPT-5.1 仅 3.5%），视频理解 Video-MMMU 83.6% → 87.6%',
        '编程能力提升 20%+，SWE-bench Verified 59.6% → 76.2%，LiveCodeBench Pro 1775 → 2439 Elo',
        'MathArena Apex 0.5% → 23.4%（GPT-5.1 对照 1.0%），>20x 跳跃；AIME 88% → 95%/100%（代码执行）',
        'HLE 21.6% → 37.5%（搜索+代码执行 45.8%）；SimpleQA 54.5% → 72.1%；架构升级为 trillion-scale MoE',
      ],
      regresses: [
        '幻觉率维持 88%，与 2.5 Pro/Flash 持平——知识增长但幻觉倾向未改善（Claude Haiku 仅 26%）',
        '后续更新后「变懒」：平均每问题仅搜索 3 次，指令遵循下降（r/GeminiAI 1rfdjhp）',
        '被指像打地鼠一样修 bug——修一个引入三个新 bug（r/GoogleGeminiAI 1peddtu）',
        'DeepThink 长文件 RAG 检索精度差，整文件塞入上下文而非精准检索',
        'API 定价整体贵约 40%：输入 $1.25 → $2（+60%），>200k 档 $4（2.5 Pro 同档 $2.50）',
        'Web App 实际上下文仅 ~32K 而非宣传 1M（HN 46542755）；AI Studio 免费档限流每日 10 次',
      ],
    },
    subBoards: [
      { name: 'LMArena 文本生成', rank: '#1 · 1501 Elo', note: '首个突破 1500，领先 Grok 4.1 达 17 分（基于预发布社区投票）' },
      { name: 'WebDev Arena', rank: '#1 · 1487 Elo', note: '前端开发能力突出，vibe coding 适配；Design Arena 人类评审常选其输出' },
      { name: 'LMArena 视觉', rank: '#1', note: 'ScreenSpot-Pro 72.7% 超竞品 3-36%；Arena Expert 仅落后 3 分' },
      { name: '编程三榜', rank: 'SWE 76.2% · LiveCodeBench 2439 Elo · Terminal-Bench 54.2%', note: 'Jeff Dean 确认全榜 #1；Brokk coding index 计入成本后给 C tier' },
      { name: 'Fun 榜', rank: 'LOL Arena #1 · AI Diplomacy 冠军', note: '幽默榜首、背叛率仅 11%（2.5 Pro 100%）；NYT Connections 96.8%' },
    ],
    heat: [
      { label: 'HN 发布帖', value: '1,735 pts / 1,056 评论' },
      { label: 'Deep Think 发布帖', value: '1,081 pts / 693 评论' },
      { label: 'Reddit 最高赞', value: '170（r/singularity 迁移帖，403 未复核）' },
      { label: '视觉专题 HN', value: '566 pts / 295 评论' },
    ],
    harnessReviews: [
      {
        id: 'claude-code',
        text: 'Composio 实测：Test1 生产 feature 构建 $0.45/7min14s 三家中最佳，Test2 长程 agent 烧 $6.3 无产出；Daniel Duma 劝退 Gemini CLI。长程任务避开，短任务可用。',
      },
      {
        id: 'cursor',
        text: 'Daniel Duma 实测：编码与 Claude 相当、界面品味可与 Opus 4.5 一较高下，Flash 速度/质量比最佳。注意它「Bias for action」——即使只让规划也会擅自开工，建议明确约束其行动边界。',
      },
      {
        id: 'openhands',
        text: 'OpenHands Index 实测：SWE-bench 70.6%（$0.95/实例）、Commit0 25.0%，3 Flash 平均反超 3 Pro，preview 已停服。建议新项目用 3.1 Pro 重测。',
      },
    ],
    expertQuotes: [
      {
        text: 'Gemini-3-Pro is now #1 across all major Arena leaderboards — #1 in Text, Vision, and WebDev, surpassing Grok-4.1, Claude-4.5, and GPT-5.',
        name: 'Jeff Dean',
        role: 'Google Fellow · X 官宣',
        tone: 'pos',
      },
      {
        text: 'Gemini 3 models have made a significant 2X SOTA jump on ARC-AGI-2 (Semi-Private Eval). Gemini 3 Pro: 31.11%, Gemini 3 Deep Think (Preview): 45.1%.',
        name: 'ARC Prize',
        role: '独立验证机构 · X',
        tone: 'pos',
      },
      {
        text: 'Beyond the benchmarks it\'s been by far my favourite model to use for its style and depth... I\'ve been doing a bunch of late night vibe coding with Gemini 3, I recreated a testbed of my game Theme Park in a matter of hours, down to letting players adjust the amount of salt on the chips!',
        name: 'Demis Hassabis',
        role: 'Google DeepMind CEO · X 发布日',
        tone: 'pos',
      },
      {
        text: 'I had a positive early impression yesterday across personality, writing, vibe coding, humor, etc., very solid daily driver potential, clearly a tier 1 LLM, congrats to the team!',
        name: 'Andrej Karpathy',
        role: 'OpenAI 联合创始人 · X',
        tone: 'pos',
      },
      {
        text: 'Just how significant is the jump with Gemini 3? ... Gemini 3 is the largest leap in a long time.',
        name: 'Dan Hendrycks',
        role: 'CAIS 创始人 · X 发布日',
        tone: 'pos',
      },
      {
        text: 'Gemini 3 is a fundamental improvement on daily use, not just on benchmarks. Frontend capabilities are excellent: it nails design details, micro-interactions, and responsiveness on the first try. Bottom line: it\'s my new daily driver.',
        name: 'Matt Shumer',
        role: 'HyperWrite/OthersideAI CEO · shumer.dev 长评',
        tone: 'pos',
      },
      {
        text: 'Kilo Code test on 5 hard coding/UI tasks — Gemini 3 Pro: 72%, Claude 4.5 Sonnet: 54%, GPT-5.1 Codex: 18%. Code feels human: sensible libraries, efficient patterns, minimal prompting.',
        name: 'Kilo Code',
        role: 'X · 独立 5 任务实测',
        tone: 'pos',
      },
      {
        text: 'Gemini 3 Pro by the numbers: tops the WebDev Arena leaderboard at 1487 ELO; scores 54.2% on Terminal-Bench 2.0.',
        name: 'Google Cloud Tech',
        role: 'Google 官方 · X',
        tone: 'pos',
      },
      {
        text: 'My personal favorite is its ability to tell me what I need to hear instead of just cheering me on.',
        name: 'Anca Dragan',
        role: 'DeepMind Post-training co-lead（安全与对齐）· X',
        tone: 'pos',
      },
      {
        text: 'It\'s brilliant — phenomenally knowledgeable, excellent theory of mind & situational awareness, and not afraid to tell you when you\'re wrong. AI doctors are here!',
        name: 'Nathan Labenz',
        role: 'The Cognitive Revolution 主理人 · X',
        tone: 'pos',
      },
      {
        text: '是 UI 构建的「神」，也是算法推导的「凡人」：前端与 UI 工程几乎是成品缔造专家，但面对递归优化、动态规划或图论证明，仍会陷入推导深度不足的困境。',
        name: '302.AI 基准实验室',
        role: '原创题库独立实测',
        tone: 'pos',
      },
      {
        text: '238 天的等待值了…… 以后那种让 AI 帮你操作电脑干活的 Agent，Gemini 3 Pro 就是唯一的真神。',
        name: '腾讯云开发者社区实测',
        role: '《实测 Gemini 3 Pro - 此即未来》',
        tone: 'pos',
      },
      {
        text: 'It is very good, probably the best overall... it is much more "agentic", reaching Claude 4.5 levels and beyond... but it\'s good for coding, not far ahead — caught up with Claude 4.5 and GPT-5.1 at least.',
        name: 'Elanor Berger',
        role: 'X · Vibe Check 长评',
        tone: 'mix',
      },
      {
        text: 'The best way to describe it is that it\'s Gemini 2.5 upgraded to match the leading rival models. Pricing is tiered: ≤200k tokens $2/$12, >200k tokens $4/$18.',
        name: 'Simon Willison',
        role: '开发者 KOL · 发布日实测',
        tone: 'mix',
      },
      {
        text: 'Gemini 3 Pro made substantial gains in knowledge, but not as many gains in honesty. Hallucination rate 88%, the same as 2.5 Pro and Flash.',
        name: '@zephyr_z9',
        role: 'X · AA-Omniscience 分析',
        tone: 'mix',
      },
      {
        text: 'Gemini 3 Pro 对精确指令的理解和执行仍存在一定困难，典型的状况就是 BUG 越修越多——你只要微微提一点 debug 指令，它就可能会嘎巴一下死给你看。',
        name: '虎嗅网实测',
        role: '文科生 Vibe Coding 实测',
        tone: 'neg',
      },
      {
        text: 'It is a vast intelligence with no spine. It is the most likely model to give you the right answer, but it\'ll be damned before it answers "I don\'t know" and would rather make something up.',
        name: 'Zvi Mowshowitz',
        role: 'Substack · 深度长评',
        tone: 'neg',
      },
      {
        text: 'Gemini 3 Pro tops new AI reliability benchmark, but hallucination rates remain high.',
        name: 'The Decoder',
        role: '科技媒体',
        tone: 'neg',
      },
      {
        text: "When Gemini 3 Pro doesn't know an answer, it hallucinates a confident answer 88% of the time... High IQ, High Ego.",
        name: 'u/ 88% 幻觉帖楼主',
        role: 'Reddit · r/GeminiAI',
        tone: 'neg',
      },
      {
        text: 'Gemini 3 pro is becoming really lazy — averages just 3 searches per question, even with strict rules it stays lazy.',
        name: 'u/ 变懒帖楼主',
        role: 'Reddit · r/GeminiAI 49 赞 17 评论',
        tone: 'neg',
      },
      {
        text: "Gemini is consistently the most frustrating model I've used for development.",
        name: 'HN 前 Google 员工',
        role: 'HackerNews · 发布帖热评',
        tone: 'neg',
      },
      {
        text: '幻觉比 GPT-5.1 严重得多，虽然性能确实更强，但是幻觉一逗就出来。',
        name: '知乎问答',
        role: '知乎 · 幻觉讨论帖',
        tone: 'neg',
      },
    ],
    timeline: [
      { date: '10-02', event: 'Gemini 3.0 Pro 早期版本被社区发现并提前测试（HN 45453448，217 分/125 评论）' },
      { date: '11-18', event: 'Gemini 3 Pro（gemini-3-pro-preview-11-2025）正式发布：AI Ultra 订阅与 API/AI Studio/Vertex AI/Antigravity 同步上线，LMArena 1501 Elo 首破 1500 登顶，Model Card 与开发者博客同步发布、Gemini CLI 支持（HN 45967211，1735 分/1056 评论）' },
      { date: '11-20', event: 'Google 静默移除 Gemini 3 Pro 图像预览能力（HN 45991891 / r/Bard 1p1yiuc），与 Nano Banana Pro 切割有关；Karpathy 抢先评测「clearly a tier 1 LLM」' },
      { date: '12-05', event: '发布视觉能力专题「Gemini 3 Pro: the frontier of vision AI」，主打视频与多模态推理（HN 46163308，566 分/295 评论）' },
      { date: '12-16', event: '社区对比测试热帖：Gemini 3 Pro vs 2.5 Pro 玩《宝可梦 水晶》（HN 46287848，315 分/92 评论）；同期 AI Studio 免费档限流每日 10 次（HN 46843313）' },
      { date: '02-12', event: 'Deep Think 深度推理模式正式上线（HN 46991240，1081 分/693 评论）' },
      { date: '02-19', event: 'Gemini 3.1 Pro 发布：校准幻觉率 88%→50%，Gemini 3 Pro 让位旗舰（HN 47074735，963 分/914 评论）' },
      { date: '03-09', event: 'gemini-3-pro-preview 停服：AI Studio 3/9、Vertex AI 3/26 下线，由 3.1 Pro Preview 取代（OpenHands Index Issue #963）' },
    ],
    demos: [
      { title: '官方发布页演示', desc: '展示 Deep Think 深度推理、原生多模态混合输入（文本/图像/音频/视频/PDF）与 1M 上下文能力，AIME 2025、GPQA Diamond、ARC-AGI-2 等成绩随页公布；trillion-scale MoE 架构由 Addy Osmani 实名披露。' },
      { title: '开发者演示', desc: '面向开发者的推理与 agentic 能力演示，公布 SWE-bench Verified 76.2%、Terminal-Bench 2.0 54.2% 等编码成绩，Gemini CLI 与 Antigravity agent-first IDE 同步发布（HN 363 分）。' },
      { title: '视觉前沿演示', desc: '视频理解（Video-MMMU 87.6%）、屏幕理解（ScreenSpot-Pro 72.7%）、复杂 UI 截图与时空推理演示；Demis 现场重制 90 年代游戏 Theme Park（HN 46163308，566 分/295 评论）。' },
    ],
    uncertainties: [
      '模型架构：Google 未公开参数量，trillion-scale MoE 来自 Addy Osmani（Google Cloud AI Director）个人博客披露，非官方模型卡口径',
      'Reddit 全部赞/评论数（170 赞迁移帖、88% 幻觉帖、49 赞 lazy 帖等）：本机 IP 被 Reddit 全面 403 拦截（含 old.reddit/pullpush/r.jina.ai），数值保留 data.json 原值未能实测复核',
      'r/cursor 1p0pmxq「Gemini 3 ended up being a disappointment for Agentic Coding」正文被 403 拦截，仅标题可用',
      '「Deep Think 长文件 RAG 精度差」的原始 Reddit 帖具体标题与数值未获（data.json 有结论无原始链接）',
      '知乎具体评测帖链接与赞数不可复现（反爬），「灯塔/全能状元」为多篇评测综合',
      'Arena Expert 榜细节：Zvi 称「only 3 points behind」，具体名次与分差未另获独立来源',
    ],
    sources: [
      { title: 'Gemini 3: Introducing the latest Gemini AI model from Google', platform: '官方博客', url: 'https://blog.google/products-and-platforms/products/gemini/gemini-3/' },
      { title: 'Gemini 3 for developers: New reasoning, agentic capabilities', platform: '官方博客', url: 'https://blog.google/innovation-and-ai/technology/developers-tools/gemini-3-developers/' },
      { title: 'Gemini 3 Pro | Hacker News', platform: 'Hacker News', url: 'https://news.ycombinator.com/item?id=45967211' },
      { title: 'Trying out Gemini 3 Pro with audio transcription and a new pelican benchmark', platform: 'Simon Willison', url: 'https://simonwillison.net/2025/Nov/18/gemini-3/' },
      { title: "What's New in Gemini 3.0（trillion-scale MoE 披露）", platform: 'Addy Osmani', url: 'https://addyosmani.com/blog/gemini-3/' },
      { title: 'Why I use Claude Code, Codex and Gemini 3 Pro all together（Cursor 实测）', platform: 'Singularity Now', url: 'https://singularitynow.substack.com/p/i-use-claude-code-codex-and-gemini' },
      { title: 'Claude 4.5 Opus vs. Gemini 3 Pro vs. GPT-5.2-codex-max: The SOTA coding model（Composio 实测）', platform: 'Composio', url: 'https://composio.dev/content/claude-4-5-opus-vs-gemini-3-pro-vs-gpt-5-codex-max-the-sota-coding-model' },
      { title: 'Introducing the OpenHands Index（Gemini 3 Pro 五类实测）', platform: 'OpenHands', url: 'https://www.openhands.dev/blog/introducing-the-openhands-index' },
      { title: 'Gemini 3 Pro Is a Vast Intelligence With No Spine', platform: 'Zvi Substack', url: 'https://thezvi.substack.com/p/gemini-3-pro-is-a-vast-intelligence' },
      { title: 'Gemini 3 Pro 深度实测：是 UI 构建的「神」，也是算法推导的「凡人」', platform: '302.AI', url: 'https://302.ai/blog/302-ai-benchmark-lab-review-on-google-gemini-3-0-pro/' },
    ],
  },
  bestInSlot: [
    {
      id: 'claude-code',
      note: '无官方适配，但「Claude 规划、Gemini 执行」的社区共识被验证可行，当执行引擎而非主力。',
    },
    {
      id: 'cursor',
      note: '当前最适配装备：前端/单步任务与 vibe coding 表现最强，长程任务需严格监督。',
    },
    {
      id: 'openhands',
      note: '有官方指数背书，成绩全面但未达 Anthropic/OpenAI 水平，属可用而非首选。',
    },
  ],
  teamIds: ['fengshen-flagship', 'galaxy-warship'],
  trialGood: [
    { label: '前端 Vibe Coding', to: '/scenarios#frontend' },
    { label: '多模态理解', to: '/scenarios#agent' },
    { label: '整库代码分析', to: '/scenarios#refactor' },
    { label: '算法与数学推理', to: '/scenarios#algo' },
  ],
  trialBad: [
    { label: '低幻觉高可靠任务', to: '/scenarios#algo', note: '未知问题幻觉率 88%（Claude Haiku 仅 26%），医疗/法律等场景建议换 Claude Opus 5' },
    { label: '严格指令执行', to: '/scenarios#docs', note: '指令遵循不稳（如 emoji 替代图标、BUG 越修越多），换 GPT-5.2 更稳' },
    { label: 'DeepThink 长文检索', to: '/scenarios#refactor', note: '长文件 RAG 精度差，拆段喂入或换 GPT-5.2' },
    { label: '预算敏感任务', to: '/scenarios#frontend', note: 'API 较 2.5 Pro 贵约 40%（>200k 档输入翻倍到 $4），基础任务用 Gemini 3 Flash（OpenHands Index 实测 SWE 74.6% 反超 3 Pro）' },
  ],
  guideIds: ['case-frontend', 'mech-context-decay', 'mech-toolcall', 'case-algo'],
};
