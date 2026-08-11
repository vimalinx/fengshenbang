import type { ModelDetailData } from '../modelDetails';

export const DETAIL: ModelDetailData = {
  modelId: 'deepseek-r2',
  profile: {
    apiId: 'deepseek-r2',
    vendor: 'DeepSeek（深度求索）',
    releaseDate: '2026-07-08',
    access: ['API', '开源权重', '本地部署'],
    costNote:
      '$1.5/$6 · Mtok（站点基线，约为 R1 的 2.7 倍；思考 token 全计费，实际成本看链长）；Spheron 成本表注明「R2 API 价未发布」并以 R1 价投影；2026-08-06 官方预告「significant」大幅涨价，性价比窗口收窄；FP8 权重 <600GB 可 8×H100 自托管',
    nicknames: ['推理链怪物', '别催交卷', '周赛之王'],
    signature: '推理链 4 万 token 级 · 数学难题思考量约为常规模型 100 倍',
  },
  benchGroups: [
    {
      label: '榜单成绩',
      rows: [
        { label: 'SWE-bench Verified', value: '68.9%（站点基线；低于 V4-Pro 76.4%）' },
        { label: 'LMArena Elo', value: '1352（2026 榜口径）' },
        { label: '推理链深度（数学竞赛题）', value: '20K–40K thinking tokens · 约常规模型 100×' },
        { label: 'KV 状态压缩（MLA）', value: '30K 思考链 ~2.1GB · 非 MLA 的约 1/7' },
        { label: 'AIME 2025（家族基准 R1-0528）', value: '87.5%（官方；R2 专项未披露）' },
        { label: '中文算法周赛', value: '实战登顶（站内 case-algo 攻略）' },
      ],
    },
    {
      label: '规格与接入',
      rows: [
        { label: '上下文窗口', value: '256,000 tok（Spheron 初稿 128K，以官方为准）' },
        { label: '最大输出', value: '96,000 tok' },
        { label: '价格（入/出）', value: '$1.5 / $6 · Mtok（08-06 官方预告涨价）' },
        { label: 'effort 档位', value: '—（无分档，思考深度由 token 预算控制）' },
        { label: '模型架构', value: 'MoE + MLA · ~685B 总参 / ~37B 激活（推测；泄漏 1.2T/78B 未证实）' },
        { label: '发布日期', value: '2026-07-08（站点基线；Spheron 称 3 月，口径冲突见存疑）' },
        { label: '获取方式', value: 'API · 开源权重 · 本地部署' },
      ],
    },
  ],
  rivalIds: ['deepseek-r1', 'glm-4-6', 'minimax-m3'],
  talents: [
    {
      kind: 'burst',
      seal: '链',
      name: '万级推理链',
      desc: '数学竞赛题先生成 2-4 万 thinking tokens 再作答，思考量约为常规模型（~400 token）的 100 倍，也是社区实测推理链之最。',
      metric: '40K thinking tokens · ≈ 常规模型 ×100',
    },
    {
      kind: 'skill',
      seal: '算',
      name: '竞赛数学',
      desc: '算法周赛与数学竞赛场景社区口碑第一梯队，站内「算法周赛登顶记」实战攻略背书；AIME 系推理承袭 R1 优势。',
      metric: '站内周赛登顶 · AIME 87.5%（R1-0528 官方口径）',
    },
    {
      kind: 'passive',
      seal: '压',
      name: 'MLA 潜藏压缩',
      desc: '改进版多潜头注意力把长思考链的 KV 压力压到可部署范围——30K 思考链 KV 仅 ~2.1GB，万级推理链在 8×H100 上才成为可能。',
      metric: 'KV 状态 ~2.1GB / 30K 链（非 MLA 15GB+）',
    },
    {
      kind: 'normal',
      seal: '价',
      name: '深思考白菜价',
      desc: '$1.5/$6 仍远低于闭源旗舰，FP8 权重 <600GB 可 8×H100 自托管，蒸馏 70B 变体单卡可跑。',
      metric: '$1.5/$6 · FP8 权重 <600GB',
    },
  ],
  constellation: [
    { version: 'R1-Lite-Preview', date: '2024-11', effect: '初试推理 · o1-preview 级 AIME/MATH' },
    { version: 'R1-Zero', date: '2025-01', effect: '纯 RL 觉醒 · 顿悟时刻自发涌现' },
    { version: 'R1', date: '2025-01-20', effect: '开源登顶 · 首个问鼎 Arena 总榜' },
    { version: 'R1-0528', date: '2025-05-28', effect: '思考加深 · Aider 71.6% · 函数调用觉醒' },
    { version: 'R2', date: '2026-07-08', effect: '推理链 40K · 深度推理特化 · 周赛登顶', current: true },
  ],
  community: {
    strengths: ['数学推理', '算法竞赛', '推理链深度', '开源可部署', '中文场景'],
    weaknesses: ['输出极慢', '简单任务过度思考', '编码弱于 V 系', '本地部署门槛高', '思考 token 全计费'],
    notes: [
      {
        label: '编程',
        text: 'R2 定位是推理而非编码主力：SWE-bench Verified 68.9%（站点基线）低于 DeepSeek 自家 V4-Pro 的 76.4%（localaimaster 2026-06 口径）与 V3.2 的 73.1%，社区共识「编码主 V4、难题主 R2」；r/ClaudeCode 实测「日常任务可用，多文件重构/安全相关 Opus 仍有优势」；harnesses.ts 显示 Aider 适配 88% 全站最高，但 20-40K 思考链在 agent 场景需预算控制，否则单文件修改等简单任务也动辄数分钟。',
      },
      {
        label: '推理',
        text: '核心卖点即推理链深度：数学竞赛题 20K-40K thinking tokens、约为常规模型 100 倍（Spheron 部署指南实测）；R1-0528 官方 AIME 2025 87.5% 是家族基准，R2 专项成绩官方未披露；Linux.do「新思维链以 I am 开头」487 赞热帖印证链式思考已是社区话题。分歧在成本与可控性：预算提示可砍 40-60% 思考量、classifier 路由可砍 70-80%（Spheron），但 R2 对提示的遵循只是「比 R1 更稳」（原话 somewhat more consistently），复杂题仍会无视提示拉满链长。',
      },
      {
        label: '中文',
        text: '中文算法/数学社区热捧：站内 case-algo 攻略「算法周赛登顶记」7.9k 阅读，知乎期待值拉满（「大家现在对 V4/R2 的期待值拉满」），剧透文（Hybrid MoE 3.0 / 1.2T / 成本暴降 97.3%）流传但未经证实；中文创作与日常闲聊专项反馈较少，无明显新增负面；审查与 R1 一脉相承（R1 时代 Promptfoo 1156 题 85% 拒绝率），R2 无专项评测。',
      },
    ],
    sentiment: { positive: 55, mixed: 25, negative: 20 },
    platforms: [
      {
        name: 'Reddit',
        tone: 'mix',
        summary:
          '发布后专项实测少：r/ollama「官网 R2 比 ollama 的 R1 好十倍」（1k8azpu）；r/ClaudeCode 实测「日常可用，多文件重构 Opus 仍有优势」；传闻期「华为派工程师驻场」257 赞/26 评（r/DeepSeek）。负面集中在假发布信息：r/ArtificialInteligence「R2 开源、9/12 项追平 GPT-4o」假帖被高赞扒皮。',
      },
      {
        name: 'HackerNews',
        tone: 'neg',
        summary:
          'Algolia 实测核验：2026-07-01 后 127 条 DeepSeek story 中 0 条 R2 专项发布帖，热度全被 V4-Flash-0731 抢占（779 pts/466 评）；R2 相关最大帖是传闻期 Reuters 转帖「R2 launch stalled as CEO balks at progress」140 pts/181 评（2025-06-27）。',
      },
      {
        name: '知乎',
        tone: 'pos',
        summary:
          '期待值拉满：「大家现在对 V4/R2 的期待值拉满」（Prover-V2 问题下高赞）；剧透文「DeepSeek R2剧透」流传（1.2T/78B 激活/成本暴降 97.3%，未证实）；「R2 什么时候可以上线」等期待帖密集；发布后专项复盘少，话题热度被 V4 系分流。',
      },
      {
        name: 'Linux.do',
        tone: 'pos',
        summary:
          '最厚的一手社区数据：「DeepSeek 新思维链出现了」5.9k 浏览/487 赞/189 帖（Jul 24）；「老外与实验室内部人士通了 4 小时电话」帖称「R2 是完全不同的智能」；「DeepSeek Harness 内测」帖（08-01）——中文推理圈对 R2 的认可度最高。',
      },
      {
        name: 'V2EX',
        tone: 'mix',
        summary:
          'R2 专项讨论稀少，话题以 V4 系为主：「Deepseek 网页端初次体验？不太满意」针对 V4（CFD 算子 1200 行代码直接塞满上下文）；中转站广告噪音多；R2 的算法/数学向讨论未形成独立热度。',
      },
      {
        name: '掘金',
        tone: 'mix',
        summary:
          'R2 实操类文章少，以 CSDN/导航站聚合转述为主（deepseek404.com「R2 专题」、多篇「提前发布」旧闻）；机制研究向内容集中在 V4 系；对 R2 的评论多为「期待」而非「实测」。',
      },
      {
        name: 'X',
        tone: 'mix',
        summary:
          '传闻期大量「R2 将至」推文：@imjustnewatai「on par with o3 full/high 且便宜得多」67 RT/64 回复；@haider1「gemini 3, deepseek v4, r2, claude 4.5 都很近」73 RT；发布后注意力转向 V4-Flash（08-09 评测博主「DeepSeek 带着疯狂 benchmark 回来了，超过 GLM 5.2/GPT-5.6/Kimi K3/Opus 5」指向 V4 系）。',
      },
    ],
    quotes: [
      { text: 'R2 不仅仅是渐进式改进，是一种完全不同的智能。', source: 'Linux.do · 内部人士电话帖', tone: 'pos' },
      { text: "I've used the Deepseek r2 model in their official website and its ten times better than the r1 model provided in ollama.", source: 'Reddit · r/ollama', tone: 'pos' },
      { text: 'on par with o3 full or o3 high while being a lot cheaper.', source: 'X · @imjustnewatai', tone: 'pos' },
      { text: '别催它交卷，让它把推理链走完。', source: '封神榜 · 站内实战提示', tone: 'pos' },
      { text: '编码主 V4、难题主 R2。', source: '中文社区共识', tone: 'pos' },
      { text: "First R2 doesn't exist.", source: 'Reddit · r/ArtificialInteligence 高赞', tone: 'neg' },
      { text: 'Opus still has an edge on bigger multi-file refactors.', source: 'Reddit · r/ClaudeCode', tone: 'neg' },
    ],
    controversies: [
      {
        event: '华为芯片试训失败与多次跳票（最大争议）：Reuters 2025-06-26 报道「CEO 对进展不满，R2 发布搁浅」（HN 140 pts/181 评）；2025-08-14 SiliconANGLE/The Register/TechSpot 相继报道 R2 训练从 Nvidia 换成华为 Ascend 后反复失败、被迫回退 Nvidia，华为芯片仅用于推理（r/DeepSeek 257 赞帖「华为派工程师团队驻场」）；winbuzzer 2026-01-19 称「彻底放弃华为芯片」；发布计划从「提前到 4 月」一路拖到站点基线 07-08。',
        response: 'DeepSeek 从未公开确认发布日期，对跳票与芯片切换全程未正面回应；The Information 2026-01-09 报道称将发布「强编码能力」新旗舰，与最终 R2 的推理定位有出入。',
      },
      {
        event: '发布口径混乱与信息真空：Spheron 部署指南称「R2 launched in March 2026」且全篇规格标注 provisional；decodethefuture（06 月）、layer3labs（07-21）、felloai（07 月）仍称「未发布」；官方无技术报告、无模型卡、无确认日期——架构（~685B/37B vs 泄漏 1.2T/78B）与上下文（256K vs 128K）均无官方口径。',
        response: '官方未回应；信息真空本身成为社区谈资，并催生了山寨站与假发布帖（见下条）。',
      },
      {
        event: '山寨站与虚假发布信息：deepseekr2.today 自称「Official Launch」，实为营销套话页（「10x+ Reasoning Power」「3x faster response」无任何真实规格，链接全部导向 deepseek.com）；r/ArtificialInteligence 出现「R2 已开源、12 项基准 9 项追平 GPT-4o、零 API 成本」假帖，被高赞评论逐条扒皮（「First R2 doesn’t exist……甚至说 May 2025 而我们在 2026」）。',
        response: '官方未回应（无需回应）；但信息真空期山寨内容泛滥是 R2 独有的社区现象，令「R2 实测」类内容真伪难辨。',
      },
    ],
    upgradeConsensus: 'split',
    consensusNote:
      '推理党值得升：R1 → R2 是推理链的质变（12-23K → 20-40K thinking tokens），数学/算法/周赛场景口碑第一梯队，站内 case-algo 攻略 7.9k 阅读背书，官网实测「比 R1 好十倍」（r/ollama）。编码党建议观望：SWE 68.9% 反而低于 V3.2（73.1%）与 V4-Pro（76.4%），日常编码「编码主 V4、难题主 R2」已成共识；且思考链极慢、预算提示非 100% 生效。预算敏感玩家可等 V4-Flash 系（更便宜更快）或继续用 R1-0528（$0.55/$2.19）——R2 的 $1.5/$6 加思考全计费，价差需要真实难题才赚得回来。',
    benchmarkGap:
      '「推理名副其实、工程名不副实」：40K 思考链与数学/算法口碑和体感一致，是社区公认的推理之最；但若按推理名声期待编码表现会明显失望——SWE 68.9% 不及自家 V3.2/V4-Pro，也不在闭源第一梯队（Opus 5 97.0%、GPT-5.6 Sol 96.2%）。落差第二源是速度：20-40K 思考链把 TTFT 拉到数秒（8K 思考 p50 ~6s @8×H100），「别催它交卷」从梗变成日常负担。缓解方案：预算提示/classifier 路由砍 40-80% 思考量（Spheron），编码任务分流 V4-Flash，只把 R2 留在真正的高难推理上。',
    radar: [
      { axis: '长程任务', value: 62 },
      { axis: '编程工程', value: 68 },
      { axis: '抽象推理', value: 95 },
      { axis: '上下文利用', value: 70 },
      { axis: '中文能力', value: 80 },
      { axis: '响应速度', value: 30 },
      { axis: '稳定性', value: 55 },
      { axis: '指令遵循', value: 60 },
      { axis: '易用性', value: 48 },
      { axis: '性价比', value: 78 },
    ],
    danmaku: [
      { text: '让 R2 完整展示推理链，别催它交卷', platform: 'linuxdo', main: true },
      { text: '新思维链出现了，以 I am 开头', platform: 'linuxdo', main: true },
      { text: '官网 R2 比 ollama 的 R1 好十倍', platform: 'reddit', main: true },
      { text: 'R2 是完全不同的智能，不只是渐进改进', platform: 'linuxdo', main: true },
      { text: '华为芯片试训失败，发布一拖再拖', platform: 'reddit', main: true },
      { text: '期待值拉满，热度却被 V4-Flash 抢走', platform: 'hn', main: true },
      { text: "First R2 doesn't exist", platform: 'reddit', main: false },
      { text: '本地跑不要 API 费，但得自己买硬件', platform: 'reddit', main: false },
      { text: '140 pts：CEO 对进展不满，发布搁浅', platform: 'hn', main: false },
      { text: '推理成本暴降 97.3%（剧透，未证实）', platform: 'zhihu', main: false },
      { text: '编码主 V4、难题主 R2', platform: 'zhihu', main: false },
      { text: 'Opus still has an edge on bigger refactors', platform: 'reddit', main: false },
      { text: '山寨官网蹭热度，无真实规格', platform: 'x', main: false },
      { text: '08-06 官方预告 API 大幅涨价', platform: 'hn', main: false },
      { text: '算法周赛登顶记：R2 的推理链有多长', platform: 'zhihu', main: false },
    ],
    versionDelta: {
      base: 'DeepSeek-R1（R1-0528）',
      improves: [
        'SWE-bench Verified 49.2%（R1 官方）→ 68.9%（站点基线）',
        '上下文窗口 128K → 256K',
        '最大输出 — → 96K（R1 未披露上限）',
        '数学竞赛思考链 R1 ~12-23K → R2 20-40K thinking tokens',
        'MLA 升级：30K 思考链 KV 状态约 2.1GB，约为非 MLA 同级的 1/7（61 层 FP16 口径）',
        '对思考预算提示的遵循更稳（R2「somewhat more consistently than R1」，Spheron）',
        '总参 671B → ~685B（provisional；泄漏称 1.2T/78B 未证实）',
      ],
      regresses: [
        'LMArena Elo 1398 → 1352（跨时代榜单口径，不可直接对比）',
        '编码工程让位 V 系：SWE 68.9% 低于 V3.2 的 73.1% 与 V4-Pro 的 76.4%',
        '思考链更长 → TTFT 更久（8K 思考 p50 ~6s @8×H100），「别催它交卷」成日常',
        '简单任务过度思考，预算提示不总生效',
        '部署门槛更高：FP8 权重 600-700GB、8×H100 起步',
        '发布拖期近一年半（2025-05 → 2026-07），期间 V4/V4-Flash 抢走话题与口碑',
        '价格 $0.55/$2.19 → $1.5/$6（约 2.7×），思考 token 全计费',
      ],
    },
    subBoards: [
      { name: '算法/数学推理（社区口碑）', rank: '第一梯队', note: '站内 case-algo 登顶攻略；AIME 系延续 R1 优势；官方未披露专项成绩' },
      { name: '推理链长度（社区实测）', rank: '20K-40K tokens 之最', note: '数学竞赛题口径（Spheron）' },
      { name: 'LMArena', rank: 'Elo 1352', note: '站点基线，2026 榜口径' },
      { name: '中文算法社区（Linux.do）', rank: '5.9k 浏览热帖', note: '「新思维链」帖 487 赞' },
      { name: 'WebDev/编程子榜', rank: '未上榜', note: '编码非主打，V4 系才是' },
    ],
    heat: [
      { label: 'HN 发布帖', value: '无专项帖（Algolia 核验 0 条）' },
      { label: 'HN 最大相关帖', value: '140 pts / 181 评（2025-06 搁浅帖）' },
      { label: 'Reddit 最高赞', value: '257（r/DeepSeek 华为芯片帖）' },
      { label: 'Linux.do 思维链帖', value: '5.9k 浏览 / 487 赞' },
    ],
    harnessReviews: [
      {
        id: 'claude-code',
        text: 'r/ClaudeCode「works fine for a lot of the day to day stuff」；建议配预算提示（system prompt 砍 40-60% 思考量）与精简配置，否则简单任务也会被拉成数分钟长链。',
      },
      {
        id: 'aider',
        text: 'git-first 单任务工作流与 R2「单题深推理」定位天然契合；预算敏感玩家可用 FP8 自托管 + Aider 组「本地深推理套餐」，把 $1.5/$6 的 API 成本换成自托管算力。',
      },
      {
        id: 'openhands',
        text: '参照 R1 在 OpenHands 的 SWE 34% 历史，推理模型在 agent 多步链路吃亏，20-40K 思考链易吃满上下文；建议蜂群流当「单轮高难推理单元」，简单任务分流 V4-Flash。',
        placeholder: true,
      },
    ],
    expertQuotes: [
      {
        text: 'R2 is the direct successor [to R1], with a provisionally larger total parameter count and two architectural improvements that matter for deployment: improved MLA and deeper expert routing.',
        name: 'Spheron 技术团队',
        role: 'GPU 云部署指南 · 架构解析',
        tone: 'pos',
      },
      {
        text: 'Unconstrained R2 reasoning chains hit 20,000-40,000 tokens on hard math and science problems.',
        name: 'Spheron 技术团队',
        role: '部署指南 · 推理链实测',
        tone: 'pos',
      },
      {
        text: 'DeepSeek R2 is set to launch soon, on par with either o3 full or o3 high while being a lot cheaper.',
        name: '@imjustnewatai',
        role: 'X · 67 RT / 64 回复',
        tone: 'pos',
      },
      {
        text: "I've used the Deepseek r2 model in their official website and its ten times better than the r1 model provided in ollama.",
        name: 'u/ ollama 用户',
        role: 'Reddit · r/ollama 实测帖',
        tone: 'pos',
      },
      {
        text: 'R2 不仅仅是一种渐进式改进，它是一种完全不同的智[能]。',
        name: 'Linux.do 电话帖',
        role: '内部人士电话译文 · 热帖 647305',
        tone: 'pos',
      },
      {
        text: '新思维链以 I am 开头，符合之前 GA 版本的思维链。',
        name: 'u/ 风云雨',
        role: 'Linux.do · 5.9k 浏览 487 赞帖',
        tone: 'pos',
      },
      {
        text: '深度求索新一代大模型 R2 将采用更先进的混合专家模型（MoE），并通过优化的门控网络层提升高负载推理任务的性能。',
        name: '中关村在线',
        role: '科技媒体 · 发布前报道',
        tone: 'pos',
      },
      {
        text: '让 R2 完整展示推理链，别催它交卷。',
        name: '封神榜站内试炼',
        role: '实战提示 · trials.ts',
        tone: 'pos',
      },
      {
        text: 'The DeepSeek harness is the only free AI coding agent I\'ve tested this year that genuinely competes with Claude Code and Cursor on real shipped work.',
        name: 'Julian Goldie',
        role: 'AI Profit Boardroom · DeepSeek 系 harness 横评',
        tone: 'pos',
      },
      {
        text: 'R2 基于 R1 的强化学习 pipeline，包含两个 RL 阶段（优化推理模式和对齐人类偏好）和两个监督微调阶段……预计通过扩大的 RL 数据集进一步提升逻辑推理和问题解决能力。',
        name: '腾讯云开发者社区',
        role: '技术媒体 · 发布前深度解析',
        tone: 'pos',
      },
      {
        text: 'R2 responds to these hints somewhat more consistently than R1 on structured problem types.',
        name: 'Spheron 技术团队',
        role: '部署指南 · 预算提示实测（可砍 40-60% 思考量）',
        tone: 'mix',
      },
      {
        text: 'You can point Claude Code at DeepSeek through the API provider settings, works fine for a lot of the day to day stuff. Where it falls short is on bigger multi-file refactors and anything security-adjacent, Opus still has an edge.',
        name: 'r/ClaudeCode 实测用户',
        role: 'Reddit · Claude Code + DeepSeek 帖',
        tone: 'mix',
      },
      {
        text: '采用自主创新的 Hybrid MoE 3.0 架构，总参数达 1.2 万亿……推理成本比 GPT-4 暴降 97.3%。',
        name: '知乎剧透专栏',
        role: 'zhuanlan 剧透文（未证实，疑标题党）',
        tone: 'mix',
      },
      {
        text: 'DeepSeek R2 launched in March 2026. Some architecture specifications referenced in this guide…… are based on pre-release and early post-release information. Treat specific numbers as provisional.',
        name: 'Spheron 免责声明',
        role: '部署指南 · 发布日与规格口径',
        tone: 'mix',
      },
      {
        text: 'DeepSeek R2 launch stalled as CEO balks at progress.',
        name: 'Reuters',
        role: 'HN 转载 · 140 pts / 181 评',
        tone: 'neg',
      },
      {
        text: "DeepSeek's next AI model delayed by attempt to use Chinese chips.",
        name: 'r/LocalLLaMA 帖主',
        role: 'Reddit · 华为芯片跳票帖',
        tone: 'neg',
      },
      {
        text: 'DeepSeek abandoned attempts to train its R2 AI model on Huawei chips after persistent failures, switching back to Nvidia hardware despite Beijing\'s push for domestic semiconductors.',
        name: 'winbuzzer',
        role: '科技媒体 · 2026-01-19',
        tone: 'neg',
      },
      {
        text: "First R2 doesn't exist. Then in one of the comments it links to another post mentioning R1-0528 which is not R2, and then it even says May 2025 when we're in 2026.",
        name: 'r/AI 高赞评论',
        role: 'Reddit · 假发布帖扒皮',
        tone: 'neg',
      },
      {
        text: "Of course running a model locally doesn't have an API cost — you're literally running it on your own hardware. But you have to buy, maintain, and power your own hardware.",
        name: 'r/AI 高赞评论',
        role: 'Reddit · 假「零成本」帖反驳',
        tone: 'neg',
      },
      {
        text: 'This is some kind of gpt-2 intelligence level agent.',
        name: 'r/AI 热评',
        role: 'Reddit · 假 R2 开源帖',
        tone: 'neg',
      },
      {
        text: '自称「官方发布」的 deepseekr2.today 只有营销套话——10x+ Reasoning Power、3x faster response，无任何真实规格。',
        name: '社区扒皮帖',
        role: '信息真空期山寨站现象',
        tone: 'neg',
      },
    ],
    timeline: [
      { date: '2025-06-26', event: 'Reuters 报道「CEO 对进展不满，R2 发布搁浅」（HN 140 pts / 181 评），跳票叙事启动' },
      { date: '2025-08-14', event: 'SiliconANGLE / The Register 报道华为 Ascend 芯片试训失败、回退 Nvidia，华为芯片仅用于推理' },
      { date: '2026-01-19', event: 'winbuzzer 称 DeepSeek 彻底放弃华为芯片路线' },
      { date: '2026-07-08', event: 'R2 正式发布（站点基线）；发布窗口内 HN 无 R2 专项帖，热度被 V4 系分流' },
      { date: '2026-07-24', event: 'Linux.do「DeepSeek 新思维链出现了」5.9k 浏览 / 487 赞；同日旧 API 名 deepseek-reasoner 退役路由至 V4-Flash' },
      { date: '2026-08-01', event: 'Linux.do「DeepSeek Harness 内测」帖；FreeBuff 等 DeepSeek 系免费 harness 生态成型' },
      { date: '2026-08-06', event: '官方预告 API「significant」大幅涨价（HN 85 pts），性价比窗口收窄' },
      { date: '2026-08-07', event: '发布窗内 DeepSeek 最大热度仍属 V4-Flash-0731（HN 779 pts / 466 评）' },
    ],
    demos: [
      { title: '数学证明演示', desc: 'Spheron 部署指南示例：求证 √2 无理数，输出包含 <think> 推理块与完整证明链（示例 max_tokens 16K，实测链长可达 20-40K）。' },
      { title: '算法周赛实战', desc: '站内 case-algo 攻略「算法周赛登顶记：R2 的推理链有多长」7.9k 阅读，实测推理链在竞赛场景的登顶过程。' },
      { title: '8×H100 部署演示', desc: 'Spheron 全流程：HF 权重下载（FP8 <600GB）→ vLLM TP=8 启动 → chunked-prefill 处理 1-3 万 token 思考链，p50 TTFT ~6s。' },
    ],
    uncertainties: [
      '发布日口径冲突：站点基线 07-08；Spheron 称「3 月发布」；decodethefuture/layer3labs/felloai 等 2026 年 6-7 月文章仍称「未发布」；官方从未确认日期、未发技术报告',
      '架构与参数量为推测：~685B/37B（Spheron provisional）；知乎剧透与泄漏称 1.2T/78B 均未证实；官方无模型卡',
      'R2 专项榜单成绩未找到：AIME/ARC 用家族基准（R1-0528 AIME 2025 87.5%）替代；SWE 68.9 与 Elo 1352 为站点基线，非第三方复测',
      '各平台情绪比例（55/25/20）与雷达为代表性帖文估算，非严格量化；知乎浏览量精确值未取到，heat 以 Linux.do 5.9k 浏览替代',
      'API 标识推测为 deepseek-r2（deepseek-reasoner 已于 07-24 退役路由至 V4-Flash）；价格 $1.5/$6 为站点基线，08-06 官方预告大幅涨价后即将过时',
      'R2 无 effort 档位调节，省略 effortBench；许可条款（Spheron 引 Arcee 称「opaque licensing」）未找到官方页面',
    ],
    sources: [
      { title: 'Deploy DeepSeek R2 on GPU Cloud（架构/推理链/部署实测）', platform: 'Spheron Blog', url: 'https://www.spheron.network/blog/deploy-deepseek-r2-gpu-cloud/' },
      { title: 'DeepSeek R2 launch stalled as CEO balks at progress', platform: 'Reuters via Hacker News', url: 'https://news.ycombinator.com/item?id=44394916' },
      { title: 'DeepSeek V4 Flash 0731（发布窗内最大热度帖，R2 缺席对照）', platform: 'Hacker News', url: 'https://news.ycombinator.com/item?id=49214008' },
      { title: 'DeepSeek R2 just went open-source（假发布帖与扒皮）', platform: 'Reddit · r/ArtificialInteligence', url: 'https://www.reddit.com/r/ArtificialInteligence/comments/1te9jv1/' },
      { title: 'Huawei sent a team of engineers to DeepSeek（257 赞）', platform: 'Reddit · r/DeepSeek', url: 'https://www.reddit.com/r/DeepSeek/comments/1mpts3q/' },
      { title: 'Deepseek r2 model?（官网实测十倍于 R1）', platform: 'Reddit · r/ollama', url: 'https://www.reddit.com/r/ollama/comments/1k8azpu/deepseek_r2_model/' },
      { title: 'DeepSeek 新思维链出现了（5.9k 浏览 / 487 赞）', platform: 'Linux.do', url: 'https://linux.do/t/topic/2645630' },
      { title: '老外与 Deepseek 实验室内部人士通了 4 个小时的电话', platform: 'Linux.do', url: 'https://linux.do/t/topic/647305' },
      { title: 'DeepSeek R2剧透（1.2T/78B 泄漏，未证实）', platform: '知乎', url: 'https://zhuanlan.zhihu.com/p/1909006179973173696' },
      { title: "Deepseek's Failed Gambit with Huawei Chips", platform: 'winbuzzer', url: 'https://winbuzzer.com/2026/01/19/deepseeks-failed-gambit-with-huawei-chips-exposes-chinas-ai-hardware-reality-xcxwbn/' },
    ],
  },
  bestInSlot: [
    {
      id: 'claude-code',
      note: '官方集成指南背书，社区实测「日常任务可用」；多文件重构/安全相关 Opus 仍占优。',
    },
    {
      id: 'aider',
      note: '站点 harnesses.ts 认证 Aider 全站最高适配（88%，高于 gpt-5-2 的 86%）。',
    },
    {
      id: 'openhands',
      note: '无 R2 专项实测（占位）；定位「单轮高难推理单元」，不宜作多步代理主力。',
    },
  ],
  teamIds: ['galaxy-warship', 'budget-vanguard'],
  trialGood: [
    { label: '算法周赛与数学难题', to: '/scenarios#algo' },
    { label: '单题深度推理', to: '/scenarios#algo' },
    { label: '代码审查推理', to: '/scenarios#refactor' },
    { label: '蜂群推理核心', to: '/scenarios#agent' },
  ],
  trialBad: [
    { label: '快速编码迭代', to: '/scenarios#fullstack', note: '思考链 20-40K、TTFT 数秒起，建议换 gemini-3-6-flash 或 deepseek-v4-flash' },
    { label: '长程 Agentic 任务', to: '/scenarios#agent', note: '无原生 agent 优化、推理链吃满上下文，建议换 kimi-k2 或 deepseek-v4' },
    { label: '前端快速出活', to: '/scenarios#frontend', note: '编码非主打且输出慢，建议换 gemini-3-flash' },
    { label: '简单日常问答', to: '/scenarios#fullstack', note: '过度思考、性价比差，建议换 deepseek-v4-flash' },
  ],
  guideIds: ['case-algo', 'mech-output-token', 'mech-context-decay', 'beginner-budget'],
};
