import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'openhands-index',
  name: 'OpenHands Index',
  aliases: ['OpenHands Index 开源榜', 'OpenHands vibe check'],
  category: 'agent',
  organizer: 'OpenHands 团队（Graham Neubig 等），2026-01-29 发布',
  url: 'https://www.openhands.dev/blog/openhands-index',
  oneLiner: '五项工程任务打包，给编程模型算「综合高考分」',
  what: '软件工程 agent 的综合指数，本质是个「元基准」：用 OpenHands 统一的 agent 框架，把五个现成基准打包成一次大考——SWE-bench Verified（修 GitHub issue）、Commit0（从零开发全新项目）、SWE-bench Multimodal 核验版（前端开发）、SWT-bench（给 bug 写复现测试）、GAIA（查 API 和实现细节的信息收集）。五类任务对应 OpenHands 云端真实流量里用户最常让 agent 干的五类活，避免单一基准（比如只测修 issue）以偏概全。',
  how: '所有模型在同一 OpenHands Agent SDK 上跑全部五类任务，模型是唯一变量。报一个五类加权综合分，同时公开每个实例的平均成本（美元）和平均耗时（秒）——三个维度一起看，方便按「能力 / 预算 / 速度」选型。实现全部开源在 OpenHands/benchmarks 仓库。',
  examples: '五类任务对应五种真实工作画面：给真实开源仓库修一个 issue；从零起步长程开发一个完整应用（GPT-5.2 Codex 在这类任务上能连续工作两倍时长、成功率明显更高，社区著名案例是它跑了一周做出一个基本可用的浏览器原型）；按截图改前端界面；给一个报错的仓库写出能复现 bug 的单元测试；以及开发中查资料——把 API 文档和实现细节找全。',
  reading: '首批 9 个模型的结论：Claude 4.5 Opus 综合第一且五项无明显短板，GPT-5.2 Codex 总分第二、长程开发最强，Gemini 3 Flash 和 DeepSeek v3.2 Reasoner 是性价比之选。后续第三方收录的数据里头部已到 65 分上下（如 Gemini 3.1 Pro 65.02）。每实例成本约 4–15 美元，模型间差好几倍——分数之外这一栏同样值得看。',
  caveat: '元基准的天然属性：成绩依赖五个子基准的版本，也依赖 OpenHands 框架本身——换个 agent 框架（Claude Code、Codex 等）排名可能不同，所以它测的是「模型 × OpenHands」的组合表现。子基准之一 SWE-bench Verified 已被 OpenAI 宣布弃用（详见其条目），争议会部分继承；由 OpenHands 团队自办，对自家框架的适配天然最熟。',
  facts: [
    { label: '构成', value: 'SWE-bench Verified + Commit0 + SWE-bench Multimodal（核验版）+ SWT-bench + GAIA' },
    { label: '统一框架', value: '所有模型在同一 OpenHands Agent SDK 上跑，模型是唯一变量' },
    { label: '三维度', value: '五类加权综合分 + 每实例平均成本（美元）+ 平均耗时（秒）' },
    { label: '任务来源', value: '按 OpenHands 云端真实流量的高频工作类型选样' },
    { label: '开源', value: 'OpenHands/benchmarks 仓库，持续更新' },
  ],
  frontier: {
    value: 65.02,
    note: '第三方收录（BenchmarkList，2026 年中）：Gemini 3.1 Pro 65.02、GPT-5.4 64.3 居前，每实例成本约 4–15 美元；首批官方榜（2026-01）第一为 Claude 4.5 Opus。',
  },
  // 分数天梯：2026-08-15 抓取官方站 index.openhands.dev 综合榜（五类加权平均分），
  // 数据为各模型最近一次评测（2026-03 ~ 2026-06），与 openhands-index-results 仓库 scores.json 一致；
  // 开源权重最佳为 GLM-5.1（58.2，见仓库 recommended-models.json）。
  ladder: [
    { model: 'Claude Fable 5', score: '81.00', note: '官方榜 2026-06-11（五类全测，综合分）' },
    { model: 'Claude Opus 4.8', score: '71.88', note: '官方榜 2026-05-30' },
    { model: 'Claude Opus 4.7', score: '69.66', note: '官方榜 2026-04' },
    { model: 'Claude Opus 4.6', score: '66.72', note: '官方榜 2026-03-26' },
    { model: 'GPT-5.5', score: '65.94', note: '官方榜 2026-04-28' },
    { model: 'GPT-5.4', score: '64.28', note: '官方榜 2026-04-22（与第三方 BenchmarkList 收录的 64.3 一致）' },
    { model: 'Gemini 3.5 Flash', score: '62.64', note: '官方榜 2026-06-11' },
    { model: 'Claude Opus 4.5', score: '60.58', note: '官方榜 2026-04-29' },
    { model: 'GLM-5.1', score: '58.2', note: '官方榜 2026-06；开源权重最佳（recommended-models.json）' },
    { model: 'MiniMax M3', score: '57.2', note: '官方榜 2026-06；开源权重' },
    { model: 'Kimi K2.6', score: '57.1', note: '官方榜 2026-05；开源权重' },
  ],
  traits: ['元基准：五类工程任务一次大考（修 issue / 从零建项目 / 前端 / 写复现测试 / 查资料）', '统一 OpenHands Agent SDK 跑分，模型是唯一变量', '三维度并报：五类加权综合分 + 每实例成本 + 耗时', '任务类型按 OpenHands 云端真实流量高频场景选样', '榜单滚动更新，附每模型评测日志'],
  openSource: {
    status: 'open',
    url: 'https://github.com/OpenHands/benchmarks',
    note: '评测代码在 OpenHands/benchmarks 公开，逐模型结果与日志在 OpenHands/openhands-index-results 公开，可复现',
  },
  history: [
    { date: '2026-01-29', event: '正式发布，首批评测 Anthropic/OpenAI/Google/DeepSeek/Qwen 等 9 个模型，Claude 4.5 Opus 综合第一' },
    { date: '2026-02', event: '子基准之一 SWE-bench Verified 被 OpenAI 宣布弃用，Index 部分继承其争议' },
    { date: '2026 起', event: '榜单持续滚动更新，成为按「能力/成本/速度」三维权衡选模型的常用参考' },
  ],
  funFact: '为说明 GPT-5.2 Codex 的长程开发能力，官方博客引用了 Cursor CEO 的轶事：让模型连跑一周，从零做出一个基本能用的网页浏览器——这类「连续工作几天不跑偏」的任务正是 Commit0 想测的。',
  relatedIds: ['swe-bench-verified'],
};
