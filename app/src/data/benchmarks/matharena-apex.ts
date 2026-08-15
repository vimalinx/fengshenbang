import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'matharena-apex',
  name: 'MathArena Apex',
  aliases: [],
  category: 'reasoning',
  organizer: 'ETH SRI × INSAIT（MathArena 平台，2025-08）',
  url: 'https://matharena.ai/apex',
  oneLiner: '从全年赛事筛出的 12 道「无人能解」数学题',
  what: 'MathArena Apex 是 MathArena 平台 2025 年 8 月推出的精选难题集，动机很直接：头部模型（如 GPT-5）在各最终答案型赛事上已约 90%，常规竞赛题快不够考了。于是作者翻遍 2025 年近 100 场公开数学竞赛，用四个前沿模型（Grok 4、GPT-5 High、Gemini 2.5 Pro、GLM 4.5）各试 4 次做过滤器——只要有任何一次答对就淘汰，最终只有 12 题幸存。其中 6 题来自最终答案型赛事（SMT、EMCC、CMM），6 题由证明题（IMO、各国队选拔赛）在不降低难度的前提下改写成最终答案形式。',
  how: '评测时 9 个模型每题独立采样 16 次，报全部题目、全部尝试的平均成功率；另有一个带自我验证反馈循环的 GPT-5 Agent 变体跑 4 次作参照。因为题目就是按「这些模型解不出」挑的，分数天然极低，作者也明言模型间的排名没有参考价值。题目选入时保证未污染（模型发布前题未公开或不构成训练目标），平台会随新赛事持续补充新题。',
  examples: '第 1 题「整数弦」（全俄竞赛 2025）：连续函数 f 的图像上恰有 N 条长度为整数且平行于 x 轴的弦，其中一条长 2025，求 N 的最小值——正确答案 4049，但 45% 的模型尝试错答 2025，只有 Qwen3-Thinking 在 16 次中答对 7 次。第 12 题「IMO 终极大魔王」由 IMO 2025 第 6 题改写：2025×2025 方格铺矩形砖、每行每列恰留一个空格，求最少块数（答案 2112）——81% 的尝试答 4048 并附上假证明，无一答对。还有一道 SMT 几何题看着简单实则藏陷阱，所有模型 100% 给出同一个错误答案 4π。',
  reading: '最高分 Qwen3-235B-Thinking 仅 5.2%，12 题里最难的第 9–12 题所有模型 16 次尝试全灭。它回答的问题是「竞赛数学还能难倒 AI 吗」——截至 2025 年 8 月，答案是能，但只剩十几道题的量级。分数会随新模型、新题目快速变化，以 matharena.ai/apex 页面为准。',
  caveat: '只有 12 题，统计意义有限，作者自己警告不要拿排名说事；部分题目在被测模型发布前已公开，目前评估认为污染尚不构成问题，但随题目被当作训练目标的风险会增加；3 道 SMT 题目因主办方要求未公开；题源与 MathArena 的 HMMT/AIME 2025 评测存在重叠。',
  facts: [
    { label: '题量', value: '12 题，从 2025 年近 100 场公开赛事中筛出' },
    { label: '入选门槛', value: 'Grok 4 / GPT-5 (High) / Gemini 2.5 Pro / GLM 4.5 各试 4 次全部答错' },
    { label: '题源', value: '6 题来自最终答案型赛事（SMT/EMCC/CMM），6 题由证明题改写（IMO/各国队选拔赛）' },
    { label: '评测协议', value: '9 个模型 × 每题 16 次采样，报平均成功率' },
    { label: '更新机制', value: '随新赛事持续补充新题，保持「前沿模型未解决」的入选标准' },
  ],
  frontier: {
    value: 5.2,
    note: '官方博文（2025-08）：最高分 Qwen3-235B-A22B-Thinking-2507 仅 5.2%；最难的第 9–12 题所有模型 16 次尝试全灭。',
  },
  history: [
    { date: '2025-05', event: 'MathArena 论文 arXiv:2505.23281 发布，确立「赛后即时评测」框架' },
    { date: '2025-08', event: '因 GPT-5 在常规最终答案赛事约 90%、题目「不够考」，官方推出 Apex 难题集' },
    { date: '2025-08', event: '首批 9 模型放榜：Qwen3-Thinking 5.2% 居首，作者明言模型间排名没有参考价值' },
  ],
  funFact: '第 9 题是道「看着简单」的 SMT 几何题，所有模型 100% 给出同一个错误答案 4π——MathArena 作者承认自己初做时也犯了完全一样的错，直到把曲线画出来才发现问题，而模型没法画图。',
  relatedIds: ['hmmt', 'aime', 'imo-2025', 'usamo'],
  // 分数天梯：2026-08-14 核验。官方博文（2025-08）与主表（matharena.ai/?comp=apex--apex_2025）口径：
  // 12 题 × 16 次采样的平均成功率；作者明言模型间排名无参考价值，仅 Qwen3 因未参与选题略高。
  ladder: [
    { model: 'Qwen3-235B-A22B-Thinking-2507', score: '5.2%', note: '官方博文 2025-08，12 题平均成功率居首；作者提醒其未参与选题' },
    { model: 'GPT-5 (High) + Agent 脚手架', score: '≈2-4%', note: '官方博文 2025-08，仅 4 次采样、内部多次迭代，为带自我验证的参照变体' },
    { model: 'Grok 4 / GPT-5 (High) / Gemini 2.5 Pro / GLM 4.5', score: '<5%', note: '官方博文 2025-08；此四模型用于选题过滤，各试 4 次全部答错' },
    { model: '其余 8 个直接提示模型', score: '<5%', note: '官方博文 2025-08；第 9-12 题所有模型 16 次尝试全灭' },
  ],
  traits: ['12 道无人能解题', '16 次采样报均率', '按解不出筛题', '题源跨赛事', '排名无参考价值'],
  openSource: {
    status: 'partial',
    url: 'https://matharena.ai/apex',
    note: '题目与评测框架公开（MathArena 平台、huggingface 数据集 MathArena/apex），但其中 3 道 SMT 题因主办方要求未公开；评测需访问 MathArena 基础设施',
  },
};
