import type { ModelDetailData } from '../modelDetails';

export const DETAIL: ModelDetailData = {
  modelId: 'llama-5-maverick',
  profile: {
    apiId: 'llama-5-maverick（未发布 · 站内基线标识）',
    vendor: 'Meta（Meta AI / MSL）',
    releaseDate: '未发布（站内基线 2026-03-08 · 无信源）',
    access: ['未发布', '泄漏代号 Watermelon · 开源/闭源未定'],
    costNote:
      '未定价。2026-04-08 起 Meta 转向闭源 Muse Spark（Meta 首个专有前沿模型），Llama 5 若以闭源 API 面世需与 GPT-5.5/Gemini 3.5 Pro 正面竞价；若开源则零 API 成本但须过 EU AI Act 系统性风险评估。',
    nicknames: ['西瓜', 'Watermelon', '被抛弃的羊'],
    signature: '2026-07 泄漏：内部基准匹配 GPT-5.5 · 10× Muse Spark 算力 · 未发布未评测',
  },
  benchGroups: [
    {
      label: '榜单成绩',
      rows: [
        { label: 'Watermelon 内部基准（泄漏）', value: '匹配 GPT-5.5 · 未独立验证' },
        { label: '训练算力（泄漏）', value: '≈ 10× Muse Spark' },
        { label: 'SWE-bench Verified（前代实测）', value: '~24% · 第三方复现' },
        { label: 'Aider Polyglot（前代实测）', value: '15.6%' },
        { label: 'LMArena（前代开源未修改版）', value: '#32' },
        { label: 'Manifold 预测（2027-01 前发布）', value: '1.9%' },
        { label: 'Polymarket 共识（2026 出货）', value: '<20% · 102 个市场' },
      ],
    },
    {
      label: '规格与接入',
      rows: [
        { label: '上下文窗口', value: '未公布（站内基线 512K · 无信源）' },
        { label: '最大输出', value: '未公布（站内基线 32K）' },
        { label: '价格（入/出）', value: '未定价 · 开源/闭源未定' },
        { label: 'effort 档位', value: '未公布' },
        { label: '模型架构', value: '未公布（传闻 MoE 系；前代 Maverick 400B/17B 激活）' },
        { label: '发布日期', value: '未发布（站内基线 2026-03-08 · 无信源）' },
        { label: '获取方式', value: '未定（开源权重 vs 闭源 API 之争）' },
      ],
    },
  ],
  rivalIds: ['gpt-5-5', 'llama-4', 'deepseek-v4'],
  talents: [
    {
      kind: 'burst',
      seal: '破',
      name: '西瓜成型',
      desc: '泄漏代号 Watermelon 的在训旗舰：Wang 在 2026-07-06 全员会称内部基准已匹配 GPT-5.5，算力约为前作（Muse Spark，内部代号 Avocado）的 10 倍——「堆算力追平」而非架构巧思。',
      metric: '匹配 GPT-5.5（内部自证）· 算力 10×',
    },
    {
      kind: 'normal',
      seal: '双',
      name: '双轨战略',
      desc: '开源生态（Llama 4 为「terminal open offering」）+ 闭源前沿（Muse Spark）双轨并进；社区共识「开源保生态与口碑、闭源拼前沿与商业化」。',
      metric: 'Muse Spark Index 52 · 2026-04 起闭源',
    },
    {
      kind: 'skill',
      seal: '程',
      name: '编程补课',
      desc: 'Wang 在 X 预告「Opus 级编程模型 pretty soon」，泄漏称 agentic/coding 增益显著——回应前代 Llama 4 编程短板（Aider 仅 15.6%）。',
      metric: 'Opus 级编程模型预告（2026-07）',
    },
    {
      kind: 'passive',
      seal: '界',
      name: '世界模型野心',
      desc: '早期 Avocado 泄漏指向第 3 代 Ray-Ban 眼镜的实时世界模型推理（视觉+环境理解）；代号已被澄清为 Muse Spark 内部代号，本能力定位存疑。',
      metric: '3 代 Ray-Ban 眼镜目标（泄漏 · 存疑）',
    },
  ],
  constellation: [
    { version: 'Llama 1', date: '2023-02', effect: '初代开源 · 研究级开放引爆社区' },
    { version: 'Llama 2', date: '2023-07', effect: '开源权重商业化首作 · 挑战闭源格局' },
    { version: 'Llama 3', date: '2024-04', effect: '8B/70B 开源登顶 · 生态爆发' },
    { version: 'Llama 3.3', date: '2024-12', effect: '70B 稠密口碑稳 · 部署友好无争议' },
    { version: 'Llama 4', date: '2025-04', effect: 'MoE 首作 · 10M 纪录与刷榜争议齐飞' },
    { version: 'Llama 5', date: '2026-?', effect: '在训未发 · 代号 Watermelon · 内部匹配 GPT-5.5', current: true },
  ],
  community: {
    strengths: ['开源信仰', '算力堆叠', '编程补课', '世界模型', '双轨战略'],
    weaknesses: ['跳票风险', '开源存疑', '基准自证', '前代阴影', '规格空白'],
    notes: [
      {
        label: '编程',
        text: '泄漏主打方向：Wang 预告「Opus 级编程模型 pretty soon」（X，2026-07-06），Muse Code（闭源编程旗舰，HN 332 pts）被视为 Meta 编程补课的先导证据。但前代账要还：Llama 4 Maverick Aider Polyglot 实测仅 15.6%、SWE-bench 第三方复现 ~24%（DeepSeek V4 Pro 80.6%、Qwen 3.6-27B 77.2% 同期对照），社区共识「编程短板要从头补」；且 2026 年 Meta 内部开发已改用 Claude Sonnet（量子位），自家编程实力存疑。Llama 5 自身零实测。',
      },
      {
        label: '推理',
        text: '唯一「成绩」是 Wang 内部自证「匹配 GPT-5.5」（未点名 benchmark、未独立复现、Meta 拒评）；AI Weekly 点破这是「堆算力追平而非架构巧思」，且 OpenAI 已于 6 月底限量预览 GPT-5.6 抢先半步。前代唯一可信推理成绩是 Epoch 复现 GPQA Diamond Maverick 67%（与官方 69.8% 基本吻合），但无法外推 Llama 5；加上 Llama 4 刷榜前科（LeCun 2026-01 承认 "results were fudged"），社区对内部基准普遍「先别信」。',
      },
      {
        label: '中文',
        text: '专项反馈 0 条（未发布模型不可能有）；Meta 中文能力历来偏弱（Llama 4 官方 12 种支持语言不含中文、中文 OCR 不及预期）。中文社区讨论聚焦两件事：量子位《Llama惨遭抛弃！Meta内部改用Claude写代码》的负面叙事、以及「从开源折戟到闭源破局」的 Muse Spark 转向解读——对 Llama 5 的中文能力无任何期待性正面，反而担忧开源路线终结。',
      },
    ],
    sentiment: { positive: 30, mixed: 35, negative: 35 },
    platforms: [
      {
        name: 'Reddit',
        tone: 'mix',
        summary:
          'r/LocalLLaMA 开源之争为主轴：「Do you believe Llama 5 will be open weights?」帖（1nyi5el）高赞「The llama brand is too strong to completely abandon」与反方「I don\'t really think it\'ll be open weights」对峙；「Maverick and Scout performed quite poorly so people mocked them」的翻车记忆仍在；「102% chance with a 2% margin of error weights will be available」的被删楼是开源派最强声。',
      },
      {
        name: 'HackerNews',
        tone: 'neg',
        summary:
          'Llama 5 发布帖 0（Algolia 核验）；Meta 现役旗舰参照为 Muse Spark 发布帖 393 pts / 367 评（04-08）、1.1 版 413 pts / 214 评、「Meta abandons open-source Llama for proprietary Muse Spark」15 pts（04-30）、Watermelon 帖仅 2 pts（07-13）——开源社群对 Meta 转向的失落感明显。',
      },
      {
        name: '知乎',
        tone: 'neg',
        summary:
          '无 Llama 5 专项；量子位《Llama惨遭抛弃！Meta内部改用Claude写代码》成最相关负面信源——Meta 工程师透露内部开发已换用 Claude Sonnet；Muse Spark 系列问题（「如何看待Meta发布的Muse Spark模型？」等）主流叙事「从开源折戟到闭源破局」。',
      },
      {
        name: 'Linux.do',
        tone: 'mix',
        summary:
          '无 Llama 5 讨论；Muse Spark 新闻帖「Meta新模型几乎白送，比DeepSeek还便宜29%！」（topic 2712838）折射开源派失落——Meta 闭源定价战与开源信仰冲突，「开源开了个寂寞」情绪延续。',
      },
      {
        name: 'V2EX',
        tone: 'mix',
        summary:
          '无 Llama 5 讨论；Llama 4 时代「实测拉了/开源开了个寂寞」的负面记忆仍在，本地部署向用户更关注 llama.cpp 与 Qwen/GLM 系；对 Meta 未发布的新旗舰态度平淡。',
      },
      {
        name: '掘金',
        tone: 'mix',
        summary:
          '无 Llama 5 内容，仅 Llama 4 本地部署攻略与 llama.cpp 教程；技术专栏聚焦「12GB 显存跑 Llama 4」式落地向内容，对新旗舰持观望。',
      },
      {
        name: 'X',
        tone: 'mix',
        summary:
          'Watermelon 泄漏推文多版本发酵（TOAINews 07-06/07-07，后者自带「unconfirmed leaks, treat performance claims as rumor until launch」caveat）+ Business Insider 报道；段子「imagine zuck runs fable on meta infra, then clones it as llama 5 opensource」与战略质疑「open-weight venture has largely been about denying market share to OpenAI」并存。',
      },
    ],
    quotes: [
      { text: 'The llama brand is too strong to completely abandon.', source: 'r/LocalLLaMA 高赞', tone: 'pos' },
      { text: "It might come at max by may but I don't really think it'll be open weights.", source: 'r/LocalLLaMA', tone: 'neg' },
      { text: 'Llama惨遭抛弃！Meta内部改用Claude写代码。', source: '知乎 · 量子位', tone: 'neg' },
      { text: "Watermelon has caught up with OpenAI's GPT-5.5 on closely followed benchmarks.", source: 'AI Weekly', tone: 'pos' },
      { text: 'Watch the capability gap, not the press release.', source: 'shiporskip 面板 · The Skeptic', tone: 'neg' },
      { text: '102% chance with a 2% margin of error that the weights will be available for this model soon.', source: 'r/LocalLLaMA', tone: 'pos' },
      { text: 'If LLaMA-5 flops after all this poaching, it might go down as the biggest disaster of the decade.', source: 'X · 悲观评论', tone: 'neg' },
    ],
    controversies: [
      {
        event: '开源→闭源转向（2026-04-08）：Meta 首发闭源 Muse Spark，靠 Llama 许可建生意的开发者恐慌；shiporskip 面板直言「Meta is running a goodwill play… Watch the capability gap」；The New Stack 标题「Meta abandons open-source Llama」。',
        response: '2026-07 Wang 全员会透露 Watermelon 仍在训练，Meta 高管同时确认「未来会发布开源模型」（r/LocalLLaMA 帖 1v7smm5 转述）——软承诺，未绑定 Llama 5。',
      },
      {
        event: '代号混乱：2025-2026 初泄漏把「Avocado」当 Llama 5（next.io 2026-01-27、Geeky Gadgets 2026-02），2026-07-06 BI 报道澄清 Avocado 实为 Muse Spark 内部代号、Watermelon 才是当前在训的「下一个模型」。',
        response: 'Meta 未专门澄清（靠 BI/AI Weekly 报道纠偏）；社区以 Watermelon 通称 Llama 5。',
      },
      {
        event: '跳票：早期泄漏指向 Q1 2026 发布（r/LocalLLaMA「will there be a llama 5 in feb 2026?」），Goldman Sachs/Finterra 现预测 2027；Polymarket 102 个市场共识 2026 出货 <20%、Manifold 2027-01 前仅 1.9%。',
        response: '官方无正式公告；Zuckerberg 07-02 全员会「agent 进展 hasn\'t really accelerated in the way that we expected」（Reuters）被视为延迟侧证。',
      },
      {
        event: '内部自证不获信任：Wang 称 Watermelon「匹配 GPT-5.5」但未点名 benchmark、Meta 拒评；叠加 Llama 4 刷榜前科（特调版 #2 vs 开源版 #32、LeCun 2026-01 承认 "results were fudged a little bit"），社区普遍「先别信」。',
        response: '无官方回应；靠第三方复测纪律（发布后以 Aider/独立复现为准绳）。',
      },
    ],
    upgradeConsensus: 'wait',
    consensusNote:
      '无从升级——模型未发布。开源党在等「weights 落地」（"llama brand too strong to abandon"），闭源务实派在等「API 可用」（Muse Spark 已是现役，1.2 版 08-05 刚发）；对两者共同的前置警告：Llama 4 的 SWE 41.8% 官方宣称被证伪为 ~24%，「匹配 GPT-5.5」属内部自证，发布后必须看第三方复测再决定迁移；当前需要 Llama 系能力的用户先用 Muse Spark / Muse Code，需要开源权重的先上 DeepSeek V4 / Qwen 3.6 系。',
    benchmarkGap:
      '无成绩可比——泄漏称「匹配 GPT-5.5」，但 AI Weekly 点破这是「堆算力追平」而非架构巧思，且 OpenAI 已限量预览 GPT-5.6 抢先半步；加上 Llama 4 刷榜前科，「分数可信度」成为比「分数高低」更大的问题。真正落差要等发布后独立复测；缓解之道：以 Manifold 1.9%（2027-01 前）的现实预期管理心态，发布后先看 Aider Polyglot 与第三方 SWE 复现（前代 15.6% / ~24% 的及格线）。',
    radar: [
      { axis: '长程任务', value: 62 },
      { axis: '编程工程', value: 65 },
      { axis: '抽象推理', value: 58 },
      { axis: '上下文利用', value: 60 },
      { axis: '中文能力', value: 50 },
      { axis: '响应速度', value: 48 },
      { axis: '稳定性', value: 45 },
      { axis: '指令遵循', value: 55 },
      { axis: '易用性', value: 58 },
      { axis: '性价比', value: 70 },
    ],
    danmaku: [
      { text: 'Watermelon 已追上 GPT-5.5（内部自证）', platform: 'x', main: true },
      { text: 'The llama brand is too strong to abandon', platform: 'reddit', main: true },
      { text: "I don't really think it'll be open weights", platform: 'reddit', main: true },
      { text: 'Llama 5 发布帖：0（Algolia 核验）', platform: 'hn', main: true },
      { text: 'Meta 内部都改用 Claude 写代码了', platform: 'zhihu', main: true },
      { text: '102% chance weights will be available soon', platform: 'reddit', main: true },
      { text: '10× Muse Spark 算力，内部匹配 GPT-5.5', platform: 'x', main: false },
      { text: 'It might come by may, but not open weights', platform: 'reddit', main: false },
      { text: 'At this rate it would be an ancient relic', platform: 'reddit', main: false },
      { text: 'Muse Spark 393 pts：开源时代落幕', platform: 'hn', main: false },
      { text: '从开源折戟到闭源破局', platform: 'zhihu', main: false },
      { text: 'zuck 把 Fable 克隆成开源 Llama 5？', platform: 'x', main: false },
      { text: 'Manifold 2027 前仅 1.9%', platform: 'hn', main: false },
      { text: 'If it flops, biggest disaster of the decade', platform: 'x', main: false },
    ],
    versionDelta: {
      base: 'Llama 4 Maverick',
      improves: [
        'SWE-bench Verified（第三方复现）~24% → 泄漏称内部匹配 GPT-5.5（未独立验证）',
        'Aider Polyglot 15.6%（前代实测）→ Wang 预告「Opus 级编程模型」补课',
        '训练算力：Muse Spark 首发（2026-04）→ Watermelon 泄漏 ≈ 10×（数量级跃升）',
        'LMArena 开源未修改版 #32（前代）→ 内部宣称对标 GPT-5.5（头部门槛）',
        '战略：单轨开源（Llama 4）→ 双轨（开源生态 + 闭源前沿 Muse Spark Index 52）',
        '旗舰缺位（Behemoth 约 2T 冻结）→ Watermelon 补位传闻',
      ],
      regresses: [
        '发布节奏：Llama 4（2025-04-05）→ Llama 5 跳票至 2027 机构预测，两年空窗',
        '开源承诺：Llama 4 开源权重 → Llama 5 开源未定（社区主流「don\'t think it\'ll be open weights」）',
        '信任基础：Llama 4 刷榜争议（特调版 #2 vs 开源版 #32）→ Llama 5 内部自证无人轻信',
        '内部口碑：Meta 工程师改用 Claude Sonnet 写代码（量子位）——自家模型被自家抛弃',
        '开源生态地位：Llama 3/4 时代龙头 → 2026 开源榜被 DeepSeek V4 Pro（SWE 80.6%）/ Qwen 3.6-27B（77.2%）接管',
        'EU AI Act 系统性风险评估或进一步推迟发布',
      ],
    },
    subBoards: [
      { name: '开源生态榜', rank: '缺席', note: 'Llama 4 后开源龙头被 DeepSeek/Qwen 接管（SWE 80.6%/77.2% 对照前代 ~24%）' },
      { name: 'SWE-bench 开源榜', rank: '无条目', note: '前代 Maverick ~24%；Llama 5 内部自称对标 GPT-5.5（未验证）' },
      { name: 'LMArena', rank: '无条目', note: '前代开源版 #32；Watermelon 泄漏称「已追上 GPT-5.5」' },
      { name: '预测市场', rank: '2027-01 前 1.9%', note: 'Manifold 实时抓取；Polymarket 102 个市场共识 2026 出货 <20%' },
    ],
    heat: [
      { label: 'HN 发布帖', value: '0（Algolia 核验）' },
      { label: 'HN Muse Spark 参照', value: '393 pts · 367 评' },
      { label: 'Manifold 2027-01 前发布', value: '1.9%' },
      { label: 'Polymarket 2026 出货共识', value: '<20% · 102 市场' },
    ],
    harnessReviews: [
      {
        id: 'claude-code',
        text: '无实测（未发布）。若开源发布，可经 Ollama Anthropic 兼容 API 接入，路径与 Llama 4 时代一致；当前占位待补。',
        placeholder: true,
      },
      {
        id: 'cursor',
        text: '无实测。Meta 现役编程旗舰为闭源 Muse Code，Llama 5 落地前编程槽位建议留 Muse Code 或闭源顶配；开源党可经 OpenAI 兼容 API 指向自部署端点先占位。',
        placeholder: true,
      },
      {
        id: 'openhands',
        text: '无实测。OpenHands 支持 Ollama 本地端点接入（Llama 4 同款），但 OpenHands Index 无 Llama 5 条目；发布后按 Index 评测体系补数据，当前不建议作蜂群执行单元。',
        placeholder: true,
      },
    ],
    expertQuotes: [
      {
        text: '"Watermelon, our next model after Avocado, is currently in training," Wang said in the town hall… "Watermelon uses an order of magnitude more compute…"',
        name: 'Alexandr Wang',
        role: 'Meta Superintelligence Labs 负责人 · Business Insider 转述（2026-07-06 全员会）',
        tone: 'pos',
      },
      {
        text: 'Watermelon is still in training and uses an order of magnitude more compute than Muse Spark, Meta\'s April release internally codenamed Avocado.',
        name: 'AI Weekly',
        role: '行业媒体 · 事实摘要',
        tone: 'pos',
      },
      {
        text: 'The llama brand is too strong to completely abandon. The only question is what sizes they\'ll release and what sizes they\'ll keep in house.',
        name: 'u/ 高赞评论',
        role: 'r/LocalLLaMA · Do you believe Llama 5 will be open weights?',
        tone: 'pos',
      },
      {
        text: 'There is 102% chance with a 2% margin of error that the weights will be available for this model soon.',
        name: 'u/ 被删楼楼主',
        role: 'r/LocalLLaMA · 开源预期帖',
        tone: 'pos',
      },
      {
        text: 'Meta发新模型Muse Spark：从开源转向封闭，闭源阵营的最后一博？',
        name: '36氪',
        role: '中文科技媒体 · Muse Spark 转向报道',
        tone: 'mix',
      },
      {
        text: 'Agent progress "hasn\'t really accelerated in the way that we expected."',
        name: 'Mark Zuckerberg',
        role: 'Meta CEO · Reuters（2026-07-02 全员会）',
        tone: 'mix',
      },
      {
        text: 'The story is not that Meta found a clever architectural trick that closed the gap, it is that Meta poured a lot more compute into a bigger training run.',
        name: 'AI Weekly 编辑',
        role: '技术 Newsletter 分析',
        tone: 'mix',
      },
      {
        text: 'A GPT-5.5-type model would be a nice jump for Meta, whose top Muse Spark model still sat pretty comfortably beneath the field even at launch.',
        name: 'The Rundown',
        role: '头部 AI Newsletter',
        tone: 'mix',
      },
      {
        text: 'It might come at max by may but I don\'t really think it\'ll be open weights. …Keep your llama.cpp binaries updated!',
        name: 'u/ 预测帖楼主',
        role: 'r/LocalLLaMA · will there be a llama 5 in feb 2026?',
        tone: 'mix',
      },
      {
        text: '从开源折戟到闭源破局：Meta Muse Spark 全解析。',
        name: 'CSDN 技术专栏',
        role: '中文开发者社区 · 转向解读',
        tone: 'mix',
      },
      {
        text: 'imagine zuck runs fable on meta infra, then clones it and releases it as llama 5 opensource',
        name: 'X 用户',
        role: 'X · 段子（2026-07-17）',
        tone: 'mix',
      },
      {
        text: 'Meta is running a goodwill play. Llama 5 is their open-source olive branch after the Muse Spark backlash… Watch the capability gap, not the press release.',
        name: 'shiporskip 面板 · The Skeptic',
        role: 'AI 聚合站观点样本（低权威，仅作态度参考）',
        tone: 'neg',
      },
      {
        text: 'Llama惨遭抛弃！Meta内部改用Claude写代码。',
        name: '量子位',
        role: '中文 AI 媒体 · 知乎专栏',
        tone: 'neg',
      },
      {
        text: 'Meta棄開源轉閉源：Muse Spark正式登場… Llama時代謝幕，Alexandr Wang的九個月重建計畫首次交卷。',
        name: 'iBCO Turing College',
        role: '台湾 AI 媒体',
        tone: 'neg',
      },
      {
        text: 'Meta新模型几乎白送，比DeepSeek还便宜29%！',
        name: 'Linux.do 新闻帖',
        role: '中文社区 · Muse Spark 定价讨论',
        tone: 'mix',
      },
      {
        text: 'Meta 发布 Muse Spark，全面超越一众模型，当年的开源王者正式回归。',
        name: '知乎专栏',
        role: '中文社区 · Muse Spark 深度解析',
        tone: 'pos',
      },
      {
        text: 'Maverick and Scout performed quite poorly so people mocked them and Meta decided to restructure their AI program.',
        name: 'u/ 评论',
        role: 'r/LocalLLaMA · why meta not dropping any new llama version',
        tone: 'neg',
      },
      {
        text: 'If LLaMA-5 flops after all this poaching, it might go down as the biggest disaster of the decade.',
        name: 'X 用户',
        role: 'X · 悲观评论（2026-07-23）',
        tone: 'neg',
      },
      {
        text: "For anyone choosing an open-weight stack, Llama 4 Scout and Maverick are now Meta's terminal open offering for the foreseeable future, not a stepping stone.",
        name: 'codersera',
        role: '技术指南站 · 2026-05-27 更新',
        tone: 'neg',
      },
      {
        text: 'Wang did not name the benchmarks; Meta declined to comment and OpenAI did not respond.',
        name: 'AI Weekly',
        role: '行业媒体 · 事实核查',
        tone: 'neg',
      },
    ],
    timeline: [
      { date: '2025-12-11', event: 'HN「From Llamas to Avocados」——Avocado 代号泄漏首现（1 pt），Meta 战略转向引发困惑' },
      { date: '2026-01-27', event: 'next.io 预期文：Llama 5 代号 Avocado、为第 3 代 Ray-Ban 眼镜做世界模型推理（对 Avocado 归属的误读起点）' },
      { date: '2026-04-08', event: 'Muse Spark 闭源首发（HN 393 pts/367 评）：Meta 首个专有前沿模型，开源路线转向；Behemoth 冻结成定局' },
      { date: '2026-07-02', event: 'Zuckerberg 全员会：agent 进展「慢于预期」（Reuters），被解读为旗舰延迟侧证' },
      { date: '2026-07-06', event: 'Business Insider 首发：Watermelon 已追上 GPT-5.5、算力 ≈10× Muse Spark（内部自证、未独立验证）；X 泄漏推文同日发酵' },
      { date: '2026-07-09', event: 'Muse Spark 1.1 发布（HN 413 pts/214 评）——Meta 现役旗舰仍为 Muse 系' },
      { date: '2026-08-05', event: 'Muse Code + Muse Spark 1.2 发布（HN 332 pts/263 评）——Meta 编程旗舰是闭源 Muse Code' },
      { date: '2026-08-10', event: '调研基准日：llama.com 模型列表无 Llama 5；Manifold 2027-01 前发布仅 1.9%' },
    ],
    demos: [
      {
        title: 'Watermelon 内部演示',
        desc: '泄漏仅披露内部基准「匹配 GPT-5.5」说法，未公开任何官方演示/视频；占位待补。',
        placeholder: true,
      },
      {
        title: 'Ray-Ban 世界模型概念',
        desc: '早期 Avocado 泄漏指向第 3 代 Ray-Ban 眼镜实时世界模型推理（next.io/Geeky Gadgets）；代号已被澄清为 Muse Spark 内部代号，本项存疑。',
        placeholder: true,
      },
      {
        title: 'Muse Spark 发布演示',
        desc: '前代旗舰（闭源，meta.ai + 新 API）演示为参照系；Llama 5 自身无任何演示。',
        placeholder: true,
      },
    ],
    uncertainties: [
      '模型未发布：全部成绩/规格/价格/日期为泄漏或站内基线，无任何官方确认',
      '代号混乱：Avocado 早期被当作 Llama 5（next.io/Geeky Gadgets），2026-07 BI/AI Weekly 澄清为 Muse Spark 内部代号；Watermelon 为在训模型（社区通称 Llama 5，官方未确认最终命名，也无「Maverick 变体」信息）',
      '「匹配 GPT-5.5」为 Wang 内部自证：未点名 benchmark、未独立复现、Meta 拒评；Llama 4 刷榜前科加重疑虑',
      '雷达与情绪比例为泄漏/社区预期外推的估算（非严格量化，同 OPUS_5 惯例）',
      '站内 models.ts 基线（2026-03-08 / swe 60.3 / ELO 1262 / 512K / 32K）无外部信源，与调研结果冲突；2026-08-09 已按本调研改为「未发布」口径（数值清零、仅保留泄漏标注）',
      'Reddit 精确赞数、X 转推数、知乎浏览量因反爬未能取得精确快照（热度数字以 HN Algolia/预测市场/抓取可得值为准）',
    ],
    sources: [
      { title: "Meta's Watermelon AI Model Has Caught up to GPT-5.5, Alexandr Wang Says", platform: 'Business Insider', url: 'https://www.businessinsider.com/meta-ai-model-catches-up-openai-gpt-5-says-2026-7' },
      { title: 'Meta sizes up GPT-5.5 with Watermelon', platform: 'The Rundown', url: 'https://www.therundown.ai/p/meta-sizes-up-gpt-5-5-with-watermelon' },
      { title: "Meta's Wang Says Watermelon Model Has Caught Up to GPT-5.5", platform: 'AI Weekly', url: 'https://aiweekly.co/alerts/metas-wang-says-watermelon-model-has-caught-up-to-gpt-55' },
      { title: 'When will Meta release Llama 5?', platform: 'Manifold Markets', url: 'https://manifold.markets/winged_one/when-will-meta-release-llama-5' },
      { title: 'Llama 4 Guide: Scout, Maverick, Behemoth Status & Muse Spark (2026)', platform: 'codersera', url: 'https://codersera.com/blog/llama-4-complete-guide-2026/' },
      { title: 'Will Meta Release Llama 5 This Year?', platform: 'next.io', url: 'https://next.io/prediction-markets/trending/will-meta-release-llama-5-this-year/' },
      { title: 'Do you believe Llama 5 will be open weights?', platform: 'Reddit · r/LocalLLaMA', url: 'https://www.reddit.com/r/LocalLLaMA/comments/1nyi5el/do_you_believe_llama_5_will_be_open_weights/' },
      { title: 'Llama惨遭抛弃！Meta内部改用Claude写代码', platform: '知乎 · 量子位', url: 'https://zhuanlan.zhihu.com/p/1926932813434848173' },
      { title: 'Meta abandons open-source Llama for proprietary Muse Spark', platform: 'The New Stack', url: 'https://thenewstack.io/meta-abandons-llama-spark/' },
    ],
  },
  bestInSlot: [
    {
      id: 'claude-code',
      note: '未发布无实测；若开源经 Ollama Anthropic 兼容 API 接入，成本零；发布后复测再定主力位。',
    },
    {
      id: 'cursor',
      note: '未发布无实测；Cursor 可经 OpenAI SDK 兼容 API 接入；编程槽位留 Muse Code，发布后复测。',
    },
    {
      id: 'openhands',
      note: '未发布无实测，Index 无条目；暂不作蜂群执行单元，先上 DeepSeek V4 / Qwen 3.6。',
    },
  ],
  teamIds: ['budget-vanguard', 'common-warlord'],
  trialGood: [
    { label: '开源自部署（预期）', to: '/scenarios#fullstack' },
    { label: '长程 Agentic 编程（泄漏方向）', to: '/scenarios#agent' },
    { label: '超长文档处理（若 512K 兑现）', to: '/scenarios#docs' },
    { label: '预算敏感自托管', to: '/scenarios#fullstack' },
  ],
  trialBad: [
    { label: '编程主力（当前）', to: '/scenarios#refactor', note: '未发布无实测；急需编程建议换 claude-opus-4-7 或闭源 Muse Code' },
    { label: '追求开箱即用', to: '/scenarios#fullstack', note: '跳票风险高（机构预测 2027），建议换 deepseek-v4-flash 或 kimi-k3' },
    { label: '前端快速出活', to: '/scenarios#frontend', note: 'Meta 前端历来弱（前代 Aider 15.6%），建议换 gemini-3-6-flash' },
    { label: '轻信内部基准', to: '/scenarios#algo', note: '「匹配 GPT-5.5」未独立验证，推理需求建议换 gpt-5-2 或 qwen3' },
  ],
  guideIds: ['beginner-first-model', 'beginner-budget', 'mech-context-decay', 'review-flow'],
};
