import type { ModelDetailData } from '../modelDetails';

export const DETAIL: ModelDetailData = {
  modelId: 'qwen3-coder',
  profile: {
    apiId: 'Qwen/Qwen3-Coder-480B-A35B-Instruct · API qwen3-coder-plus',
    vendor: '阿里巴巴通义千问（Alibaba Qwen）',
    releaseDate: '2025-07-22',
    access: ['开源权重（Apache 2.0）', 'API（百炼 qwen3-coder-plus）', 'Qwen Code CLI', 'Claude Code proxy'],
    costNote:
      'qwen3-coder-plus $0.65/$3.25 · Mtok（OpenRouter 实测价，1M 上下文、最大输出 65,536 tok）；开源权重 Apache 2.0 免费商用，30B-A3B（Qwen3-Coder-Flash）本地即可跑；480B 本地 Q6 约 408GB、Q4_0 需 6×7900XTX 仅 7 tok/s',
    nicknames: ['Claude 国产平替', 'Best Kept Secret', 'Qwen3-Coder-Flash'],
    signature: 'SWE-bench 66.5% · 开源 Agentic 三榜 SOTA · 媲美 Claude Sonnet 4',
  },
  benchGroups: [
    {
      label: '榜单成绩',
      rows: [
        { label: 'SWE-bench Verified', value: '66.5% · 开源第一梯队' },
        { label: 'Terminal-Bench', value: '37.5% · 超 Claude 4 Sonnet' },
        { label: 'Aider Polyglot', value: '61.8%（Unsloth 复测）' },
        { label: 'CRUXEval（代码推理）', value: '92.13' },
        { label: 'EvalPlus / MultiPL-E', value: '86.66 / 88.00' },
        { label: 'FullStackBench en/zh', value: '62.54 / 63.07' },
        { label: 'Codeforces', value: '1800' },
      ],
    },
    {
      label: '规格与接入',
      rows: [
        { label: '上下文窗口', value: '256,000 tok（YaRN 可扩 1M；plus API 1M）' },
        { label: '最大输出', value: '65,536 tok（qwen3-coder-plus API）' },
        { label: '价格（入/出）', value: '$0.65 / $3.25 · Mtok' },
        { label: 'effort 档位', value: '—（Instruct 非思考系，无档位调节）' },
        { label: '模型架构', value: 'MoE · 总参 480B / 激活 35B · 160 专家激活 8 · 62 层' },
        { label: '发布日期', value: '2025-07-22（Next 迭代 2026-02-03）' },
        { label: '获取方式', value: '开源 Apache 2.0 · API · Qwen Code CLI · Claude Code proxy' },
      ],
    },
  ],
  rivalIds: ['kimi-k2', 'glm-4-6', 'qwen3'],
  talents: [
    {
      kind: 'burst',
      seal: '破',
      name: 'Agentic 编程破局',
      desc: '开源界最完整的 agentic 编程答案：Agentic Coding / Agentic Browser-Use / Agentic Tool-Use 三榜开源 SOTA，官方称「comparable to Claude Sonnet 4」；后训练走执行驱动 Code RL + Long-Horizon Agent RL（阿里云 2 万并行环境），发布当天即获 r/LocalLLaMA 1.9K 赞。',
      metric: 'SWE-bench 66.5% · Terminal-Bench 37.5% 超 Claude 4 Sonnet',
    },
    {
      kind: 'skill',
      seal: '程',
      name: '代码 RL 规模化',
      desc: '7.5T tokens（70% 代码占比）预训练 + 自动扩测试用例的 Code RL，把「hard-to-solve, easy-to-verify」任务当强化学习主战场；代码推理 CRUXEval 92.13 全场最亮，全栈 FullStackBench-zh 63.07 反超英文。',
      metric: '7.5T tokens（70% 代码）· CRUXEval 92.13',
    },
    {
      kind: 'passive',
      seal: '源',
      name: '全链路开源',
      desc: '权重（Apache 2.0）+ 配套 CLI（Qwen Code，fork 自 Gemini Code）双开源；官方直接给出 Claude Code proxy / Cline / 百炼 API 三条接入方案，Harness 生态一夜成型。',
      metric: '480B 权重 · Qwen Code CLI · 官方 3 条接入方案',
    },
    {
      kind: 'normal',
      seal: '速',
      name: '极速托管',
      desc: 'Cerebras 托管实测约 2000 tok/s，Windsurf 内置上线（@devindesktop 实测视频 103 转推）；本地 480B 则相反，Q4_0 6×7900XTX 仅 7 tok/s——云端快、本地慢的两极。',
      metric: '2000 tok/s（Cerebras）· 本地 7 tok/s（6×7900XTX）',
    },
  ],
  constellation: [
    { version: 'Qwen2.5-Coder-32B', date: '2024-11', effect: '开源编程奠基 · Aider 73.7 媲美 GPT-4o' },
    { version: 'Qwen3-Coder-480B', date: '2025-07', effect: 'Agentic 破局 · SWE 66.5 · 媲美 Sonnet 4' },
    { version: 'Qwen3-Coder-30B-A3B', date: '2025-08', effect: 'Flash 轻量分身 · 3B 激活本地丝滑' },
    { version: 'Qwen3-Coder-Next', date: '2026-02', effect: '80B/3B 效率跃迁 · SWE 70.6 · 蒸馏 480B', current: true },
  ],
  community: {
    strengths: ['Agentic 编程', '开源性价比', '工具调用', '256K 长上下文', '部署灵活'],
    weaknesses: ['工具调用循环 bug', 'agentic 过拟合', '480B 本地门槛高', '非代码能力弱', '渠道限速不稳'],
    notes: [
      {
        label: '编程',
        text: '开源 Agentic 编程天花板共识扎实：SWE-bench 66.5% + Terminal-Bench 37.5% 超 Sonnet 4 + 三榜开源 SOTA，HN 发布帖 765 分、Reddit 1.9K 赞一片叫好；「Is Qwen3-coder the best kept secret out there?」成 r/LocalLLaMA 热帖。但分歧同样尖锐：初版 480B 工具调用 bug（发布数日官方公告需重下载）、QwenCode/llama.cpp 工具支持未就绪、知乎雨飞「循环烧钱」（单帖实测成本失控）、V2EX 免费额度「8 月中各种截断报错」；本地用户甚至分化——「30B-Coder 有点 agentic 过拟合，通用 30B-A3B-2507 更好用」成为 r/LocalLLaMA 高赞。',
      },
      {
        label: '推理',
        text: '设计重点不是通用推理而是代码推理：CRUXEval 92.13、MultiPL-E 88.00 是强项；但模型是 Instruct 非思考系（无 effort 档位），LiveCodeBench v6 仅 44.93、Codeforces 1800，均低于同门 Qwen3-235B-Thinking（74.1 / 2134）——「代码特化、通用推理让位」是社区共识；Next 版以 3B 激活做到 SWE-bench Verified 70.6（arXiv 2603.00729），印证「小激活 + Agent RL」路线在 agentic 推理上的有效性。',
      },
      {
        label: '中文',
        text: '中文社区热度是系列之最：知乎问题被浏览 41.2 万+、152 个回答（2026-08-10 快照），「编程能力比肩 Claude 4」成高赞共识；FullStackBench-zh 63.07 高于英文 62.54，中文全栈任务实测有优势；「Claude Code / Gemini CLI 国产平替」成中文社区主流叙事（CSDN/掘金同源转述）；中文专项负面反馈较少，工具循环与限速属通用问题而非中文特有问题。',
      },
    ],
    sentiment: { positive: 50, mixed: 25, negative: 25 },
    platforms: [
      {
        name: 'Reddit',
        tone: 'pos',
        summary:
          '发布帖「Qwen3-Coder is here!」1.9K 赞/258 评；「Best kept secret」热帖与 252 赞模型卡帖延续热度。负面集中在本地体验：480B Q4_0 6×7900XTX 仅 7 tok/s（34 赞 46 评）、30B-Coder 被指 agentic 过拟合（高赞评论「通用版更好用」）、初版工具调用 bug 需重下载（74 赞 23 评）。',
      },
      {
        name: 'HackerNews',
        tone: 'mix',
        summary:
          '发布帖 765 pts/366 评（Algolia 实测核验）；swyx 与 stuartjohnson12 就「benchmark hacking」展开攻防（swyx 称指控不诚恳），sourcecodeplz「Qwen team is top in open models, esp. for coding」代表主流认可；danielhanchen（Unsloth CEO）称「extremely powerful」；mohsen1 点出「MoE 真能本地跑」是兴奋点。',
      },
      {
        name: '知乎',
        tone: 'pos',
        summary:
          '问题被浏览 41.2 万+/152 回答（关注 558）；高赞答主卜寒兮「数据很亮眼，又把开源能力拉高了一截」；深度评测「综合能力与 Claude 和 Gemini 处于同一梯队，部分任务甚至更优」；雨飞「工具循环烧钱」与「吹爆全网？尴尬到想删」（限速吐槽）构成反方声音。',
      },
      {
        name: 'Linux.do',
        tone: 'pos',
        summary:
          'Qwen Code CLI 实操帖密集，无大爆款横评但共识明确：「性能完全不输 Gemini CLI 和 Claude Code，国内运行更稳定、费用相对更低」；后续 3.6 系讨论中「Qwen3-Coder-Next 是本地最佳」被反复引用；仓库失败 CI 归因于模型「不能举一反三」也是常见批评。',
      },
      {
        name: 'V2EX',
        tone: 'mix',
        summary:
          '发布帖「号称媲美 Sonnet 4，试了一下效果还不错」；但半个月实测帖（GLM4.5/ds3.1/qwen3-coder 横评）称「8 月中各种截断报错，基本没法用」——魔搭免费额度不稳；30B 本地帖主流推荐仍是「QWen3-30B-A3B-2507 效果最佳」（非 Coder 版）。',
      },
      {
        name: '掘金',
        tone: 'pos',
        summary:
          '「国产最牛代码大模型！最详细 Qwen3 Coder 性能测评与使用指南」热度高，接入教程密集（Qwen Code npm 安装 + 百炼 key 三步跑通）；结论「实测验证完全不输 Gemini CLI 和 Claude Code，在国内运行更加稳定且费用相对较低」。',
      },
      {
        name: 'X',
        tone: 'pos',
        summary:
          '官方推文 1,434 转推（「最强大的开源 agentic 代码模型」）；Cerebras 2000 tok/s 上线 Windsurf 实测视频 103 转推；@askOkara「grok code fast → qwen 3 coder」开源替代对照表 201 转推；整体正面，批评集中在工具调用与免费额度。',
      },
    ],
    quotes: [
      { text: 'Qwen3-Coder 的数据很亮眼，又把开源模型的能力拉高了一截。编程能力比肩 Claude 4，这本身就是最大的亮点，要知道这是一款开源模型。', source: '知乎 · 高赞答主卜寒兮', tone: 'pos' },
      { text: 'Is Qwen3-coder the best kept secret out there?', source: 'Reddit · r/LocalLLaMA 热帖', tone: 'pos' },
      { text: 'Qwen3 Coder for Claude Code replaced my full-stack use of Opus 4.6; it\'s fine for basic web apps with only slightly higher error rate.', source: 'HN · storus', tone: 'pos' },
      { text: 'The experience felt surprisingly close to GPT-4\'s agent mode.', source: 'jayvanzyl · Cursor Agent Mode 实测', tone: 'pos' },
      { text: '一旦陷入了循环，需要立马停掉，不然你的成本就要无限上去了。', source: '知乎 · 雨飞实测', tone: 'neg' },
      { text: '一个小小的括号问题，Qwen3-Coder 竟然检查了 10 多分钟。', source: '苏米客 · 避坑指南', tone: 'neg' },
      { text: 'Qwen has previously engaged in deceptive benchmark hacking.', source: 'HN · stuartjohnson12', tone: 'neg' },
    ],
    controversies: [
      {
        event: '480B 初版工具调用失效（2025-07 末）：r/LocalLLaMA「Heads up to those that downloaded Qwen3 Coder 480B before yesterday」74 赞/23 评；苏米客记录「国外开发者发现 480B 工具调用全部失败」；llama.cpp 工具支持未就绪被指根因。',
        response: '官方在 30B-A3B 发布公告中说明 480B 工具调用已修复、需重新下载权重（官方未否认初版问题）。',
      },
      {
        event: '工具调用循环烧钱（发布两周内）：知乎雨飞「一旦陷入循环需立马停掉，成本无限上去」，建议「现在尽量不要直接调用 API」；Qwen Code issue #3159「子代理无限循环调用同一工具」为同类实证。',
        response: '官方未直接回应；后续 Qwen3-Coder-Next 以 800K 可验证任务 + 多格式工具模板训练缓解格式脆弱性。',
      },
      {
        event: '「benchmark hacking」历史指控（发布帖热评）：stuartjohnson12 引 winbuzzer 2025-01-29 报道（Qwen2.5-Coder 时代自报 SOTA 争议）称「no software engineer you know was writing code with Qwen 2.5」，质疑 SWE 自报成绩。',
        response: 'swyx 当场反驳「this is disingenuous」，指出开源模型生态阻碍与榜单成绩无关；社区分「信」「疑」两派，官方未回应。',
      },
      {
        event: '免费渠道限速不稳：知乎 roo code 用户「coder 一直限速」；V2EX 魔搭每日免费实测「8 月中各种截断报错，基本没法用」。',
        response: '属渠道问题非模型本体，官方未专门回应；百炼按量付费可绕开免费额度限制。',
      },
    ],
    upgradeConsensus: 'split',
    consensusNote:
      'Agentic 编程/长程重构场景值得立即升级：SWE-bench 66.5% 开源第一梯队、Terminal-Bench 37.5% 超 Sonnet 4、官方 Claude Code proxy 直通，storus 实测已取代 Opus 4.6 全栈用途；但工具调用循环/初版 bug、免费渠道限速与「agentic 过拟合」（30B-Coder 本地体感不如通用 2507）让通用与本地场景分化——本地用户建议留在 Qwen3-30B-A3B-2507 或直接上 Next（3B 激活 SWE 70.6），API 预算敏感场景用 qwen3-coder-plus 低输出档防循环失控。',
    benchmarkGap:
      '官方「开源 SOTA、媲美 Sonnet 4」的榜单叙事与日常体感存在三层落差：① 工具链层——初版 480B 工具调用 bug（发布数日需重下载）、QwenCode/llama.cpp 适配未就绪（1mu3tln）让「agentic 招牌」在真实 harness 里打折扣；② 成本层——知乎雨飞「循环烧钱」、V2EX「各种截断报错」说明免费渠道体验不稳；③ 能力层——agentic 特化挤压通用能力（LCB v6 44.93 vs 同门 235B 74.1），本地 480B Q6 408GB、6×7900XTX 仅 7 tok/s 又给「开源平民」人设泼冷水。根因是「模型强、工具链未适配」+「特化过深」；缓解：官方 proxy + 最新权重、本地选 30B-A3B 或 Next、简单任务切通用 2507。',
    radar: [
      { axis: '长程任务', value: 82 },
      { axis: '编程工程', value: 90 },
      { axis: '抽象推理', value: 58 },
      { axis: '上下文利用', value: 78 },
      { axis: '中文能力', value: 88 },
      { axis: '响应速度', value: 70 },
      { axis: '稳定性', value: 60 },
      { axis: '指令遵循', value: 66 },
      { axis: '易用性', value: 72 },
      { axis: '性价比', value: 90 },
    ],
    danmaku: [
      { text: 'Qwen3-Coder is here! 发布帖 1.9K 赞', platform: 'reddit', main: true },
      { text: 'Is Qwen3-coder the best kept secret out there?', platform: 'reddit', main: true },
      { text: '发布帖 765 pts：开源 agentic 新王', platform: 'hn', main: true },
      { text: '1,434 转推：最强大的开源 agentic 代码模型', platform: 'x', main: true },
      { text: '41 万浏览：编程能力比肩 Claude 4', platform: 'zhihu', main: true },
      { text: 'Qwen Code 已成 Claude Code 国产平替', platform: 'linuxdo', main: true },
      { text: '480B 工具调用已修复，需重新下载权重', platform: 'reddit', main: false },
      { text: '30B-Coder 有点 agentic 过拟合，还是通用版好用', platform: 'reddit', main: false },
      { text: 'swyx：说开源模型 hack 榜单是不诚恳的', platform: 'hn', main: false },
      { text: 'Cerebras 2000 tok/s 上线 Windsurf', platform: 'x', main: false },
      { text: '工具循环一旦陷入，成本无限上涨', platform: 'zhihu', main: false },
      { text: '国内跑更稳定，费用相对较低', platform: 'linuxdo', main: false },
      { text: '号称媲美 Sonnet 4，试了一下效果还不错', platform: 'v2ex', main: false },
      { text: '8 月中各种截断报错，基本没法用了', platform: 'v2ex', main: false },
    ],
    versionDelta: {
      base: 'Qwen2.5-Coder-32B',
      improves: [
        '参数量 32B 稠密 → 480B MoE（激活 35B · 160 专家激活 8），定位从「代码补全」升级为「Agentic 编程」',
        '上下文 128K → 256K 原生，YaRN 可扩至 1M（仓库级 / PR 级动态数据优化）',
        '代码预训练语料扩至 7.5T tokens（70% 代码占比），合成数据由 2.5-Coder 清洗',
        '新增执行驱动 Code RL + Long-Horizon Agent RL（2 万并行环境）：SWE-bench Verified 66.5% 开源第一梯队、Terminal-Bench 37.5% 超 Claude 4 Sonnet',
        '全新 Qwen Code CLI 开源（fork 自 Gemini Code）+ 官方 Claude Code proxy / Cline 接入方案',
        'Cerebras 托管 2000 tok/s（Windsurf 内置）——上代无托管生态',
      ],
      regresses: [
        'Aider Polyglot 73.7 → 61.8%（Unsloth 复测）/ 60.40（arXiv 复现）——注意评测集从 45 扩至 84+ 语言，非严格同口径',
        '本地部署门槛暴涨：32B Q4 单卡可跑 → 480B Q6 约 408GB、Q4_0 6×7900XTX 仅 7 tok/s',
        '初版 480B 工具调用失效 bug：发布数日内官方公告需重新下载权重',
        '30B-Coder 被指「agentic 过拟合」：本地闲聊/补全体感不如 Qwen3-30B-A3B-2507 通用版',
        '非代码能力相对弱化：LiveCodeBench v6 44.93（同门 Qwen3-235B-Thinking 为 74.1）、Codeforces 1800（235B 为 2134）',
      ],
    },
    subBoards: [
      { name: 'Agentic 三榜（Coding / Browser-Use / Tool-Use）', rank: '开源 #1', note: '官方口径，媲美 Claude Sonnet 4' },
      { name: 'Terminal-Bench', rank: '37.5% · 超 Claude 4 Sonnet', note: '官方/知乎官方译文中转口径' },
      { name: 'SWE-bench Verified（OpenHands 100-turn）', rank: '66.5% Pass@1', note: 'nebius 独立复测，开源第一梯队' },
      { name: 'OpenHands vibe check', rank: '#3', note: '2025-08-18：GPT-5 > Sonnet 4 > Qwen-3 Coder > Kimi-K2' },
    ],
    heat: [
      { label: 'HN 发布帖', value: '765 pts' },
      { label: 'HN 评论', value: '366' },
      { label: 'Reddit 发布帖', value: '1.9K 赞 · 258 评' },
      { label: '知乎浏览', value: '41.2 万+ · 152 回答' },
    ],
    harnessReviews: [
      {
        id: 'claude-code',
        text: '官方 proxy 直通（ANTHROPIC_BASE_URL=dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy）+ claude-code-config（ccr 路由器插件）双方案；storus 实测「取代 Opus 4.6 全栈用途、错误率仅略高」是最大背书；务必用修复后的最新权重（初版工具 bug），并给 max_tokens 留足预算防循环。',
      },
      {
        id: 'cursor',
        text: '非原生收录，走百炼 OpenAI 兼容端点（compatible-mode/v1，模型 qwen3-coder-plus）自定义接入；jayvanzyl 在 Cursor Agent Mode 用 480B 单 prompt 生成完整 2D 游戏、「surprisingly close to GPT-4\'s agent mode」、成本约 $2/1M tokens；复杂任务建议低输出档防工具循环。',
      },
      {
        id: 'openhands',
        text: '有硬核数据：nebius 用 OpenHands v0.54.0 复测 SWE-bench Verified 100-turn Pass@1 = 66.5%（开源第一梯队），67,074 条轨迹集开源可复现；OpenHands 社区 vibe check 排第 3（GPT-5 > Sonnet 4 > Qwen-3 Coder > Kimi-K2）；本地跑 480B 需 Q6 408GB 级硬件，蜂群编排可作主力编码单元。',
      },
    ],
    expertQuotes: [
      {
        text: 'Qwen3-Coder is our most agentic code model to date... sets new state-of-the-art results among open models on Agentic Coding, Agentic Browser-Use, and Agentic Tool-Use, comparable to Claude Sonnet 4.',
        name: 'Qwen 官方博客',
        role: 'Qwen3-Coder: Agentic Coding in the World · 2025-07-22',
        tone: 'pos',
      },
      {
        text: '>>> Qwen3-Coder is here! We\'re releasing Qwen3-Coder-480B-A35B-Instruct, our most powerful open agentic code model to date.',
        name: '@Alibaba_Qwen',
        role: 'X · 官方发布推文 · 1,434 转推',
        tone: 'pos',
      },
      {
        text: 'Qwen3-Coder-480B-A35B-Instruct 在 Agentic Coding、Agentic Browser-Use 和 Agentic Tool-Use 上取得了开源模型的 SOTA 效果，可以与 Claude Sonnet4 媲美。',
        name: 'Qwen 团队',
        role: '知乎官方译文 ·《Qwen3-Coder: 在世界中自主编程》',
        tone: 'pos',
      },
      {
        text: 'Ye the model looks extremely powerful! I think they\'re also maybe making a small variant as well, but unsure yet!',
        name: 'Daniel Han',
        role: 'Unsloth CEO · HN 发布帖热评',
        tone: 'pos',
      },
      {
        text: 'this is disingenuous. there are a bunch of hurdles to using open models over closed models and you know them as well as the rest of us.',
        name: 'swyx',
        role: 'HN 发布帖 · 驳「benchmark hacking」指控',
        tone: 'pos',
      },
      {
        text: 'The best available open weight models now come from China. Qwen, Moonshot and Z.ai have positively smoked them over the course of July.',
        name: 'Simon Willison',
        role: '月评 2025-07-30 · 点名 Qwen3-Coder-480B 等 5 个 Qwen 模型',
        tone: 'pos',
      },
      {
        text: 'The experience felt surprisingly close to GPT-4\'s agent mode, generating a complete 2D game from a single prompt.',
        name: 'jayvanzyl',
        role: 'Cursor Agent Mode 实测 · 2025-12-16',
        tone: 'pos',
      },
      {
        text: 'Qwen3 coder for Claude Code replaced my full-stack use of Opus 4.6; it\'s fine for basic web apps, k8s/docker infra setup with only slightly higher error rate.',
        name: 'storus',
        role: 'HN 用户 · 48210456 · 全栈实测',
        tone: 'pos',
      },
      {
        text: 'Benchmarks are one thing but the people really using these models, do it for a reason. Qwen team is top in open models, esp. for coding.',
        name: 'sourcecodeplz',
        role: 'HN 发布帖热评',
        tone: 'pos',
      },
      {
        text: 'Qwen3-Coder 的数据很亮眼，又把开源模型的能力拉高了一截。编程能力比肩 Claude 4，这本身就是最大的亮点，要知道这是一款开源模型。',
        name: '卜寒兮',
        role: '知乎高赞答主 · AI 编程开发话题优秀答主',
        tone: 'pos',
      },
      {
        text: '经过多轮严格测试，我们得出初步结论：Qwen3-Coder 的综合能力与 Claude 和 Gemini 处于同一梯队，基本能完成所有测试任务，在部分任务上甚至表现更优。',
        name: '知乎深度评测',
        role: '《阿里Qwen3-Coder深度评测：新晋开源王者能否挑战顶尖闭源模型？》',
        tone: 'pos',
      },
      {
        text: '号称是「可以与 Claude Sonnet4 媲美」。试了一下效果还不错。支持 Qwen Code（修改自 Gemini CLI），Claude Code，Cline 等工具。',
        name: 'V2EX 发布帖楼主',
        role: 'V2EX · 1147029',
        tone: 'pos',
      },
      {
        text: '实测验证 Qwen3 Code 性能完全不输 Gemini CLI 和 Claude Code，在国内运行也更加稳定且费用相对较低。',
        name: '掘金 / CSDN 评测',
        role: '《国产最牛代码大模型！最详细 Qwen3 Coder 性能测评与使用指南》',
        tone: 'pos',
      },
      {
        text: 'Qwen has previously engaged in deceptive benchmark hacking... there\'s a good reason that no software engineer you know was writing code with Qwen 2.5.',
        name: 'stuartjohnson12',
        role: 'HN 发布帖 · 引 winbuzzer 2025-01-29 报道',
        tone: 'neg',
      },
      {
        text: '雨飞猜测是 Qwen3 的微调数据对于工具调用或者编程工具的适配出现了问题……一旦陷入了循环，需要立马停掉，不然你的成本就要无限上去了。',
        name: '雨飞',
        role: '知乎 ·《谈几点 Qwen3-Coder 的使用体验》',
        tone: 'neg',
      },
      {
        text: '一个小小的括号问题，Qwen3-Coder 竟然检查了 10 多分钟……国外有开发者发现，使用 Qwen3-Coder-480B 模型时，工具调用全部失败。',
        name: '苏米客',
        role: '《Qwen3 循环报错！扣钱！欠费！避坑指南》',
        tone: 'neg',
      },
      {
        text: '8 月中左右各种截断和报错，基本没法用了——魔搭每日免费额度不稳定。',
        name: 'V2EX 用户',
        role: 'roocode + GLM4.5/ds3.1/qwen3-coder 半月横评帖',
        tone: 'neg',
      },
      {
        text: 'I\'ve gotten more mileage out of Qwen3-30b-a3b than Qwen3-30b-Coder-a3b... I find this model is likely overfitted on agentic.',
        name: 'u/ 本地实测用户',
        role: 'Reddit · Devs, what are your experiences with Qwen3-coder-30b?',
        tone: 'neg',
      },
      {
        text: 'Running Qwen3-Coder-480B Q4_0 on 6x7900xtx with 7 token/s output speed... did you have any suggestion to speed it up?',
        name: 'u/ 本地部署楼主',
        role: 'Reddit · 34 赞 46 评',
        tone: 'neg',
      },
      {
        text: 'It seems the model isn\'t even really implemented in llama.cpp yet... Roo/Cline/Kilo completely ignore the built-in tool support and that\'s both why they work but also break when context gets longer.',
        name: 'u/ 工具调用排查帖',
        role: 'Reddit · r/LocalLLaMA 1mu3tln',
        tone: 'mix',
      },
    ],
    timeline: [
      { date: '2025-07-22', event: '正式发布 Qwen3-Coder-480B-A35B-Instruct + Qwen Code CLI；HN 765 pts/366 评、Reddit 发布帖 1.9K 赞' },
      { date: '2025-07-23', event: '知乎问题「阿里开源编程模型Qwen3-Coder」上线，后被浏览 41.2 万+、152 回答' },
      { date: '2025-08-01', event: '30B-A3B-Instruct 发布；官方公告 480B 工具调用已修复需重新下载；Cerebras 托管上线（HN 47 pts）' },
      { date: '2025-09-23', event: 'qwen3-coder-plus 上线 OpenRouter（1M 上下文、$0.65/$3.25）' },
      { date: '2025-12-16', event: 'jayvanzyl 演示 Cursor Agent Mode 单 prompt 生成完整 2D 游戏，「接近 GPT-4 agent mode」' },
      { date: '2026-02-03', event: 'Qwen3-Coder-Next 发布（80B/3B、800K 可验证任务、蒸馏 480B）；HN 735 pts/429 评' },
      { date: '2026-03-03', event: 'Next 技术报告上 arXiv（2603.00729）：SWE-bench Verified 70.6–71.3、Aider 66.2' },
    ],
    demos: [
      { title: '物理烟囱拆除模拟', desc: '官方博客 Demo1：受控爆炸 + 物理引擎模拟的烟囱拆除演示（发布页 7 段演示合集之一）。' },
      { title: '一行 prompt 生成书店网页', desc: '官方 API 示例：qwen3-coder-plus 单条 prompt「Help me create a web page for an online bookstore」直接出页面。' },
      { title: 'Qwen Cloud 连出 5 个 Web 应用', desc: 'HN 用户实测：用 Qwen3-Coder 在 Qwen Cloud 从零生成 5 个可用的功能 Web 应用（44704914）。' },
    ],
    uncertainties: [
      'models.ts 基线发布日期 2026-05-06 与官方 2025-07-22 矛盾，疑录入错误；480B 之后最新迭代为 2026-02-03 的 Next 版',
      '官方 SWE-bench 自报精确数字在博客图表（图片）中未能抓取，以第三方 66.5% 为准（serenitiesai + nebius 双源一致）；官方定性称「无 test-time scaling 开源 SOTA」',
      'LMArena 精确 ELO 未找到可复核记录（models.ts 基线 1288 无法验证）；X 情绪比例含推断成分',
      '整体情绪比例 50/25/25 与十维雷达为基于代表帖文与榜单的估算，非严格量化',
      'Aider 73.7（2.5-Coder）→ 61.8（3-Coder）对比受评测集语言数扩大影响，非严格同口径',
      '480B 本地部署实测仅 6×7900XTX 7 tok/s 单点数据，无系统评测；effort 分档字段因非思考系模型整体缺省',
    ],
    sources: [
      { title: 'Qwen3-Coder: Agentic Coding in the World（官方博客）', platform: 'Qwen 官方', url: 'https://qwen.ai/blog?id=qwen3-coder' },
      { title: 'Qwen3-Coder: Agentic coding in the world | Hacker News（765 pts）', platform: 'Hacker News', url: 'https://news.ycombinator.com/item?id=44653072' },
      { title: 'Qwen3-Coder is here!（r/LocalLLaMA · 1.9K 赞）', platform: 'Reddit', url: 'https://www.reddit.com/r/LocalLLaMA/comments/1m6qdet/qwen3coder_is_here/' },
      { title: 'Qwen3-Coder-Next Technical Report（含两代完整榜单表）', platform: 'arXiv', url: 'https://arxiv.org/html/2603.00729v1' },
      { title: '阿里开源编程模型Qwen3-Coder，性能比肩全球顶级编程模型Claude4', platform: '知乎', url: 'https://www.zhihu.com/question/1931239650753769546' },
      { title: 'Qwen3 Coder Plus - API Pricing & Providers', platform: 'OpenRouter', url: 'https://openrouter.ai/qwen/qwen3-coder-plus' },
      { title: 'OpenHands trajectories with Qwen3-Coder-480B-A35B-Instruct', platform: 'nebius', url: 'https://nebius.com/blog/posts/openhands-trajectories-with-qwen3-coder-480b' },
      { title: 'Qwen3 循环报错！扣钱！欠费！Qwen3-Coder 使用避坑指南', platform: '苏米客', url: 'https://www.xmsumi.com/detail/1288' },
      { title: 'Alibaba Unveils New Qwen3 Models for Coding', platform: 'Alibaba Group', url: 'https://www.alibabagroup.com/en-US/document-1886524500057522176' },
    ],
  },
  bestInSlot: [
    {
      id: 'claude-code',
      note: '官方 proxy 直通（ANTHROPIC_BASE_URL=dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy）+ claude-code-config 路由器插件，接入成本趋近零；实测背书最厚：storus 用 480B 驱动 Claude Code「取代 Opus 4.6 全栈用途、错误率仅略高」；注意两点——务必用修复后的最新权重（初版工具调用 bug 需重下载），max_tokens 留足预算防工具循环失控；Qwen Code CLI（同门、fork 自 Gemini Code）可与其组双 CLI 复核流。',
    },
    {
      id: 'cursor',
      note: '非原生收录，走百炼 OpenAI 兼容端点（compatible-mode/v1，模型 qwen3-coder-plus）自定义接入；jayvanzyl 在 Cursor Agent Mode 用 480B 单 prompt 生成完整 2D 游戏（pygame 结构+碰撞逻辑全出）、「surprisingly close to GPT-4\'s agent mode」、成本约 $2/1M tokens；双模型槽位可组「Qwen3-Coder 开源低成本迭代 + 闭源旗舰加固」复核流，复杂任务建议低输出档防循环。',
    },
    {
      id: 'openhands',
      note: '有硬核 benchmark 背书：nebius 用 OpenHands v0.54.0 复测 SWE-bench Verified 100-turn Pass@1 = 66.5%（开源第一梯队），67,074 条轨迹集开源可复现；OpenHands 社区 vibe check 排第 3（GPT-5 > Sonnet 4 > Qwen-3 Coder > Kimi-K2）；Apache 2.0 权重可自部署，适合蜂群流里当开源编码主力单元，配合通用 30B-A3B 兜底简单任务；480B 本地需 Q6 约 408GB 级硬件。',
    },
  ],
  teamIds: ['budget-vanguard', 'common-warlord'],
  trialGood: [
    { label: 'Agentic 编程', to: '/scenarios#agent' },
    { label: '长程代码重构', to: '/scenarios#refactor' },
    { label: '低成本全栈交付', to: '/scenarios#fullstack' },
  ],
  trialBad: [
    { label: '竞技算法与数学推理', to: '/scenarios#algo', note: '非思考系 LCB v6 仅 44.93，建议换 deepseek-r1' },
    { label: '480B 本地部署', to: '/scenarios#fullstack', note: 'Q6 约 408GB、6×7900XTX 仅 7 tok/s，建议换 qwen3（235B 4×H20 可跑）' },
    { label: '工具调用高可靠场景', to: '/scenarios#agent', note: '循环/模板 bug 真实案例多，建议换 kimi-k2' },
    { label: '前端快速出活', to: '/scenarios#frontend', note: 'agentic 过拟合 + 审美偏弱，建议换 gemini-3-6-flash' },
  ],
  guideIds: ['beginner-first-model', 'beginner-budget', 'mech-toolcall', 'case-refactor'],
};
