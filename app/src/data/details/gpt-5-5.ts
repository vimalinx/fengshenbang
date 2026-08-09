import type { ModelDetailData } from '../modelDetails';

export const DETAIL: ModelDetailData = {
  modelId: 'gpt-5-5',
  profile: {
    apiId: 'gpt-5.5',
    vendor: 'OpenAI',
    releaseDate: '2026-04-23',
    access: ['API', 'ChatGPT 订阅', 'Codex 内置', 'GitHub Copilot'],
    costNote:
      '$5/$30 · Mtok，较 5.4 翻倍（$2.5/$10）；超 272K 输入按 2x 入 / 1.5x 出计费；Fast 模式 1.5x 速度 / 2.5x 价格；Batch/Flex 半价',
    nicknames: ['薛定谔的脑子', '卡516', '超级实习生'],
    signature: 'SWE-bench 88.7% 登顶第一档 · ARC-AGI-2 85.0% SOTA · 1M 上下文当时最大',
  },
  benchGroups: [
    {
      label: '榜单成绩',
      rows: [
        { label: 'SWE-bench Verified', value: '88.7% · #1' },
        { label: 'ARC-AGI-2', value: '85.0% · SOTA（ARC Prize 官方验证）' },
        { label: 'MMLU', value: '92.4% · #1' },
        { label: 'Terminal-Bench 2.0', value: '82.7% · #1（agentic coding）' },
        { label: 'OPQA 真实调试', value: '1.7%（5.3 Codex 为 5.8%）' },
        { label: 'CTF 安全', value: '96.3%（vs 5.4 的 88.2%）' },
        { label: 'LMArena 总榜', value: 'Pro #3（Elo 1551）· 主线 #5（1523）' },
        { label: 'BenchLM 公共榜', value: '#11/213 · 72.01' },
        { label: 'SWE-Bench Pro', value: '58.6%（较 5.4 仅 +1%）' },
      ],
    },
    {
      label: '规格与接入',
      rows: [
        { label: '上下文窗口', value: '1,050,000 tok（API；Codex 内官方 400K，社区实测约 258K）' },
        { label: '最大输出', value: '128,000 tok' },
        { label: '价格（入/出）', value: '$5 / $30 · Mtok' },
        { label: 'effort 档位', value: 'none / low / medium / high / xhigh' },
        { label: '模型架构', value: 'MoE（社区推测，官方未公开）' },
        { label: '发布日期', value: '2026-04-23' },
        { label: '获取方式', value: 'API · ChatGPT 订阅 · Codex 内置' },
      ],
    },
  ],
  rivalIds: ['claude-sonnet-5', 'gemini-3-5-pro', 'gpt-5-2'],
  talents: [
    {
      kind: 'skill',
      seal: '程',
      name: '单文件速修',
      desc: '社区公认「修复某一个 Bug 时感觉良好」，单文件/单需求任务效率高；代码审查精确度较 5.4 大幅提升。',
      metric: 'CodeRabbit 问题发现率 79.2% · 精确度 40.6%',
    },
    {
      kind: 'skill',
      seal: '文',
      name: '1M 长文吞吐',
      desc: 'API 上下文 1M 为发布期最大，大代码库/长文档可整仓分析；但 Codex 内官方口径仅 400K，社区实测约 258K，营销与体感有落差。',
      metric: '上下文 1,050,000 tok · 最大输出 128K',
    },
    {
      kind: 'burst',
      seal: '破',
      name: '网络攻防破局',
      desc: 'GPT-5.5-Cyber 成为继 Mythos 之后第二个完成 AISI 多步网络攻击模拟的模型；DayBreak 完整版 CyberGym 85.6% 超 Mythos 5。',
      metric: 'AISI 多步网络攻击模拟 · Arm Metis 98% · CyberGym 85.6%',
    },
    {
      kind: 'passive',
      seal: '算',
      name: '科学数据分析',
      desc: 'GeneBench/BixBench 显著优于前代，科学数据赛道与 5.4 拉开差距；NVIDIA 研究员实测「比竞品更有创造力」。',
      metric: 'GeneBench 19.0%→25.0% · BixBench 74.0%→80.5%',
    },
  ],
  constellation: [
    { version: 'GPT-5', date: '2025-08-07', effect: '路由统一 · 发布即登顶 LMArena 全榜' },
    { version: 'GPT-5.2', date: '2025-12-11', effect: 'SWE 80% · AIME 满分 · ARC-AGI-2 三倍跃升' },
    { version: 'GPT-5.4', date: '2026-03', effect: '256K 上下文 · 面向企业 agentic 工作流' },
    { version: 'GPT-5.5', date: '2026-04-23', effect: 'SWE 88.7% · 1M 上下文 · 516 截断风暴', current: true },
  ],
  community: {
    strengths: ['单 Bug 速修', 'Benchmark 顶分', '1M 长上下文', '科学数据分析', '代码审查'],
    weaknesses: ['516 推理截断', '静默降级', '指令遵循差', '事实幻觉偏高', '长会话漂移'],
    notes: [
      {
        label: '编程',
        text: '两极分化且 harness 依赖严重：SWE-bench 88.7% 领跑、CodeRabbit 精确度 27.9%→40.6%，单文件/Bug 修复「感觉良好」（V2EX）；但 OPQA（OpenAI 内部 20 个真实工程瓶颈）通过率仅 1.7%，而 5.2 Codex 曾达 8.33%——真实调试能力逐代退步（Gregory Terzian 04-25，Medium）。516 截断让 xhigh 复杂编程降智，5 月截断率飙至 53%（issue #30364）。跨 harness 落差巨大：同一 GPT-5.5 在 Cursor SDK 功能正确率 87.2%、原生 Codex 仅 61.5%（Endor Labs 04-27）；掘金 VP 关嘉伟实测「Claude Code 一 compact 半张脸都没了」后转投 Codex 5.5（05-08）。',
      },
      {
        label: '推理',
        text: '简单/标准推理仍强：MMLU 92.4%、FrontierMath Tier 1-3 51.7%、ARC-AGI-2 85.0%（ARC Prize 官方验证 SOTA）；但需深度推理的任务被 516 截断后骤降——HN 用户 nsingh2 复现同一逻辑题 516 token 必错、6000-8000 token 答对；推理 token 均值从 2 月 268 降至 5 月 107（-60%），社区共识为 serving-side batching bug 而非模型变笨。系统卡里被埋的 OPQA 显示：模型擅长写大段 bash 脚本、却对「诊断隐蔽性能回退」类真实工程问题越来越弱（5.5 的 1.7% vs 5.2 Codex 8.33%）。',
      },
      {
        label: '中文',
        text: '负面偏多：知乎「怎么在我这跟弱智一样」获大量共鸣，V2EX w568w「听不懂人话」137 回复，并给出实测排名「Opus 4.8 ≈ Opus 4.6 >> Opus 4.7 > GPT 5.5 ≈ MiMo 2.5 Pro >> GPT 5.2~5.4」（06-04）；neteroster 则称「5.5 是执行的神，opus 是规划的神」。正面代表为「24 小时不睡觉的超级实习生」评测（知乎）与「写东西终于没那么 AI 味」（纳米网/钛媒体）；中文创作未见明显退步，问题集中在指令遵循、长会话漂移与静默降级后的体感波动（V2EX 07-24 反映 5.6 上线后 Pro 被切到 5.5-mini）。',
      },
    ],
    sentiment: { positive: 20, mixed: 22, negative: 58 },
    platforms: [
      {
        name: 'Reddit',
        tone: 'neg',
        summary:
          '负面为主：r/codex「516 reasoning tokens issue is not isolated」75 票、静默配额削减帖引爆「Codex GPT 5.5 is UNUSABLE right now」；issue #28211 用户实测「明确配置 GPT-5.5 High 却被自主降级到 mini」；r/OpenAI「hallucinating like crazy」广泛共鸣；发布帖 369 票（08-01 快照，本机 Reddit 全 403 无法复核）。',
      },
      {
        name: 'HackerNews',
        tone: 'neg',
        summary:
          '偏负面但技术讨论理性：516 帖 372 点/152 评（07-04）、幻觉 3x GLM-5.2 帖 585 点/294 评（06-19，均实测核实）；发布帖 1,580 点/1,056 评（04-23）；主流认为是 batching bug 而非故意降智，但批评 OpenAI 迟迟不回应；XCSme 实测「5.5 low 打平 5.4 medium、成本仅 82%」。',
      },
      {
        name: '知乎',
        tone: 'neg',
        summary:
          '负面强烈：新智元「思考一到516就断」广泛传播；「实锤降智」披露 chatgptdisaster 整理 1,087 条经验证投诉；「200 美元月费买了个薛定谔的脑子」成梗；正面代表为「24 小时不睡觉的超级实习生」评测与「失去它像被截肢」（英伟达内测工程师，身份未具名）。',
      },
      {
        name: 'Linux.do',
        tone: 'mix',
        summary:
          '218 浏览技术帖确认修改系统提示词可缓解 xhigh 降智但非根治；实测 Codex 中 5.5 实际上下文约 258K（远低于官方 1M）、credit 消耗较 5.4 翻倍（input 125 vs 62.5）；6 月「codex 降智降麻了」多帖共鸣；亦有「5.6-sol 仍有少量 1034 截断但结果正确」的对照测试。',
      },
      {
        name: 'V2EX',
        tone: 'neg',
        summary:
          '「听不懂人话」137 回复、「高估了 GPT5.5 ehigh 的能力」22 回复；w568w 6 月开帖详列「擅自动手、口癖、结构化表达问题」并给出模型排名；「现在 5.5 蠢的没法用，单纯写代码还不如 composer2.5」；07-24 起「5.6 出来后 Pro 自动降智切 5.5-mini」成新槽点。',
      },
      {
        name: 'X',
        tone: 'mix',
        summary:
          "分化：OpenAI 官方宣传 benchmark 与 NVIDIA 全员部署（黄仁勋「Let's jump to lightspeed」全员邮件）；Lisan al Gaib 静默降级帖在 𝕏 炸锅引发中文媒体跟进；Matt Shumer「没注意到明显变强」；@0J0BIT 516 报告（82% 截断来自 GPT-5.5）仅 2 赞传播有限。",
      },
    ],
    quotes: [
      { text: '这根本不是一个聊天机器人，这是一个 24 小时不睡觉的超级实习生', source: '知乎评测', tone: 'pos' },
      { text: '修复某一个 Bug 或者解决某一个单一需求时 GPT 给我的感觉良好', source: 'V2EX', tone: 'pos' },
      { text: '5.5 是执行的神，opus 是规划的神', source: 'V2EX · neteroster', tone: 'pos' },
      { text: '我把 Claude Code 卸得差不多', source: '掘金 · 关嘉伟（趋境科技 VP）', tone: 'pos' },
      { text: '纯吐槽贴。太长不看：听不懂人话', source: 'V2EX · 137 回复', tone: 'neg' },
      { text: 'Codex GPT 5.5 is UNUSABLE right now, the Nerf is REAL!', source: 'r/codex', tone: 'neg' },
      { text: '200 美元月费买了个薛定谔的脑子', source: '知乎 · 静默降级热评', tone: 'neg' },
      { text: 'occasionally it will seemingly short circuit and think for exactly 516 tokens', source: 'HN · nsingh2', tone: 'neg' },
    ],
    controversies: [
      {
        event:
          '516 推理 token 截断 bug：GPT-5.5/xhigh 在 Codex 中推理输出精确卡在 516 token（及 1034/1552/2070 等间隔 518 的倍数），被截断的响应更易出错。GitHub issue #30364 分析 390,195 条记录：精确 516 事件 3,363 次、GPT-5.5 占全部响应的 19.3% 却贡献 82.0%，exact-516/≥516 比率 44%（其他模型 1.3%，差 34 倍）；5 月截断率飙至 53%，推理 token 均值 268→107。首个任务级复现 issue #29353 开启 23 分钟即被标 not_planned 关闭；经 Claude Code 代理路径同样出现（用户 yogesh1239）。',
        response:
          'OpenAI 未发布正式声明；issue #30364 标注 bug/model-behavior/rate-limits 三 label 仍开放；社区自出 bentoner/codex-516-hook 检测插件，并以「修改系统提示词 + 用 high/medium 档」缓解。',
      },
      {
        event:
          '静默降级 + 静默配额削减：Plus 用户 3 小时 160 条用完后静默切换 mini、UI 不提示；Pro 高负载时 Heavy 被限流；issue #28211 用户实测「明确配置 GPT-5.5 High 却被自主降级到 mini」；HAR 日志显示 resolved_model_slug 降级为 gpt-5-5-mini；chatgptdisaster.com 整理 1,087 条经验证投诉；Linux.do 实测 Codex credit 消耗较 5.4 翻倍（input 125 vs 62.5），r/codex 称配额被暗中砍 10-20 倍。',
        response:
          'OpenAI Help Center 承认 160 条/3 小时后切换 mini 机制，但描述为「功能」而非 bug；KuCoin 报道「acknowledged the issue but has not yet provided a fix」；对配额削减未见官方回应。',
      },
      {
        event:
          '事实幻觉率上升与「60% 降幅」营销争议：r/OpenAI 上线 10 天内 14+ 条「自信编造事实」投诉；Artificial Analysis 独立评测 AA-Omniscience 幻觉率 86%（无工具），为 Claude Opus 4.7 两倍以上；UseWire.ai 发现系统卡实际数字为声明级 +23%/响应级 -3%，「60% 降幅」并非系统卡数据；HN 爆出 GPT-5.5 幻觉率 3x MIT 许可的 GLM-5.2（585 点/294 评）。',
        response:
          'OpenAI 未正面回应；UseWire 以「context engineering win」角度解读，社区建议事实密集任务换用 Gemini 3.5 Pro 或 5.4。',
      },
      {
        event:
          'goblin 输出倾向：GPT-5.5 在 Codex 中频繁输出「地精/哥布林」相关内容，社区发现其系统提示词明确禁止提及 goblins，OpenAI 承认源自 Nerdy 人格训练奖励信号（HN 04-28 帖 47935132）。',
        response:
          'OpenAI 官方博客《Where the Goblins Came From》（04-29）公开解释并移除 Nerdy 人格、过滤含 creature 词训练数据、加 Codex 开发者提示词。',
      },
    ],
    upgradeConsensus: 'wait',
    consensusNote:
      '短任务（单文件修复、代码审查、科学分析）可升级；长程/事实密集型任务建议保留 GPT-5.4 或转其他模型；xhigh 在 516 修复前慎用，改用 high/medium。多数开发者倾向「等 5.6」，但 07-19 出现 Save GPT-5.5 挽留站——5.6 上线后部分用户反而怀念 5.5 的执行能力，社区呈「等 5.6 修好 / 回 5.5」两派。',
    benchmarkGap:
      '「分数高、体感差」的集大成案例：SWE-bench 88.7% 登顶、ARC-AGI-2 85.0% SOTA，但 OPQA 真实调试仅 1.7%（逐代退步）、SWE-Bench Pro 仅 +1%、AA-Omniscience 幻觉率 86%。根因不止 516：同一模型在 Cursor SDK 功能正确率 87.2%、原生 Codex 仅 61.5%（Endor Labs，harness 差 26 点）；官方 1M 上下文在 Codex 内实为 400K（社区实测约 258K），用户实际跑的模型/环境与 benchmark 测试并非同一套。缓解：high/medium 档 + 修改系统提示词 + 用 harness 优化层（Cursor > Codex CLI）。',
    radar: [
      { axis: '长程任务', value: 45 },
      { axis: '编程工程', value: 60 },
      { axis: '抽象推理', value: 62 },
      { axis: '上下文利用', value: 75 },
      { axis: '中文能力', value: 58 },
      { axis: '响应速度', value: 55 },
      { axis: '稳定性', value: 40 },
      { axis: '指令遵循', value: 45 },
      { axis: '易用性', value: 60 },
      { axis: '性价比', value: 35 },
    ],
    danmaku: [
      { text: '思考一到 516 就断，越难越翻车', platform: 'zhihu', main: true },
      { text: '82% 的精确 516 截断来自 GPT-5.5', platform: 'hn', main: true },
      { text: 'Codex GPT 5.5 is UNUSABLE right now', platform: 'reddit', main: true },
      { text: '花最贵的钱，买最烂的体验', platform: 'zhihu', main: true },
      { text: '24 小时不睡觉的超级实习生', platform: 'zhihu', main: true },
      { text: '听不懂人话：137 回复实锤', platform: 'v2ex', main: false },
      { text: '失去它像被截肢（英伟达内测工程师）', platform: 'zhihu', main: false },
      { text: '5.5 是执行的神，opus 是规划的神', platform: 'v2ex', main: false },
      { text: '修改系统提示词可缓解 xhigh 降智', platform: 'linuxdo', main: false },
      { text: 'GPT 5.5 pro is hallucinating like crazy', platform: 'reddit', main: false },
      { text: '静默降级：UI 没变，模型偷偷换 mini', platform: 'zhihu', main: false },
      { text: 'Save GPT-5.5：5.6 上线后用户挽留', platform: 'hn', main: false },
      { text: '5.5 蠢的没法用，不如 composer2.5', platform: 'v2ex', main: false },
      { text: 'SWE-Bench Pro 仅 +1%，这才是重点', platform: 'reddit', main: false },
      { text: 'still does everything thrown at it except UI', platform: 'reddit', main: false },
    ],
    versionDelta: {
      base: 'GPT-5.4',
      improves: [
        '上下文窗口 256K → 1M token（1,050,000；Codex 内官方 400K）',
        'SWE-bench Verified 约 85% → 88.7%，登顶第一档',
        'ARC-AGI-2 达 85.0%，ARC Prize 官方验证新 SOTA',
        'Terminal-Bench 2.0 达 82.7%，agentic coding 领跑',
        'GeneBench 19.0% → 25.0%，BixBench 74.0% → 80.5%',
        'CodeRabbit 问题发现率 58.3% → 79.2%，精确度 27.9% → 40.6%',
        'CTF 安全 88.2% → 96.3%，代码执行速度更快',
      ],
      regresses: [
        'OPQA 真实调试通过率 1.7%（5.3 Codex 5.8%、5.2 Codex 8.33%）——逐代退步',
        '事实回忆类幻觉率反升：r/OpenAI 10 天内 14+ 条「自信编造事实」投诉',
        '静默降级：Plus 160 条/3 小时用尽后静默切 mini，UI 不提示',
        '516 token 推理截断：xhigh 复杂编程降智，5 月截断率飙至 53%',
        '指令遵循退化：多步指令丢步骤、未经允许越权操作',
        '定价翻倍 $2.5/$10 → $5/$30，同 benchmark 实测贵约 3.5x（XCSme）',
        'Hard negative protein binding 3.46% → 0%（系统卡隐藏基准）',
      ],
    },
    subBoards: [
      { name: 'LMArena 总榜', rank: 'Pro #3 · Elo 1551', note: '主线 #5（Elo 1523）' },
      { name: 'LMArena 编程子榜', rank: '#3 · Elo 1531', note: '落后 Kimi K3（1600）与 Opus 4.8（1582），与「SWE 高分但编程体感差」一致' },
      { name: 'AAII 推理榜', rank: '#1 · 59', note: 'Pro 档推理子榜登顶' },
      { name: 'OpenHands Index', rank: '65.9', note: 'OpenHands harness 下 swe-bench 78.2 / swt-bench 83.4 / gaia 86.1' },
      { name: 'BenchLM 公共榜', rank: '#11/213 · 72.01', note: '此前快照 #9/200（73.51），排名下滑' },
    ],
    heat: [
      { label: 'HN 发布帖', value: '1,580 pts · 1,056 评' },
      { label: 'HN 516 bug 帖', value: '372 pts · 152 评' },
      { label: 'HN 幻觉 3x 帖', value: '585 pts · 294 评' },
      { label: 'Reddit 发布帖', value: '369 票（08-01 快照）' },
    ],
    harnessReviews: [
      {
        id: 'claude-code',
        text: '无原生支持，需 LiteLLM / claudex / claude-code-gpt 等代理转译。J.D. Hodges 发布次日（04-24）实测：llm-openai-via-codex 插件复用 Codex OAuth，relay 路径 4.5s vs codex exec 10.7s，称「awesome pair」，50+ 次快速调用后触发限流；claude-code-gpt 同任务 GPT-5.5 约 $4 vs GPT-5.4-mini $0.43。掘金 VP 关嘉伟 05-08 实测：Claude Code「compact 一压半张脸都没了」、验收时「明显的问题没找出来」，两周后转投 Codex 5.5。注意 516 截断经代理路径同样出现（issue #29353），且 GPT-5.5 无 Computer Use 对标（LiteLLM 报错）。',
      },
      {
        id: 'cursor',
        text: '原生接入，CursorBench 3.1 官方成绩：High 58.4%（$2.05/task）、Extra High 58.4%（$2.85）、Medium 53.8%、Low 46.6%（官方公告 72.8% 为内部预发布口径，三方按 3.1 默认口径 59.2%）。Endor Labs 04-27 实测：Cursor SDK + GPT-5.5 功能正确率 87.2% vs 原生 Codex 61.5%（差 26 点），安全项 23.5%。Cursor 联创 Michael Truell 04-24 背书「更聪明、更有韧性、工具调用更可靠」。论坛真实反馈：cache 生命周期过短（Artemonim）、订阅额度被按 on-demand 扣费（29M tokens 异常账单）；50% 折扣至 05-02。',
      },
      {
        id: 'openhands',
        text: '官方推荐 GPT 家族首选（docs 明确 `openai/gpt-5.5`），OpenHands Index 均分 65.9：swt-bench 83.4、gaia 86.1、swe-bench 78.2、commit0 43.8、swe-bench-multimodal 38.2（04-27~05-08，v1.18.1/v1.21.1）。software-agent-sdk PR #2975（04-27）正式加入配置、集成测试 18/18 通过共 $6.36；agent-canvas PR #1103（06-04）把默认 onboarding LLM 从 claude-opus-4-8 改为 gpt-5.5。经 acp-codex 变体 SWE-bench 仅 64.2%、Terminal-Bench 29.6——harness 差异显著，建议搭配规划型模型。',
      },
    ],
    expertQuotes: [
      {
        text: "the first coding model I've used that has serious conceptual clarity. GPT-5.4 could not. GPT-5.5 could.",
        name: 'Dan Shipper',
        role: 'Every 创始人兼 CEO · OpenAI 发布页引述',
        tone: 'pos',
      },
      {
        text: 'GPT-5.5 比上一代更聪明、更有韧性，调用工具更可靠，面对复杂长期任务时能坚持更久。',
        name: 'Michael Truell',
        role: 'Cursor 联合创始人兼 CEO',
        tone: 'pos',
      },
      {
        text: "Losing access to GPT‑5.5 feels like I've had a limb amputated.（失去它像被截肢）",
        name: '英伟达内测工程师',
        role: 'NVIDIA · OpenAI 发布页引述（身份未具名）',
        tone: 'pos',
      },
      {
        text: "It's more than faster coding—it's a new way of working that helps people operate at a fundamentally different speed.",
        name: 'Justin Boitano',
        role: 'NVIDIA VP of Enterprise AI',
        tone: 'pos',
      },
      {
        text: "Let's jump to lightspeed. Welcome to the age of AI.",
        name: '黄仁勋（Jensen Huang）',
        role: 'NVIDIA CEO · 全员邮件（10,000+ 员工先行开放 Codex）',
        tone: 'pos',
      },
      {
        text: '原本是 Claude Code 的重度用户，现在基本不打开了……连续在一个项目里干了 8 个小时，我基本上每次都点「继续」。',
        name: '关嘉伟',
        role: '趋境科技 VP · 掘金两周实测',
        tone: 'pos',
      },
      {
        text: '5.5 是执行的神，opus 是规划的神。',
        name: 'neteroster',
        role: 'V2EX 用户',
        tone: 'pos',
      },
      {
        text: '这根本不是一个聊天机器人，这是一个 24 小时不睡觉的超级实习生。',
        name: '知乎评测',
        role: '知乎 · 实测长文',
        tone: 'pos',
      },
      {
        text: 'GPT-5.5 still does everything thrown at it except UI.',
        name: 'u/ 发布帖用户',
        role: 'Reddit r/OpenAI · 369 票帖',
        tone: 'pos',
      },
      {
        text: 'GPT‑5.5 seems to be much more creative compared to competitors.',
        name: 'Shaunak Joshi',
        role: 'NVIDIA AI 研究员',
        tone: 'pos',
      },
      {
        text: 'OPQA 通过率仅 1.7%，而 5.3 Codex 有 5.8%、5.2 Codex 有 8.33%——模型在真实调试类任务上逐代退步。',
        name: 'Gregory Terzian',
        role: 'Medium ·《The Benchmark They Buried》作者',
        tone: 'neg',
      },
      {
        text: 'occasionally it will seemingly short circuit and think for exactly 516 tokens, and return the wrong result. When it ends up using 6000-8000 thinking tokens it returns the correct result.',
        name: 'HN 用户 nsingh2',
        role: 'Hacker News · 516 帖高赞',
        tone: 'neg',
      },
      {
        text: '纯吐槽贴。太长不看：听不懂人话。',
        name: 'w568w',
        role: 'V2EX · 137 回复热帖楼主',
        tone: 'neg',
      },
      {
        text: 'Codex GPT 5.5 is UNUSABLE right now, the Nerf is REAL!',
        name: 'u/ 配额帖用户',
        role: 'Reddit r/codex',
        tone: 'neg',
      },
      {
        text: '花最贵的钱，买最烂的体验。',
        name: '新智元',
        role: '中文科技媒体 · 评测标题',
        tone: 'neg',
      },
      {
        text: '200 美元月费买了个薛定谔的脑子。',
        name: '知乎 / 新智元',
        role: '知乎 · 静默降级热评',
        tone: 'neg',
      },
      {
        text: 'GPT 5.5 pro is hallucinating like crazy——给它一个 C++ 类修改，它把已存在的方法重新实现了一遍。',
        name: 'u/ 幻觉投诉帖楼主',
        role: 'Reddit r/OpenAI',
        tone: 'neg',
      },
      {
        text: '5.5 is overcomplicating it……It is unable to do K.I.S.S. Instead of just adding an endpoint, it creates a service, middleware…',
        name: 'HN 用户 darqis',
        role: 'Hacker News · OpenRouter 价格帖热评',
        tone: 'neg',
      },
      {
        text: '两个天花板：大系统的格局判断视野受限；完全甩手时给的方案大概率中规中矩，你得先把思路甩过去。',
        name: '关嘉伟',
        role: '趋境科技 VP · 掘金实测（上限面）',
        tone: 'mix',
      },
      {
        text: '同 benchmark 5.5 比 5.4 medium 贵约 3.5x，但 5.5 low 打平 5.4 medium、成本仅 82%——n8n 真实使用后，用 5.5 low 是当下最优解。',
        name: 'HN 用户 XCSme',
        role: 'Hacker News · aibenchy 实测',
        tone: 'mix',
      },
      {
        text: 'xhigh 不适合写代码，会过分思考——建议用 5.5 high 或者 5.4 xhigh。',
        name: 'maolon',
        role: 'V2EX 用户',
        tone: 'mix',
      },
    ],
    timeline: [
      { date: '04-22', event: 'GPT-5.5 先行在 Codex 中发布（HN 提前曝出，story 47858903，17 点/3 评）' },
      { date: '04-23', event: 'ChatGPT 正式上线；HN 发布帖 1,580 点/1,056 评论；OpenAI 官方 X 同步官宣' },
      { date: '04-24', event: 'API 开放 + GitHub Copilot GA；同日 Anthropic 发 postmortem 承认 Claude Code「降智」并重置订阅额度，被指「转移对 GPT-5.5 的注意力」' },
      { date: '05-05', event: 'GPT-5.5 Instant 发布（低成本快速档），取代 5.3 Instant 成为 ChatGPT 默认' },
      { date: '05-27', event: '静默降级被实锤：官方文档承认 Plus 160 条/3 小时后自动切换 mini，新浪财经/知乎/36氪广泛报道' },
      { date: '06-19', event: 'HN 爆出 GPT-5.5 幻觉率 3x MIT 许可的 GLM-5.2（585 点/294 评），幻觉争议发酵' },
      { date: '06-23', event: 'GPT-5.5-Cyber（DayBreak）完整发布，CyberGym 85.6% 超 Mythos 5（05-07 已先限量预览）' },
      { date: '06-27', event: '开发者 vguptaa45 开启 Codex issue #30364，516 token 截断 bug 进入公共视野（390K 条记录分析、3,363 次截断）' },
    ],
    demos: [
      {
        title: 'Introducing GPT-5.5（官方发布演示）',
        desc: 'OpenAI 官方发布页主打 1M 上下文、agentic coding（Terminal-Bench 82.7%）与多推理档位，宣称「a new class of intelligence for real-world work」；并引述 NVIDIA 内测工程师「失去它像被截肢」。',
      },
      {
        title: 'GPT-5.5 System Card（系统卡）',
        desc: '发布即公开系统卡，披露幻觉率/安全/生物风险评测，官方称幻觉率降 52.5%-60%，后被 UseWire 指出系统卡实际数字为声明级 +23%/响应级 -3%；埋藏的 OPQA 1.7%、Hard negative protein binding 0% 引发「Benchmark They Buried」批判。',
      },
      {
        title: 'GPT-5.5-Cyber DayBreak（网络安全演示）',
        desc: '展示 GPT-5.5-Cyber 自主渗透/漏洞挖掘能力，成为第二个完成 AISI 多步网络攻击模拟的模型；Arm Metis 配合实测固件漏洞基准 98%，CyberGym 85.6% 超 Mythos 5。',
      },
    ],
    uncertainties: [
      '模型架构：OpenAI 未公开参数量/MoE 细节，社区推测为 MoE 但无确证',
      'OpenAI 对 516 bug 未见正式声明：GitHub issue #30364 标注 bug/model-behavior/rate-limits 三 label 仍开放',
      'Reddit 数字无法复核（本机 www/old/api/r.jina.ai 全 403）：发布帖 369 票为 08-01 调研快照',
      '「失去它像被截肢」的英伟达内测工程师身份未具名（OpenAI 发布页引述），无姓名职位',
      'Codex 内上下文官方口径 400K 与 Linux.do 实测约 258K 并存，与 API 的 1M 差异具体机制未公开',
      '各平台情绪比例为代表性帖文估算（整体 58/22/20），十维体感评分为综合社区反馈的主观推断值',
    ],
    sources: [
      { title: 'Introducing GPT-5.5 | OpenAI', platform: 'OpenAI 官方', url: 'https://openai.com/index/introducing-gpt-5-5/' },
      { title: 'GPT-5.5 System Card | OpenAI', platform: 'OpenAI 官方', url: 'https://openai.com/index/gpt-5-5-system-card/' },
      { title: 'GPT-5.5 Codex reasoning-token clustering at 516/1034/1552 · Issue #30364', platform: 'GitHub', url: 'https://github.com/openai/codex/issues/30364' },
      { title: 'GPT-5.5 - Hacker News（发布帖 1,580 点/1,056 评论）', platform: 'Hacker News', url: 'https://news.ycombinator.com/item?id=47879092' },
      { title: 'GPT-5.5 Codex reasoning-token clustering（516 帖 372 点/152 评）', platform: 'Hacker News', url: 'https://news.ycombinator.com/item?id=48789428' },
      { title: 'GPT-5.5 Review: The Benchmark They Buried（OPQA 1.7%）', platform: 'Medium', url: 'https://medium.com/@polyglot_factotum/gpt-5-5-system-card-review-133161a1f2e7' },
      { title: 'GPT-5.5 Sets a New Code Security Record With Cursor (Not Codex)', platform: 'Endor Labs', url: 'https://www.endorlabs.com/learn/gpt-5-5-sets-a-new-code-security-record-with-cursor-not-codex-in-agent-security-league' },
      { title: 'OpenHands Index: GPT-5.5 results（Index 65.9）', platform: 'OpenHands', url: 'https://github.com/OpenHands/openhands-index-results/tree/main/results/GPT-5.5' },
      { title: "OpenAI's New GPT-5.5 Powers Codex on NVIDIA Infrastructure", platform: 'NVIDIA Blog', url: 'https://blogs.nvidia.com/blog/openai-codex-gpt-5-5-ai-agents/' },
      { title: '实测GPT5.5：最强模型不是嘴炮，它真能干活儿（ARC-AGI-2 85.0%）', platform: '钛媒体', url: 'https://www.tmtpost.com/7965226.html' },
    ],
  },
  bestInSlot: [
    {
      id: 'claude-code',
      note: '需代理转译层（LiteLLM / claudex / claude-code-gpt）接入，建议 high/medium 档避开 xhigh 的 516。J.D. Hodges 发布次日实测 relay 4.5s 响应、称「awesome pair」；claudex 可让 Claude Code 感知 1M 窗口，系统提示词隔离可把开销从 ~20k 降到 ~6.6k tokens。体感对照：掘金 VP 关嘉伟从 Claude Code 迁移到 Codex 5.5 的实测说明 GPT-5.5 强项在原生 Codex harness，代理路径适合「Claude Code 操作习惯 + GPT-5.5 推理」的混合流。',
    },
    {
      id: 'cursor',
      note: '原生接入 + 官方背书：Cursor 联创 Michael Truell 亲自点赞；CursorBench 3.1 High 档 58.4%/$2.05 per task；Endor Labs 实测功能正确率 87.2%——比原生 Codex 的 61.5% 高 26 点，是当前 GPT-5.5 性价比最高的 harness。建议 default high、避 xhigh，注意 cache 生命周期与订阅扣费异常（论坛多例）；双模型槽位可组「GPT-5.5 执行 + Claude 规划」复核流。',
    },
    {
      id: 'openhands',
      note: '官方推荐 GPT 家族首选：OpenHands Index 65.9（swe-bench 78.2、swt-bench 83.4、gaia 86.1），SDK 集成测试 18/18 通过、默认 onboarding LLM 已切到 gpt-5.5；蜂群式长任务调度时 5.5 是执行核心，但 commit0 43.8 与 acp-codex 变体 64.2% 提示长程仓库搭建仍是短板，建议搭配规划型模型使用。',
    },
  ],
  teamIds: ['fengshen-flagship', 'galaxy-warship'],
  trialGood: [
    { label: '单文件 Bug 修复', to: '/scenarios#refactor' },
    { label: '代码审查走查', to: '/scenarios#refactor' },
    { label: '1M 长文分析', to: '/scenarios#docs' },
    { label: '简单推理与数据', to: '/scenarios#algo' },
  ],
  trialBad: [
    { label: '长程多步编程', to: '/scenarios#agent', note: '2 小时 goal 模式成品崩溃，建议换 Claude Sonnet 5' },
    { label: '事实密集问答', to: '/scenarios#docs', note: '幻觉率高于 5.4，引用类任务建议换 Gemini 3.5 Pro' },
    { label: '严格指令遵循', to: '/scenarios#refactor', note: '多步指令丢步骤、越权操作，建议换 Claude Sonnet 5' },
    { label: 'xhigh 深推理', to: '/scenarios#algo', note: '516 截断率高，建议换 DeepSeek R2' },
  ],
  guideIds: ['case-refactor', 'mech-context-decay', 'review-flow', 'mech-output-token'],
};
