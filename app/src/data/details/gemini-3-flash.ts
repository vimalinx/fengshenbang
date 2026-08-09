import type { ModelDetailData } from '../modelDetails';

export const DETAIL: ModelDetailData = {
  modelId: 'gemini-3-flash',
  profile: {
    apiId: 'gemini-3-flash-preview',
    vendor: 'Google DeepMind',
    releaseDate: '2025-12-17',
    access: ['API', 'Google AI Studio', 'Gemini CLI', 'Antigravity 内置', 'Vertex AI', 'Gemini App 默认'],
    costNote:
      '$0.50/$3.00 · Mtok，仅为 3 Pro 的四分之一（官方）；但较上代 2.5 Flash（$0.30/$2.50）输入价 +66.7%、输出 +20%，被批「Flash 涨价第一枪」；缓存读 0.1×，AI Studio 免费层可玩',
    nicknames: ['普惠核弹', '王炸', '小 Pro', '谷歌版 Sonnet 前身'],
    signature: 'SWE-bench 78% 反超自家 3 Pro · 轻量反杀旗舰',
  },
  benchGroups: [
    {
      label: '榜单成绩',
      rows: [
        { label: 'SWE-bench Verified', value: '78.0% · 超 Gemini 3 Pro' },
        { label: 'GPQA Diamond', value: '90.4%' },
        { label: 'MMMU Pro', value: '81.2%' },
        { label: "Humanity's Last Exam", value: '33.7%' },
        { label: 'AIME 2025', value: '95.2%' },
        { label: 'LMArena Elo', value: '1477 · #3' },
        { label: '速度', value: '3x 于 2.5 Pro' },
        { label: 'Token 效率', value: '较 2.5 Pro 省 30%' },
      ],
    },
    {
      label: '规格与接入',
      rows: [
        { label: '上下文窗口', value: '1,000,000 tok' },
        { label: '最大输出', value: '65,536 tok（64K）' },
        { label: '价格（入/出）', value: '$0.50 / $3.00 · Mtok' },
        { label: 'thinking 档位', value: 'minimal / low / medium / high' },
        { label: '模型架构', value: '基于 Gemini 3 Pro（参数未披露）' },
        { label: '发布日期', value: '2025-12-17' },
        { label: '获取方式', value: 'API · AI Studio · CLI · Antigravity · Vertex' },
      ],
    },
  ],
  rivalIds: ['gemini-3-6-flash', 'deepseek-v4-flash', 'claude-haiku-4-5'],
  talents: [
    {
      kind: 'burst',
      seal: '破',
      name: '轻量反杀',
      desc: 'Flash 定位却反超旗舰：SWE-bench Verified 78% 压过 Gemini 3 Pro 的 76%，MMMU Pro 81.2% 与 Pro 并驾齐驱——「参数越小，智商越高」成社区热梗。',
      metric: 'SWE 78% > 3 Pro 76% · MMMU 81.2%',
    },
    {
      kind: 'skill',
      seal: '速',
      name: '闪电出稿',
      desc: '官方「3x 于 2.5 Pro」+ 典型流量省 30% token，Antigravity 近实时更新生产应用；社区实测 50-80ms 首字延迟，速度档位中的性价比之王。',
      metric: '3x 提速 · -30% token · 毫秒级首字',
    },
    {
      kind: 'skill',
      seal: '程',
      name: 'Agentic 编程',
      desc: '为 agentic workflow 而生：官方定位「most impressive model for agentic workflows」，100+ 并发工具调用，SWE-bench 78% 反超 3 Pro 的核心场景。',
      metric: 'SWE-bench 78% · 100+ 并发工具',
    },
    {
      kind: 'passive',
      seal: '视',
      name: 'Agentic Vision',
      desc: '2026-01-27 上线的视觉推理增强：结合代码执行放大、检查、操作图像后再作答，把「看图」从被动感知变成主动查证。',
      metric: 'MMMU Pro 81.2% · 视觉+代码执行',
    },
  ],
  constellation: [
    { version: 'Gemini 2.5 Flash', date: '2025-06', effect: '性价比神教 · 一代口碑之作' },
    { version: 'Gemini 3 Flash', date: '2025-12', effect: 'SWE 78% 反超 Pro · 普惠核弹', current: true },
    { version: 'Gemini 3.1 Flash-Lite', date: '2026-02', effect: '轻量提速 · Terminal-Bench 31%→54%' },
    { version: 'Gemini 3.5 Flash', date: '2026-05', effect: 'I/O 首发 · 输出 278 tps' },
    { version: 'Gemini 3.6 Flash', date: '2026-07', effect: '输出省 17% · 长文检索翻倍' },
  ],
  community: {
    strengths: ['轻量反超旗舰', 'Agentic 编程', '生成速度', '1M 长上下文', '性价比'],
    weaknesses: ['幻觉率高', '不确定性感知弱', '价格涨价争议', '区域限制', 'High 档 token 滥用'],
    notes: [
      {
        label: '编程',
        text: '最大亮点：SWE-bench Verified 78% 官方自报，第三方 Medium 四模型横评独立复现 78.0%（Claude Opus 4.5 80.9%、GPT-5.2 80.0% 紧随）——反超自家 3 Pro 的 76%；知乎 302.AI 实测前端网页复刻「三组当中最还原」，玻璃拟态+视差细节发挥好，但圣诞沙盒编辑器「代码质量不如 3 Pro」；r/GithubCopilot「Gemini 3 Flash (Preview) is really impressive」称「慢慢取代我的 daily driver」；OpenAI 自家 ChatGPT 源码流出被扒出 FAST_MODEL="google/gemini-3-flash"（HN 评论 pranshuchittora 实证），是闭源巨头也选它当快路径的硬证据。',
      },
      {
        label: '推理',
        text: '博士级推理达标：GPQA Diamond 90.4%、HLE 33.7% 无工具（官方），AIME 2025 95.2%；但知乎 302.AI 逻辑推理 10 题「丁，南京」应为「丁，北京」部分推断错误，社区评价「快但深度不如 Pro」；thinking levels 四档（minimal/low/medium/high）是发布亮点，medium 档在发布时仅 3.1 Pro 与 3 Flash 独有；中文评测观察到 high 档「接近一半问题输出跑到 64K 上限」，明显可用更低 token 回答却跑满——过度推理倾向被点名为「Reasoning Trap」（HN FoodTruck Bench 帖）。',
      },
      {
        label: '中文',
        text: '中文社区以「普惠核弹」「王炸」叙事为主，知乎 302.AI/新智元转载热度高；「定价只有 Claude 1/5、GPT 1/4」「你现在免费用的默认模型，能力已经能和别家付费旗舰平起平坐」成主流认知；V2EX 用户实测「速度快、工具调用也稳，基本能顶住日常 workflow」，但「香港居然也用不了」区域限制吐槽真实存在，需中转（OpenRouter/302.AI 转售成生态一部分）；中文创作专项反馈较少，整体无负面，关注点集中在价格与区域可用性。',
      },
    ],
    sentiment: { positive: 55, mixed: 25, negative: 20 },
    platforms: [
      {
        name: 'Reddit',
        tone: 'pos',
        summary:
          '发布帖 r/singularity 519 赞/121 评（「Damn! Gemini-Flash beating all major models??!」）；「Alr Gemini-3-flash is here!」189 赞/48 评（「just tested it out and it\'s amazing! The hype was real」）；负面集中在幻觉：「Gemini 3 Flash is amazing, but hallucinations are way too frequent」（r/Bard）。',
      },
      {
        name: 'HackerNews',
        tone: 'pos',
        summary:
          '发布帖 1102 points / 580 评论（Algolia 实测核验）；「Flash 模型与自家 Pro 竞争」「比 Claude Opus 4.5 或 GPT 5.2 extra high 更强」为主流；涨价质疑锋利：Tiberium 精确算账输入 +66.7%、输出 +20%。',
      },
      {
        name: '知乎',
        tone: 'pos',
        summary:
          '302.AI「普惠核弹」实测帖为最厚一手数据：前端复刻最还原、逻辑题部分推断错误；新智元「参数越小，智商越高」转载；问题「相比 2.5 Flash 有哪些提升？」回答含 high 档 token 滥用观察。',
      },
      {
        name: 'Linux.do',
        tone: 'mix',
        summary:
          '3 Flash 发布期无独立主帖（检索未命中）；3.5 Flash 期回溯帖「用 opus 做 plan 然后让 Gemini flash 去执行，挺爽的」确认双模型流成立；整体中文热度低于 3.5/3.6 期，属于「被后续型号盖过」的事实。',
      },
      {
        name: 'V2EX',
        tone: 'pos',
        summary:
          '「Gemini 3 Flash 用着挺香，但想找个更便宜的替代」：速度快、工具调用稳、顶得住日常 workflow；「gemini3 真有那么神吗」认可速度；「香港居然也用不了」区域限制吐槽真实。',
      },
      {
        name: '掘金',
        tone: 'pos',
        summary:
          '以资讯转载与机制研究为主，聚焦性价比与前端复刻能力；专项实测帖较少，讨论多引用 302.AI/新智元数据，无明显负面。',
      },
      {
        name: 'X',
        tone: 'pos',
        summary:
          'Pichai「We\'re back in a Flash ⚡…outperforms 2.5 Pro while being 3x faster at a fraction of the cost」官宣获广泛转推；Jeff Dean 转基准表佐证；社区「Flash 战胜自家 pro」的惊讶与「便宜大碗」心态并存——「3x faster at 1/4 the cost」成为发布日传播主梗；涨价吐槽次之，主要来自拿 2.5 Flash $0.30/$2.50 对比的开发者。',
      },
    ],
    quotes: [
      { text: 'SWE-bench 78% 反超自家 3 Pro？这 Flash 也太夸张了。', source: '知乎 · 302.AI', tone: 'pos' },
      { text: "Don't let the 'flash' name fool you, this is an amazing model.", source: 'HN · samyok', tone: 'pos' },
      { text: '比 2.5 Pro 质量更高，速度快 3 倍，而价格仅是它的一小部分。', source: 'Jeff Dean', tone: 'pos' },
      { text: 'These flash models keep getting more expensive with every release.', source: 'HN · fariszr', tone: 'neg' },
      { text: 'Gemini 3 Flash is amazing, but hallucinations are way too frequent.', source: 'Reddit · r/Bard', tone: 'neg' },
      { text: 'The hype was real.', source: 'Reddit · r/singularity', tone: 'pos' },
      { text: 'gemini 3 flash, 香港居然也用不了，搞什么搞。', source: 'V2EX', tone: 'neg' },
    ],
    controversies: [
      {
        event: '「Flash 涨价第一枪」：HN Tiberium 精确算账——2.5 Flash $0.30/$2.50 → 3 Flash $0.50/$3.00，输入 +66.7%、输出 +20%；XDA《the era of cheap AI is ending》跟进；fariszr「flash models keep getting more expensive with every release」。',
        response:
          '官方博客以「1/4 of Pro 价格 + 3x 速度 + Pareto 前沿」叙事对冲；后续 3.6 Flash 发布时 Logan Kilpatrick 明言「with a new lower price, based directly on developer feedback」——侧面承认此前定价偏高。',
      },
      {
        event: '幻觉率争议：r/OpenAI「Gemini Flash makes up bs 91% of the time it doesn\'t know the answer」（Reason 5621 of WHY model evals are broken）；r/Bard「uncertainty detection weaker than ChatGPT\'s」；模型卡安全表自曝 Text-to-Text Safety -3.1%、Unjustified-refusals -10.4%（对 2.5 Flash）。',
        response: '模型卡回应「manual review confirmed losses were overwhelmingly a) false positives or b) not egregious」，即更「敢说」换来更多幻觉，官方视为可接受安全权衡。',
      },
      {
        event: '区域限制：V2EX「香港居然也用不了」——Gemini 3 Flash 部分区域不可用，中文用户须走 OpenRouter/302.AI 等中转，转售成生态一部分。',
        response: 'Google 未直接回应；AI Studio 免费层与 Vertex 全球区域逐步开放，中转站广告在 V2EX 成讨论噪音本身。',
      },
    ],
    upgradeConsensus: 'worth',
    consensusNote:
      '从 2.5 Flash 升级值得：SWE 78% 反超旗舰、1M/64K 规格、thinking 四档、官方 3x 提速 + 30% token 节省——「轻量反杀」叙事有硬数据支撑（第三方横评复现 78.0%）。但两个代价要看清：价格较 2.5 Flash 上涨（+66.7%/+20%），幻觉与不确定性感知弱需人工复核；若已在 2.5 Flash 上跑成熟流水线，r/LLMDevs 共识是「没理由迁移」，等 3.5/3.6 降价再动更划算。',
    benchmarkGap:
      '「分数高、体感基本一致」的少见案例：SWE-bench 78% 反超 Pro 在真实工作流里成立（GithubCopilot 用户 daily driver 实证、ChatGPT 官方 fast 路径选用），前端复刻知乎实测「最还原」；落差主要在推理深度与幻觉——GPQA 90.4% 高分 vs 知乎逻辑题部分推断错误、r/Bard「hallucinations way too frequent」，官方模型卡「unjustified refusals -10.4%」解释了根因（更敢说 = 更多幻觉）；缓解方案是 thinking 档位下探（minimal/low 处理简单任务）+ 关键输出人工复核。',
    radar: [
      { axis: '长程任务', value: 78 },
      { axis: '编程工程', value: 84 },
      { axis: '抽象推理', value: 74 },
      { axis: '上下文利用', value: 86 },
      { axis: '中文能力', value: 85 },
      { axis: '响应速度', value: 95 },
      { axis: '稳定性', value: 60 },
      { axis: '指令遵循', value: 70 },
      { axis: '易用性', value: 88 },
      { axis: '性价比', value: 82 },
    ],
    danmaku: [
      { text: 'SWE-bench 78% 反超自家 Pro，Flash 也太夸张了', platform: 'zhihu', main: true },
      { text: '发布帖 1102 points：与自家 Pro 竞争', platform: 'hn', main: true },
      { text: 'The hype was real', platform: 'reddit', main: true },
      { text: '3x 于 2.5 Pro · 省 30% token', platform: 'hn', main: true },
      { text: '用着挺香，速度快、工具调用也稳', platform: 'v2ex', main: true },
      { text: '比 2.5 Pro 质量高、速度快 3 倍、价格一小部分', platform: 'x', main: true },
      { text: '价格从 $0.30 涨到 $0.50，Flash 不便宜了', platform: 'hn', main: false },
      { text: '幻觉有点频繁，不确定性感知比 ChatGPT 弱', platform: 'reddit', main: false },
      { text: '简单任务跑满 64K 输出上限，过度推理', platform: 'zhihu', main: false },
      { text: '开源平替找不到这种速度+1M 上下文', platform: 'reddit', main: false },
      { text: '香港居然也用不了，搞什么搞', platform: 'v2ex', main: false },
      { text: '前端复刻三组当中最还原', platform: 'zhihu', main: false },
      { text: 'opus 做 plan，Gemini flash 去执行，挺爽', platform: 'linuxdo', main: false },
      { text: 'ChatGPT 官方 fast 模型就是它', platform: 'hn', main: false },
      { text: '闭源也能免费玩到付费旗舰平级的模型', platform: 'zhihu', main: false },
    ],
    versionDelta: {
      base: 'Gemini 2.5 Flash',
      improves: [
        'SWE-bench Verified 62.5% → 78.0%，反超自家 3 Pro 的 76%（官方 + 第三方横评 78.0% 双确认）',
        'GPQA Diamond 约 80% 档 → 90.4%（官方博客「significantly outperforming even the best 2.5 model」）',
        'MMMU Pro 与 Gemini 3 Pro 并驾齐驱 81.2%，多模态拉平旗舰',
        '速度 3x 于 2.5 Pro（Artificial Analysis 基准），典型流量少用 30% token',
        '新增 thinking levels 四档（minimal/low/medium/high），替代 2.5 的 thinking budget',
        'Agentic Vision（2026-01-27）：视觉推理 + 代码执行，看图从被动到主动',
      ],
      regresses: [
        '价格较 2.5 Flash 上涨：输入 $0.30 → $0.50（+66.7%）、输出 $2.50 → $3.00（+20%），HN 称「Flash 涨价第一枪」',
        '幻觉率上升：模型卡 Text-to-Text Safety -3.1%、Unjustified-refusals -10.4%，r/Bard「hallucinations way too frequent」',
        '不确定性感知弱于 ChatGPT（r/Bard 用户实测反馈）',
        '3.5 Flash 发布后被降级：r/GeminiAI「They killed Gemini 3 Flash, and it sucks」——基础功能变差、幻觉随机 import',
        'High 档过度推理：简单任务跑满 64K 输出上限（知乎实测「明显可以用更低 Token 回答正确」）',
      ],
    },
    subBoards: [
      { name: 'SWE-bench Verified 编码榜', rank: '78.0% · 反超自家 3 Pro', note: '第三方 Medium 横评独立复现 78.0%' },
      { name: 'LMArena 综合', rank: '#3 · 1477 Elo', note: '位于 3 Pro 之后、Opus 4.5 之上' },
      { name: 'MMMU Pro 多模态', rank: '81.2% · 与 3 Pro 并驾齐驱', note: '官方基准表' },
      { name: 'ARC-AGI-2（家族参照）', rank: '3 Pro 31.1% · 2.5 Pro 4.9%', note: '3 Flash 本体精确分未单独披露' },
    ],
    heat: [
      { label: 'HN 发布帖', value: '1,102 pts' },
      { label: 'HN 评论', value: '580' },
      { label: 'Reddit 最高赞', value: '519' },
      { label: 'Reddit 热议帖', value: '189 votes' },
    ],
    harnessReviews: [
      {
        id: 'claude-code',
        text: '官方不支持非 Anthropic 模型，社区通行「Opus 规划/审查 + Gemini Flash 执行」双模型流（Linux.do「用 opus 做 plan 然后让 Gemini flash 去执行，挺爽的」、r/google_antigravity 同款）；OpenAI 自家 ChatGPT 源码流出被扒出 FAST_MODEL="google/gemini-3-flash"（HN pranshuchittora 实证），证明 3 Flash 是巨头级 agent 的默认快路径。',
      },
      {
        id: 'cursor',
        text: '官方博客企业客户引用 Cursor 证言：3 Flash 让「编码 Agent 从异步等待变成近乎实时的同步协作」（GeekPark 转述）；CursorBench 3 Flash 期无独立分档条目（3.6 期才有 High 53.5%），社区多经 OpenRouter 自定义接入，编码可作主力，复杂任务切旗舰。',
      },
      {
        id: 'openhands',
        text: 'OpenHands Index 家族数据：3 Flash 在 SWE-bench issue resolution 上与 Opus 差距小、平均准确率反超 3 Pro，但前端开发类别挣扎——与 Cursor 社区「前端强」口碑相悖；3 Flash 专属量化条目暂无，低成本批量 issue 修复可用。',
      },
    ],
    expertQuotes: [
      {
        text: 'We\'re back in a Flash ⚡ Gemini 3 Flash is our latest model with frontier intelligence built for lightning speed, and pushing the Pareto Frontier of performance and efficiency. It outperforms 2.5 Pro while being 3x faster at a fraction of the cost.',
        name: 'Sundar Pichai',
        role: 'Google CEO · X 官宣推文',
        tone: 'pos',
      },
      {
        text: '比 2.5 Pro 质量更高，速度快 3 倍，而价格仅是它的一小部分。',
        name: 'Jeff Dean',
        role: 'Google 首席科学家（知乎引述）',
        tone: 'pos',
      },
      {
        text: 'Gemini 3 Flash offers frontier performance on PhD-level reasoning… significantly outperforming even the best 2.5 model, Gemini 2.5 Pro, across a number of benchmarks.',
        name: 'Google 官方博客',
        role: 'Tulsee Doshi · Google DeepMind 产品总监',
        tone: 'pos',
      },
      {
        text: 'They went too far, now the Flash model is competing with their Pro version. Better SWE-bench, better ARC-AGI 2 than 3.0 Pro.',
        name: 'u/ GaggiX',
        role: 'HN · 发布帖热评',
        tone: 'pos',
      },
      {
        text: "Don't let the 'flash' name fool you, this is an amazing model… it's more performant than Claude Opus 4.5 or GPT 5.2 extra high, for a fraction of the price.",
        name: 'u/ samyok',
        role: 'HN · 发布帖热评',
        tone: 'pos',
      },
      {
        text: '参数越小，智商越高？Gemini 3 Flash 用百万级长上下文、白菜价成本，把自家大哥 Pro 按在地上摩擦。',
        name: '新智元',
        role: '行业媒体 · 知乎转载',
        tone: 'pos',
      },
      {
        text: '综合本次实测：快如闪电，但并非全能冠军，而是一位以极致效率和性价比为核心，精准打破现有平衡的战略选手。',
        name: '302.AI 基准实验室',
        role: '知乎 · 独立实测（逻辑/编程/多模态 49 题）',
        tone: 'pos',
      },
      {
        text: '轻量模型第一次反超旗舰版：一个定价只有 Claude 1/5、GPT 1/4 的「轻量模型」，在编码上超过 Claude Sonnet 4.5。',
        name: '知乎评测',
        role: '「3 倍提速、省 75%」专栏',
        tone: 'pos',
      },
      {
        text: 'Gemini 3 Flash (Preview) is really impressive… it\'s slowly replaced my daily driver the past few days even though I have access to all the "big" premium models.',
        name: 'u/ 热帖楼主',
        role: 'Reddit · r/GithubCopilot',
        tone: 'pos',
      },
      {
        text: 'just tested it out and it\'s amazing! The hype was real. I tested it on a simple website creation prompt and the results are…',
        name: 'u/ 热帖楼主',
        role: 'Reddit · r/singularity · 189 赞帖',
        tone: 'pos',
      },
      {
        text: 'Gemini 3 flash is good for most tasks, you guys are relying too much on big models.',
        name: 'u/ 楼主',
        role: 'Reddit · r/google_antigravity',
        tone: 'pos',
      },
      {
        text: 'Yet again Flash receives a notable price hike: from $0.3/$2.5 for 2.5 Flash to $0.5/$3 (+66.7% input, +20% output) for 3 Flash.',
        name: 'u/ Tiberium',
        role: 'HN · 发布帖 · 涨价算账',
        tone: 'neg',
      },
      {
        text: 'These flash models keep getting more expensive with every release. Is there an OSS model that\'s better than 2.0 flash with similar pricing, speed and a 1m context window?',
        name: 'u/ fariszr',
        role: 'HN · 发布帖热评',
        tone: 'neg',
      },
      {
        text: 'Gemini 3 Flash is amazing, but hallucinations are way too frequent… its "uncertainty detection" is weaker than ChatGPT\'s.',
        name: 'u/ 楼主',
        role: 'Reddit · r/Bard',
        tone: 'neg',
      },
      {
        text: 'Gemini Flash makes up bs 91% of the time it doesn\'t know the answer. Reason 5621 of WHY model evals are broken beyond repair.',
        name: 'u/ 楼主',
        role: 'Reddit · r/OpenAI',
        tone: 'neg',
      },
      {
        text: 'They killed Gemini 3 Flash, and it sucks :( It was actually solid for a few weeks there. Now it can barely handle basic functions without hallucinating random imports.',
        name: 'u/ 楼主',
        role: 'Reddit · r/GeminiAI',
        tone: 'neg',
      },
      {
        text: 'gemini 3 flash, 香港居然也用不了，搞什么搞。',
        name: 'V2EX 用户',
        role: '区域限制吐槽帖',
        tone: 'neg',
      },
      {
        text: 'Flash 的 high 档位可以充分利用 64K 的输出上限进行推理……明显可以用更低 Token 回答正确，但还是跑满了 Token 上限；medium 档位则没有这个现象。',
        name: '知乎回答',
        role: '「相比 2.5 Flash 有哪些提升」问题',
        tone: 'mix',
      },
      {
        text: '快速开发迭代用 Flash，优化加固再换旗舰——速度档的性价比之王，但要接受幻觉风险。',
        name: 'Linux.do 双模型流共识',
        role: 'Opus 规划 + Flash 执行实测帖',
        tone: 'mix',
      },
      {
        text: '综合 302.AI 实测：前端复刻「三组当中最还原」，逻辑推理「部分推断错误」——快与准要分开看。',
        name: '302.AI 基准实验室',
        role: '知乎 · 49 题独立实测',
        tone: 'mix',
      },
    ],
    timeline: [
      { date: '12-02', event: 'Sam Altman 内部备忘录「code red」：称 Gemini 3 将带来「temporary economic headwinds」，GPT-5.2 提前发布应战' },
      { date: '12-17', event: 'Gemini 3 Flash 正式发布：Gemini App/Search AI Mode 默认、API/CLI/Antigravity/Vertex 全线铺开；HN 1102 pts/580 评论' },
      { date: '12-18', event: '中文媒体集中报道：知乎「深夜炸场」叙事、GeekPark「入场券」稿；OpenAI 12-16 抢先甩出 GPT-5.2 应对' },
      { date: '01-27', event: 'Agentic Vision 上线：视觉推理 + 代码执行，r/singularity 497 votes/63 comments' },
      { date: '03-04', event: 'HN「When Reasoning Becomes a Trap: Gemini 3 Flash in FoodTruck Bench」——过度推理批判帖' },
      { date: '04-27', event: 'Show HN「OSS Agent topped the TerminalBench on Gemini-3-flash-preview」393 pts/148 评论：独立 agent 登顶实证' },
      { date: '05-19', event: 'Gemini 3.5 Flash 发布（I/O）：定价再翻倍 $1.50/$9，社区回头认可 3 Flash 性价比，3 Flash 被默认降级' },
    ],
    demos: [
      {
        title: 'Antigravity 实时更新',
        desc: '官方演示：Gemini 3 Flash 在 Google Antigravity 中近实时更新生产级应用，agentic 编程「从异步等待变成近乎实时的同步协作」（Cursor 证言）。',
      },
      {
        title: '高尔夫挥杆分析',
        desc: 'Gemini App 内分析短视频并给出可执行改进计划——多模态推理「see, hear and understand」的消费端演示。',
      },
      {
        title: '手绘实时识别',
        desc: 'Pictionary 演示：你在画的同时它边看边猜——毫秒级响应支撑实时交互，是「问答即显」体感的核心证据。',
      },
    ],
    uncertainties: [
      '模型架构未公开：官方仅称「基于 Gemini 3 Pro」，参数量/MoE 细节为推测（LaoZhang 博客估「与 2.5 Flash 同级参数规模」，未证实）',
      'LMArena 1477 Elo 为发布期快照（r/singularity 引用官方推文）；models.ts 基线 1302 疑为不同时点值，已按 1477 更新（models.ts 未改动）',
      'AIME 口径：r/singularity 标题「99.7%」vs digitalapplied 汇总「95.2%」，正文采用可追溯的 95.2%，99.7% 出处不明',
      '各平台情绪比例为代表性帖文估算（55/25/20），非严格量化；Reddit 数字为 Brave 搜索快照（直连 403），未走 Reddit API',
      '3 Flash 在 claude-code/cursor/openhands 无 SWE-bench 级独立跑分：OpenHands Index 仅家族数据、CursorBench 3 Flash 期无分档条目',
      'effortBench 缺省 + ARC-AGI-2 未披露：3 Flash 支持 thinking levels（minimal/low/medium/high）但官方未按档位披露分档成绩，不足 3 个 benchmark 分档数据；ARC-AGI-2 精确分同样未单独披露（GeekPark「近 7 倍于 2.5 Pro」为家族参照：3 Pro 31.1% vs 2.5 Pro 4.9%）',
    ],
    sources: [
      { title: 'Gemini 3 Flash: frontier intelligence built for speed', platform: 'Google Blog', url: 'https://blog.google/products-and-platforms/products/gemini/gemini-3-flash/' },
      { title: 'Gemini 3 Flash Model Card', platform: 'Google DeepMind', url: 'https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf' },
      { title: 'Gemini 3 Flash: Frontier intelligence built for speed | Hacker News', platform: 'Hacker News', url: 'https://news.ycombinator.com/item?id=46301851' },
      { title: 'Google releases Gemini 3 Flash: Ranks #3 on LMArena, 99.7% AIME, $0.50/1M', platform: 'Reddit', url: 'https://www.reddit.com/r/singularity/comments/1pp0ncw/' },
      { title: '谷歌的「普惠核弹」：Gemini 3 Flash 实测', platform: '知乎 · 302.AI', url: 'https://zhuanlan.zhihu.com/p/1985450972294698271' },
      { title: '模型免费、推理翻倍：Gemini 3 Flash 深夜炸场', platform: '极客公园', url: 'https://www.geekpark.net/news/358272' },
      { title: 'Gemini 3 Flash: Google\'s 3x Faster AI at 1/4 the Cost', platform: 'Digital Applied', url: 'https://www.digitalapplied.com/blog/gemini-3-flash-google-ai-guide' },
      { title: 'Gemini 3 Flash vs GPT-5.2 vs Claude Opus 4.5 vs Grok 4.1', platform: 'Medium', url: 'https://medium.com/@cognidownunder/gemini-3-flash-vs-gpt-5-2-vs-claude-opus-4-5-vs-grok-4-1-the-real-winner-surprised-me-b43d0688452e' },
      { title: 'Sam Altman issues \'code red\' at OpenAI as ChatGPT contends with rivals', platform: 'The Guardian', url: 'https://www.theguardian.com/technology/2025/dec/02/sam-altman-issues-code-red-at-openai-as-chatgpt-contends-with-rivals' },
      { title: 'Gemini 3 Flash 用着挺香，但想找个更便宜的替代', platform: 'V2EX', url: 'https://global.v2ex.com/t/1197732' },
    ],
  },
  bestInSlot: [
    {
      id: 'claude-code',
      note: '社区通行「Claude 规划 + Gemini Flash 执行」双模型流：Linux.do「用 opus 做 plan 然后让 Gemini flash 去执行，挺爽的」、r/google_antigravity 同款共识；OpenAI 自家 ChatGPT 源码流出被扒出 FAST_MODEL="google/gemini-3-flash"（HN 实证），证明 3 Flash 是巨头级 agent 的默认快路径。经 ANTHROPIC_BASE_URL 网关（LiteLLM/Requesty）挂进 Claude Code 后，thinking low/medium 档跑高频快任务、旗舰跑规划，是成本与速度的最优组合。',
    },
    {
      id: 'cursor',
      note: '官方企业证言背书：Cursor 引用「让编码 Agent 从异步等待变成近乎实时的同步协作」；3 Flash 期经 OpenRouter 自定义接入（$0.50/$3 白菜价），双模型槽位可组「Flash 快速原型 + 旗舰优化加固」复核流；CursorBench 3 Flash 期无分档条目（3.6 期 High 53.5%），前端快打可用、复杂任务切旗舰。',
    },
    {
      id: 'openhands',
      note: 'OpenHands Index 家族数据显示 3 Flash SWE-bench issue resolution 与 Opus 差距小、平均准确率反超 3 Pro，但前端开发类别挣扎；低成本批量 issue 修复与信息收集可用，前端视觉任务需显式设计指引；3 Flash 专属量化条目暂无，占位强度低于 claude-code/cursor。',
    },
  ],
  teamIds: ['budget-vanguard', 'common-warlord'],
  trialGood: [
    { label: 'Agent 工作流编排', to: '/scenarios#agent' },
    { label: '前端快速原型', to: '/scenarios#frontend' },
    { label: '高频轻量杂务', to: '/scenarios#daily' },
    { label: '全栈快速迭代', to: '/scenarios#fullstack' },
  ],
  trialBad: [
    { label: '零幻觉关键任务', to: '/scenarios#docs', note: '幻觉率较高且不确定性感知弱，建议换 claude-opus-5' },
    { label: '复杂多步推理', to: '/scenarios#algo', note: '逻辑深度不如旗舰且 high 档过度推理，建议换 gemini-3-1-pro' },
    { label: '严格按指令执行', to: '/scenarios#strict', note: '更「敢说」导致幻觉与越界，建议换 claude-sonnet-5' },
    { label: '成本敏感型重负载', to: '/scenarios#budget', note: '价格较 2.5 Flash 上涨 66%，重负载建议换 deepseek-v4-flash' },
  ],
  guideIds: ['beginner-budget', 'case-frontend', 'mech-toolcall', 'mech-output-token'],
};
