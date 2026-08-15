import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'frontiercode',
  name: 'FrontierCode',
  aliases: [
    'FrontierCode Diamond',
  ],
  category: 'coding',
  organizer: 'Cognition（Devin 公司），2026-06',
  url: 'https://cognition.com/blog/frontier-code',
  oneLiner: 'AI 写的补丁，真人 maintainer 愿不愿意合并',
  what: 'FrontierCode 问的不是「测试过没过」，而是「这段补丁达到真人 maintainer 愿意合并（mergeable）的水准没有」。150 个任务取自 36 个旗舰开源仓库的真实 PR，与 20 多位一线 maintainer 共建，单个任务的制作成本超过 40 小时人工。任务集分三层嵌套：Extended 全部 150 题、Main 其中最难的 100 题、Diamond 最难的 50 题。',
  how: 'agent 拿到的是一份检出好的仓库加一段 issue 描述，在容器里无人干预地自主工作，最后交出补丁。判分两层：先用阻断性功能标准（主要是隐藏单测）卡门槛，再用加权 rubric 评质量，其中包含模型评分的检查项，比如是否补了要求的测试、是否用了被禁止的实现方式。最终报 patch correctness rate（补丁满足全部阻断标准的任务比例），mean@5。',
  examples: '官方与第三方披露的任务例子都来自真实仓库：修 aiohttp 的 websocket bug、给 Prisma 的浏览器端 bundle 做安全加固、扩展 JSON schema 的 lint 规则。可以看到这些都不是「补个函数」的题——agent 要先读懂一个成熟开源项目的结构和惯例，改完的补丁要能经得起 maintainer 的审视，包括测试覆盖和实现手法是否干净。',
  reading: 'Diamond 子集（最难 50 题）是目前观察顶尖模型的稀缺窗口：发布时最强的 Claude Opus 4.8 也只有约 13.4%，GPT-5.5 为 6.3%。主榜上 2026 年中的头部成绩是 Fable 5 约 53.5%、Opus 5 约 53.4%（第三方聚合口径）。分数低不代表模型差，而是这把尺刻意卡在「能直接进主干」的严苛线上。',
  caveat: '数据私有不公开，且有第三方审计批评其透明度；出题方 Cognition 本身就是做 Devin 编程 agent 的公司，榜单天然服务于它的叙事，引用时留意这层利益相关。rubric 中部分检查由模型评分，也让「合并标准」带一点主观性。',
  facts: [
    { label: '题量', value: '150 题（Extended），嵌套子集 Main 100 题、Diamond 最难 50 题' },
    { label: '发布', value: '2026-06，Cognition（Devin 公司）' },
    { label: '任务来源', value: '36 个旗舰开源仓库的真实 PR，与 20 多位 maintainer 共建' },
    { label: '计分方式', value: 'patch correctness rate（mean@5）：隐藏单测阻断门槛 + 加权 rubric 质量分' },
    { label: '数据公开性', value: '私有，不对外发布，曾遭第三方透明度批评' },
  ],
  frontier: {
    value: 53.5,
    note: '主榜 v1.1（第三方聚合口径，2026-07）：Claude Fable 5 约 53.5%、Opus 5 约 53.4% 领跑；最难的 Diamond 子集（50 题）发布时最强的 Opus 4.8 仅约 13.4%（2026-06）。',
  },
  ladder: [
    { model: 'Claude Fable 5', score: '53.5%', note: '官方榜 v1.1 Main（Anthropic 系统卡，claude-code xhigh），2026-07；Diamond 29.3%' },
    { model: 'Claude Opus 5', score: '53.4%', note: '官方榜 v1.1 Main（Anthropic 系统卡，claude-code max），2026-07-24；Extended 63.6%' },
    { model: 'GPT-5.6 Sol', score: '47.5%', note: '官方榜 v1.1 Main（Cognition FrontierCode，codex max），2026-07；Extended 60.6%' },
    { model: 'Claude Opus 4.8', score: '46.5%', note: '官方榜 v1.1 Main（Cognition 发布帖，claude-code max），2026-06' },
    { model: 'Kimi K3', score: '44.2%', note: '官方榜 v1.1 Main（Cognition FrontierCode），2026-08' },
    { model: 'Grok 4.5', score: '42.4%', note: '官方榜 v1.1 Main（Cognition FrontierCode），2026-08' },
    { model: 'GPT-5.6 Terra', score: '41.3%', note: '官方榜 v1.1 Main（Cognition FrontierCode），2026-08' },
    { model: 'GPT-5.6 Luna', score: '39.8%', note: '官方榜 v1.1 Main（Cognition FrontierCode），2026-08' },
    { model: 'Gemini 3.6 Flash', score: '34.4%', note: '官方榜 v1.1 Main（Cognition FrontierCode），2026-08' },
    { model: 'Claude Opus 4.7', score: '5.2%（Diamond）', note: 'Diamond 子集（最难 50 题），2026-06；Diamond 榜首 Opus 4.8 仅 13.4%' },
  ],
  traits: ['真人 maintainer 愿不愿合并', '150 题取 36 个旗舰开源仓库真实 PR', '隐藏单测 + 加权 rubric 判分', 'Diamond 子集全球最难窗口', '数据私有不公开'],
  openSource: {
    status: 'closed',
    note: '任务集与评分脚本均不公开（Cognition 内部基准），曾遭第三方透明度批评；仅官方博客与系统卡披露分数',
  },
  history: [
    { date: '2026-06', event: 'Cognition 发布，提出以「真人 maintainer 是否愿意合并」为评判标准' },
    { date: '2026-06-09', event: 'Claude Fable 5 系统卡引用：Diamond 子集最强模型 Opus 4.8 仅 13.4%，GPT-5.5 为 6.3%' },
    { date: '2026-06 起', event: '第三方报道披露单题制作成本超 40 小时 maintainer 人工；对其数据私有的审计批评同期出现' },
    { date: '2026-07', event: 'v1.1 第三方聚合榜：Fable 5、Opus 5 以约 53% 领跑 Main' },
  ],
  funFact: '这可能是「出题比做题还贵」的榜：150 个任务每个都要资深 maintainer 投入 40 小时以上制作，再由 Cognition 研究员逐个审、随机抽题人工解一遍验证公平性。判分里还有一条颇具 maintainer 风味的规则——用了被禁止的实现方式，哪怕功能是对的也要扣分。',
  relatedIds: ['swe-bench-pro', 'deepswe'],
};
